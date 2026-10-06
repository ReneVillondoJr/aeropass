import type {
  Booking,
  BookingStatus,
  Flight,
  Payment,
  PaymentMethod,
  PaymentStatus,
  Passenger,
  Reservation,
  Refund,
  Ticket,
} from '@/data/aeropass';

export type BookingStatusFilter = 'ALL' | BookingStatus;

export type BookingPaymentStatusFilter = 'ALL' | PaymentStatus;

export type BookingPaymentMethodFilter = 'ALL' | PaymentMethod;

export interface BookingFlightView {
  flight: Flight;

  flightNumber: string;

  originCode: string;

  originCity: string;

  destinationCode: string;

  destinationCity: string;
}

export interface BookingListItem {
  booking: Booking;

  customerName: string;

  customerEmail: string;

  primaryPassengerName: string;

  flight: BookingFlightView | null;

  fareClassCode: string | null;

  fareClassName: string | null;

  totalPassengers: number;

  totalReservations: number;

  totalTickets: number;
}

export interface BookingDetailView {
  booking: Booking;

  customerName: string;

  customerEmail: string;

  customerPhone: string;

  passengers: Passenger[];

  reservations: Reservation[];

  tickets: Ticket[];

  payment: Payment | undefined;

  refund: Refund | undefined;

  flight: BookingFlightView | null;
}

export interface BookingStats {
  totalBookings: number;

  confirmedBookings: number;

  pendingPayment: number;

  checkedInBookings: number;

  cancelledBookings: number;

  refundPending: number;

  totalValue: number;

  paidValue: number;

  totalPassengers: number;
}
