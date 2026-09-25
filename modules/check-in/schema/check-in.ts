import { z } from 'zod';

export const checkInSchema = z.object({
  bookingReference: z.string().trim().min(1, 'Enter your booking reference.'),

  lastName: z.string().trim().min(1, 'Enter the passenger last name.'),
});

export type CheckInSchema = z.infer<typeof checkInSchema>;
