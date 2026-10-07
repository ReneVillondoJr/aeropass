'use client';

import { useMemo, useState } from 'react';

import {
  buildRefundStats,
  buildRefundViewModels,
  filterRefundViewModels,
} from '../data/refund';

import type { RefundFilters } from '../types/refund';

const initialFilters: RefundFilters = {
  search: '',
  status: 'ALL',
  paymentMethod: 'ALL',
};

export function useRefunds() {
  const [filters, setFilters] = useState<RefundFilters>(initialFilters);

  const [selectedRefundId, setSelectedRefundId] = useState<string | null>(null);

  const refunds = useMemo(() => buildRefundViewModels(), []);

  const stats = useMemo(() => buildRefundStats(refunds), [refunds]);

  const filteredRefunds = useMemo(
    () => filterRefundViewModels(refunds, filters),
    [refunds, filters],
  );

  const selectedRefund =
    filteredRefunds.find((item) => item.id === selectedRefundId) ??
    filteredRefunds[0] ??
    null;

  const hasFilters =
    filters.search.trim().length > 0 ||
    filters.status !== 'ALL' ||
    filters.paymentMethod !== 'ALL';

  function updateSearch(value: string) {
    setFilters((current) => ({
      ...current,
      search: value,
    }));
  }

  function updateStatus(value: RefundFilters['status']) {
    setFilters((current) => ({
      ...current,
      status: value,
    }));
  }

  function updatePaymentMethod(value: RefundFilters['paymentMethod']) {
    setFilters((current) => ({
      ...current,
      paymentMethod: value,
    }));
  }

  function resetFilters() {
    setFilters(initialFilters);
    setSelectedRefundId(null);
  }

  return {
    refunds,
    filteredRefunds,
    selectedRefund,

    selectedRefundId: selectedRefund?.id ?? null,

    stats,
    filters,
    hasFilters,

    updateSearch,
    updateStatus,
    updatePaymentMethod,

    resetFilters,

    selectRefund: setSelectedRefundId,
  };
}
