'use client';

import { useBookingSession } from '@/modules/bookings/hooks/use-booking-session';

import { getFlightDetails } from '@/data/aeropass';

export function useBookingConfirmation() {
  const { session } = useBookingSession();

  const flight = getFlightDetails(session.flightId);

  if (!flight?.flight || !flight.origin || !flight.destination) {
    return {
      confirmation: null,
    };
  }

  return {
    confirmation: {
      flightNumber: flight.flight.flightNumber,

      origin: flight.origin.code,

      destination: flight.destination.code,

      passengerName:
        session.passenger ?
          `${session.passenger.firstName} ${session.passenger.lastName}`
        : 'Passenger',

      seat: session.seatId?.split('-').pop() ?? 'Not selected',

      paymentMethod: session.paymentMethod ?? 'Not selected',
    },
  };
}
