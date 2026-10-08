import { z } from 'zod';

const roleCodes = [
  'SUPER_ADMIN',
  'ADMIN',
  'FLIGHT_MANAGER',
  'CHECK_IN_AGENT',
  'GATE_AGENT',
  'CUSTOMER',
] as const;

export const roleFilterSchema = z.object({
  search: z.string().default(''),
  role: z.union([z.literal('ALL'), z.enum(roleCodes)]).default('ALL'),
});

export type RoleFilterState = z.infer<typeof roleFilterSchema>;
