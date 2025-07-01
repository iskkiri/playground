import type { PaginationRequestDto } from '@/_api/dtos/pagination.dto';

export interface MockGetBannerListRequestDto extends PaginationRequestDto {
  isShow?: boolean;
  searchType?: string;
  keyword?: string;
}

export interface MockBannerListItemData {
  id: number;
  title: string;
  isShow: boolean;
  order: number | null;
  createdAt: string;
}

export interface MockCreateBannerRequestDto {
  title: string;
  mobileImage: string;
  mobileLink: string | null;
  pcImage: string;
  pcLink: string | null;
}

export interface MockUpdateBannerRequestDto extends MockCreateBannerRequestDto {
  id: number;
}
