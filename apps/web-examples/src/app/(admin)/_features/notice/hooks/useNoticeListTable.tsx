import { useMemo } from 'react';
import Link from 'next/link';
import { createColumnHelper } from '@tanstack/react-table';
import FeatherIcons from '@repo/icons/featherIcons';
import CheckBox from '@repo/ui-tailwind/CheckBox/CheckBox';
import { formatDateTime } from '@repo/utils/formatDate';
import type { NoticeListItemData } from '../api/dtos/getNoticeList.dto';
import useTable from '@/_hooks/useTable';

interface UseNoticeListTableParams {
  noticeList: NoticeListItemData[];
}

export default function useNoticeListTable({ noticeList }: UseNoticeListTableParams) {
  const data = useMemo(() => noticeList, [noticeList]);
  const columnHelper = createColumnHelper<NoticeListItemData>();
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
        header: '제목',
      }),
      columnHelper.accessor('createdAt', {
        header: '작성일자',
        size: 200,
        cell: ({ row }) => formatDateTime(row.original.createdAt),
      }),
      columnHelper.accessor('isShow', {
        header: '노출 상태',
        size: 100,
        cell: ({ row }) => (
          <div className="text-center">{row.original.isShow ? '노출' : '미노출'}</div>
        ),
      }),
      columnHelper.display({
        id: 'management',
        header: '관리',
        size: 100,
        cell: ({ row }) => (
          <Link href={`/admin/notice/${row.original.id}/edit`} className="flex">
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
    meta: {
      setRowProps: (row) => ({
        style: {
          backgroundColor: row.getIsSelected() ? '#e8eefc' : '#fff',
        },
      }),
    },
  });
}
