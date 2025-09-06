import { useMemo } from 'react';
import Link from 'next/link';
import { createColumnHelper, type OnChangeFn, type RowSelectionState } from '@tanstack/react-table';
import FeatherIcons from '@repo/icons/featherIcons';
import useTable from '@/_hooks/useTable';
import CheckBox from '@repo/ui/CheckBox/CheckBox';
import { formatDateTime } from '@repo/utils/formatDate';
import type { BannerListItemData } from '../api/dtos/getBannerList.dto';

interface UseBannerTableParams {
  bannerList: BannerListItemData[];
  rowSelection: RowSelectionState;
  onRowSelectionChange: OnChangeFn<RowSelectionState>;
}

export default function useBannerTable({
  bannerList,
  rowSelection,
  onRowSelectionChange,
}: UseBannerTableParams) {
  const data = useMemo(() => bannerList, [bannerList]);
  const columnHelper = createColumnHelper<BannerListItemData>();
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
        header: '배너명',
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
          <Link href={`/admin/banner/${row.original.id}/edit`} className="flex">
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
