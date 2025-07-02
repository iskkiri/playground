import { useGetInfiniteUsers } from '@/_features/user/hooks/react-query/useGetUsers';
import { useIsMswInitialized } from '@/_hooks/useMsw';
import { useEffect, useMemo } from 'react';
import { useInView } from 'react-intersection-observer';

export default function useInfnitieScroll() {
  const { isMswInitialized } = useIsMswInitialized();
  // 무한 스크롤 observer
  const [observerRef, isInView] = useInView();

  const { data, fetchNextPage, isFetchingNextPage, hasNextPage } = useGetInfiniteUsers({
    pageSize: 12,
    enabled: isMswInitialized,
  });
  const flatList = useMemo(() => {
    if (!data) return [];

    return data.pages.flatMap((page) => page.data);
  }, [data]);

  // 무한 스크롤 처리
  useEffect(() => {
    if (!isInView || !hasNextPage) return;

    fetchNextPage();
  }, [fetchNextPage, hasNextPage, isInView]);

  return {
    observerRef,
    flatList,
    isFetchingNextPage,
    hasNextPage,
  };
}
