import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import useGetMe from '@/app/(client)/refresh-token-rotation/_hooks/useGetMe';

export function useClearInactiveQueries() {
  const queryClient = useQueryClient();
  const { data: userMe } = useGetMe();

  useEffect(() => {
    if (userMe) return;

    // userMe가 null이 되면 enabled: !!userMe인 쿼리들이 inactive 상태가 됨
    // 이때 inactive 쿼리들의 데이터를 null로 초기화
    queryClient.setQueriesData({ type: 'inactive' }, null);
  }, [userMe, queryClient]);
}
