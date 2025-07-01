import { getRequiredImageSchema } from '@/_features/image/schemas/image.schema';
import { z } from 'zod';

export const bannerRegisterSchema = z.object({
  title: z.string().min(1, '배너명을 입력해 주세요'),
  mobileImage: getRequiredImageSchema('모바일용 이미지를 업로드해 주세요'),
  mobileLink: z.string().optional().nullable(),
  pcImage: getRequiredImageSchema('PC용 이미지를 업로드해 주세요'),
  pcLink: z.string().optional().nullable(),
});

export type BannerRegisterSchema = z.infer<typeof bannerRegisterSchema>;
