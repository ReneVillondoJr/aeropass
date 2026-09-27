'use client';

import { addonsSchema, type AddonsSchema } from '../schema';

import { useBookingSession } from '@/modules/bookings/hooks/use-booking-session';

export function useAddons() {
  const { session, setAddons } = useBookingSession();

  function saveAddons(values: AddonsSchema) {
    const parsed = addonsSchema.safeParse(values);

    if (!parsed.success) {
      return {
        success: false,
      };
    }

    setAddons({
      checkedBaggageKg: parsed.data.checkedBaggageKg,
      travelProtection: parsed.data.travelProtection,
      loungeAccess: parsed.data.loungeAccess,
    });

    return {
      success: true,
    };
  }

  const baggagePrice =
    session.addons.checkedBaggageKg > 0 ?
      session.addons.checkedBaggageKg * 50
    : 0;

  const protectionPrice = session.addons.travelProtection ? 350 : 0;

  const loungePrice = session.addons.loungeAccess ? 700 : 0;

  return {
    addons: session.addons,
    baggagePrice,
    protectionPrice,
    loungePrice,
    saveAddons,
  };
}
