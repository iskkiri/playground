import { flexRender, type Table } from '@tanstack/react-table';
import { cn } from '@repo/utils/cn';
import useGetColumnPinningStyles from './hooks/useGetColumnPinningStyles';
import { cva } from 'class-variance-authority';
import UnsortedIcon from '@/assets/icons/unsorted.svg';
import AscIcon from '@/assets/icons/asc.svg';
import DescIcon from '@/assets/icons/desc.svg';

const resizerVariant = cva(
  'absolute right-0 top-0 h-full w-4 cursor-col-resize touch-none select-none bg-gray-500 opacity-0',
  {
    variants: {
      isResizing: {
        true: 'bg-primary opacity-100',
      },
    },
  }
);

const DEFAULT_COLUMN_SIZE = 150;

interface AppTableProps<RowData> {
  table: Table<RowData>;
}

export default function AppTable<RowData>({ table }: AppTableProps<RowData>) {
  const { getColumnPinningStyles } = useGetColumnPinningStyles<RowData>({
    table,
  });

  return (
    <div className="h-600 overflow-auto whitespace-nowrap border border-gray-300 bg-gray-100">
      <table className="w-full border-separate border-spacing-0 bg-white [&_td:last-of-type]:border-r-0 [&_th:last-of-type]:border-r-0">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const headerSize = header.getSize();
                const width = headerSize !== DEFAULT_COLUMN_SIZE ? headerSize : undefined;
                const minWidth = headerSize !== DEFAULT_COLUMN_SIZE ? headerSize : undefined;

                const setHeaderCellProps = header.column.columnDef.meta?.setHeaderCellProps;
                const headerCellProps = setHeaderCellProps ? setHeaderCellProps() : {};

                return (
                  <th
                    {...headerCellProps}
                    key={header.id}
                    className={
                      'typography-p3-16b group sticky top-0 z-50 h-48 cursor-pointer border-b border-r border-b-[#c6c6c6] border-r-[#e0e0e0] bg-[#f4f4f4] p-12 align-middle text-[#6f6f6f]'
                    }
                    style={{
                      ...headerCellProps.style,
                      ...(width && { width }),
                      ...(minWidth && { minWidth }),
                      ...getColumnPinningStyles({
                        column: header.column,
                        isHeader: true,
                      }),
                    }}
                  >
                    <div className="flex items-center justify-between">
                      {flexRender(header.column.columnDef.header, header.getContext())}

                      {header.column.getCanSort() && (
                        <button
                          onClick={header.column.getToggleSortingHandler()}
                          className="flex h-24 w-24 items-center justify-center"
                        >
                          {(() => {
                            switch (header.column.getIsSorted()) {
                              case 'desc':
                                return <DescIcon width={20} height={20} />;
                              case 'asc':
                                return <AscIcon width={20} height={20} />;
                              default:
                                return <UnsortedIcon width={20} height={20} />;
                            }
                          })()}
                        </button>
                      )}

                      {header.column.getCanResize() && (
                        <div
                          onMouseDown={header.getResizeHandler()}
                          onTouchStart={header.getResizeHandler()}
                          className={cn(
                            'resizer opacity-0 group-hover:opacity-100',
                            resizerVariant({ isResizing: header.column.getIsResizing() })
                          )}
                        />
                      )}
                    </div>
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.map((row) => {
            const visibleCells = row.getVisibleCells();
            const setRowProps = table.options.meta?.setRowProps;
            const rowProps = setRowProps ? setRowProps(row) : {};

            return (
              <tr {...rowProps} key={row.id}>
                {visibleCells.map((cell) => {
                  const setAllCellProps = table.options.meta?.setAllCellProps;
                  const allCellProps = setAllCellProps ? setAllCellProps(cell.getContext()) : {};
                  const setCellProps = cell.column.columnDef.meta?.setCellProps;
                  const cellProps = setCellProps ? setCellProps(cell.getContext()) : {};
                  const cellContext = cell.getContext();

                  return (
                    <td
                      {...allCellProps}
                      {...cellProps}
                      key={cell.id}
                      className="p-x-12 typography-p4-14r h-44 border-b border-r border-b-[#e0e0e0] border-r-[#e0e0e0] bg-white p-10 align-middle text-[#161616]"
                      style={{
                        ...allCellProps.style,
                        ...cellProps.style,
                        ...getColumnPinningStyles({
                          column: cell.column,
                          isHeader: false,
                        }),
                      }}
                    >
                      {flexRender(cell.column.columnDef.cell, cellContext)}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
