import { z } from 'zod';

const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters.')
  .max(72, 'Password must be 72 characters or fewer.');

export const loginSchema = z.object({
  email: z.string().trim().email('Enter a valid email address.'),

  password: passwordSchema,

  role: z.enum(['CUSTOMER', 'ADMIN']),
});

export const customerRegisterSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, 'Name must be at least 2 characters.')
      .max(80, 'Name is too long.'),

    email: z.string().trim().email('Enter a valid email address.'),

    phone: z
      .string()
      .trim()
      .min(10, 'Enter a valid phone number.')
      .max(20, 'Phone number is too long.'),

    password: passwordSchema,

    confirmPassword: z.string(),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: 'Passwords do not match.',
    path: ['confirmPassword'],
  });

export const adminRegisterSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, 'Name must be at least 2 characters.')
      .max(80, 'Name is too long.'),

    email: z.string().trim().email('Enter a valid email address.'),

    phone: z
      .string()
      .trim()
      .min(10, 'Enter a valid phone number.')
      .max(20, 'Phone number is too long.'),

    password: passwordSchema,

    confirmPassword: z.string(),

    inviteCode: z.string().trim().min(1, 'Admin invite code is required.'),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: 'Passwords do not match.',
    path: ['confirmPassword'],
  });

export const forgotPasswordSchema = z.object({
  email: z.string().trim().email('Enter a valid email address.'),
});

export const resetPasswordSchema = z
  .object({
    token: z.string().min(1, 'Reset token is missing.'),

    password: passwordSchema,

    confirmPassword: z.string(),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: 'Passwords do not match.',
    path: ['confirmPassword'],
  });

export type LoginValues = z.infer<typeof loginSchema>;

export type CustomerRegisterValues = z.infer<typeof customerRegisterSchema>;

export type AdminRegisterValues = z.infer<typeof adminRegisterSchema>;

export type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;

export type ResetPasswordValues = z.infer<typeof resetPasswordSchema>;
