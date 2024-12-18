import { z } from 'zod';

export const LogInFormSchema = z.object({
  tellerNumber: z.string(),
  password: z.string(),
});

export type LogInRequestBody = z.infer<typeof LogInFormSchema>;
