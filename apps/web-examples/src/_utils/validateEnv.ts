import { z } from 'zod';
import { envSchema } from '../_schemas/env.schema';

export function validateEnv() {
  try {
    envSchema.parse(process.env);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const missingEnvs = error.errors.map((err) => err.path);
      throw new Error(`다음 환경변수가 설정되지 않았습니다: ${missingEnvs.join(', ')}`);
    }
  }
}
