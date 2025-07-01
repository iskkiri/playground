import type { PaginationRequestDto } from '@/_api/dtos/pagination.dto';

export interface GetNoticeListRequestDto extends PaginationRequestDto {
  isShow?: boolean;
  searchType?: string;
  keyword?: string;
}

export interface NoticeListItemData {
  id: number;
  title: string;
  createdAt: string;
  isShow: boolean;
}
