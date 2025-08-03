import { z } from 'zod';

export const svgFaviconSchema = z.object({
  svgContent: z
    .string()
    .min(1, { message: 'SVG 내용을 입력해주세요.' })
    .refine((value) => value.includes('<') && value.includes('>'), {
      message: 'SVG 태그 형식이 올바르지 않습니다.',
    }),
  backgroundColor: z
    .string()
    .length(7)
    .refine((value) => value.startsWith('#'), {
      message: '배경색은 #으로 시작하는 7자리 코드여야 합니다.',
    }),
  iconColor: z
    .string()
    .length(7)
    .refine((value) => value.startsWith('#'), {
      message: '텍스트색은 #으로 시작하는 7자리 코드여야 합니다.',
    }),
});

export type SvgFaviconSchema = z.infer<typeof svgFaviconSchema>;
