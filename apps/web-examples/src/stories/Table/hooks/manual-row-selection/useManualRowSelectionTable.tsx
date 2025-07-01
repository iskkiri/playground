import { useMemo } from 'react';
import {
  createColumnHelper,
  type ColumnDef,
  type OnChangeFn,
  type RowSelectionState,
} from '@tanstack/react-table';
import useTable from '../../../../_hooks/useTable';
import CheckBox from '@repo/ui-tailwind/CheckBox/CheckBox';
import { formatDateTime } from '@repo/utils/formatDate';
import type { MockUser } from '@/_features/user/api/dtos/getUser.dto';

interface useManualRowSelectionTableParams {
  userList: MockUser[];
  rowSelection: RowSelectionState;
  onRowSelectionChange: OnChangeFn<RowSelectionState>;
}

// 설명을 위해 분리한 hook으로 실제로는 분리해서 사용하지 않음
export default function useManualRowSelectionTable({
  userList,
  rowSelection,
  onRowSelectionChange,
}: useManualRowSelectionTableParams) {
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
    state: {
      rowSelection,
    },
    onRowSelectionChange,
  });

  return { table };
}
