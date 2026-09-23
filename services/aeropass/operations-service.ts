import { baggage, boarding, checkIns } from '@/data/aeropass';

export function getCheckInByTicketId(ticketId: string) {
  return checkIns.find((item) => item.ticketId === ticketId);
}

export function getCheckInsByFlightId(flightId: string) {
  return checkIns.filter((item) => item.flightId === flightId);
}

export function getBoardingByTicketId(ticketId: string) {
  return boarding.find((item) => item.ticketId === ticketId);
}

export function getBoardingByFlightId(flightId: string) {
  return boarding.filter((item) => item.flightId === flightId);
}

export function getBaggageByBookingId(bookingId: string) {
  return baggage.filter((item) => item.bookingId === bookingId);
}

export function getBaggageByPassengerId(passengerId: string) {
  return baggage.filter((item) => item.passengerId === passengerId);
}

export function getFlightOperations(flightId: string) {
  return {
    checkIns: getCheckInsByFlightId(flightId),

    boardings: getBoardingByFlightId(flightId),

    baggage: baggage.filter((item) => {
      const checkIn = checkIns.find(
        (checkIn) => checkIn.bookingId === item.bookingId,
      );

      return checkIn?.flightId === flightId;
    }),
  };
}
