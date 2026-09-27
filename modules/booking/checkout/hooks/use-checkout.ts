'use client';

import { flightFares, fareClasses, getFlightDetails } from '@/data/aeropass';

import { useBookingSession } from '@/modules/bookings/hooks/use-booking-session';

export function useCheckout(flightId: string, fareId: string) {
  const { session } = useBookingSession();

  const flight = getFlightDetails(flightId);

  const fare = flightFares.find((item) => item.id === fareId);

  const fareClass =
    fare ? fareClasses.find((item) => item.id === fare.fareClassId) : undefined;

  const baseFare = fare?.price ?? 0;

  const taxes = Math.round(baseFare * 0.12);

  const fees = 250;

  const baggage = session.addons.checkedBaggageKg * 50;

  const addons =
    (session.addons.travelProtection ? 350 : 0) +
    (session.addons.loungeAccess ? 700 : 0);

  const total = baseFare + taxes + fees + baggage + addons;

  return {
    flight,
    fare,
    fareClass,
    summary: {
      baseFare,
      taxes,
      fees,
      baggage,
      addons,
      total,
    },
    passenger: session.passenger,
    seatId: session.seatId,
  };
}
