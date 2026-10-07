import { z } from 'zod';

export const ticketFiltersSchema = z.object({
  search: z.string(),

  status: z.enum(['ALL', 'PENDING', 'VALID', 'USED', 'CANCELLED', 'REFUNDED']),

  checkIn: z.enum(['ALL', 'CHECKED_IN', 'NOT_CHECKED_IN']),

  boarding: z.enum(['ALL', 'NOT_BOARDED', 'BOARDED', 'DENIED']),
});

export type TicketFiltersSchema = z.infer<typeof ticketFiltersSchema>;
