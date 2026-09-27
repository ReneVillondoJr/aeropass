import { z } from 'zod';

export const checkoutSchema = z.object({
  termsAccepted: z.literal(true, {
    errorMap: () => ({
      message: 'You must accept the booking terms.',
    }),
  }),
});

export type CheckoutSchema = z.infer<typeof checkoutSchema>;
