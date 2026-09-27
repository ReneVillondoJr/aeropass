import { z } from 'zod';

export const addonsSchema = z.object({
  checkedBaggageKg: z.coerce.number().min(0),

  travelProtection: z.coerce.boolean(),

  loungeAccess: z.coerce.boolean(),
});

export type AddonsSchema = z.infer<typeof addonsSchema>;
