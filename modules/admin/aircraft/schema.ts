import { z } from 'zod';

export const aircraftFilterSchema = z.object({
  search: z.string().trim().max(100),
  status: z.string().trim(),
  manufacturer: z.string().trim(),
});

export type AircraftFilterValues = z.infer<typeof aircraftFilterSchema>;
