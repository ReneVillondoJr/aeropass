import { z } from 'zod';

export const confirmationSchema = z.object({
  flightNumber: z.string().min(1),

  passengerName: z.string().min(1),

  seat: z.string().min(1),
});

export type ConfirmationSchema = z.infer<typeof confirmationSchema>;
