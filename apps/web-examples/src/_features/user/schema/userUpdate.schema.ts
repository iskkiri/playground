import { z } from 'zod';

const userFieldSchema = z.object({
  id: z.number(),
  name: z.string(),
  phone: z.string(),
  email: z.string(),
});

export const userUpdateSchema = z.object({
  userFields: userFieldSchema.array(),
});

export type UserUpdateSchema = z.infer<typeof userUpdateSchema>;
