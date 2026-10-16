import {
  aircraftSeats,
  checkIns,
  getAircraftSeats,
  getBookingDetails,
  getBookingsByCustomerId,
  getFlightDetails,
  getUserById,
  reservations,
  tickets,
} from '@/data/aeropass';

import type {
  CheckInSeatOption,
  CustomerCheckInDetailView,
  CustomerCheckInItem,
  CustomerCheckInPassengerDetail,
  CustomerCheckInStatus,
  CustomerCheckInView,
} from '../types/check-in';

const CHECK_IN_OPEN_HOURS = 24;
const CHECK_IN_CLOSE_MINUTES = 60;

function fullName(firstName?: string, middleName?: string, lastName?: string) {
  return [firstName, middleName, lastName].filter(Boolean).join(' ') || 'Passenger';
}

function normalizeDateTime(date: string, time: string): string {
  const normalizedTime = /^\d{2}:\d{2}$/.test(time) ? `${time}:00` : time;
  return `${date}T${normalizedTime}+08:00`;
}

function getTimestamp(dateTime: string): number {
  const timestamp = new Date(dateTime).getTime();
  return Number.isNaN(timestamp) ? 0 : timestamp;
}

function isActiveCustomer(customerId: string): boolean {
  const customer = getUserById(customerId);
  return Boolean(customer && customer.role === 'CUSTOMER' && customer.status === 'ACTIVE');
}

function getStatusAndEligibility(
  context: {
    flightStatus: CustomerCheckInItem['flightStatus'];
    departureTimestamp: number;
    ticketStatus: CustomerCheckInItem['ticketStatus'];
    bookingStatus: string;
    paymentStatus: CustomerCheckInItem['paymentStatus'];
    checkInRecordStatus: CustomerCheckInItem['checkInRecordStatus'];
  },
  now: Date,
): { displayStatus: CustomerCheckInStatus; canCheckIn: boolean; reason: string | null } {
  if (context.checkInRecordStatus === 'COMPLETED') {
    return { displayStatus: 'COMPLETED', canCheckIn: false, reason: null };
  }

  if (context.flightStatus === 'CANCELLED' || ['CANCELLED', 'REFUND_PENDING', 'REFUNDED'].includes(context.bookingStatus) || ['CANCELLED', 'REFUNDED'].includes(context.ticketStatus)) {
    return { displayStatus: 'CANCELLED', canCheckIn: false, reason: 'This booking or flight is cancelled or no longer eligible for check-in.' };
  }

  if (context.ticketStatus !== 'VALID') {
    return { displayStatus: 'NOT_ELIGIBLE', canCheckIn: false, reason: 'Online check-in requires a valid, issued ticket.' };
  }

  if (context.paymentStatus !== 'PAID' || !['CONFIRMED', 'CHECKED_IN'].includes(context.bookingStatus)) {
    return { displayStatus: 'NOT_ELIGIBLE', canCheckIn: false, reason: 'Your booking must be confirmed and fully paid before check-in.' };
  }

  const nowTimestamp = now.getTime();
  const departure = context.departureTimestamp;
  if (!departure || departure <= nowTimestamp) {
    return { displayStatus: 'EXPIRED', canCheckIn: false, reason: 'This flight has already departed or its departure time has passed.' };
  }

  const closeTimestamp = departure - CHECK_IN_CLOSE_MINUTES * 60 * 1000;
  if (nowTimestamp > closeTimestamp || ['BOARDING', 'DEPARTED', 'ARRIVED'].includes(context.flightStatus)) {
    return { displayStatus: 'EXPIRED', canCheckIn: false, reason: 'Online check-in is closed for this flight.' };
  }

  const openTimestamp = departure - CHECK_IN_OPEN_HOURS * 60 * 60 * 1000;
  const withinWindow = nowTimestamp >= openTimestamp;
  const explicitlyOpen = context.flightStatus === 'CHECK_IN_OPEN';

  if (!withinWindow && !explicitlyOpen) {
    return { displayStatus: 'NOT_OPEN', canCheckIn: false, reason: 'Online check-in opens 24 hours before departure.' };
  }

  if (!['SCHEDULED', 'CHECK_IN_OPEN', 'DELAYED'].includes(context.flightStatus)) {
    return { displayStatus: 'NOT_ELIGIBLE', canCheckIn: false, reason: 'This flight is not accepting online check-in at the moment.' };
  }

  return { displayStatus: 'AVAILABLE', canCheckIn: true, reason: null };
}

function toCustomerCheckInItem(
  ticketId: string,
  customerId: string,
  now: Date,
): CustomerCheckInItem | null {
  const ticket = tickets.find((item) => item.id === ticketId);
  if (!ticket) return null;

  const details = getBookingDetails(ticket.bookingId);
  const flightDetails = getFlightDetails(ticket.flightId);
  if (!details || !flightDetails?.flight || !flightDetails.origin || !flightDetails.destination) return null;
  if (details.booking.customerId !== customerId) return null;

  const passenger = details.passengers.find((item) => item.id === ticket.passengerId);
  if (!passenger) return null;

  const checkInRecord = checkIns.find((item) => item.ticketId === ticket.id) ?? null;
  const effectiveSeatId = checkInRecord?.seatId ?? ticket.seatId;
  const seat = getAircraftSeats(flightDetails.flight.aircraftId).find((item) => item.id === effectiveSeatId);
  const departureAt = normalizeDateTime(flightDetails.flight.departureDate, flightDetails.flight.departureTime);
  const arrivalAt = normalizeDateTime(flightDetails.flight.arrivalDate, flightDetails.flight.arrivalTime);
  const eligibility = getStatusAndEligibility({
    flightStatus: flightDetails.flight.status,
    departureTimestamp: getTimestamp(departureAt),
    ticketStatus: ticket.status,
    bookingStatus: details.booking.status,
    paymentStatus: details.booking.paymentStatus,
    checkInRecordStatus: checkInRecord?.status ?? null,
  }, now);

  return {
    ticketId: ticket.id,
    bookingId: details.booking.id,
    bookingReference: details.booking.bookingReference,
    ticketNumber: ticket.ticketNumber,
    ticketStatus: ticket.status,
    bookingStatus: details.booking.status,
    paymentStatus: details.booking.paymentStatus,
    flightId: flightDetails.flight.id,
    flightNumber: flightDetails.flight.flightNumber,
    flightStatus: flightDetails.flight.status,
    passengerId: passenger.id,
    passengerName: fullName(passenger.firstName, passenger.middleName, passenger.lastName),
    passengerEmail: passenger.email,
    originCode: flightDetails.origin.code,
    originCity: flightDetails.origin.city,
    destinationCode: flightDetails.destination.code,
    destinationCity: flightDetails.destination.city,
    departureAt,
    departureTimestamp: getTimestamp(departureAt),
    arrivalAt,
    gate: flightDetails.flight.gate,
    terminal: flightDetails.flight.terminal,
    currentSeatId: effectiveSeatId,
    currentSeatNumber: seat?.seatNumber ?? 'Not assigned',
    checkInRecordStatus: checkInRecord?.status ?? null,
    checkedInAt: checkInRecord?.checkedInAt ?? null,
    checkInMethod: checkInRecord?.checkInMethod ?? null,
    displayStatus: eligibility.displayStatus,
    canCheckIn: eligibility.canCheckIn,
    unavailableReason: eligibility.reason,
  };
}

function emptyView(): CustomerCheckInView {
  return {
    accountAvailable: false,
    customerName: 'Customer',
    items: [],
    stats: { totalTickets: 0, available: 0, completed: 0, notAvailable: 0 },
  };
}

export function getCustomerCheckInView(customerId: string, now: Date = new Date()): CustomerCheckInView {
  const customer = getUserById(customerId);
  if (!customer || !isActiveCustomer(customerId)) return emptyView();

  const bookingIds = new Set(getBookingsByCustomerId(customerId).map((booking) => booking.id));
  const items = tickets
    .filter((ticket) => bookingIds.has(ticket.bookingId))
    .map((ticket) => toCustomerCheckInItem(ticket.id, customerId, now))
    .filter((item): item is CustomerCheckInItem => item !== null)
    .sort((left, right) => left.departureTimestamp - right.departureTimestamp);

  return {
    accountAvailable: true,
    customerName: customer.name,
    items,
    stats: {
      totalTickets: items.length,
      available: items.filter((item) => item.canCheckIn).length,
      completed: items.filter((item) => item.displayStatus === 'COMPLETED').length,
      notAvailable: items.filter((item) => !item.canCheckIn && item.displayStatus !== 'COMPLETED').length,
    },
  };
}

function getSeatOptions(
  aircraftId: string,
  flightId: string,
  bookingId: string,
  passengerId: string,
  currentSeatId: string,
): CheckInSeatOption[] {
  const occupiedByOtherReservationIds = new Set(
    reservations
      .filter((reservation) => {
        if (reservation.flightId !== flightId || !['HELD', 'CONFIRMED'].includes(reservation.status)) return false;
        if (reservation.bookingId === bookingId && reservation.passengerId === passengerId) return false;
        const otherBooking = getBookingDetails(reservation.bookingId)?.booking;
        return Boolean(otherBooking && !['CANCELLED', 'REFUND_PENDING', 'REFUNDED'].includes(otherBooking.status));
      })
      .map((reservation) => reservation.seatId),
  );

  return aircraftSeats
    .filter((seat) => seat.aircraftId === aircraftId)
    .filter((seat) => seat.status === 'AVAILABLE' || seat.id === currentSeatId)
    .filter((seat) => !occupiedByOtherReservationIds.has(seat.id) || seat.id === currentSeatId)
    .map((seat) => ({
      id: seat.id,
      seatNumber: seat.seatNumber,
      row: seat.row,
      column: seat.column,
      cabinClass: seat.cabinClass.replaceAll('_', ' '),
      seatType: seat.seatType.replaceAll('_', ' '),
      isCurrentSeat: seat.id === currentSeatId,
    }))
    .sort((left, right) => left.row - right.row || left.column.localeCompare(right.column));
}

export function getCustomerCheckInDetailView(
  customerId: string,
  bookingId: string,
  now: Date = new Date(),
): CustomerCheckInDetailView | null {
  if (!isActiveCustomer(customerId)) return null;
  const bookingDetails = getBookingDetails(bookingId);
  if (!bookingDetails || bookingDetails.booking.customerId !== customerId) return null;

  const flightDetails = bookingDetails.flight;
  if (!flightDetails?.flight || !flightDetails.origin || !flightDetails.destination) return null;

  const allItems = bookingDetails.tickets
    .map((ticket) => toCustomerCheckInItem(ticket.id, customerId, now))
    .filter((item): item is CustomerCheckInItem => item !== null);
  const passengers: CustomerCheckInPassengerDetail[] = allItems.map((item) => {
    const passenger = bookingDetails.passengers.find((candidate) => candidate.id === item.passengerId);
    const checkInRecord = checkIns.find((candidate) => candidate.ticketId === item.ticketId);
    return {
      ...item,
      dateOfBirth: passenger?.dateOfBirth ?? '',
      nationality: passenger?.nationality ?? 'Not provided',
      passportNumber: passenger?.passportNumber ?? null,
      specialAssistance: passenger?.specialAssistance ?? false,
      seatOptions: getSeatOptions(
        flightDetails.flight.aircraftId,
        flightDetails.flight.id,
        bookingId,
        item.passengerId,
        checkInRecord?.seatId ?? item.currentSeatId,
      ),
    };
  });

  const availablePassengers = passengers.filter((passenger) => passenger.canCheckIn);
  const unavailableReason = availablePassengers.length > 0
    ? null
    : passengers.find((passenger) => passenger.unavailableReason)?.unavailableReason ?? 'No eligible passenger tickets were found for this booking.';

  return {
    accountAvailable: true,
    customerName: getUserById(customerId)?.name ?? 'Customer',
    bookingId: bookingDetails.booking.id,
    bookingReference: bookingDetails.booking.bookingReference,
    bookingStatus: bookingDetails.booking.status,
    paymentStatus: bookingDetails.booking.paymentStatus,
    currency: bookingDetails.booking.currency,
    totalAmount: bookingDetails.booking.total,
    passengerCount: bookingDetails.booking.passengerCount,
    flightId: flightDetails.flight.id,
    flightNumber: flightDetails.flight.flightNumber,
    flightStatus: flightDetails.flight.status,
    originCode: flightDetails.origin.code,
    originCity: flightDetails.origin.city,
    originAirportName: flightDetails.origin.name,
    destinationCode: flightDetails.destination.code,
    destinationCity: flightDetails.destination.city,
    destinationAirportName: flightDetails.destination.name,
    departureAt: normalizeDateTime(flightDetails.flight.departureDate, flightDetails.flight.departureTime),
    arrivalAt: normalizeDateTime(flightDetails.flight.arrivalDate, flightDetails.flight.arrivalTime),
    gate: flightDetails.flight.gate,
    terminal: flightDetails.flight.terminal,
    passengers,
    canCheckIn: availablePassengers.length > 0,
    unavailableReason,
  };
}
