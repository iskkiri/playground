import { z } from 'zod';

export const envSchema = z.object({
  // Environment
  NODE_ENV: z.enum(['development', 'production', 'test']),

  // Backend URL
  NEXT_PUBLIC_API_URL: z.string().url(),

  // Google Maps API Key
  NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: z.string().min(1),

  // S3 Bucket
  AWS_REGION: z.string(),
  AWS_BUCKET_NAME: z.string(),
  AWS_ACCESS_KEY_ID: z.string(),
  AWS_SECRET_ACCESS_KEY: z.string(),

  // CloudFront URL
  CLOUDFRONT_URL: z.string().url(),

  // Naver Login
  NEXT_PUBLIC_NAVER_CLIENT_ID: z.string().min(1),
  NAVER_CLIENT_SECRET: z.string().min(1),

  // Kakao Login
  NEXT_PUBLIC_KAKAO_CLIENT_ID: z.string().min(1),
  KAKAO_CLIENT_SECRET: z.string().min(1),

  // Google Login
  NEXT_PUBLIC_GOOGLE_CLIENT_ID: z.string().min(1),
  GOOGLE_CLIENT_SECRET: z.string().min(1),

  // Payco Login
  NEXT_PUBLIC_PAYCO_CLIENT_ID: z.string().min(1),
  PAYCO_CLIENT_SECRET: z.string().min(1),

  // PortOne
  PORTONE_SECRET_KEY: z.string().min(1),
  NEXT_PUBLIC_PORTONE_STORE_ID: z.string().min(1),
  NEXT_PUBLIC_PORTONE_CHANNEL_KEY: z.string().min(1),

  // MONGO DB
  MONGODB_URI: z.string().min(1),
});

export type EnvSchema = z.infer<typeof envSchema>;

/**
 * Non-null assertion operator (!)를 사용해도 무방한 이유
 * 'next.config.ts'에서 서버가 bootstrap되는 시점에 envSchema를 통해 환경변수가 입력되었는지
 * 검증하기 때문에 반드시 환경변수가 입력되어 있음을 보장할 수 있음
 */
export const appEnv: EnvSchema = {
  // Environment Variables
  NODE_ENV: process.env.NODE_ENV!,

  // Backend URL
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL!,

  // Google Maps API Key
  NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,

  // S3 Bucket
  AWS_REGION: process.env.AWS_REGION!,
  AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME!,
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID!,
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY!,

  // CloudFront URL
  CLOUDFRONT_URL: process.env.CLOUDFRONT_URL!,

  // Naver Login
  NEXT_PUBLIC_NAVER_CLIENT_ID: process.env.NEXT_PUBLIC_NAVER_CLIENT_ID!,
  NAVER_CLIENT_SECRET: process.env.NAVER_CLIENT_SECRET!,

  // Kakao Login
  NEXT_PUBLIC_KAKAO_CLIENT_ID: process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID!,
  KAKAO_CLIENT_SECRET: process.env.KAKAO_CLIENT_SECRET!,

  // Google Login
  NEXT_PUBLIC_GOOGLE_CLIENT_ID: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET!,

  // Payco Login
  NEXT_PUBLIC_PAYCO_CLIENT_ID: process.env.NEXT_PUBLIC_PAYCO_CLIENT_ID!,
  PAYCO_CLIENT_SECRET: process.env.PAYCO_CLIENT_SECRET!,

  // PortOne
  PORTONE_SECRET_KEY: process.env.PORTONE_SECRET_KEY!,
  NEXT_PUBLIC_PORTONE_STORE_ID: process.env.NEXT_PUBLIC_PORTONE_STORE_ID!,
  NEXT_PUBLIC_PORTONE_CHANNEL_KEY: process.env.NEXT_PUBLIC_PORTONE_CHANNEL_KEY!,

  // MONGO DB
  MONGODB_URI: process.env.MONGODB_URI!,
};
