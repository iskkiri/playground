import { getRequiredImageSchema } from '@/_features/image/schemas/image.schema';
import { z } from 'zod';

export const popupRegisterSchema = z.object({
  title: z.string().min(1, { message: '팝업명을 입력해주세요.' }),
  displayType: z.enum(['ALL', 'PC_ONLY', 'MOBILE_ONLY']),
  pcPosition: z.enum(['LEFT', 'CENTER', 'RIGHT', 'CUSTOM']),
  xCoordinate: z.coerce.number().min(0),
  yCoordinate: z.coerce.number().min(0),
  dateRange: z
    .object({
      startDate: z.date().optional(), // 시작 날짜
      endDate: z.date().optional(), // 종료 날짜
    })
    .optional(),
  popupImage: getRequiredImageSchema('팝업 이미지를 첨부해주세요.'),
  link: z.string().optional(),
  popupWidthStatus: z.enum(['AUTO', 'DIRECT']),
  imageWidth: z.coerce.number().min(0),
});

export type PopupRegisterSchema = z.infer<typeof popupRegisterSchema>;
