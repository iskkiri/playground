import type { LoginResponseDto } from '@/auth/dtos/login.dto';
import type { SocialProvider } from 'generated/prisma';

export interface ProcessOAuthCallbackParams {
  socialId: string;
  provider: SocialProvider;
  origin: string;
}

export interface GenerateOAuthResponseHtmlParams {
  origin: string;
  tokens?: LoginResponseDto;
  socialId?: string;
  provider?: SocialProvider;
}
