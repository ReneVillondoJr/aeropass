import { z } from 'zod';

export const supportRequestSchema = z.object({
  name: z.string().trim().min(2, 'Enter your name.'),

  email: z.string().trim().email('Enter a valid email address.'),

  bookingReference: z.string().trim().optional(),

  category: z.string().trim().min(1, 'Select a support category.'),

  message: z.string().trim().min(10, 'Please provide at least 10 characters.'),
});

export type SupportRequestSchema = z.infer<typeof supportRequestSchema>;
