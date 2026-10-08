import { z } from 'zod';

const baggageStatuses = [
  'PENDING',
  'CHECKED',
  'IN_TRANSIT',
  'RECEIVED',
  'LOST',
] as const;

const baggageTypes = ['CABIN', 'CHECKED'] as const;

export const baggageFilterSchema = z.object({
  search: z.string().default(''),
  status: z.union([z.literal('ALL'), z.enum(baggageStatuses)]).default('ALL'),
  type: z.union([z.literal('ALL'), z.enum(baggageTypes)]).default('ALL'),
  flightId: z.string().default('ALL'),
});

export type BaggageFilterState = z.infer<typeof baggageFilterSchema>;
