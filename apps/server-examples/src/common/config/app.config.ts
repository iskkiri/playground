import { ConfigModuleOptions, ConfigType, registerAs } from '@nestjs/config';
import { z } from 'zod';

export const appConfig = registerAs('app', () => ({
  port: process.env.PORT!,

  // 데이터베이스
  databaseUrl: process.env.DATABASE_URL!,

  // 토큰
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET!,
  accessTokenExpiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN!,
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET!,
  refreshTokenExpiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN!,

  // 카카오 로그인
  kakaoClientId: process.env.KAKAO_CLIENT_ID!,
  kakaoClientSecret: process.env.KAKAO_CLIENT_SECRET!,

  // 네이버 로그인
  naverClientId: process.env.NAVER_CLIENT_ID!,
  naverClientSecret: process.env.NAVER_CLIENT_SECRET!,

  // 구글 로그인
  googleClientId: process.env.GOOGLE_CLIENT_ID!,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET!,

  // OAuth 응답 허용 Origin 목록
  allowedOrigins: process.env.ALLOWED_ORIGINS!.split(','),

  // 파이어베이스 서비스 계정 키
  googleApplicationCredentials: process.env.GOOGLE_APPLICATION_CREDENTIALS!,

  // 애플 로그인
  appleClientId: process.env.APPLE_CLIENT_ID!,

  // 페이코 로그인
  paycoClientId: process.env.PAYCO_CLIENT_ID!,
  paycoClientSecret: process.env.PAYCO_CLIENT_SECRET!,

  // 포트원
  portoneSecretKey: process.env.PORTONE_SECRET_KEY!,
}));
export type AppConfig = ConfigType<typeof appConfig>;

export const configModuleOptions = {
  isGlobal: true,
  envFilePath: process.env.NODE_ENV === 'development' ? '.env.development' : '.env.production',
  validate: z.object({
    PORT: z.coerce.number(),

    // 데이터베이스
    DATABASE_URL: z.string().min(1),

    // 토큰
    ACCESS_TOKEN_SECRET: z.string().min(1),
    ACCESS_TOKEN_EXPIRES_IN: z.string().min(1),
    REFRESH_TOKEN_SECRET: z.string().min(1),
    REFRESH_TOKEN_EXPIRES_IN: z.string().min(1),

    // 카카오 로그인
    KAKAO_CLIENT_ID: z.string().min(1),
    KAKAO_CLIENT_SECRET: z.string().min(1),

    // 네이버 로그인
    NAVER_CLIENT_ID: z.string().min(1),
    NAVER_CLIENT_SECRET: z.string().min(1),

    // 구글 로그인
    GOOGLE_CLIENT_ID: z.string().min(1),
    GOOGLE_CLIENT_SECRET: z.string().min(1),

    // OAuth 응답 허용 Origin 목록
    ALLOWED_ORIGINS: z
      .string()
      .transform((str) => JSON.parse(str))
      .pipe(z.array(z.string().url()).min(1)),

    // 파이어베이스 서비스 계정 키
    GOOGLE_APPLICATION_CREDENTIALS: z.string().min(1),

    // 애플 로그인
    APPLE_CLIENT_ID: z.string().min(1),

    // 페이코 로그인
    PAYCO_CLIENT_ID: z.string().min(1),
    PAYCO_CLIENT_SECRET: z.string().min(1),

    // 포트원
    PORTONE_SECRET_KEY: z.string().min(1),
  }).parse,
  load: [appConfig],
} satisfies ConfigModuleOptions;
