import type { AttachedFile } from '@/_features/file/api/dtos/attachedFile.dto';

export interface CreateNoticeRequestDto {
  title: string;
  content: string;
  isShow: boolean;
  thumbnail: string;
  files: AttachedFile[];
}
