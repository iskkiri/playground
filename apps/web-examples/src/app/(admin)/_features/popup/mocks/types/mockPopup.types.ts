import type { PaginationRequestDto } from '@/_api/dtos/pagination.dto';

export interface MockGetPopupListRequestDto extends PaginationRequestDto {
  isShow?: boolean;
  searchType?: string;
  keyword?: string;
}

export interface MockPopupListItemData {
  id: number;
  title: string;
  displayType: string;
  startDate: string;
  endDate: string;
}

export interface MockCreatePopupRequestDto {
  title: string;
  displayType: string;
  pcPosition: string;
  xCoordinate: number;
  yCoordinate: number;
  startDate: string | null;
  endDate: string | null;
  imageUrl: string;
  link: string | null;
  popupWidthStatus: string;
  imageWidth: number | null;
}

export interface MockUpdatePopupRequestDto extends MockCreatePopupRequestDto {
  id: number;
}
