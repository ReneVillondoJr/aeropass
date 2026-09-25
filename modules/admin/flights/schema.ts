import { z } from 'zod';

export const createFlightSchema = z.object({
  scheduleId: z.string().trim().min(1, 'Select a schedule.'),

  departureDate: z.string().trim().min(1, 'Select a departure date.'),

  gate: z.string().trim().min(1, 'Enter a gate.'),

  status: z.enum([
    'SCHEDULED',
    'CHECK_IN_OPEN',
    'BOARDING',
    'DEPARTED',
    'ARRIVED',
    'DELAYED',
    'CANCELLED',
  ]),

  seatsAvailable: z.coerce
    .number()
    .int('Available seats must be a whole number.')
    .min(0, 'Available seats cannot be negative.'),
});

export type CreateFlightSchema = z.infer<typeof createFlightSchema>;
