import { z } from 'zod';

const userStatuses = ['ACTIVE', 'INACTIVE', 'SUSPENDED'] as const;

const userRoles = [
  'SUPER_ADMIN',
  'ADMIN',
  'FLIGHT_MANAGER',
  'CHECK_IN_AGENT',
  'GATE_AGENT',
  'CUSTOMER',
] as const;

export const userFilterSchema = z.object({
  search: z.string().default(''),
  status: z.union([z.literal('ALL'), z.enum(userStatuses)]).default('ALL'),
  role: z.union([z.literal('ALL'), z.enum(userRoles)]).default('ALL'),
});

export type UserFilterState = z.infer<typeof userFilterSchema>;
