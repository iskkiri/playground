import type { CreateNoticeRequestDto } from './createNotice.dto';

export interface UpdateNoticeRequestDto extends CreateNoticeRequestDto {
  id: string;
}
