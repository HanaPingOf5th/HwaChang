import { z } from 'zod';

export const LogInFormSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export type LogInRequestBody = z.infer<typeof LogInFormSchema>;
