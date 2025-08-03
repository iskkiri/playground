import { z } from 'zod';

export const textFaviconSchema = z.object({
  text: z.string().min(1),
  backgroundColor: z
    .string()
    .length(7)
    .refine((value) => value.startsWith('#'), {
      message: '배경색은 #으로 시작하는 7자리 코드여야 합니다.',
    }),
  textColor: z
    .string()
    .length(7)
    .refine((value) => value.startsWith('#'), {
      message: '텍스트색은 #으로 시작하는 7자리 코드여야 합니다.',
    }),
});

export type TextFaviconSchema = z.infer<typeof textFaviconSchema>;
