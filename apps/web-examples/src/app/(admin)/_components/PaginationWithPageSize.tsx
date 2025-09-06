import Pagination from '@repo/ui/Pagination/Pagination';
import Select from '@repo/ui/Select/Select';
import type { SelectOption } from '@repo/ui/Select/types/select.types';

interface PaginationWithPageSizeProps {
  pageSizeOptions: SelectOption<number>[];
  pageSize: number;
  totalPages: number;
  page: number;
  onChangePageSize: (pageSize: number) => void;
  onChangePage: ({ selected }: { selected: number }) => void;
}

export default function PaginationWithPageSize({
  pageSizeOptions,
  pageSize,
  totalPages,
  page,
  onChangePageSize,
  onChangePage,
}: PaginationWithPageSizeProps) {
  return (
    <div className="flex items-center justify-end gap-16">
      <Select
        options={pageSizeOptions}
        onChange={(option) => onChangePageSize(option?.value ?? 10)}
        value={pageSizeOptions.find((option) => option.value === pageSize)}
        aria-label="페이지 사이즈"
        className="w-160"
      />

      {totalPages && <Pagination page={page} pageCount={totalPages} onPageChange={onChangePage} />}
    </div>
  );
}
