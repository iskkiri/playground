import { useCallback } from 'react';
import { parseAsInteger, useQueryState } from 'nuqs';

// 쿼리를 사용하는 페이지네이션
// ex) https://example.com/posts?page=1&pageSize=10
export default function usePaginationQuery() {
  const [page, setPage] = useQueryState(
    'page',
    parseAsInteger.withDefault(1).withOptions({
      history: 'push',
    })
  );
  const [pageSize, setPageSize] = useQueryState(
    'pageSize',
    parseAsInteger.withDefault(10).withOptions({
      history: 'push',
    })
  );

  // 페이지 변경 (react-paginate 사용)
  const onChangePage = useCallback(
    ({ selected }: { selected: number }) => {
      setPage(selected + 1);
    },
    [setPage]
  );

  // 페이지 변경 (fixed range 사용)
  const onChangePageWithFixedRange = useCallback(
    (page: number) => () => {
      setPage(page);
    },
    [setPage]
  );

  // 페이지 사이즈 변경
  const onChangePageSize = useCallback(
    (pageSize: number) => {
      setPageSize(pageSize);
      setPage(1);
    },
    [setPageSize, setPage]
  );

  // 이전 페이지
  const onPreviousPage = useCallback(() => {
    setPage((prev) => (prev === 1 ? 1 : prev - 1));
  }, [setPage]);

  // 다음 페이지
  const onNextPage = useCallback(() => {
    setPage((prev) => prev + 1);
  }, [setPage]);

  return {
    page,
    pageSize,
    onChangePage,
    onChangePageSize,
    onChangePageWithFixedRange,
    onPreviousPage,
    onNextPage,
  };
}
