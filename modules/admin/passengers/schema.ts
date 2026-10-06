import { z } from 'zod';

export const passengerFiltersSchema = z.object({
  search: z.string(),
  gender: z.enum(['ALL', 'MALE', 'FEMALE', 'OTHER']),
  bookingStatus: z.enum([
    'ALL',
    'PENDING_PAYMENT',
    'CONFIRMED',
    'CHECKED_IN',
    'COMPLETED',
    'CANCELLED',
    'REFUND_PENDING',
    'REFUNDED',
  ]),
  assistance: z.enum(['ALL', 'YES', 'NO']),
});

export type PassengerFiltersSchema = z.infer<typeof passengerFiltersSchema>;
