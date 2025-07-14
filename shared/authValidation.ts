import { z } from 'zod';

const EMAIL_ERROR_MESSAGE = 'Invalid email address';

export const registerSchema = z
  .object({
    email: z.email({ message: EMAIL_ERROR_MESSAGE }),
    username: z.string().min(1, 'Username is required'),
    password: z.string().min(8, 'Password must be at least 8 characters long'),
    passwordConfirmation: z.string()
  }).refine((data) => data.password === data.passwordConfirmation, {
    path: ['passwordConfirmation'],
    message: 'Passwords do not match'
  });

export const loginSchema = z.object({
  email: z.email({ message: EMAIL_ERROR_MESSAGE }),
  password: z.string().min(1, 'Password is required')
});