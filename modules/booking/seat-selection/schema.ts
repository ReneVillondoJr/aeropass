import { z } from 'zod';

export const seatSelectionSchema = z.object({
  seatId: z.string().trim().min(1, 'Please select a seat.'),
});

export type SeatSelectionSchema = z.infer<typeof seatSelectionSchema>;
