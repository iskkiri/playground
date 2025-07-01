import {
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type TableOptions,
} from '@tanstack/react-table';

interface RowId {
  id: number | string;
}
type UseTableParams<RowData extends RowId> = Omit<TableOptions<RowData>, 'getCoreRowModel'>;

export default function useTable<RowData extends RowId>({
  data,
  columns,
  ...restProps
}: UseTableParams<RowData>) {
  const table = useReactTable<RowData>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getRowId: (row) => row.id + '',
    manualPagination: true,
    // manualSorting: true,
    manualFiltering: true,
    manualExpanding: true,
    manualGrouping: true,
    debugTable: false,
    enableColumnResizing: false,
    ...restProps,
  });

  return { table };
}
