import { Injectable, Inject, UnauthorizedException, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import { Cron } from '@nestjs/schedule';
import type { Prisma } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { randomUUID, createHash } from 'crypto';
import { JwtPayload, RefreshTokenWithUser } from './types/jwt.types';
import { appConfig } from '../common/config/app.config';
import { RefreshTokenRequestDto, RefreshTokenResponseDto } from './dtos/refresh-token.dto';
import { LoginRequestDto, LoginResponseDto } from './dtos/login.dto';
import { LogoutRequestDto } from './dtos/logout.dto';
import { PrismaService } from '../prisma/prisma.service';
import { SuccessResponseDto } from '@/common/dtos/success.dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly jwtService: JwtService,
    @Inject(appConfig.KEY) private readonly config: ConfigType<typeof appConfig>,
    private readonly prisma: PrismaService
  ) {}

  /**
   * 로그인
   * @param params - 로그인 요청 데이터
   * @param params.email - 이메일
   * @param params.password - 비밀번호
   * @returns 로그인 응답 데이터
   */
  async login({ email, password }: LoginRequestDto): Promise<LoginResponseDto> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException('이메일 또는 비밀번호가 올바르지 않습니다.');
    }

    const isPasswordValid = await this.comparePasswords(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('이메일 또는 비밀번호가 올바르지 않습니다.');
    }

    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    const accessToken = this.generateAccessToken(payload);
    const refreshToken = this.generateRefreshToken(payload);

    // 세션 개수 제한 및 새 리프레시 토큰 저장
    await this.manageUserSessions(user.id, refreshToken);

    return new LoginResponseDto({
      accessToken,
      refreshToken,
    });
  }

  /**
   * 로그아웃 (현재 세션만)
   * @params params.refreshToken - 리프레시 토큰
   * @returns 로그아웃 성공 여부
   */
  async logout({ refreshToken }: LogoutRequestDto): Promise<SuccessResponseDto> {
    const payload = this.verifyRefreshToken(refreshToken);
    const tokenHash = this.hashToken(refreshToken);

    // 현재 세션의 토큰 패밀리만 무효화
    const currentToken = await this.prisma.refreshToken.findFirst({
      where: {
        tokenHash,
        userId: payload.sub,
        isRevoked: false,
      },
      select: { familyId: true },
    });

    if (currentToken) {
      await this.prisma.refreshToken.updateMany({
        where: {
          familyId: currentToken.familyId,
          userId: payload.sub,
        },
        data: { isRevoked: true },
      });
    }

    return new SuccessResponseDto({ success: true });
  }

  /**
   * 모든 디바이스에서 로그아웃
   * @param userId - 사용자 ID
   * @returns 로그아웃 성공 여부
   */
  async logoutFromAllDevices(userId: number): Promise<SuccessResponseDto> {
    await this.prisma.refreshToken.updateMany({
      where: { userId },
      data: { isRevoked: true },
    });

    return new SuccessResponseDto({ success: true });
  }

  /**
   * 토큰 재발급 (RTR 패턴 적용)
   * @param params - 리프레시 토큰 요청 데이터
   * @param params.refreshToken - 리프레시 토큰
   * @returns 토큰 재발급 응답 데이터
   */
  async refreshTokens(dto: RefreshTokenRequestDto): Promise<RefreshTokenResponseDto> {
    const payload = this.verifyRefreshToken(dto.refreshToken);
    const tokenHash = this.hashToken(dto.refreshToken);

    return await this.prisma.$transaction(async (tx) => {
      // 동시성 문제 해결을 위한 row-level lock 적용
      //
      // ❌ 트랜잭션만으로는 동시성 제어 불가능한 이유:
      // - 트랜잭션은 쓰기(UPDATE/INSERT) 시에만 자동으로 락을 걸음
      // - 읽기(SELECT) 시에는 락을 걸지 않아서 여러 요청이 동시에 같은 데이터를 읽을 수 있음
      //
      // 문제 시나리오:
      // 요청A: SELECT (토큰 읽기) → 요청B: SELECT (동일 토큰 읽기) → 요청A: UPDATE → 요청B: UPDATE (충돌!)
      //
      // ✅ FOR UPDATE로 해결:
      // 동일한 리프레시 토큰으로 여러 요청이 동시에 들어올 때:
      // 1. 첫 번째 요청: 토큰을 읽는 순간부터 잠금을 설정
      // 2. 두 번째 요청: 첫 번째 트랜잭션이 완료될 때까지 대기
      // 3. 첫 번째 완료 후: 두 번째 요청은 이미 무효화된 토큰을 발견하여 401 반환
      const storedTokens = await tx.$queryRaw<RefreshTokenWithUser[]>`
        SELECT
          rt.*,
          u.id as user_id,
          u.email as user_email,
          u.role as user_role
        FROM "refresh_tokens" rt
        JOIN "users" u ON rt."userId" = u.id
        WHERE rt."tokenHash" = ${tokenHash}
          AND rt."userId" = ${payload.sub}
          AND rt."isRevoked" = false
          AND rt."expiresAt" > NOW()
        FOR UPDATE OF rt  -- 핵심: refresh_tokens 테이블의 해당 row에 배타적 잠금 설정
        LIMIT 1           -- 트랜잭션이 완료될 때까지 다른 요청은 이 row에 접근 불가
      `;

      if (storedTokens.length === 0) {
        // 재사용 공격 감지 - 해당 패밀리의 모든 토큰 무효화
        await this.revokeTokenFamily(payload.sub, tokenHash, tx);
        throw new UnauthorizedException('유효하지 않은 리프레시 토큰입니다.');
      }

      const tokenData = storedTokens[0];

      // 현재 토큰 무효화
      await tx.refreshToken.update({
        where: { id: tokenData.id },
        data: { isRevoked: true },
      });

      // JWT 페이로드 생성을 위한 사용자 정보 추출
      const user = {
        id: tokenData.user_id,
        email: tokenData.user_email,
        role: tokenData.user_role,
      };
      const newPayload: JwtPayload = {
        sub: user.id,
        email: user.email,
        role: user.role,
      };

      // 새 토큰 발급
      const accessToken = this.generateAccessToken(newPayload);
      const refreshToken = this.generateRefreshToken(newPayload);

      // 새 리프레시 토큰을 같은 패밀리로 저장
      await this.storeRefreshToken({
        userId: user.id,
        refreshToken: refreshToken,
        familyId: tokenData.familyId,
        tx,
      });

      return new RefreshTokenResponseDto({
        accessToken,
        refreshToken,
      });
    });
  }

  /**
   * 비밀번호 해시화
   * @param password - 비밀번호
   * @returns 해시화된 비밀번호
   */
  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }

  /**
   * 비밀번호 비교
   * @param password - 비밀번호
   * @param hashedPassword - 해시화된 비밀번호
   * @returns 비밀번호가 일치하는지 여부
   */
  private async comparePasswords(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  /**
   * 액세스 토큰 생성
   * @param payload - 토큰 페이로드
   * @returns 액세스 토큰
   */
  private generateAccessToken(payload: JwtPayload): string {
    return this.jwtService.sign(payload, {
      secret: this.config.accessTokenSecret,
      expiresIn: this.config.accessTokenExpiresIn,
    });
  }

  /**
   * 리프레시 토큰 생성
   * @param payload - 토큰 페이로드
   * @returns 리프레시 토큰
   */
  private generateRefreshToken(payload: JwtPayload): string {
    return this.jwtService.sign(payload, {
      secret: this.config.refreshTokenSecret,
      expiresIn: this.config.refreshTokenExpiresIn,
    });
  }

  /**
   * 리프레시 토큰 검증
   * @param token - 리프레시 토큰
   * @returns 토큰 페이로드
   */
  private verifyRefreshToken(token: string): JwtPayload {
    try {
      return this.jwtService.verify(token, {
        secret: this.config.refreshTokenSecret,
      });
    } catch (_error) {
      throw new UnauthorizedException('유효하지 않은 리프레시 토큰입니다.');
    }
  }

  /**
   * 토큰 해시화 (SHA256)
   * @param token - 토큰
   * @returns 해시화된 토큰
   */
  private hashToken(token: string): string {
    return createHash('sha256').update(token).digest('hex');
  }

  /**
   * 사용자 세션 관리 (세션 개수 제한 및 새 세션 생성)
   * @param userId - 사용자 ID
   * @param newRefreshToken - 새로 생성할 리프레시 토큰
   */
  private async manageUserSessions(userId: number, newRefreshToken: string) {
    const MAX_SESSIONS = 10;

    this.prisma.$transaction(async (tx) => {
      // 현재 활성화된 세션 개수 확인
      const activeSessions = await tx.refreshToken.findMany({
        where: {
          userId,
          isRevoked: false,
          expiresAt: { gt: new Date() },
        },
        orderBy: { createdAt: 'asc' }, // 오래된 순으로 정렬
      });

      // 초과된 세션 개수만큼 오래된 세션 제거
      if (activeSessions.length >= MAX_SESSIONS) {
        const sessionsToRemove = activeSessions.slice(0, activeSessions.length - MAX_SESSIONS + 1);
        const sessionIdsToRemove = sessionsToRemove.map((session) => session.id);

        await tx.refreshToken.updateMany({
          where: { id: { in: sessionIdsToRemove } },
          data: { isRevoked: true },
        });
      }

      // 새 리프레시 토큰 저장
      await this.storeRefreshToken({ userId, refreshToken: newRefreshToken, tx });
    });
  }

  /**
   * 리프레시 토큰 DB 저장
   * @param userId - 사용자 ID
   * @param token - 리프레시 토큰
   * @param familyId - 토큰 패밀리 ID (선택적)
   * @returns 생성된 토큰 레코드
   */
  private async storeRefreshToken({
    userId,
    refreshToken,
    familyId,
    tx,
  }: {
    userId: number;
    refreshToken: string;
    familyId?: string;
    tx?: Prisma.TransactionClient;
  }) {
    const prismaClient = tx || this.prisma;

    const tokenHash = this.hashToken(refreshToken);
    const expiresAt = this.getRefreshTokenExpiryDate();

    return prismaClient.refreshToken.create({
      data: {
        familyId: familyId || randomUUID(),
        tokenHash,
        userId,
        expiresAt,
      },
    });
  }

  /**
   * 토큰 패밀리 무효화 (재사용 공격 감지 시)
   * @param userId - 사용자 ID
   * @param suspiciousTokenHash - 의심스러운 토큰 해시
   */
  private async revokeTokenFamily(
    userId: number,
    suspiciousTokenHash: string,
    tx?: Prisma.TransactionClient
  ) {
    const prismaClient = tx || this.prisma;

    // 의심스러운 토큰의 패밀리 ID 찾기
    const suspiciousToken = await prismaClient.refreshToken.findFirst({
      where: { tokenHash: suspiciousTokenHash, userId },
      select: { familyId: true },
    });

    if (suspiciousToken) {
      // 해당 패밀리의 모든 토큰 무효화
      await prismaClient.refreshToken.updateMany({
        where: {
          familyId: suspiciousToken.familyId,
          userId,
        },
        data: { isRevoked: true },
      });
    }
  }

  /**
   * 만료된 리프레시 토큰 정리 (토큰 수명의 1/2 주기로 실행)
   * 3일마다 새벽 2시에 실행 (refreshToken 수명이 7일일 때)
   */
  @Cron('0 2 */3 * *')
  async cleanupExpiredTokens() {
    const deletedCount = await this.prisma.refreshToken.deleteMany({
      where: {
        OR: [
          {
            isRevoked: true,
          },
          {
            expiresAt: {
              lt: new Date(),
            },
          },
        ],
      },
    });

    this.logger.log(`만료된 리프레시 토큰 정리 완료: ${deletedCount.count}개 삭제`);
  }

  /**
   * 리프레시 토큰 만료 날짜 계산
   * @returns 환경변수 설정에 따른 만료 날짜
   */
  private getRefreshTokenExpiryDate(): Date {
    const expiresIn = this.config.refreshTokenExpiresIn; // "7d", "1w", "24h" 등
    const now = new Date();

    // 숫자 + 단위 파싱 (예: "7d", "24h", "1w")
    const match = expiresIn.match(/^(\d+)([dwh])$/);
    if (!match) {
      throw new Error(`Invalid REFRESH_TOKEN_EXPIRES_IN format: ${expiresIn}`);
    }

    const [, amount, unit] = match;
    const value = parseInt(amount, 10);

    switch (unit) {
      case 'd': // days
        return new Date(now.getTime() + value * 24 * 60 * 60 * 1000);
      case 'w': // weeks
        return new Date(now.getTime() + value * 7 * 24 * 60 * 60 * 1000);
      case 'h': // hours
        return new Date(now.getTime() + value * 60 * 60 * 1000);
      default:
        throw new Error(`Unsupported time unit: ${unit}`);
    }
  }
}
