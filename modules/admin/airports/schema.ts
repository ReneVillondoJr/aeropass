import { z } from 'zod';

export const airportFiltersSchema = z.object({
  search: z.string().trim(),
  terminal: z.string().trim(),
});

export type AirportFilters = z.infer<typeof airportFiltersSchema>;
