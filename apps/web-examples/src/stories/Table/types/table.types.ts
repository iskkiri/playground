import type { CellContext, Row, RowData } from '@tanstack/react-table';
import type React from 'react';

declare module '@tanstack/react-table' {
  interface ColumnMeta<TData, TValue> {
    // sortingFn?: () => void;
    setHeaderCellProps?: () => TableHeaderCellProps;
    // Table Cell에 설정할 props를 설정합니다.
    setCellProps?: (context: CellContext<TData, TValue>) => TableCellProps;
  }

  interface TableMeta<TData extends RowData> {
    // Table Row에 설정할 props를 설정합니다.
    setRowProps?: (rowData: Row<TData>) => TableRowProps;
    // Table Cell에 설정할 props를 설정합니다.
    // 특정 테이블(Column Pinning 테이블)의 경우에만 cell의 배경색을 설정하는 등...
    setAllCellProps?: (context: CellContext<TData, unknown>) => TableCellProps;
  }
}

interface TableHeaderCellProps {
  // 예를 들어, 특정 header cell의 배경 색상을 변경하고 싶을 경우에는 style을 설정할 수도 있습니다.
  // inline style을 설정하는 이유는 기존 테이블 스타일을 오버라이딩 하기 위함입니다. (css priority)
  style?: React.CSSProperties;
}

// Table Row 에 설정할 props의 타입을 설정합니다.
interface TableRowProps {
  // 예를 들어, row를 클릭 시 이벤트를 발생시키고 싶을 경우에는 onClick을 설정합니다.
  onClick?: (e: React.MouseEvent<HTMLTableRowElement>) => void;
  // 예를 들어, 특정 row의 배경 색상을 변경하고 싶을 경우에는 style을 설정할 수도 있습니다.
  // inline style을 설정하는 이유는 기존 테이블 스타일을 오버라이딩 하기 위함입니다. (css priority)
  style?: React.CSSProperties;
}

// Table Cell 에 설정할 props의 타입을 설정합니다.
interface TableCellProps {
  // 예를 들어, cell을 클릭 시 이벤트를 발생시키고 싶을 경우에는 onClick을 설정합니다.
  onClick?: (e: React.MouseEvent<HTMLTableCellElement>) => void;
  // 예를 들어, 특정 cell의 배경 색상을 변경하고 싶을 경우에는 style을 설정할 수도 있습니다.
  // inline style을 설정하는 이유는 기존 테이블 스타일을 오버라이딩 하기 위함입니다. (css priority)
  style?: React.CSSProperties;
}
