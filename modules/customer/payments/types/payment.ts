import type {
  PaymentMethod,
  PaymentStatus,
  RefundStatus,
} from '@/data/aeropass';

export type CustomerPaymentStatusFilter = PaymentStatus | 'ALL';

export interface CustomerPaymentRefundView {
  id: string;
  amount: number;
  reason: string;
  status: RefundStatus;
  requestedAt: string;
  processedAt: string | null;
}

export interface CustomerPaymentItem {
  id: string;
  bookingId: string;
  bookingReference: string;
  provider: 'LOCAL_MOCK';
  providerReference: string;
  paymentMethod: PaymentMethod;
  amount: number;
  currency: 'PHP';
  status: PaymentStatus;
  paidAt: string | null;
  createdAt: string;
  bookingStatus: string;
  flightNumber: string;
  originCode: string;
  originCity: string;
  destinationCode: string;
  destinationCity: string;
  departureAt: string;
  refund: CustomerPaymentRefundView | null;
}

export interface CustomerPaymentStats {
  total: number;
  pending: number;
  paidAmount: number;
  refundRequests: number;
}

export interface CustomerPaymentsView {
  accountAvailable: boolean;
  customerName: string;
  payments: CustomerPaymentItem[];
  stats: CustomerPaymentStats;
}

export interface CustomerPaymentAttemptView {
  id: string;
  reference: string;
  method: PaymentMethod;
  amount: number;
  status: PaymentStatus;
  attemptedAt: string;
}

export interface CustomerPaymentDetailView extends CustomerPaymentItem {
  subtotal: number;
  taxes: number;
  fees: number;
  baggageFees: number;
  seatFees: number;
  discount: number;
  bookingTotal: number;
  paymentAttempts: CustomerPaymentAttemptView[];
}

export type CustomerPaymentCounts = Record<CustomerPaymentStatusFilter, number>;
