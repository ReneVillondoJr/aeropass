import type { BookingCardData } from '@/components/customer/shared/booking-card';
import type { BookingStatus, FlightStatus, PaymentMethod, PaymentStatus } from '@/data/aeropass';

export type BookingScope = 'ALL' | 'UPCOMING' | 'PAST' | 'ACTION_REQUIRED' | 'CANCELLED';
export type BookingStatusFilter = BookingStatus | 'ALL_STATUSES';

export interface CustomerBookingItem extends BookingCardData {
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethod;
  createdAt: string;
  expiresAt: string | null;
  departureTimestamp: number | null;
  flightStatus: FlightStatus;
  isUpcoming: boolean;
  isPast: boolean;
  isCancelled: boolean;
  needsAttention: boolean;
  ticketCount: number;
}

export interface BookingStatsSummary {
  total: number;
  upcoming: number;
  needsAttention: number;
  cancelled: number;
}

export interface CustomerBookingsView {
  accountAvailable: boolean;
  customerName: string;
  bookings: CustomerBookingItem[];
  stats: BookingStatsSummary;
}

export interface BookingPassengerView {
  id: string;
  fullName: string;
  email: string;
  phone: string;
}

export interface BookingReservationView {
  id: string;
  passengerName: string;
  seatNumber: string;
  fareClassName: string;
  status: string;
  price: number;
}

export interface BookingTicketView {
  id: string;
  ticketNumber: string;
  passengerName: string;
  status: string;
}

export interface BookingPaymentView {
  providerReference: string;
  paymentMethod: PaymentMethod;
  amount: number;
  status: PaymentStatus;
  paidAt: string | null;
}

export interface BookingRefundView {
  amount: number;
  reason: string;
  status: string;
  requestedAt: string;
  processedAt: string | null;
}

export interface CustomerBookingDetailView extends CustomerBookingItem {
  flightStatus: FlightStatus;
  gate: string;
  terminal: string;
  originAirportName: string;
  destinationAirportName: string;
  subtotal: number;
  taxes: number;
  fees: number;
  baggageFees: number;
  seatFees: number;
  discount: number;
  passengers: BookingPassengerView[];
  reservations: BookingReservationView[];
  tickets: BookingTicketView[];
  payment: BookingPaymentView | null;
  refund: BookingRefundView | null;
}
