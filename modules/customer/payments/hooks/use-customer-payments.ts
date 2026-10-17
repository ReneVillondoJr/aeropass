'use client';

import { useMemo, useState } from 'react';

import { getCustomerPaymentsView } from '../data/payment-view';
import type {
  CustomerPaymentCounts,
  CustomerPaymentStatusFilter,
} from '../types/payment';

const ALL_STATUSES: CustomerPaymentStatusFilter[] = [
  'ALL',
  'PENDING',
  'PROCESSING',
  'PAID',
  'FAILED',
  'CANCELLED',
  'REFUNDED',
];

export function useCustomerPayments(customerId: string) {
  const view = useMemo(() => getCustomerPaymentsView(customerId), [customerId]);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<CustomerPaymentStatusFilter>('ALL');

  const counts = useMemo(() => {
    const nextCounts = Object.fromEntries(
      ALL_STATUSES.map((value) => [value, 0]),
    ) as CustomerPaymentCounts;

    nextCounts.ALL = view.payments.length;

    for (const payment of view.payments) {
      nextCounts[payment.status] += 1;
    }

    return nextCounts;
  }, [view.payments]);

  const filteredPayments = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return view.payments.filter((payment) => {
      const matchesStatus = status === 'ALL' || payment.status === status;
      if (!matchesStatus) return false;
      if (!normalizedSearch) return true;

      const searchable = [
        payment.providerReference,
        payment.bookingReference,
        payment.bookingId,
        payment.paymentMethod,
        payment.status,
        payment.flightNumber,
        payment.originCode,
        payment.originCity,
        payment.destinationCode,
        payment.destinationCity,
        payment.refund?.status,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();

      return searchable.includes(normalizedSearch);
    });
  }, [view.payments, search, status]);

  const hasFilters = search.trim().length > 0 || status !== 'ALL';

  function resetFilters() {
    setSearch('');
    setStatus('ALL');
  }

  return {
    view,
    search,
    setSearch,
    status,
    setStatus,
    counts,
    filteredPayments,
    hasFilters,
    resetFilters,
  };
}
