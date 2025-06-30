import { useCallback, useMemo, useState } from 'react';
import type { Row, RowSelectionState, Table, Updater } from '@tanstack/react-table';

/**
 * @docs https://tanstack.com/table/v8/docs/guide/row-selection#manage-row-selection-state
 */
export default function useRowSelectionChange<TData extends { id: string | number }>() {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({}); //manage your own row selection state
  const [selectedRows, setSelectedRows] = useState<Row<TData>[]>([]);

  const isSelected = useMemo(() => selectedRows.length > 0, [selectedRows.length]);
  const selectedRowIdList = useMemo(
    () => selectedRows.map((row) => row.original.id),
    [selectedRows]
  );

  const resetRowSelection = useCallback(() => {
    setRowSelection({});
    setSelectedRows([]);
  }, []);

  const onRowSelectionChange = useCallback(
    <T extends TData>({
      table,
      updater,
    }: {
      table: Table<T>;
      updater: Updater<RowSelectionState>;
    }) => {
      // 현재 페이지의 모든 행
      const currentPageRows = table.getRowModel().rows as unknown as Row<TData>[];

      // 이전 페이지와 현재 페이지에서 선택된 행들 (Record<id, boolean>)
      const rowSelectionState = typeof updater === 'function' ? updater(rowSelection) : updater;

      setSelectedRows((prevSelectedRows) => {
        const selectedRowIds = Object.keys(rowSelectionState);

        return [
          // 현재 페이지에 없는 선택된 행들 유지
          ...prevSelectedRows.filter(
            (row) => !currentPageRows.some((currentRow) => currentRow.id === row.id)
          ),
          // 현재 페이지에서 선택된 행들
          ...currentPageRows.filter((row) => selectedRowIds.includes(row.id)),
        ];
      });

      setRowSelection(updater);
    },
    [rowSelection]
  );

  return {
    rowSelection,
    selectedRows,
    isSelected,
    selectedRowIdList,
    onRowSelectionChange,
    resetRowSelection,
  };
}
