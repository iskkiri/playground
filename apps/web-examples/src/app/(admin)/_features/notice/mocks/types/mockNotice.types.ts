import type { PaginationRequestDto } from '@/_api/dtos/pagination.dto';
import type { AttachedFile } from '@/_features/file/api/dtos/attachedFile.dto';

export interface MockGetNoticeListRequestDto extends PaginationRequestDto {
  isShow?: boolean;
  searchType?: string;
  keyword?: string;
}

export interface MockNoticeListItemData {
  id: number;
  title: string;
  isShow: boolean;
  createdAt: string;
}

export interface MockNoticeDetailData {
  id: number;
  title: string;
  content: string;
  isShow: boolean;
  thumbnail: string;
  files: AttachedFile[];
  createdAt: string;
}

export interface MockCreateNoticeRequestDto {
  title: string;
  content: string;
  isShow: boolean;
  thumbnail: string;
  files: AttachedFile[];
}

export interface MockUpdateNoticeRequestDto extends MockCreateNoticeRequestDto {
  id: number;
}
