import {
  getBookingDetails,
  getPaymentById,
  getRefundById,
  getUserById,
  refunds,
} from '@/data/aeropass';

import type {
  RefundFilters,
  RefundStats,
  RefundViewModel,
} from '../types/refund';

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

function getFullName(
  firstName: string,
  middleName: string | undefined,
  lastName: string,
) {
  return [firstName, middleName, lastName].filter(Boolean).join(' ');
}

export function buildRefundViewModels(): RefundViewModel[] {
  return refunds
    .map<RefundViewModel | null>((refund) => {
      const refundRecord = getRefundById(refund.id);

      if (!refundRecord) {
        return null;
      }

      const bookingDetails = getBookingDetails(refundRecord.bookingId);

      if (!bookingDetails) {
        return null;
      }

      const booking = bookingDetails.booking;

      const payment = getPaymentById(refundRecord.paymentId);

      const passenger = bookingDetails.passengers[0];

      const customer = getUserById(booking.customerId);

      const requestedBy = getUserById(refundRecord.requestedBy);

      const flightDetails = bookingDetails.flight;

      return {
        id: refundRecord.id,

        bookingId: refundRecord.bookingId,

        bookingReference: booking.bookingReference,

        bookingStatus: formatStatus(booking.status),

        paymentId: refundRecord.paymentId,

        providerReference: payment?.providerReference ?? null,

        amount: refundRecord.amount,

        reason: refundRecord.reason,

        status: refundRecord.status,

        requestedBy: requestedBy?.name ?? refundRecord.requestedBy,

        requestedByEmail: requestedBy?.email ?? null,

        requestedAt: refundRecord.requestedAt,

        processedAt: refundRecord.processedAt,

        paymentMethod: payment?.paymentMethod ?? null,

        paymentAmount: payment?.amount ?? null,

        paymentStatus: formatStatus(payment?.status),

        paymentPaidAt: payment?.paidAt ?? null,

        customerName: customer?.name ?? null,

        passengerId: passenger?.id ?? null,

        passengerName:
          passenger ?
            getFullName(
              passenger.firstName,
              passenger.middleName,
              passenger.lastName,
            )
          : null,

        passengerEmail: passenger?.email ?? null,

        passengerPhone: passenger?.phone ?? null,

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

        bookingTotal: booking.total,
      };
    })
    .filter((item): item is RefundViewModel => item !== null)
    .sort((a, b) => b.requestedAt.localeCompare(a.requestedAt));
}

export function buildRefundStats(items: RefundViewModel[]): RefundStats {
  return {
    total: items.length,

    requested: items.filter((item) => item.status === 'REQUESTED').length,

    processing: items.filter((item) => item.status === 'PROCESSING').length,

    completed: items.filter((item) => item.status === 'COMPLETED').length,

    rejected: items.filter((item) => item.status === 'REJECTED').length,

    totalAmount: items.reduce((total, item) => total + item.amount, 0),

    processingAmount: items
      .filter((item) => item.status === 'PROCESSING')
      .reduce((total, item) => total + item.amount, 0),

    completedAmount: items
      .filter((item) => item.status === 'COMPLETED')
      .reduce((total, item) => total + item.amount, 0),
  };
}

export function filterRefundViewModels(
  items: RefundViewModel[],
  filters: RefundFilters,
) {
  const search = filters.search.trim().toLowerCase();

  return items.filter((item) => {
    if (filters.status !== 'ALL' && item.status !== filters.status) {
      return false;
    }

    if (
      filters.paymentMethod !== 'ALL' &&
      item.paymentMethod !== filters.paymentMethod
    ) {
      return false;
    }

    if (!search) {
      return true;
    }

    const searchable = [
      item.bookingReference,
      item.bookingStatus,
      item.providerReference,
      item.paymentMethod,
      item.paymentStatus,
      item.customerName,
      item.passengerName,
      item.passengerEmail,
      item.passengerPhone,
      item.flightNumber,
      item.originCode,
      item.originCity,
      item.destinationCode,
      item.destinationCity,
      item.requestedBy,
      item.requestedByEmail,
      item.reason,
      item.status,
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();

    return searchable.includes(search);
  });
}
