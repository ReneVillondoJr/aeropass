import { z } from 'zod';

export const fareClassFilterSchema = z.object({
  search: z.string().trim().max(100),
  cabin: z.string().trim(),
  refundable: z.string().trim(),
  changeable: z.string().trim(),
});

export type FareClassFilterValues = z.infer<typeof fareClassFilterSchema>;
