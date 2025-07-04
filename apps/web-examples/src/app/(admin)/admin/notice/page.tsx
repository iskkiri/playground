'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import usePaginationQuery from '@/_hooks/usePaginationQuery';
import useResetSearchFilter from '@/_hooks/useResetSearchFilter';
import { pageSizeOptions } from '@/_data/pageSizeOptions';
import useAdminShowFilter from '../../_hooks/useAdminShowFilter';
import useAdminSearch from '../../_hooks/useAdminSearch';
import { useGetNoticeList } from '../../_features/notice/hooks/react-query/useNotice';
import useNoticeListTable from '../../_features/notice/hooks/useNoticeListTable';
import useDeleteNotices from '../../_features/notice/hooks/useDeleteNotices';
import NoticeSearchFilter from '../../_features/notice/components/NoticeSearchFilter';
import Button from '@repo/ui-tailwind/Button/Button';
import AppTable from '@/_components/Table';
import PaginationWithPageSize from '../../_components/PaginationWithPageSize';

export default function NoticeListPage() {
  // 페이지네이션
  const { page, pageSize, onChangePage, onChangePageSize } = usePaginationQuery();

  // 노출 상태 필터
  const { showStatus, onChangeIsShow } = useAdminShowFilter();
  // 검색
  const { searchType, keyword, control, register, dirtyFields, onClearField, onSubmit } =
    useAdminSearch({ initialSearchType: 'title' });

  // 필터 초기화
  const { onReset } = useResetSearchFilter();

  // 공지사항 목록 조회
  const { data: noticeListResponse } = useGetNoticeList({
    page,
    pageSize,
    isShow: showStatus ?? undefined,
    searchType,
    keyword,
  });
  const noticeList = useMemo(() => noticeListResponse?.content ?? [], [noticeListResponse]);

  // 공지사항 테이블
  const { table } = useNoticeListTable({ noticeList });
  // 테이블 행 선택 여부
  const isSelected = Object.keys(table.getState().rowSelection).length > 0;
  const selectedRowIdList = table.getSelectedRowModel().rows.map((row) => row.original.id);

  // 공지사항 삭제
  const { onDeleteNotices } = useDeleteNotices({ selectedRowIdList });

  return (
    <div className="flex flex-col gap-32 px-20 py-40">
      <h1 className="typography-h4-36b">공지사항</h1>

      {/* 필터 & 검색 */}
      <NoticeSearchFilter
        showStatus={showStatus}
        onChangeIsShow={onChangeIsShow}
        control={control}
        register={register}
        dirtyFields={dirtyFields}
        onSubmit={onSubmit}
        onReset={onReset}
        onClearField={onClearField}
      />

      <div className="flex flex-col gap-16">
        <div className="flex items-end justify-between">
          <div className="flex gap-8" aria-live="polite" aria-label="공지사항 목록 개수">
            <span role="status" aria-label="전체 개수">
              총 {noticeListResponse?.totalElements?.toLocaleString() ?? 0}개
            </span>
            <span>|</span>
            <span role="status" aria-label="검색 개수">
              검색 {noticeListResponse?.searchElements?.toLocaleString() ?? 0}개
            </span>
          </div>

          <div className="flex gap-16">
            <Button onClick={onDeleteNotices} disabled={!isSelected} variant="danger">
              선택 삭제
            </Button>

            <Link href={'/admin/notice/create'}>
              <Button variant="primary">추가하기</Button>
            </Link>
          </div>
        </div>

        <AppTable table={table} />
      </div>

      {/* 페이지네이션 */}
      <PaginationWithPageSize
        pageSizeOptions={pageSizeOptions}
        pageSize={pageSize}
        totalPages={noticeListResponse?.totalPages ?? 0}
        page={page}
        onChangePageSize={onChangePageSize}
        onChangePage={onChangePage}
      />
    </div>
  );
}
