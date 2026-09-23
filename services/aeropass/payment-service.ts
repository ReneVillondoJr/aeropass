import { paymentAttempts, payments, refunds } from '@/data/aeropass';

export function getPaymentById(paymentId: string) {
  return payments.find((payment) => payment.id === paymentId);
}

export function getPaymentByBookingId(bookingId: string) {
  return payments.find((payment) => payment.bookingId === bookingId);
}

export function getPaymentAttempts(bookingId: string) {
  return paymentAttempts.filter((attempt) => attempt.bookingId === bookingId);
}

export function getRefundByBookingId(bookingId: string) {
  return refunds.find((refund) => refund.bookingId === bookingId);
}

export function getPaymentDetails(bookingId: string) {
  return {
    payment: getPaymentByBookingId(bookingId),

    attempts: getPaymentAttempts(bookingId),

    refund: getRefundByBookingId(bookingId),
  };
}
