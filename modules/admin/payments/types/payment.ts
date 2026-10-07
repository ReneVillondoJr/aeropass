import type { PaymentMethod, PaymentStatus } from '@/data/aeropass';

export type PaymentStatusFilter = 'ALL' | PaymentStatus;

export type PaymentMethodFilter = 'ALL' | PaymentMethod;

export interface PaymentAttemptViewModel {
  id: string;
  reference: string;
  method: PaymentMethod;
  amount: number;
  status: PaymentStatus;
  attemptedAt: string;
}

export interface PaymentViewModel {
  id: string;

  bookingId: string;
  bookingReference: string | null;
  bookingStatus: string | null;

  provider: string;
  providerReference: string;

  paymentMethod: PaymentMethod;
  amount: number;
  currency: 'PHP';
  status: PaymentStatus;

  paidAt: string | null;
  createdAt: string;

  customerName: string | null;

  passengerId: string | null;
  passengerName: string | null;
  passengerEmail: string | null;

  flightId: string | null;
  flightNumber: string | null;

  departureDate: string | null;
  departureTime: string | null;

  arrivalDate: string | null;
  arrivalTime: string | null;

  originCode: string | null;
  originCity: string | null;

  destinationCode: string | null;
  destinationCity: string | null;

  paymentAttempts: PaymentAttemptViewModel[];

  latestAttemptStatus: string | null;
  attemptCount: number;

  refundId: string | null;
  refundAmount: number | null;
  refundStatus: string | null;
  refundReason: string | null;

  bookingTotal: number | null;
}

export interface PaymentStats {
  total: number;
  paid: number;
  pending: number;
  processing: number;
  failed: number;
  cancelled: number;
  refunded: number;

  paidAmount: number;
  pendingAmount: number;
}

export interface PaymentFilters {
  search: string;
  status: PaymentStatusFilter;
  method: PaymentMethodFilter;
}
