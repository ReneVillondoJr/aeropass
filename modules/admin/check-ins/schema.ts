import { z } from 'zod';

export const checkInFiltersSchema = z.object({
  search: z.string(),

  status: z.enum(['ALL', 'NOT_CHECKED_IN', 'COMPLETED', 'CANCELLED']),

  method: z.enum(['ALL', 'WEB', 'COUNTER', 'MOBILE']),

  boarding: z.enum(['ALL', 'BOARDED', 'NOT_BOARDED', 'DENIED']),
});

export type CheckInFiltersSchema = z.infer<typeof checkInFiltersSchema>;
