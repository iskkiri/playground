import { z } from 'zod';

export const fileSchema = z.object({
  file: z.instanceof(File).optional(),
  filename: z.string().optional(),
  storageFileUrl: z.string().optional(),
});

export type FileSchema = z.infer<typeof fileSchema>;
