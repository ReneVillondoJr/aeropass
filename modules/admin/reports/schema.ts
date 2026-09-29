import { z } from 'zod';

export const reportsSchema = z.object({
  period: z.enum(['7D', '30D', 'ALL']),
});

export type ReportsSchema = z.infer<typeof reportsSchema>;
