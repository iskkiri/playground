import type { PaginationRequestDto } from '@/_api/dtos/pagination.dto';

export interface GetPopupListRequestDto extends PaginationRequestDto {
  isShow?: boolean;
  searchType?: string;
  keyword?: string;
}

export interface PopupListItemData {
  id: string;
  title: string;
  displayType: 'ALL' | 'PC_ONLY' | 'MOBILE_ONLY' | 'CUSTOM';
  startDate: string | null;
  endDate: string | null;
  isShow: boolean;
  order: number | null;
  createdAt: string;
}
