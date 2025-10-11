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

export interface CursorPaginationRequestDto {
  cursor: string | undefined;
  pageSize: number;
}

export interface CursorPaginationResponseDto<TData> {
  content: TData[];
  pageSize: number;
  hasNextPage: boolean;
  nextCursor: string;
}
