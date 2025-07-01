import type { AttachedFile } from '@/_features/file/api/dtos/attachedFile.dto';
import type { AdminUser } from '../../../user/types/user.types';

export interface Notice {
  id: string;
  title: string;
  content: string;
  isShow: boolean;
  thumbnail: string;
  files: AttachedFile[];
  createdAt: string;
  updatedAt: string;
  author: AdminUser;
}
