import { useMemo } from 'react';
import { createColumnHelper, type ColumnDef } from '@tanstack/react-table';
import CheckBox from '@repo/ui-tailwind/CheckBox/CheckBox';
import useTable from '../useTable';
import { Controller, type UseFormReturn } from 'react-hook-form';
import type { MockUser } from '@/_features/user/api/dtos/getUser.dto';
import type { UserUpdateSchema } from '@/_features/user/schema/userUpdate.schema';
import { formatDateTime } from '@repo/utils/formatDate';

interface UseUserTableParams {
  userList: MockUser[];
  isEditMode: boolean;
  control: UseFormReturn<UserUpdateSchema>['control'];
}

// 설명을 위해 분리한 hook으로 실제로는 분리해서 사용하지 않음
export default function useEitableUserTable({ userList, isEditMode, control }: UseUserTableParams) {
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
          cell: (cellContexnt) => {
            if (!isEditMode || !control) return cellContexnt.getValue();

            return (
              <Controller
                control={control}
                name={`userFields.${cellContexnt.row.index}.name`}
                render={({ field: { onChange, value, onBlur, ...fieldProps } }) => {
                  const blurHandler = (e: React.FocusEvent<HTMLInputElement, Element>) => {
                    onChange(e);
                    onBlur();
                  };

                  return (
                    <input
                      //
                      {...fieldProps}
                      defaultValue={value}
                      onBlur={blurHandler}
                      style={{
                        height: '40px',
                        width: '100%',
                        border: '1px solid #ccc',
                        padding: '0 8px',
                      }}
                    />
                  );
                }}
              />
            );
          },
        }),
        columnHelper.accessor('phone', {
          header: '연락처',
          cell: (cellContexnt) => {
            if (!isEditMode || !control) return cellContexnt.getValue();

            return (
              <Controller
                control={control}
                name={`userFields.${cellContexnt.row.index}.phone`}
                render={({ field: { onChange, value, onBlur, ...fieldProps } }) => {
                  const blurHandler = (e: React.FocusEvent<HTMLInputElement, Element>) => {
                    onChange(e);
                    onBlur();
                  };

                  return (
                    <input
                      //
                      {...fieldProps}
                      defaultValue={value}
                      onBlur={blurHandler}
                      style={{
                        height: '40px',
                        width: '100%',
                        border: '1px solid #ccc',
                        padding: '0 8px',
                      }}
                    />
                  );
                }}
              />
            );
          },
        }),
        columnHelper.accessor('email', {
          header: '이메일',
          cell: (cellContexnt) => {
            if (!isEditMode || !control) return cellContexnt.getValue();

            return (
              <Controller
                control={control}
                name={`userFields.${cellContexnt.row.index}.email`}
                render={({ field: { onChange, value, onBlur, ...fieldProps } }) => {
                  const blurHandler = (e: React.FocusEvent<HTMLInputElement, Element>) => {
                    onChange(e);
                    onBlur();
                  };

                  return (
                    <input
                      //
                      {...fieldProps}
                      defaultValue={value}
                      onBlur={blurHandler}
                      style={{
                        height: '40px',
                        width: '100%',
                        border: '1px solid #ccc',
                        padding: '0 8px',
                      }}
                    />
                  );
                }}
              />
            );
          },
        }),
        columnHelper.accessor('createdAt', {
          header: '가입날짜',
          cell: (cellContexnt) => formatDateTime(cellContexnt.getValue()),
        }),
      ] as ColumnDef<MockUser>[],
    [columnHelper, control, isEditMode]
  );

  const { table } = useTable({ data, columns });

  return { table };
}
