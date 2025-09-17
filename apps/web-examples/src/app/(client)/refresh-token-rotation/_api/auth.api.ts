import { client } from '@/app/(client)/refresh-token-rotation/_api/client';
import type { RefreshTokensResponseDto } from './dtos/refreshTokens.dto';

export async function refreshTokensApi(refreshToken: string) {
  const { data } = await client.post<RefreshTokensResponseDto>('/auth/refresh', {
    refreshToken,
  });
  return data;
}

export async function logoutApi(refreshToken: string) {
  const { data } = await client.post<{ success: boolean }>('/auth/logout', {
    refreshToken,
  });
  return data;
}
