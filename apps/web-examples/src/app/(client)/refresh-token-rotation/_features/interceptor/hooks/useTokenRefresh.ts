import { useRef, useCallback } from 'react';
import { isAxiosError, type AxiosError } from 'axios';
import type { RefreshTokensResponseDto } from '../../../_api/dtos/refreshTokens.dto';
import authStorage from '../../../_storages/authStorage';

interface UseTokenRefreshParams {
  refreshTokensAsync: (refreshToken: string) => Promise<RefreshTokensResponseDto>;
  processQueue: (error?: AxiosError) => void;
}
/**
 * 토큰 갱신 로직을 담당하는 훅
 *
 * 주요 기능:
 * - 동시성 제어: 여러 요청이 동시에 토큰 갱신을 시도해도 한 번만 실행
 * - Promise 재사용: 갱신이 진행 중이면 동일한 Promise를 재사용
 * - 토큰 저장: 갱신된 토큰을 자동으로 storage에 저장
 *
 * RTR (Refresh Token Rotation):
 * - 토큰 갱신 시마다 새로운 리프레시 토큰 발급
 * - 서버에서 row-level lock으로 동시성 문제 해결
 */
export const useTokenRefresh = ({ refreshTokensAsync, processQueue }: UseTokenRefreshParams) => {
  // 토큰 갱신 동시성 제어를 위한 ref
  const refreshPromiseRef = useRef<Promise<RefreshTokensResponseDto> | null>(null);

  // 토큰 갱신 시작 (동시성 제어 포함)
  const reIssueTokens = useCallback(
    async (refreshToken: string) => {
      // 이미 갱신 중이면 실행하지 않음
      if (refreshPromiseRef.current) {
        return;
      }

      // 새로운 갱신 요청 시작
      refreshPromiseRef.current = refreshTokensAsync(refreshToken);

      try {
        const result = await refreshPromiseRef.current;

        // 스토리지에 새 토큰 저장
        authStorage.setAccessToken(result.accessToken);
        authStorage.setRefreshToken(result.refreshToken);

        // 대기 중인 모든 요청 재시도
        processQueue();
      } catch (refreshError) {
        if (isAxiosError(refreshError)) {
          // 토큰 갱신 실패 시 대기 중인 모든 요청에 에러 전파
          processQueue(refreshError);
        }
      } finally {
        // 완료되면 Promise 초기화
        refreshPromiseRef.current = null;
      }
    },
    [refreshTokensAsync, processQueue]
  );

  return { reIssueTokens };
};
