import { useCallback } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logoutApi } from '../_api/auth.api';
import authStorage from '@/app/(client)/refresh-token-rotation/_storages/authStorage';
import { getMeQueryOptions } from './useGetMe';
import useOnErrorAlert from '@/_hooks/useOnErrorAlert';

export function useLogoutClient() {
  const queryClient = useQueryClient();

  const logoutClient = useCallback(() => {
    authStorage.clear();

    // 로그아웃 시 유저 정보 초기화
    // inactive 쿼리 정리는 useClearInactiveQueries 훅에서 처리
    queryClient.setQueryData(getMeQueryOptions.queryKey, null);
  }, [queryClient]);

  return { logoutClient };
}

export function useLogout() {
  const { onError } = useOnErrorAlert();
  const { logoutClient } = useLogoutClient();

  return useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      logoutClient();
    },
    onError,
  });
}
