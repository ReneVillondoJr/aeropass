import {
  getBookingById,
  getBookingsByCustomerId,
  getFlightDetails,
  getPaymentById,
  getPaymentAttemptsByBookingId,
  getRefundByBookingId,
  getUserById,
  payments as paymentRecords,
} from '@/data/aeropass';

import type {
  CustomerPaymentAttemptView,
  CustomerPaymentDetailView,
  CustomerPaymentItem,
  CustomerPaymentsView,
  CustomerPaymentStats,
} from '../types/payment';

function isActiveCustomer(customerId: string): boolean {
  const customer = getUserById(customerId);
  return Boolean(
    customer && customer.role === 'CUSTOMER' && customer.status === 'ACTIVE',
  );
}

function emptyStats(): CustomerPaymentStats {
  return {
    total: 0,
    pending: 0,
    paidAmount: 0,
    refundRequests: 0,
  };
}

function emptyView(): CustomerPaymentsView {
  return {
    accountAvailable: false,
    customerName: 'Customer',
    payments: [],
    stats: emptyStats(),
  };
}

function toPaymentItem(paymentId: string, customerId: string): CustomerPaymentItem | null {
  const payment = getPaymentById(paymentId);
  if (!payment) return null;

  const booking = getBookingById(payment.bookingId);
  if (!booking || booking.customerId !== customerId) return null;

  const flightDetails = getFlightDetails(booking.flightId);
  if (!flightDetails?.flight || !flightDetails.origin || !flightDetails.destination) {
    return null;
  }

  const refundRecord = getRefundByBookingId(booking.id);
  const refund = refundRecord
    ? {
        id: refundRecord.id,
        amount: refundRecord.amount,
        reason: refundRecord.reason,
        status: refundRecord.status,
        requestedAt: refundRecord.requestedAt,
        processedAt: refundRecord.processedAt,
      }
    : null;

  return {
    id: payment.id,
    bookingId: booking.id,
    bookingReference: booking.bookingReference,
    provider: payment.provider,
    providerReference: payment.providerReference,
    paymentMethod: payment.paymentMethod,
    amount: payment.amount,
    currency: payment.currency,
    status: payment.status,
    paidAt: payment.paidAt,
    createdAt: payment.createdAt,
    bookingStatus: booking.status,
    flightNumber: flightDetails.flight.flightNumber,
    originCode: flightDetails.origin.code,
    originCity: flightDetails.origin.city,
    destinationCode: flightDetails.destination.code,
    destinationCity: flightDetails.destination.city,
    departureAt: `${flightDetails.flight.departureDate}T${flightDetails.flight.departureTime.length === 5 ? `${flightDetails.flight.departureTime}:00` : flightDetails.flight.departureTime}+08:00`,
    refund,
  };
}

function isPendingStatus(status: string): boolean {
  return status === 'PENDING' || status === 'PROCESSING';
}

export function getCustomerPaymentsView(customerId: string): CustomerPaymentsView {
  const customer = getUserById(customerId);
  if (!customer || !isActiveCustomer(customerId)) return emptyView();

  const customerBookingIds = new Set(
    getBookingsByCustomerId(customerId).map((booking) => booking.id),
  );

  const payments = paymentRecords
    .filter((payment) => customerBookingIds.has(payment.bookingId))
    .map((payment) => toPaymentItem(payment.id, customerId))
    .filter((payment): payment is CustomerPaymentItem => payment !== null)
    .sort(
      (left, right) =>
        new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime(),
    );

  const stats: CustomerPaymentStats = {
    total: payments.length,
    pending: payments.filter((payment) => isPendingStatus(payment.status)).length,
    paidAmount: payments
      .filter((payment) => payment.status === 'PAID')
      .reduce((total, payment) => total + payment.amount, 0),
    refundRequests: payments.filter((payment) => payment.refund !== null).length,
  };

  return {
    accountAvailable: true,
    customerName: customer.name,
    payments,
    stats,
  };
}

export function getCustomerPaymentDetailView(
  customerId: string,
  paymentId: string,
): CustomerPaymentDetailView | null {
  if (!isActiveCustomer(customerId)) return null;

  const payment = getPaymentById(paymentId);
  if (!payment) return null;

  const booking = getBookingById(payment.bookingId);
  if (!booking || booking.customerId !== customerId) return null;

  const item = toPaymentItem(paymentId, customerId);
  if (!item) return null;

  const paymentAttempts: CustomerPaymentAttemptView[] = getPaymentAttemptsByBookingId(
    booking.id,
  )
    .map((attempt) => ({
      id: attempt.id,
      reference: attempt.reference,
      method: attempt.method,
      amount: attempt.amount,
      status: attempt.status,
      attemptedAt: attempt.attemptedAt,
    }))
    .sort(
      (left, right) =>
        new Date(right.attemptedAt).getTime() - new Date(left.attemptedAt).getTime(),
    );

  return {
    ...item,
    subtotal: booking.subtotal,
    taxes: booking.taxes,
    fees: booking.fees,
    baggageFees: booking.baggageFees,
    seatFees: booking.seatFees,
    discount: booking.discount,
    bookingTotal: booking.total,
    paymentAttempts,
  };
}
