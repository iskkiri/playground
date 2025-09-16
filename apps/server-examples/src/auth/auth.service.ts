import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import bcrypt from 'bcryptjs';
import { randomUUID, createHash } from 'crypto';
import { JwtPayload } from './types/jwt.types';
import { appConfig } from '../common/config/app.config';
import { RefreshTokenRequestDto, RefreshTokenResponseDto } from './dtos/refresh-token.dto';
import { LoginRequestDto, LoginResponseDto } from './dtos/login.dto';
import { LogoutRequestDto } from './dtos/logout.dto';
import { PrismaService } from '../prisma/prisma.service';
import { SuccessResponseDto } from '@/common/dtos/success.dto';

@Injectable()
export class AuthService {
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

    // 토큰이 존재하고 유효한지 확인
    const storedToken = await this.prisma.refreshToken.findFirst({
      where: {
        tokenHash,
        userId: payload.sub,
        isRevoked: false,
        expiresAt: { gt: new Date() },
      },
      include: { user: true },
    });

    if (!storedToken) {
      // 재사용 공격 감지 - 해당 패밀리의 모든 토큰 무효화
      await this.revokeTokenFamily(payload.sub, tokenHash);
      throw new UnauthorizedException('유효하지 않은 리프레시 토큰입니다.');
    }

    // 현재 토큰 무효화
    await this.prisma.refreshToken.update({
      where: { id: storedToken.id },
      data: { isRevoked: true },
    });

    const user = storedToken.user;
    const newPayload: JwtPayload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    // 새 토큰 발급
    const accessToken = this.generateAccessToken(newPayload);
    const refreshToken = this.generateRefreshToken(newPayload);

    // 새 리프레시 토큰을 같은 패밀리로 저장
    await this.storeRefreshToken(user.id, refreshToken, storedToken.familyId);

    return new RefreshTokenResponseDto({
      accessToken,
      refreshToken,
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

    // 현재 활성화된 세션 개수 확인
    const activeSessions = await this.prisma.refreshToken.findMany({
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

      await this.prisma.refreshToken.updateMany({
        where: { id: { in: sessionIdsToRemove } },
        data: { isRevoked: true },
      });
    }

    // 새 리프레시 토큰 저장
    await this.storeRefreshToken(userId, newRefreshToken);
  }

  /**
   * 리프레시 토큰 DB 저장
   * @param userId - 사용자 ID
   * @param token - 리프레시 토큰
   * @param familyId - 토큰 패밀리 ID (선택적)
   * @returns 생성된 토큰 레코드
   */
  private async storeRefreshToken(userId: number, token: string, familyId?: string) {
    const tokenHash = this.hashToken(token);
    const expiresAt = this.getRefreshTokenExpiryDate();

    return this.prisma.refreshToken.create({
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
  private async revokeTokenFamily(userId: number, suspiciousTokenHash: string) {
    // 의심스러운 토큰의 패밀리 ID 찾기
    const suspiciousToken = await this.prisma.refreshToken.findFirst({
      where: { tokenHash: suspiciousTokenHash, userId },
      select: { familyId: true },
    });

    if (suspiciousToken) {
      // 해당 패밀리의 모든 토큰 무효화
      await this.prisma.refreshToken.updateMany({
        where: {
          familyId: suspiciousToken.familyId,
          userId,
        },
        data: { isRevoked: true },
      });
    }
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
