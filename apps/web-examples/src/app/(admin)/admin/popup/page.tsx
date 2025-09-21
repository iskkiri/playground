'use client';

import { Controller } from 'react-hook-form';
import { pageSizeOptions } from '@/_data/pageSizeOptions';
import { popupSearchOptions } from '../../_features/popup/data/popup.data';
import Link from 'next/link';
import usePaginationQuery from '@/_hooks/usePaginationQuery';
import useAdminShowFilter from '../../_hooks/useAdminShowFilter';
import useAdminSearch from '../../_hooks/useAdminSearch';
import useResetSearchFilter from '@/_hooks/useResetSearchFilter';
import {
  useDeletePopupsMutation,
  useGetPopupList,
} from '../../_features/popup/hooks/react-query/useAdminPopup';
import { useCallback, useMemo } from 'react';
import usePopupTable from '../../_features/popup/hooks/usePopupTable';
import type { PopupListItemData } from '../../_features/popup/api/dtos/getPopupList.dto';
import PaginationWithPageSize from '../../_components/PaginationWithPageSize';
import useRowSelectionChange from '@/_hooks/useRowSelectionChange';
import RadioTab from '@/_components/RadioTab';
import Select from '@repo/ui/form/Select/Select';
import TextInput from '@repo/ui/form/TextInput/TextInput';
import FeatherIcons from '@repo/icons/featherIcons';
import Button from '@repo/ui/general/Button/Button';
import AppTable from '@/_components/Table';
import Modal from '@repo/ui/overlay/Modal/Modal';
import ConfirmModal from '@repo/ui/feedback/ConfirmModal/ConfirmModal';

export default function AdminPopupListPage() {
  // 페이지네이션
  const { page, pageSize, onChangePage, onChangePageSize } = usePaginationQuery();

  // 노출 상태 필터
  const { showStatus, onChangeIsShow } = useAdminShowFilter();
  // 검색
  const { searchType, keyword, control, register, onSubmit } = useAdminSearch({
    initialSearchType: 'title',
  });

  // 필터 초기화
  const { onReset } = useResetSearchFilter();

  // 팝업 목록 조회
  const { data: popupListResponse } = useGetPopupList({
    page,
    pageSize,
    isShow: showStatus === null ? undefined : showStatus,
    searchType,
    keyword,
  });
  const popupList = useMemo(() => popupListResponse?.content ?? [], [popupListResponse]);

  // 테이블 행 선택
  const { rowSelection, isSelected, selectedRowIdList, onRowSelectionChange, resetRowSelection } =
    useRowSelectionChange<PopupListItemData>();

  // 팝업 테이블
  const { table } = usePopupTable({
    popupList,
    rowSelection,
    onRowSelectionChange: (updater) => onRowSelectionChange({ table, updater }),
  });

  // 팝업 삭제
  const { mutate: deletePopups } = useDeletePopupsMutation();
  const onDeletePopups = useCallback(() => {
    const ids = selectedRowIdList.map((rowId) => rowId.toString());

    deletePopups(ids, {
      onSuccess: () => {
        resetRowSelection();
      },
    });
  }, [deletePopups, resetRowSelection, selectedRowIdList]);

  return (
    <div className="flex flex-col gap-32 px-20 py-40">
      <h1 className="typography-h4-36b">팝업 관리</h1>

      {/* 필터 & 검색 */}
      <div className="border border-gray-200">
        <div className="grid grid-cols-[200px_auto] items-center border-b border-gray-200">
          <div className="flex items-center self-stretch bg-gray-100 p-16">노출 상태</div>

          <div className="flex gap-8 p-16">
            <RadioTab name="isShow" onChange={onChangeIsShow(null)} checked={showStatus === null}>
              전체
            </RadioTab>
            <RadioTab name="isShow" onChange={onChangeIsShow(true)} checked={showStatus === true}>
              노출
            </RadioTab>
            <RadioTab name="isShow" onChange={onChangeIsShow(false)} checked={showStatus === false}>
              숨김
            </RadioTab>
          </div>
        </div>

        <div className="grid grid-cols-[200px_auto] items-center border-b border-gray-200">
          <div className="flex items-center self-stretch bg-gray-100 p-16">검색</div>

          <form onSubmit={onSubmit} className="flex gap-8 p-16">
            <Controller
              control={control}
              name="searchType"
              render={({ field: { onChange, value } }) => (
                <Select
                  //
                  options={popupSearchOptions}
                  onChange={(option) => onChange(option?.value)}
                  value={
                    popupSearchOptions.find((option) => option.value === value) ??
                    popupSearchOptions[0]
                  }
                  className="w-160"
                />
              )}
            />

            <TextInput
              {...register('keyword')}
              type="search"
              suffix={
                <button>
                  <FeatherIcons.Search size={20} color={'#ddd'} />
                </button>
              }
              classNames={{ wrapper: 'w-400' }}
            />
          </form>
        </div>
      </div>

      <button onClick={onReset} className="flex w-fit items-center gap-8 text-gray-500">
        <FeatherIcons.RotateCcw size={20} />
        <span>초기화</span>
      </button>

      <div className="flex flex-col gap-16">
        <div className="flex items-end justify-between">
          <div className="flex gap-8">
            <span role="status" aria-label="전체 개수">
              총 {popupListResponse?.totalElements?.toLocaleString() ?? 0}개
            </span>
            <span>|</span>
            <span role="status" aria-label="검색 개수">
              검색 {popupListResponse?.searchElements?.toLocaleString()}개
            </span>
          </div>

          <div className="flex gap-16">
            <Modal>
              <Modal.Trigger asChild>
                <Button variant="danger" onClick={onDeletePopups} disabled={!isSelected}>
                  선택 삭제
                </Button>
              </Modal.Trigger>

              <ConfirmModal
                title="삭제"
                content="선택된 팝업을 삭제하시겠습니까?"
                confirmButtonText="삭제"
                confirmButtonType="danger"
                onConfirm={onDeletePopups}
              />
            </Modal>

            <Link href={'/admin/popup/change-order'}>
              <Button variant="linePrimary">노출 및 순서 변경</Button>
            </Link>

            <Link href={'/admin/popup/create'}>
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
        totalPages={popupListResponse?.totalPages ?? 0}
        page={page}
        onChangePageSize={onChangePageSize}
        onChangePage={onChangePage}
      />
    </div>
  );
}
