import { z } from 'zod';

export const activityLogFilterSchema = z.object({
  search: z.string().default(''),
  action: z.string().default('ALL'),
  entity: z.string().default('ALL'),
});

export type ActivityLogFilterState = z.infer<typeof activityLogFilterSchema>;
