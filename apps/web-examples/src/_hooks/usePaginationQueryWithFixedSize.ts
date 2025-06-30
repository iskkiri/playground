import { useCallback, useMemo } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import useParsedQuery from './useParsedQuery';
import queryString from 'query-string';

// 쿼리를 사용하는 페이지네이션
// ex) https://example.com/posts?page=1&pageSize=10
export default function usePaginationQueryWithFixedSize() {
  const router = useRouter();
  const parsedQuery = useParsedQuery();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // 현재 페이지
  const page = useMemo(() => {
    const pageParam = searchParams.get('page');
    return pageParam ? Number(pageParam) : 1;
  }, [searchParams]);

  // 페이지 사이즈
  const pageSize = useMemo(() => {
    const pageSizeParam = searchParams.get('pageSize');
    return pageSizeParam ? Number(pageSizeParam) : 10;
  }, [searchParams]);

  // 페이지 변경
  const onChangePage = useCallback(
    (page: number) => () => {
      const query = queryString.stringify({
        ...parsedQuery,
        page,
      });

      router.push(`${pathname}?${query}`);
    },
    [parsedQuery, pathname, router]
  );

  // 페이지 사이즈 변경
  const onChangePageSize = useCallback(
    (pageSize: number) => {
      const query = queryString.stringify({
        ...parsedQuery,
        page: 1,
        pageSize,
      });

      router.push(`${pathname}?${query}`);
    },
    [parsedQuery, pathname, router]
  );

  // 이전 페이지
  const onPreviousPage = useCallback(() => {
    const query = queryString.stringify({
      ...parsedQuery,
      page: page - 1,
    });

    router.push(`${pathname}?${query}`);
  }, [page, parsedQuery, pathname, router]);

  // 다음 페이지
  const onNextPage = useCallback(() => {
    const query = queryString.stringify({
      ...parsedQuery,
      page: page + 1,
    });

    router.push(`${pathname}?${query}`);
  }, [page, parsedQuery, pathname, router]);

  return {
    page,
    pageSize,
    onChangePage,
    onChangePageSize,
    onPreviousPage,
    onNextPage,
  };
}
