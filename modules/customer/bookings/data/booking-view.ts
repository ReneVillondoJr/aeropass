import {
  getAircraftSeats,
  getBookingDetails,
  getBookingsByCustomerId,
  getFareClassById,
  getFlightDetails,
  getReservationsByBookingId,
  getTicketsByBookingId,
  getUserById,
  type Booking,
} from '@/data/aeropass';
import type { BookingCardData } from '@/components/customer/shared/booking-card';

import type {
  CustomerBookingDetailView,
  CustomerBookingItem,
  CustomerBookingsView,
} from '../types/booking';

const ACTIVE_BOOKING_STATUSES = new Set(['CONFIRMED', 'CHECKED_IN']);
const NON_TRAVELLING_FLIGHT_STATUSES = new Set(['CANCELLED', 'DEPARTED', 'ARRIVED']);
const ATTENTION_PAYMENT_STATUSES = new Set(['PENDING', 'PROCESSING', 'FAILED']);
const CANCELLED_BOOKING_STATUSES = new Set(['CANCELLED', 'REFUND_PENDING', 'REFUNDED']);
const TICKET_COUNTED_STATUSES = new Set(['VALID', 'USED']);

function toManilaDateTime(date: string, time: string): Date {
  const normalizedTime = /^\d{2}:\d{2}$/.test(time) ? `${time}:00` : time;
  return new Date(`${date}T${normalizedTime}+08:00`);
}

function toIsoString(date: Date | null): string | null {
  if (!date || Number.isNaN(date.getTime())) return null;
  return date.toISOString();
}

function formatDuration(durationMinutes: number): string {
  const hours = Math.floor(durationMinutes / 60);
  const minutes = durationMinutes % 60;

  if (hours === 0) return `${minutes}m`;
  if (minutes === 0) return `${hours}h`;
  return `${hours}h ${minutes}m`;
}

function isValidCustomer(customerId: string) {
  const customer = getUserById(customerId);
  return Boolean(customer && customer.role === 'CUSTOMER' && customer.status === 'ACTIVE');
}

function countIssuedTickets(bookingId: string): number {
  return getTicketsByBookingId(bookingId).filter((ticket) =>
    TICKET_COUNTED_STATUSES.has(ticket.status),
  ).length;
}

function toBookingCardData(booking: Booking): (BookingCardData & { departureTimestamp: number | null; flightStatus: CustomerBookingItem['flightStatus'] }) | null {
  const details = getFlightDetails(booking.flightId);
  if (!details?.flight || !details.origin || !details.destination) return null;

  const departure = toManilaDateTime(details.flight.departureDate, details.flight.departureTime);
  const arrival = toManilaDateTime(details.flight.arrivalDate, details.flight.arrivalTime);
  const firstReservation = getReservationsByBookingId(booking.id)[0];
  const fareClass = firstReservation ? getFareClassById(firstReservation.fareClassId) : undefined;

  return {
    id: booking.id,
    bookingReference: booking.bookingReference,
    status: booking.status,
    originCode: details.origin.code,
    originCity: details.origin.city,
    destinationCode: details.destination.code,
    destinationCity: details.destination.city,
    departureAt: toIsoString(departure),
    arrivalAt: toIsoString(arrival),
    flightNumber: details.flight.flightNumber,
    duration: formatDuration(details.flight.durationMinutes),
    passengerCount: booking.passengerCount,
    cabinClass: fareClass?.cabinClass,
    totalAmount: booking.total,
    currency: booking.currency,
    departureTimestamp: Number.isNaN(departure.getTime()) ? null : departure.getTime(),
    flightStatus: details.flight.status,
  };
}

function toBookingItem(booking: Booking, now: Date): CustomerBookingItem | null {
  const card = toBookingCardData(booking);
  if (!card) return null;

  const departureTimestamp = card.departureTimestamp;
  const isFuture = departureTimestamp !== null && departureTimestamp > now.getTime();
  const isUpcoming =
    isFuture &&
    ACTIVE_BOOKING_STATUSES.has(booking.status) &&
    !NON_TRAVELLING_FLIGHT_STATUSES.has(card.flightStatus);
  const isCancelled =
    CANCELLED_BOOKING_STATUSES.has(booking.status) || card.flightStatus === 'CANCELLED';
  const needsAttention =
    booking.status === 'PENDING_PAYMENT' ||
    booking.status === 'REFUND_PENDING' ||
    ATTENTION_PAYMENT_STATUSES.has(booking.paymentStatus);
  const isPast =
    !isUpcoming &&
    !isCancelled &&
    !needsAttention &&
    departureTimestamp !== null &&
    departureTimestamp <= now.getTime();

  return {
    ...card,
    status: booking.status,
    paymentStatus: booking.paymentStatus,
    paymentMethod: booking.paymentMethod,
    createdAt: booking.createdAt,
    expiresAt: booking.expiresAt,
    departureTimestamp,
    flightStatus: card.flightStatus,
    isUpcoming,
    isPast,
    isCancelled,
    needsAttention,
    ticketCount: countIssuedTickets(booking.id),
  };
}

function emptyBookingsView(): CustomerBookingsView {
  return {
    accountAvailable: false,
    customerName: 'Customer',
    bookings: [],
    stats: { total: 0, upcoming: 0, needsAttention: 0, cancelled: 0 },
  };
}

export function getCustomerBookingsView(
  customerId: string,
  now: Date = new Date(),
): CustomerBookingsView {
  const customer = getUserById(customerId);
  if (!customer || customer.role !== 'CUSTOMER' || customer.status !== 'ACTIVE') {
    return emptyBookingsView();
  }

  const bookings = getBookingsByCustomerId(customerId)
    .map((booking) => toBookingItem(booking, now))
    .filter((booking): booking is CustomerBookingItem => booking !== null)
    .sort((left, right) => new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime());

  return {
    accountAvailable: true,
    customerName: customer.name,
    bookings,
    stats: {
      total: bookings.length,
      upcoming: bookings.filter((booking) => booking.isUpcoming).length,
      needsAttention: bookings.filter((booking) => booking.needsAttention).length,
      cancelled: bookings.filter((booking) => booking.isCancelled).length,
    },
  };
}

export function getCustomerBookingDetailView(
  customerId: string,
  bookingId: string,
  now: Date = new Date(),
): CustomerBookingDetailView | null {
  if (!isValidCustomer(customerId)) return null;

  const details = getBookingDetails(bookingId);
  if (!details || details.booking.customerId !== customerId) return null;

  const item = toBookingItem(details.booking, now);
  const flightDetails = details.flight;
  if (!item || !flightDetails?.flight || !flightDetails.origin || !flightDetails.destination) {
    return null;
  }

  const seats = getAircraftSeats(flightDetails.flight.aircraftId);
  const passengerNameById = new Map(
    details.passengers.map((passenger) => [
      passenger.id,
      [passenger.firstName, passenger.middleName, passenger.lastName].filter(Boolean).join(' '),
    ]),
  );

  return {
    ...item,
    gate: flightDetails.flight.gate,
    terminal: flightDetails.flight.terminal,
    originAirportName: flightDetails.origin.name,
    destinationAirportName: flightDetails.destination.name,
    subtotal: details.booking.subtotal,
    taxes: details.booking.taxes,
    fees: details.booking.fees,
    baggageFees: details.booking.baggageFees,
    seatFees: details.booking.seatFees,
    discount: details.booking.discount,
    passengers: details.passengers.map((passenger) => ({
      id: passenger.id,
      fullName: passengerNameById.get(passenger.id) ?? `${passenger.firstName} ${passenger.lastName}`,
      email: passenger.email,
      phone: passenger.phone,
    })),
    reservations: details.reservations.map((reservation) => {
      const seat = seats.find((candidate) => candidate.id === reservation.seatId);
      const fareClass = getFareClassById(reservation.fareClassId);

      return {
        id: reservation.id,
        passengerName: passengerNameById.get(reservation.passengerId) ?? 'Passenger',
        seatNumber: seat?.seatNumber ?? 'Not assigned',
        fareClassName: fareClass?.name ?? 'Standard fare',
        status: reservation.status,
        price: reservation.price,
      };
    }),
    tickets: details.tickets.map((ticket) => ({
      id: ticket.id,
      ticketNumber: ticket.ticketNumber,
      passengerName: passengerNameById.get(ticket.passengerId) ?? 'Passenger',
      status: ticket.status,
    })),
    payment: details.payment ? {
      providerReference: details.payment.providerReference,
      paymentMethod: details.payment.paymentMethod,
      amount: details.payment.amount,
      status: details.payment.status,
      paidAt: details.payment.paidAt,
    } : null,
    refund: details.refund ? {
      amount: details.refund.amount,
      reason: details.refund.reason,
      status: details.refund.status,
      requestedAt: details.refund.requestedAt,
      processedAt: details.refund.processedAt,
    } : null,
  };
}
