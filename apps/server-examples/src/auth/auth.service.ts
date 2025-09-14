import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import bcrypt from 'bcryptjs';
import { JwtPayload } from './types/jwt.types';
import { appConfig } from '../config/app.config';
import { RefreshTokenRequestDto, RefreshTokenResponseDto } from './dtos/refresh-token.dto';
import { LoginRequestDto, LoginResponseDto } from './dtos/login.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(appConfig.KEY) private readonly config: ConfigType<typeof appConfig>,
    private readonly prisma: PrismaService
  ) {}

  // TODO: 로그인 로직 수정 필요
  /**
   * 로그인
   * @param dto - 로그인 요청 데이터
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

    return new LoginResponseDto({
      accessToken,
      refreshToken,
    });
  }

  // TODO: 토큰 재발급 로직 수정 필요
  /**
   * 토큰 재발급
   * @param dto - 토큰 재발급 요청 데이터
   * @returns 토큰 재발급 응답 데이터
   */
  async refreshTokens(dto: RefreshTokenRequestDto): Promise<RefreshTokenResponseDto> {
    try {
      const payload = this.verifyRefreshToken(dto.refreshToken);

      // 사용자가 실제로 존재하는지 확인
      const user = await this.prisma.user.findUnique({
        where: { id: payload.sub },
      });

      if (!user) {
        throw new UnauthorizedException('유효하지 않은 리프레시 토큰입니다.');
      }

      const newPayload: JwtPayload = {
        sub: user.id,
        email: user.email,
        role: user.role,
      };

      const accessToken = this.generateAccessToken(newPayload);
      const refreshToken = this.generateRefreshToken(newPayload);

      return new RefreshTokenResponseDto({
        accessToken,
        refreshToken,
      });
    } catch (_error) {
      throw new UnauthorizedException('유효하지 않은 리프레시 토큰입니다.');
    }
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
    return this.jwtService.verify(token, {
      secret: this.config.refreshTokenSecret,
    });
  }
}
