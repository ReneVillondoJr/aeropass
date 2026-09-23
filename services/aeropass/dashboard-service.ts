import {
  aircraft,
  baggage,
  boarding,
  checkIns,
  flights,
  passengers,
  payments,
  refunds,
  routes,
  tickets,
  bookings,
  airports,
} from '@/data/aeropass';

import { getBookingsByCustomerId } from './booking-service';

export function getDashboardStats(date: string) {
  return {
    totalFlights: flights.length,

    todaysFlights: flights.filter((flight) => flight.departureDate === date)
      .length,

    activeFlights: flights.filter(
      (flight) => flight.status !== 'CANCELLED' && flight.status !== 'ARRIVED',
    ).length,

    totalBookings: bookings.length,

    confirmedBookings: bookings.filter(
      (booking) => booking.status === 'CONFIRMED',
    ).length,

    pendingPayments: bookings.filter(
      (booking) => booking.paymentStatus === 'PENDING',
    ).length,

    checkedInPassengers: checkIns.filter((item) => item.status === 'COMPLETED')
      .length,

    boardedPassengers: boarding.filter((item) => item.status === 'BOARDED')
      .length,

    totalTickets: tickets.length,

    validTickets: tickets.filter((ticket) => ticket.status === 'VALID').length,

    totalPassengers: passengers.length,

    totalAircraft: aircraft.length,

    activeAircraft: aircraft.filter((item) => item.status === 'ACTIVE').length,

    totalAirports: airports.length,

    totalRoutes: routes.length,
  };
}

export function getRevenueStats() {
  const paidPayments = payments.filter((payment) => payment.status === 'PAID');

  const pendingPayments = payments.filter(
    (payment) => payment.status === 'PENDING',
  );

  const completedRefunds = refunds.filter(
    (refund) => refund.status === 'COMPLETED',
  );

  return {
    grossRevenue: paidPayments.reduce(
      (sum, payment) => sum + payment.amount,
      0,
    ),

    pendingRevenue: pendingPayments.reduce(
      (sum, payment) => sum + payment.amount,
      0,
    ),

    refundedAmount: completedRefunds.reduce(
      (sum, refund) => sum + refund.amount,
      0,
    ),

    averageBookingValue:
      bookings.length > 0 ?
        Math.round(
          bookings.reduce((sum, booking) => sum + booking.total, 0) /
            bookings.length,
        )
      : 0,
  };
}

export function getRecentFlights(limit = 8) {
  return flights.slice(0, limit);
}

export function getUpcomingFlights(date: string) {
  return flights.filter(
    (flight) => flight.departureDate >= date && flight.status !== 'CANCELLED',
  );
}

export function getCustomerDashboard(userId: string, date: string) {
  const customerBookings = getBookingsByCustomerId(userId);

  return {
    userId,

    upcomingTrips: customerBookings.filter(
      (booking) =>
        ['CONFIRMED', 'CHECKED_IN'].includes(booking.status) &&
        booking.flightId &&
        flights.some(
          (flight) =>
            flight.id === booking.flightId && flight.departureDate >= date,
        ),
    ),

    recentBookings: customerBookings,

    notifications: [],
  };
}

export function getStaffDashboard(date: string) {
  return {
    todayFlights: flights.filter((flight) => flight.departureDate === date),

    todayCheckIns: checkIns.filter(
      (checkIn) =>
        checkIn.status === 'COMPLETED' && checkIn.checkedInAt?.startsWith(date),
    ),

    todayBoardings: boarding.filter((item) => item.boardedAt?.startsWith(date)),

    baggageInProgress: baggage.filter(
      (item) => item.status === 'CHECKED' || item.status === 'IN_TRANSIT',
    ),
  };
}
