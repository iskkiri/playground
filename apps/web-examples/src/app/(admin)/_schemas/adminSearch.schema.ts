import { z } from 'zod';

export const adminSearchSchema = z.object({
  searchType: z.string().optional(),
  keyword: z.string().optional(),
});

export type AdminSearchSchema = z.infer<typeof adminSearchSchema>;
