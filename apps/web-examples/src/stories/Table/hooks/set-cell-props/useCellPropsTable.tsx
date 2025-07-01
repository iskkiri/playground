import { useMemo } from 'react';
import { createColumnHelper, type ColumnDef } from '@tanstack/react-table';
import useTable from '../../../../_hooks/useTable';
import CheckBox from '@repo/ui-tailwind/CheckBox/CheckBox';
import { formatDateTime } from '@repo/utils/formatDate';
import type { MockUser } from '@/_features/user/api/dtos/getUser.dto';

interface UseCellPropsTableParams {
  userList: MockUser[];
}

// 설명을 위해 분리한 hook으로 실제로는 분리해서 사용하지 않음
export default function useCellPropsTable({ userList }: UseCellPropsTableParams) {
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
          meta: {
            setCellProps: (cellContext) => ({
              style: {
                cursor: 'pointer',
                background: 'orange',
              },
              onClick: () => alert(`Cell 클릭. 값: ${cellContext.cell.getValue()}`),
            }),
          },
        }),
        columnHelper.accessor('phone', {
          header: '연락처',
          meta: {
            setCellProps: (cellContext) => ({
              style: {
                cursor: 'pointer',
                background: 'lightyellow',
              },
              onClick: () => alert(`Cell 클릭. 값: ${cellContext.cell.getValue()}`),
            }),
          },
        }),
        columnHelper.accessor('email', {
          header: '이메일',
          meta: {
            setCellProps: (cellContext) => ({
              style: {
                cursor: 'pointer',
                background: 'lightgreen',
              },
              onClick: () => alert(`Cell 클릭. 값: ${cellContext.getValue()}`),
            }),
          },
        }),
        columnHelper.accessor('createdAt', {
          header: '가입날짜',
          cell: (cellContexnt) => formatDateTime(cellContexnt.getValue()),
          meta: {
            setCellProps: (cellContext) => ({
              style: {
                cursor: 'pointer',
                background: 'lightblue',
              },
              onClick: () => alert(`Cell 클릭. 값: ${cellContext.cell.getValue()}`),
            }),
          },
        }),
      ] as ColumnDef<MockUser>[],
    [columnHelper]
  );

  const { table } = useTable({ data, columns });

  return { table };
}
