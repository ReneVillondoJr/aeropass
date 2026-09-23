import { boarding, checkIns, tickets } from '@/data/aeropass';

import { getAirportById, getFlightDetails } from './flight-service';

import { getBookingDetails } from './booking-service';

export function getTicketById(ticketId: string) {
  return tickets.find((ticket) => ticket.id === ticketId);
}

export function getTicketsByBookingId(bookingId: string) {
  return tickets.filter((ticket) => ticket.bookingId === bookingId);
}

export function getTicketDetails(ticketId: string) {
  const ticket = getTicketById(ticketId);

  if (!ticket) {
    return null;
  }

  const flight = getFlightDetails(ticket.flightId);

  const booking = getBookingDetails(ticket.bookingId);

  const checkIn = checkIns.find((item) => item.ticketId === ticket.id);

  const boardingRecord = boarding.find((item) => item.ticketId === ticket.id);

  return {
    ticket,
    flight,
    booking,
    checkIn,
    boarding: boardingRecord,
  };
}
