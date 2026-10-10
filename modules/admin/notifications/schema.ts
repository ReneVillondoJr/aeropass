import { z } from 'zod';

const notificationTypes = [
  'BOOKING',
  'PAYMENT',
  'FLIGHT',
  'CHECK_IN',
  'BOARDING',
  'SYSTEM',
] as const;

const readFilters = ['ALL', 'READ', 'UNREAD'] as const;

export const notificationFilterSchema = z.object({
  search: z.string().default(''),
  type: z.union([z.literal('ALL'), z.enum(notificationTypes)]).default('ALL'),
  readStatus: z.enum(readFilters).default('ALL'),
});

export type NotificationFilterState = z.infer<typeof notificationFilterSchema>;
