import { z } from 'zod';

export const mockFormSchema = z.object({
  content: z.string().min(1, { message: '내용을 입력해 주세요' }),
});

export type MockFormSchema = z.infer<typeof mockFormSchema>;
