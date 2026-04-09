import { z } from 'zod';

export const registerSchema = z.object({
  fullName: z.string().min(2),
  birthDate: z.string(), // позже в Date
  email: z.string().email(),
  password: z.string().min(6)
});