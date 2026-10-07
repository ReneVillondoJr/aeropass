import { z } from 'zod';

export const refundFiltersSchema = z.object({
  search: z.string(),

  status: z.enum(['ALL', 'REQUESTED', 'PROCESSING', 'COMPLETED', 'REJECTED']),

  paymentMethod: z.enum([
    'ALL',
    'GCASH',
    'MAYA',
    'QRPH',
    'CARD',
    'BANK_TRANSFER',
  ]),
});

export type RefundFiltersSchema = z.infer<typeof refundFiltersSchema>;
