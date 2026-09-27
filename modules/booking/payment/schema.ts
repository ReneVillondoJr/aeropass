import { z } from 'zod';

export const paymentSchema = z.object({
  paymentMethod: z.enum(['GCASH', 'MAYA', 'QRPH', 'CARD', 'BANK_TRANSFER']),
});

export type PaymentSchema = z.infer<typeof paymentSchema>;
