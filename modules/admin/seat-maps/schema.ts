import { z } from 'zod';

export const seatMapFilterSchema = z.object({
  search: z.string().trim().max(100),
  status: z.string().trim(),
  cabin: z.string().trim(),
});

export type SeatMapFilterValues = z.infer<typeof seatMapFilterSchema>;
