import { useMutation } from '@tanstack/react-query';
import { refreshTokensApi } from '../_api/auth.api';

export default function useRefreshTokens() {
  return useMutation({
    mutationFn: refreshTokensApi,
  });
}
