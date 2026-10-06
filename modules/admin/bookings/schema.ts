import { z } from 'zod';

export const bookingFilterSchema = z.object({
  search: z.string().trim().max(100),
  status: z.string().trim(),
  paymentStatus: z.string().trim(),
  paymentMethod: z.string().trim(),
});

export type BookingFilterValues = z.infer<typeof bookingFilterSchema>;
