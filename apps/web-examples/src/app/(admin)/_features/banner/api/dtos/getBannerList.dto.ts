import type { PaginationRequestDto } from '@/_api/dtos/pagination.dto';

export interface GetBannerListRequestDto extends PaginationRequestDto {
  isShow?: boolean;
  searchType?: string;
  keyword?: string;
}

export interface BannerListItemData {
  id: string;
  title: string;
  isShow: boolean;
  order: number | null;
  createdAt: string;
}
