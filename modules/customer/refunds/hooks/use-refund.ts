'use client';

import { useMemo, useState } from 'react';

import type {
  CustomerRefundCounts,
  CustomerRefundRecord,
  CustomerRefundStats,
  CustomerRefundStatusFilter,
} from '../types/refund';

interface UseCustomerRefundsResult {
  search: string;
  setSearch: (value: string) => void;
  status: CustomerRefundStatusFilter;
  setStatus: (value: CustomerRefundStatusFilter) => void;
  counts: CustomerRefundCounts;
  stats: CustomerRefundStats;
  filteredRefunds: CustomerRefundRecord[];
  hasFilters: boolean;
  resetFilters: () => void;
}

export function useCustomerRefunds(
  initialRefunds: CustomerRefundRecord[],
): UseCustomerRefundsResult {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<CustomerRefundStatusFilter>('ALL');

  const counts = useMemo<CustomerRefundCounts>(() => {
    const result: CustomerRefundCounts = {
      ALL: initialRefunds.length,
      REQUESTED: 0,
      PROCESSING: 0,
      COMPLETED: 0,
      REJECTED: 0,
    };

    for (const record of initialRefunds) {
      result[record.refund.status] += 1;
    }

    return result;
  }, [initialRefunds]);

  const stats = useMemo<CustomerRefundStats>(() => {
    return {
      total: initialRefunds.length,

      requested: initialRefunds.filter(
        (record) => record.refund.status === 'REQUESTED',
      ).length,

      processing: initialRefunds.filter(
        (record) => record.refund.status === 'PROCESSING',
      ).length,

      completed: initialRefunds.filter(
        (record) => record.refund.status === 'COMPLETED',
      ).length,

      rejected: initialRefunds.filter(
        (record) => record.refund.status === 'REJECTED',
      ).length,

      completedAmount: initialRefunds
        .filter((record) => record.refund.status === 'COMPLETED')
        .reduce((total, record) => total + record.refund.amount, 0),
    };
  }, [initialRefunds]);

  const hasFilters = search.trim().length > 0 || status !== 'ALL';

  const filteredRefunds = useMemo(() => {
    const query = search.trim().toLowerCase();

    return initialRefunds.filter((record) => {
      if (status !== 'ALL' && record.refund.status !== status) {
        return false;
      }

      if (!query) {
        return true;
      }

      const searchableText = [
        record.refund.id,
        record.refund.reason,
        record.refund.status,
        record.booking.bookingReference,
        record.flight.flightNumber,
        record.flight.origin.code,
        record.flight.origin.city,
        record.flight.destination.code,
        record.flight.destination.city,
        record.payment?.providerReference ?? '',
        record.payment?.paymentMethod ?? '',
        record.passengerNames.join(' '),
      ]
        .join(' ')
        .toLowerCase();

      return searchableText.includes(query);
    });
  }, [initialRefunds, search, status]);

  function resetFilters() {
    setSearch('');
    setStatus('ALL');
  }

  return {
    search,
    setSearch,
    status,
    setStatus,
    counts,
    stats,
    filteredRefunds,
    hasFilters,
    resetFilters,
  };
}
