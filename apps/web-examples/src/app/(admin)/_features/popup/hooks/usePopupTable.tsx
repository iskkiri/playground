import { useMemo } from 'react';
import Link from 'next/link';
import { createColumnHelper, type OnChangeFn, type RowSelectionState } from '@tanstack/react-table';
import FeatherIcons from '@repo/icons/featherIcons';
import useTable from '@/_hooks/useTable';
import CheckBox from '@repo/ui/form/CheckBox/CheckBox';
import { formatDate, formatDateTime } from '@repo/utils/formatDate';
import type { PopupListItemData } from '../api/dtos/getPopupList.dto';

interface UsePopupTableParams {
  popupList: PopupListItemData[];
  rowSelection: RowSelectionState;
  onRowSelectionChange: OnChangeFn<RowSelectionState>;
}

export default function usePopupTable({
  popupList,
  rowSelection,
  onRowSelectionChange,
}: UsePopupTableParams) {
  const data = useMemo(() => popupList, [popupList]);
  const columnHelper = createColumnHelper<PopupListItemData>();
  const columns = useMemo(
    () => [
      columnHelper.display({
        id: 'select',
        size: 50,
        header: ({ table }) => (
          <CheckBox
            checked={table.getIsAllPageRowsSelected()}
            onChange={table.getToggleAllPageRowsSelectedHandler()}
          />
        ),
        cell: ({ row }) => (
          <CheckBox
            checked={row.getIsSelected()}
            disabled={!row.getCanSelect()}
            onChange={row.getToggleSelectedHandler()}
          />
        ),
        enableSorting: false,
      }),
      columnHelper.accessor('title', {
        header: '팝업명',
      }),
      columnHelper.accessor('displayType', {
        header: '노출 유형',
        size: 100,
        cell: ({ row }) => (
          <div className="text-center">
            {(() => {
              switch (row.original.displayType) {
                case 'ALL':
                  return '전체';
                case 'PC_ONLY':
                  return 'PC 전용';
                case 'MOBILE_ONLY':
                  return '모바일 전용';
                case 'CUSTOM':
                  return '직접 설정';
              }
            })()}
          </div>
        ),
      }),
      columnHelper.accessor('startDate', {
        header: '시작일',
        size: 100,
        cell: ({ row }) => (
          <div className="text-center">
            {row.original.startDate ? formatDate(row.original.startDate) : '-'}
          </div>
        ),
      }),
      columnHelper.accessor('endDate', {
        header: '종료일',
        size: 100,
        cell: ({ row }) => (
          <div className="text-center">
            {row.original.endDate ? formatDate(row.original.endDate) : '-'}
          </div>
        ),
      }),
      columnHelper.accessor('isShow', {
        header: '노출 상태',
        size: 100,
        cell: ({ row }) => (
          <div className="text-center">{row.original.isShow ? '노출' : '미노출'}</div>
        ),
      }),
      columnHelper.accessor('order', {
        header: '순서',
        size: 100,
        cell: (cellContext) => <div className="text-center">{cellContext.getValue()}</div>,
      }),
      columnHelper.accessor('createdAt', {
        header: '작성일자',
        size: 200,
        cell: ({ row }) => formatDateTime(row.original.createdAt),
      }),
      columnHelper.display({
        id: 'management',
        header: '관리',
        size: 100,
        cell: ({ row }) => (
          <Link href={`/admin/popup/${row.original.id}/edit`} className="flex">
            <FeatherIcons.Edit size={20} color={'#ccc'} />
          </Link>
        ),
        meta: {
          setCellProps: () => ({
            style: {
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            },
          }),
        },
      }),
    ],
    [columnHelper]
  );

  return useTable({
    data,
    columns,
    initialState: {
      columnPinning: {
        left: ['select'],
        right: ['management'],
      },
    },
    state: {
      rowSelection,
    },
    onRowSelectionChange,
    meta: {
      setAllCellProps: (cellContext) => ({
        style: {
          backgroundColor: cellContext.row.getIsSelected() ? '#e8eefc' : '#fff',
        },
      }),
    },
  });
}
