import { useCallback } from 'react';

import type { Column, Table } from '@tanstack/react-table';

interface UseGetColumnPinningStylesParams<RowData> {
  table: Table<RowData>;
}

/**
 * @docs https://tanstack.com/table/v8/docs/framework/react/examples/column-pinning-sticky
 */
export default function useGetColumnPinningStyles<RowData>({
  table,
}: UseGetColumnPinningStylesParams<RowData>) {
  const getColumnPinningStyles = useCallback(
    ({ column, isHeader }: { column: Column<RowData>; isHeader: boolean }): React.CSSProperties => {
      const isPinned = column.getIsPinned();
      // 다음(우측) 컬럼이 고정되어 있는지 확인
      const nextColumn = table
        .getAllColumns()
        .find((col) => col.getIndex() === column.getIndex() + 1);
      const isNextColumnRightPinned = nextColumn?.getIsPinned() === 'right';

      // 기본 z-index: 헤더는 1, 셀은 0
      // 고정된 경우: 각각 +1
      const baseZIndex = isHeader ? 1 : 0;
      const zIndex = isPinned ? baseZIndex + 1 : baseZIndex;

      return {
        position: isPinned ? 'sticky' : undefined,
        left: isPinned === 'left' ? `${column.getStart('left')}px` : undefined,
        borderRight: isPinned === 'left' ? '1px solid #e0e0e0' : undefined,
        right: isPinned === 'right' ? `${column.getAfter('right')}px` : undefined,
        borderLeft: isPinned === 'right' ? '1px solid #e0e0e0' : undefined,
        zIndex,
        ...(isNextColumnRightPinned && { borderRight: 'none' }),
      };
    },
    [table]
  );

  return { getColumnPinningStyles };
}
