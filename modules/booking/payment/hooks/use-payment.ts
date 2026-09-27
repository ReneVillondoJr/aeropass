'use client';

import { paymentSchema, type PaymentSchema } from '../schema';

import { useBookingSession } from '@/modules/bookings/hooks/use-booking-session';

export function usePayment() {
  const { session, setPaymentMethod } = useBookingSession();

  function selectPayment(values: PaymentSchema) {
    const parsed = paymentSchema.safeParse(values);

    if (!parsed.success) {
      return {
        success: false,
      };
    }

    setPaymentMethod(parsed.data.paymentMethod);

    return {
      success: true,
    };
  }

  return {
    paymentMethod: session.paymentMethod,
    selectPayment,
  };
}
