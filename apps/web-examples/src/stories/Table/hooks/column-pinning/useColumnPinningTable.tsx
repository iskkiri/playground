import { useMemo } from 'react';
import { createColumnHelper, type ColumnDef } from '@tanstack/react-table';
import useTable from '../../../../_hooks/useTable';
import CheckBox from '@repo/ui/form/CheckBox/CheckBox';
import FeatherIcons from '@repo/icons/featherIcons';
import { formatDateTime } from '@repo/utils/formatDate';
import type { MockUser } from '@/_features/user/api/dtos/getUser.dto';

interface UseUserTableParams {
  userList: MockUser[];
}

// 설명을 위해 분리한 hook으로 실제로는 분리해서 사용하지 않음
export default function useColumnPinningTable({ userList }: UseUserTableParams) {
  const data = useMemo(() => userList, [userList]);
  const columnHelper = createColumnHelper<MockUser>();
  const columns = useMemo(
    () =>
      [
        columnHelper.display({
          id: 'select',
          size: 50,
          header: ({ table }) => (
            <CheckBox
              checked={table.getIsAllPageRowsSelected()}
              onCheckedChange={() => table.toggleAllPageRowsSelected()}
            />
          ),
          cell: ({ row }) => (
            <CheckBox
              checked={row.getIsSelected()}
              disabled={!row.getCanSelect()}
              onCheckedChange={() => row.toggleSelected()}
            />
          ),
          enableSorting: false,
          meta: {
            setHeaderCellProps: () => ({
              classNames: {
                headerCellContent: 'flex items-center justify-center',
              },
            }),
            setCellProps: () => ({
              style: {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              },
            }),
          },
        }),
        columnHelper.accessor('name', {
          header: '이름',
          size: 300,
        }),
        columnHelper.accessor('phone', {
          header: '연락처',
          size: 300,
        }),
        columnHelper.accessor('email', {
          header: '이메일',
          size: 300,
        }),
        columnHelper.accessor('createdAt', {
          header: '가입날짜',
          size: 300,
          cell: (cellContexnt) => formatDateTime(cellContexnt.getValue()),
        }),
        columnHelper.display({
          id: 'management',
          header: '관리',
          size: 100,
          cell: () => <FeatherIcons.Edit size={20} color="#999" />,
        }),
      ] as ColumnDef<MockUser>[],
    [columnHelper]
  );

  const { table } = useTable({
    data,
    columns,
    initialState: {
      columnPinning: {
        left: ['select', 'name'],
        right: ['management'],
      },
    },
    meta: {
      setAllCellProps: (cellContext) => ({
        style: {
          backgroundColor: cellContext.row.getIsSelected() ? '#e8eefc' : '#fff',
        },
      }),
    },
  });

  return { table };
}
