import { z } from 'zod';

export const scheduleFiltersSchema = z.object({
  search: z.string().trim(),
  status: z.enum(['ALL', 'ACTIVE', 'INACTIVE']),
  frequency: z.enum(['ALL', 'DAILY', 'WEEKDAYS', 'WEEKENDS']),
});

export type ScheduleFilters = z.infer<typeof scheduleFiltersSchema>;
