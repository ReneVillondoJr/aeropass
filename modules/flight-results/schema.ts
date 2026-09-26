import { z } from 'zod';

export const flightSearchSchema = z.object({
  from: z.string().trim().optional().default(''),

  to: z.string().trim().optional().default(''),

  departureDate: z.string().trim().optional().default(''),
});

export type FlightSearchSchema = z.infer<typeof flightSearchSchema>;
