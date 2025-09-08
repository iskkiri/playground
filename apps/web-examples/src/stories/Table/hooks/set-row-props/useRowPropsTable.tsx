import { useMemo } from 'react';
import { createColumnHelper, type ColumnDef } from '@tanstack/react-table';
import useTable from '../../../../_hooks/useTable';
import CheckBox from '@repo/ui/form/CheckBox/CheckBox';
import { formatDateTime } from '@repo/utils/formatDate';
import type { MockUser } from '@/_features/user/api/dtos/getUser.dto';

interface UseRowPropsTableParams {
  userList: MockUser[];
}

// 설명을 위해 분리한 hook으로 실제로는 분리해서 사용하지 않음
export default function useRowPropsTable({ userList }: UseRowPropsTableParams) {
  const data = useMemo(() => userList, [userList]);
  const columnHelper = createColumnHelper<MockUser>();
  const columns = useMemo(
    () =>
      [
        columnHelper.display({
          id: 'select',
          size: 60,
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
        columnHelper.accessor('name', {
          header: '이름',
        }),
        columnHelper.accessor('phone', {
          header: '연락처',
        }),
        columnHelper.accessor('email', {
          header: '이메일',
        }),
        columnHelper.accessor('createdAt', {
          header: '가입날짜',
          cell: (cellContexnt) => formatDateTime(cellContexnt.getValue()),
        }),
      ] as ColumnDef<MockUser>[],
    [columnHelper]
  );

  const { table } = useTable({
    data,
    columns,
    meta: {
      /**
       * @docs https://tanstack.com/table/latest/docs/api/core/table#meta
       */
      setRowProps: (row) => ({
        style: {
          cursor: 'pointer',
          background: +row.index % 2 === 1 ? 'skyblue' : 'white',
        },
        onClick: () => alert(`Row 클릭. RowId: ${row.id}`),
      }),
    },
  });

  return { table };
}
