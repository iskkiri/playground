export interface PaginationRequestDto {
  page: number;
  pageSize: number;
}

export interface PaginationResponseDto<TData> {
  content: TData[];
  currentPage: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  searchElements: number;
  hasNext: boolean;
  hasPrevious: boolean;
}
