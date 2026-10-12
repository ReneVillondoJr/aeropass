import {
  checkIns,
  getBookingsByCustomerId,
  getCustomerNotifications,
  getFareClassById,
  getFlightDetails,
  getReservationsByBookingId,
  getTicketsByBookingId,
  getUserById,
  type Booking,
  type Flight,
} from '@/data/aeropass';
import type { BookingCardData } from '@/components/customer/shared/booking-card';

import type {
  CustomerDashboardView,
  DashboardNotificationView,
  DashboardStat,
  UpcomingTripView,
} from '../types/customer-dashboard';

const ACTIVE_BOOKING_STATUSES = new Set(['CONFIRMED', 'CHECKED_IN']);
const ISSUED_TICKET_STATUSES = new Set(['VALID', 'USED']);
const PENDING_PAYMENT_STATUSES = new Set(['PENDING', 'PROCESSING']);
const NON_UPCOMING_FLIGHT_STATUSES = new Set(['CANCELLED', 'DEPARTED', 'ARRIVED']);

/** AeroPass demo flights and airports use Asia/Manila local time. */
function toManilaDateTime(date: string, time: string): Date {
  const normalizedTime = /^\d{2}:\d{2}$/.test(time) ? `${time}:00` : time;
  return new Date(`${date}T${normalizedTime}+08:00`);
}

function formatDuration(durationMinutes: number): string {
  const hours = Math.floor(durationMinutes / 60);
  const minutes = durationMinutes % 60;

  if (hours === 0) return `${minutes}m`;
  if (minutes === 0) return `${hours}h`;
  return `${hours}h ${minutes}m`;
}

function countIssuedTickets(bookingId: string): number {
  return getTicketsByBookingId(bookingId).filter((ticket) =>
    ISSUED_TICKET_STATUSES.has(ticket.status),
  ).length;
}

function getCheckInState(booking: Booking, flight: Flight, bookingId: string) {
  const completedCheckIn = checkIns.some(
    (checkIn) => checkIn.bookingId === bookingId && checkIn.status === 'COMPLETED',
  );

  if (booking.status === 'CHECKED_IN' || completedCheckIn) return 'COMPLETED' as const;

  const hasValidTicket = getTicketsByBookingId(bookingId).some(
    (ticket) => ticket.status === 'VALID',
  );

  if (flight.status === 'CHECK_IN_OPEN' && hasValidTicket) return 'OPEN' as const;
  if (!NON_UPCOMING_FLIGHT_STATUSES.has(flight.status)) return 'UPCOMING' as const;
  return 'UNAVAILABLE' as const;
}

function toBookingCard(booking: Booking): BookingCardData | null {
  const details = getFlightDetails(booking.flightId);

  if (!details?.flight || !details.origin || !details.destination) {
    return null;
  }

  const flight = details.flight;
  const firstReservation = getReservationsByBookingId(booking.id)[0];
  const fareClass = firstReservation
    ? getFareClassById(firstReservation.fareClassId)
    : undefined;

  return {
    id: booking.id,
    bookingReference: booking.bookingReference,
    status: booking.status,
    originCode: details.origin.code,
    originCity: details.origin.city,
    destinationCode: details.destination.code,
    destinationCity: details.destination.city,
    departureAt: toManilaDateTime(flight.departureDate, flight.departureTime),
    arrivalAt: toManilaDateTime(flight.arrivalDate, flight.arrivalTime),
    flightNumber: flight.flightNumber,
    duration: formatDuration(flight.durationMinutes),
    passengerCount: booking.passengerCount,
    cabinClass: fareClass?.cabinClass,
    totalAmount: booking.total,
    currency: booking.currency,
  };
}

function toUpcomingTrip(booking: Booking, now: Date): UpcomingTripView | null {
  const details = getFlightDetails(booking.flightId);
  const bookingCard = toBookingCard(booking);

  if (!details?.flight || !bookingCard) return null;

  const departureAt = bookingCard.departureAt;
  const departureDateTime = departureAt instanceof Date ? departureAt : new Date(departureAt ?? '');

  if (
    !ACTIVE_BOOKING_STATUSES.has(booking.status) ||
    Number.isNaN(departureDateTime.getTime()) ||
    departureDateTime < now ||
    NON_UPCOMING_FLIGHT_STATUSES.has(details.flight.status)
  ) {
    return null;
  }

  return {
    ...bookingCard,
    flightStatus: details.flight.status,
    gate: details.flight.gate,
    terminal: details.flight.terminal,
    checkInState: getCheckInState(booking, details.flight, booking.id),
    issuedTicketCount: countIssuedTickets(booking.id),
  };
}

function emptyDashboard(customerId: string): CustomerDashboardView {
  return {
    accountAvailable: false,
    customerId,
    customerName: 'Customer',
    customerEmail: '',
    stats: [
      { id: 'bookings', label: 'My bookings', value: 0, description: 'All reservations', icon: 'bookings' },
      { id: 'upcoming-trips', label: 'Upcoming trips', value: 0, description: 'Confirmed travel plans', icon: 'flights' },
      { id: 'tickets', label: 'Issued tickets', value: 0, description: 'Valid or used tickets', icon: 'tickets' },
      { id: 'notifications', label: 'Unread updates', value: 0, description: 'Travel notifications', icon: 'notifications' },
    ],
    upcomingTrip: null,
    recentBookings: [],
    recentNotifications: [],
    unreadNotificationCount: 0,
    pendingPaymentCount: 0,
    pendingPaymentAmount: 0,
  };
}

export function getCustomerDashboardView(
  customerId: string,
  now: Date = new Date(),
): CustomerDashboardView {
  const customer = getUserById(customerId);

  // Fail closed: do not expose customer records for unknown, inactive, or non-customer accounts.
  if (!customer || customer.role !== 'CUSTOMER' || customer.status !== 'ACTIVE') {
    return emptyDashboard(customerId);
  }

  const customerBookings = getBookingsByCustomerId(customerId).sort(
    (left, right) => new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime(),
  );

  const upcomingTrips = customerBookings
    .map((booking) => toUpcomingTrip(booking, now))
    .filter((booking): booking is UpcomingTripView => booking !== null)
    .sort((left, right) => {
      const leftTime = left.departureAt instanceof Date ? left.departureAt.getTime() : 0;
      const rightTime = right.departureAt instanceof Date ? right.departureAt.getTime() : 0;
      return leftTime - rightTime;
    });

  const recentBookings = customerBookings
    .map(toBookingCard)
    .filter((booking): booking is BookingCardData => booking !== null)
    .slice(0, 3);

  const allNotifications = getCustomerNotifications(customerId).sort(
    (left, right) => new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime(),
  );
  const recentNotifications: DashboardNotificationView[] = allNotifications
    .slice(0, 4)
    .map((notification) => ({
      id: notification.id,
      title: notification.title,
      message: notification.message,
      type: notification.type,
      read: notification.read,
      createdAt: notification.createdAt,
    }));

  const unreadNotificationCount = allNotifications.filter((notification) => !notification.read).length;
  const issuedTicketCount = customerBookings.reduce(
    (total, booking) => total + countIssuedTickets(booking.id),
    0,
  );
  const pendingBookings = customerBookings.filter((booking) =>
    PENDING_PAYMENT_STATUSES.has(booking.paymentStatus),
  );

  const stats: DashboardStat[] = [
    {
      id: 'bookings',
      label: 'My bookings',
      value: customerBookings.length,
      description: 'All reservations',
      icon: 'bookings',
    },
    {
      id: 'upcoming-trips',
      label: 'Upcoming trips',
      value: upcomingTrips.length,
      description: 'Confirmed travel plans',
      icon: 'flights',
    },
    {
      id: 'tickets',
      label: 'Issued tickets',
      value: issuedTicketCount,
      description: 'Valid or used tickets',
      icon: 'tickets',
    },
    {
      id: 'notifications',
      label: 'Unread updates',
      value: unreadNotificationCount,
      description: 'Travel notifications',
      icon: 'notifications',
    },
  ];

  return {
    accountAvailable: true,
    customerId,
    customerName: customer.name,
    customerEmail: customer.email,
    stats,
    upcomingTrip: upcomingTrips[0] ?? null,
    recentBookings,
    recentNotifications,
    unreadNotificationCount,
    pendingPaymentCount: pendingBookings.length,
    pendingPaymentAmount: pendingBookings.reduce((total, booking) => total + booking.total, 0),
  };
}
