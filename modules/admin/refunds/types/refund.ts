import type { PaymentMethod, RefundStatus } from '@/data/aeropass';

export type RefundStatusFilter = 'ALL' | RefundStatus;

export type RefundPaymentMethodFilter = 'ALL' | PaymentMethod;

export interface RefundViewModel {
  id: string;

  bookingId: string;
  bookingReference: string | null;
  bookingStatus: string | null;

  paymentId: string;
  providerReference: string | null;

  amount: number;
  reason: string;
  status: RefundStatus;

  requestedBy: string;
  requestedByEmail: string | null;

  requestedAt: string;
  processedAt: string | null;

  paymentMethod: PaymentMethod | null;
  paymentAmount: number | null;
  paymentStatus: string | null;
  paymentPaidAt: string | null;

  customerName: string | null;

  passengerId: string | null;
  passengerName: string | null;
  passengerEmail: string | null;
  passengerPhone: string | null;

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

  bookingTotal: number | null;
}

export interface RefundStats {
  total: number;

  requested: number;
  processing: number;
  completed: number;
  rejected: number;

  totalAmount: number;
  processingAmount: number;
  completedAmount: number;
}

export interface RefundFilters {
  search: string;
  status: RefundStatusFilter;
  paymentMethod: RefundPaymentMethodFilter;
}
