import { z } from 'zod';

export const envSchema = z.object({
  // Environment
  NODE_ENV: z.enum(['development', 'production', 'test']),

  // API URL
  NEXT_PUBLIC_API_URL: z.string().url(),

  // Google Maps API Key
  NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: z.string(),

  // S3 Bucket
  AWS_REGION: z.string(),
  AWS_BUCKET_NAME: z.string(),
  AWS_ACCESS_KEY_ID: z.string(),
  AWS_SECRET_ACCESS_KEY: z.string(),

  // CloudFront URL
  CLOUDFRONT_URL: z.string().url(),
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

  // API URL
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
};
