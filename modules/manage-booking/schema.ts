import { z } from 'zod';

export const manageBookingSchema = z.object({
  bookingReference: z.string().trim().min(1, 'Enter your booking reference.'),

  lastName: z.string().trim().min(1, 'Enter the passenger last name.'),
});

export type ManageBookingSchema = z.infer<typeof manageBookingSchema>;
