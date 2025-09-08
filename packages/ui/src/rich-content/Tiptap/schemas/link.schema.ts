import { z } from 'zod';

// 외부 링크 검증 스키마 (http 또는 https로 시작하는 유효한 URL)
const externalLinkSchema = z
  .string()
  .optional()
  .superRefine((url, ctx) => {
    if (!url) return;

    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: '링크는 http:// 또는 https://로 시작해야 합니다.',
      });
    }

    if (!z.string().url().safeParse(url).success) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: '유효한 URL 형식이 아닙니다.',
      });
      return;
    }
  });

// 링크 폼 스키마
export const linkFormSchema = z.object({
  url: externalLinkSchema,
});

export type LinkFormData = z.infer<typeof linkFormSchema>;
