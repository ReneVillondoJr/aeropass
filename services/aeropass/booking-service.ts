import {
  bookings,
  reservations,
  passengers,
  tickets,
  payments,
  refunds,
} from '@/data/aeropass';

import { getFlightDetails } from './flight-service';

export function getBookingById(bookingId: string) {
  return bookings.find((booking) => booking.id === bookingId);
}

export function getBookingsByCustomerId(customerId: string) {
  return bookings.filter((booking) => booking.customerId === customerId);
}

export function getBookingPassengers(bookingId: string) {
  return passengers.filter((passenger) => passenger.bookingId === bookingId);
}

export function getBookingReservations(bookingId: string) {
  return reservations.filter(
    (reservation) => reservation.bookingId === bookingId,
  );
}

export function getBookingTickets(bookingId: string) {
  return tickets.filter((ticket) => ticket.bookingId === bookingId);
}

export function getBookingPayment(bookingId: string) {
  return payments.find((payment) => payment.bookingId === bookingId);
}

export function getBookingRefund(bookingId: string) {
  return refunds.find((refund) => refund.bookingId === bookingId);
}

export function getBookingDetails(bookingId: string) {
  const booking = getBookingById(bookingId);

  if (!booking) {
    return null;
  }

  const passengers = getBookingPassengers(bookingId);

  const reservations = getBookingReservations(bookingId);

  const tickets = getBookingTickets(bookingId);

  const payment = getBookingPayment(bookingId);

  const refund = getBookingRefund(bookingId);

  const flight = getFlightDetails(booking.flightId);

  return {
    booking,
    passengers,
    reservations,
    tickets,
    payment,
    refund,
    flight,
  };
}
