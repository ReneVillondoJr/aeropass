import {
  getAircraftSeats,
  getBookingsByCustomerId,
  getFareClassById,
  getTicketDetails,
  getUserById,
  tickets as ticketRecords,
} from '@/data/aeropass';

import type {
  CustomerTicketDetailView,
  CustomerTicketDisplayStatus,
  CustomerTicketItem,
  CustomerTicketsView,
} from '../types/ticket';

function isCustomerAccountAvailable(customerId: string): boolean {
  const customer = getUserById(customerId);
  return Boolean(
    customer && customer.role === 'CUSTOMER' && customer.status === 'ACTIVE',
  );
}

function fullName(firstName?: string, middleName?: string, lastName?: string) {
  return [firstName, middleName, lastName].filter(Boolean).join(' ') || 'Passenger';
}

function normalizedDateTime(date: string, time: string): string {
  const normalizedTime = /^\d{2}:\d{2}$/.test(time) ? `${time}:00` : time;
  return `${date}T${normalizedTime}+08:00`;
}

function toManilaTimestamp(date: string, time: string): number {
  const timestamp = new Date(normalizedDateTime(date, time)).getTime();
  return Number.isNaN(timestamp) ? 0 : timestamp;
}

function effectiveStatus(
  originalStatus: CustomerTicketItem['originalStatus'],
  expiresAt: string,
  now: Date,
): CustomerTicketDisplayStatus {
  if (
    originalStatus === 'VALID' &&
    new Date(expiresAt).getTime() < now.getTime()
  ) {
    return 'EXPIRED';
  }
  return originalStatus;
}

function toCustomerTicketItem(
  ticketId: string,
  customerId: string,
  now: Date,
): CustomerTicketItem | null {
  const details = getTicketDetails(ticketId);
  if (!details?.ticket || !details.booking?.booking || !details.flight?.flight) {
    return null;
  }

  const { ticket, passenger, booking, flight, checkIn, boarding: boardingRecord } = details;
  const bookingRecord = booking.booking;

  // Never show a ticket unless its reservation belongs to the requested customer.
  if (bookingRecord.customerId !== customerId) return null;
  if (!flight.origin || !flight.destination) return null;

  const ticketFlight = flight.flight;
  const departureTimestamp = toManilaTimestamp(
    ticketFlight.departureDate,
    ticketFlight.departureTime,
  );
  const arrivalTimestamp = toManilaTimestamp(
    ticketFlight.arrivalDate,
    ticketFlight.arrivalTime,
  );
  const seat = getAircraftSeats(ticketFlight.aircraftId).find(
    (candidate) => candidate.id === ticket.seatId,
  );
  const reservation = booking.reservations.find(
    (candidate) =>
      candidate.passengerId === ticket.passengerId &&
      candidate.seatId === ticket.seatId,
  ) ?? booking.reservations.find((candidate) => candidate.passengerId === ticket.passengerId);
  const fareClass = reservation ? getFareClassById(reservation.fareClassId) : undefined;
  const displayStatus = effectiveStatus(ticket.status, ticket.expiresAt, now);
  const isBoardingPassReady = Boolean(
    displayStatus === 'VALID' &&
    bookingRecord.paymentStatus === 'PAID' &&
    (bookingRecord.status === 'CONFIRMED' || bookingRecord.status === 'CHECKED_IN') &&
    checkIn?.status === 'COMPLETED' &&
    ticketFlight.status !== 'CANCELLED',
  );

  return {
    id: ticket.id,
    bookingId: bookingRecord.id,
    bookingReference: bookingRecord.bookingReference,
    ticketNumber: ticket.ticketNumber,
    displayStatus,
    originalStatus: ticket.status,
    passengerName: fullName(passenger?.firstName, passenger?.middleName, passenger?.lastName),
    passengerEmail: passenger?.email ?? '',
    passengerId: ticket.passengerId,
    flightNumber: ticketFlight.flightNumber,
    flightStatus: ticketFlight.status,
    originCode: flight.origin.code,
    originCity: flight.origin.city,
    originAirportName: flight.origin.name,
    destinationCode: flight.destination.code,
    destinationCity: flight.destination.city,
    destinationAirportName: flight.destination.name,
    departureAt: normalizedDateTime(ticketFlight.departureDate, ticketFlight.departureTime),
    arrivalAt: normalizedDateTime(ticketFlight.arrivalDate, ticketFlight.arrivalTime),
    departureTimestamp,
    arrivalTimestamp,
    gate: ticketFlight.gate,
    terminal: ticketFlight.terminal,
    seatNumber: seat?.seatNumber ?? 'Not assigned',
    cabinClass: fareClass?.cabinClass.replaceAll('_', ' ') ?? 'Standard',
    issuedAt: ticket.issuedAt,
    expiresAt: ticket.expiresAt,
    bookingStatus: bookingRecord.status,
    paymentStatus: bookingRecord.paymentStatus,
    checkInStatus: checkIn?.status ?? null,
    checkedInAt: checkIn?.checkedInAt ?? null,
    boardingStatus: boardingRecord?.status ?? null,
    boardedAt: boardingRecord?.boardedAt ?? null,
    qrToken: ticket.qrToken,
    totalAmount: bookingRecord.total,
    currency: bookingRecord.currency,
    isBoardingPassReady,
    isPastTrip: departureTimestamp <= now.getTime(),
  };
}

function emptyView(): CustomerTicketsView {
  return {
    accountAvailable: false,
    customerName: 'Customer',
    tickets: [],
    stats: { total: 0, valid: 0, used: 0, expired: 0, cancelled: 0 },
  };
}

export function getCustomerTicketsView(
  customerId: string,
  now: Date = new Date(),
): CustomerTicketsView {
  const customer = getUserById(customerId);
  if (!customer || !isCustomerAccountAvailable(customerId)) return emptyView();

  const bookingIds = new Set(
    getBookingsByCustomerId(customerId).map((booking) => booking.id),
  );

  const tickets = ticketRecords
    .filter((ticket) => bookingIds.has(ticket.bookingId))
    .map((ticket) => toCustomerTicketItem(ticket.id, customerId, now))
    .filter((ticket): ticket is CustomerTicketItem => ticket !== null)
    .sort((left, right) => right.departureTimestamp - left.departureTimestamp);

  return {
    accountAvailable: true,
    customerName: customer.name,
    tickets,
    stats: {
      total: tickets.length,
      valid: tickets.filter((ticket) => ticket.displayStatus === 'VALID').length,
      used: tickets.filter((ticket) => ticket.displayStatus === 'USED').length,
      expired: tickets.filter((ticket) => ticket.displayStatus === 'EXPIRED').length,
      cancelled: tickets.filter((ticket) => ticket.displayStatus === 'CANCELLED').length,
    },
  };
}

export function getCustomerTicketDetailView(
  customerId: string,
  ticketId: string,
  now: Date = new Date(),
): CustomerTicketDetailView | null {
  if (!isCustomerAccountAvailable(customerId)) return null;

  const ticket = toCustomerTicketItem(ticketId, customerId, now);
  if (!ticket) return null;

  const details = getTicketDetails(ticketId);
  if (!details?.booking?.booking || !details.flight?.flight) return null;

  const reservation = details.booking.reservations.find(
    (candidate) => candidate.passengerId === ticket.passengerId,
  );
  const fareClass = reservation ? getFareClassById(reservation.fareClassId) : undefined;
  const payment = details.booking.payment;

  return {
    ...ticket,
    flightDurationMinutes: details.flight.flight.durationMinutes,
    paymentMethod: details.booking.booking.paymentMethod,
    paymentReference: payment?.providerReference ?? null,
    paidAt: payment?.paidAt ?? null,
    reservationFareName: fareClass?.name ?? 'Standard fare',
    reservationPrice: reservation?.price ?? null,
  };
}
