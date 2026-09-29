import { z } from 'zod';

export const dashboardSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid dashboard date.'),
});

export type DashboardSchema = z.infer<typeof dashboardSchema>;
