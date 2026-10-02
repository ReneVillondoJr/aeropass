import { z } from 'zod';

export const routeFiltersSchema = z.object({
  search: z.string().trim().max(100),
  status: z.enum(['ALL', 'ACTIVE', 'INACTIVE']),
});

export type RouteFiltersSchema = z.infer<typeof routeFiltersSchema>;
