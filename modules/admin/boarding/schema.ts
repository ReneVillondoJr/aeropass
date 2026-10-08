import { z } from 'zod';

export const boardingFiltersSchema = z.object({
  search: z.string(),

  status: z.enum(['ALL', 'NOT_BOARDED', 'BOARDED', 'DENIED']),

  checkIn: z.enum(['ALL', 'CHECKED_IN', 'NOT_CHECKED_IN']),

  flightId: z.string(),
});

export type BoardingFiltersSchema = z.infer<typeof boardingFiltersSchema>;
