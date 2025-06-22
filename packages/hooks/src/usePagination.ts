import { useCallback, useState } from 'react';

// 쿼리를 사용하지 않는 페이지네이션
// ex) 모달 내의 페이지네이션
export default function usePagination() {
  // 현재 페이지
  const [page, setPage] = useState(1);
  // 페이지 사이즈
  const [pageSize, setPageSize] = useState(10);

  // 페이지 변경 (react-paginate 사용)
  const onChangePage = useCallback(
    ({ selected }: { selected: number }) => setPage(selected + 1),
    []
  );

  // 페이지 변경 (fixed range 사용)
  const onChangePageWithFixedRange = useCallback(
    (page: number) => () => setPage(page),
    []
  );

  // 페이지 사이즈 변경
  const onChangePageSize = useCallback((pageSize: number) => {
    setPage(1);
    setPageSize(pageSize);
  }, []);

  // 이전 페이지
  const onPreviousPage = useCallback(() => {
    setPage(page - 1);
  }, [page]);

  // 다음 페이지
  const onNextPage = useCallback(() => {
    setPage(page + 1);
  }, [page]);

  return {
    page,
    pageSize,
    onChangePage,
    onChangePageWithFixedRange,
    onChangePageSize,
    onPreviousPage,
    onNextPage,
  };
}
