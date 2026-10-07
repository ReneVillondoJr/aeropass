import {
  getBookingDetails,
  getPaymentById,
  getUserById,
  payments,
} from '@/data/aeropass';

import type {
  PaymentFilters,
  PaymentStats,
  PaymentViewModel,
} from '../types/payment';

function formatStatus(value: string | null | undefined) {
  if (!value) {
    return null;
  }

  return value
    .toLowerCase()
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function getPassengerName(
  firstName?: string,
  middleName?: string,
  lastName?: string,
) {
  return [firstName, middleName, lastName].filter(Boolean).join(' ');
}

export function buildPaymentViewModels(): PaymentViewModel[] {
  return payments
    .map<PaymentViewModel | null>((payment) => {
      const paymentRecord = getPaymentById(payment.id);

      if (!paymentRecord) {
        return null;
      }

      const bookingDetails = getBookingDetails(payment.bookingId);

      if (!bookingDetails) {
        return null;
      }

      const booking = bookingDetails.booking;

      const flightDetails = bookingDetails.flight;

      const passengers = bookingDetails.passengers;

      const passenger = passengers[0];

      const customer = getUserById(booking.customerId);

      const paymentAttempts = bookingDetails.paymentAttempts
        .map((attempt) => ({
          id: attempt.id,
          reference: attempt.reference,
          method: attempt.method,
          amount: attempt.amount,
          status: attempt.status,
          attemptedAt: attempt.attemptedAt,
        }))
        .sort((a, b) => b.attemptedAt.localeCompare(a.attemptedAt));

      const refund = bookingDetails.refund;

      return {
        id: paymentRecord.id,

        bookingId: paymentRecord.bookingId,

        bookingReference: booking.bookingReference,

        bookingStatus: formatStatus(booking.status),

        provider: paymentRecord.provider,

        providerReference: paymentRecord.providerReference,

        paymentMethod: paymentRecord.paymentMethod,

        amount: paymentRecord.amount,

        currency: paymentRecord.currency,

        status: paymentRecord.status,

        paidAt: paymentRecord.paidAt,

        createdAt: paymentRecord.createdAt,

        customerName: customer?.name ?? null,

        passengerId: passenger?.id ?? null,

        passengerName:
          passenger ?
            getPassengerName(
              passenger.firstName,
              passenger.middleName,
              passenger.lastName,
            )
          : null,

        passengerEmail: passenger?.email ?? null,

        flightId: flightDetails?.flight.id ?? null,

        flightNumber: flightDetails?.flight.flightNumber ?? null,

        departureDate: flightDetails?.flight.departureDate ?? null,

        departureTime: flightDetails?.flight.departureTime ?? null,

        arrivalDate: flightDetails?.flight.arrivalDate ?? null,

        arrivalTime: flightDetails?.flight.arrivalTime ?? null,

        originCode: flightDetails?.origin?.code ?? null,

        originCity: flightDetails?.origin?.city ?? null,

        destinationCode: flightDetails?.destination?.code ?? null,

        destinationCity: flightDetails?.destination?.city ?? null,

        paymentAttempts,

        latestAttemptStatus: formatStatus(paymentAttempts[0]?.status),

        attemptCount: paymentAttempts.length,

        refundId: refund?.id ?? null,

        refundAmount: refund?.amount ?? null,

        refundStatus: formatStatus(refund?.status),

        refundReason: refund?.reason ?? null,

        bookingTotal: booking.total,
      };
    })
    .filter((item): item is PaymentViewModel => item !== null)
    .sort((a, b) => {
      return b.createdAt.localeCompare(a.createdAt);
    });
}

export function buildPaymentStats(items: PaymentViewModel[]): PaymentStats {
  return {
    total: items.length,

    paid: items.filter((item) => item.status === 'PAID').length,

    pending: items.filter((item) => item.status === 'PENDING').length,

    processing: items.filter((item) => item.status === 'PROCESSING').length,

    failed: items.filter((item) => item.status === 'FAILED').length,

    cancelled: items.filter((item) => item.status === 'CANCELLED').length,

    refunded: items.filter((item) => item.status === 'REFUNDED').length,

    paidAmount: items
      .filter((item) => item.status === 'PAID')
      .reduce((total, item) => total + item.amount, 0),

    pendingAmount: items
      .filter(
        (item) => item.status === 'PENDING' || item.status === 'PROCESSING',
      )
      .reduce((total, item) => total + item.amount, 0),
  };
}

export function filterPaymentViewModels(
  items: PaymentViewModel[],
  filters: PaymentFilters,
) {
  const search = filters.search.trim().toLowerCase();

  return items.filter((item) => {
    if (filters.status !== 'ALL' && item.status !== filters.status) {
      return false;
    }

    if (filters.method !== 'ALL' && item.paymentMethod !== filters.method) {
      return false;
    }

    if (!search) {
      return true;
    }

    const searchable = [
      item.providerReference,
      item.provider,
      item.bookingReference,
      item.bookingStatus,
      item.customerName,
      item.passengerName,
      item.passengerEmail,
      item.flightNumber,
      item.originCode,
      item.originCity,
      item.destinationCode,
      item.destinationCity,
      item.paymentMethod,
      item.status,
      item.latestAttemptStatus,
      item.refundStatus,
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();

    return searchable.includes(search);
  });
}
