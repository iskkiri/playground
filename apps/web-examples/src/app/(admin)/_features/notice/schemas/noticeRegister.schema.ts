import { fileSchema } from '@/_features/file/schemas/file.schema';
import { getRequiredImageSchema } from '@/_features/image/schemas/image.schema';
import { z } from 'zod';

export const noticeRegisterSchema = z.object({
  isShow: z.boolean(),
  title: z.string().min(1, '제목을 입력해 주세요'),
  thumbnail: getRequiredImageSchema('썸네일을 업로드해 주세요'),
  attachedFiles: z.array(fileSchema),
  content: z.string().min(1, '내용을 입력해 주세요'),
});

export type NoticeRegisterSchema = z.infer<typeof noticeRegisterSchema>;
