'use client';

import { useMemo, useState } from 'react';

import {
  buildPaymentStats,
  buildPaymentViewModels,
  filterPaymentViewModels,
} from '../data/payment';

import type { PaymentFilters } from '../types/payment';

const initialFilters: PaymentFilters = {
  search: '',
  status: 'ALL',
  method: 'ALL',
};

export function usePayments() {
  const [filters, setFilters] = useState<PaymentFilters>(initialFilters);

  const [selectedPaymentId, setSelectedPaymentId] = useState<string | null>(
    null,
  );

  const payments = useMemo(() => buildPaymentViewModels(), []);

  const stats = useMemo(() => buildPaymentStats(payments), [payments]);

  const filteredPayments = useMemo(
    () => filterPaymentViewModels(payments, filters),
    [payments, filters],
  );

  const selectedPayment =
    filteredPayments.find((item) => item.id === selectedPaymentId) ??
    filteredPayments[0] ??
    null;

  const hasFilters =
    filters.search.trim().length > 0 ||
    filters.status !== 'ALL' ||
    filters.method !== 'ALL';

  function updateSearch(value: string) {
    setFilters((current) => ({
      ...current,
      search: value,
    }));
  }

  function updateStatus(value: PaymentFilters['status']) {
    setFilters((current) => ({
      ...current,
      status: value,
    }));
  }

  function updateMethod(value: PaymentFilters['method']) {
    setFilters((current) => ({
      ...current,
      method: value,
    }));
  }

  function resetFilters() {
    setFilters(initialFilters);
    setSelectedPaymentId(null);
  }

  return {
    payments,
    filteredPayments,
    selectedPayment,

    selectedPaymentId: selectedPayment?.id ?? null,

    stats,
    filters,
    hasFilters,

    updateSearch,
    updateStatus,
    updateMethod,

    resetFilters,

    selectPayment: setSelectedPaymentId,
  };
}
