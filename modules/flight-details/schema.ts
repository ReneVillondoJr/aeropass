import { z } from 'zod';

export const flightIdSchema = z.object({
  id: z.string().trim().min(1, 'A flight ID is required.'),
});

export const fareSelectionSchema = z.object({
  fareId: z.string().trim().min(1, 'Select a fare.'),
});

export type FlightIdSchema = z.infer<typeof flightIdSchema>;

export type FareSelectionSchema = z.infer<typeof fareSelectionSchema>;
