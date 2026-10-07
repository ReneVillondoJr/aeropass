'use client';

import { useMemo, useState } from 'react';

import {
  buildCheckInStats,
  buildCheckInViewModels,
  filterCheckInViewModels,
} from '../data/check-in';

import type { CheckInFilters } from '../types/check-in';

const initialFilters: CheckInFilters = {
  search: '',
  status: 'ALL',
  method: 'ALL',
  boarding: 'ALL',
};

export function useCheckIns() {
  const [filters, setFilters] = useState<CheckInFilters>(initialFilters);

  const [selectedCheckInId, setSelectedCheckInId] = useState<string | null>(
    null,
  );

  const checkIns = useMemo(() => buildCheckInViewModels(), []);

  const stats = useMemo(() => buildCheckInStats(checkIns), [checkIns]);

  const filteredCheckIns = useMemo(
    () => filterCheckInViewModels(checkIns, filters),
    [checkIns, filters],
  );

  const selectedCheckIn =
    filteredCheckIns.find((item) => item.id === selectedCheckInId) ??
    filteredCheckIns[0] ??
    null;

  const hasFilters =
    filters.search.trim().length > 0 ||
    filters.status !== 'ALL' ||
    filters.method !== 'ALL' ||
    filters.boarding !== 'ALL';

  function updateSearch(value: string) {
    setFilters((current) => ({
      ...current,
      search: value,
    }));
  }

  function updateStatus(value: CheckInFilters['status']) {
    setFilters((current) => ({
      ...current,
      status: value,
    }));
  }

  function updateMethod(value: CheckInFilters['method']) {
    setFilters((current) => ({
      ...current,
      method: value,
    }));
  }

  function updateBoarding(value: CheckInFilters['boarding']) {
    setFilters((current) => ({
      ...current,
      boarding: value,
    }));
  }

  function resetFilters() {
    setFilters(initialFilters);
    setSelectedCheckInId(null);
  }

  return {
    checkIns,
    filteredCheckIns,
    selectedCheckIn,

    selectedCheckInId: selectedCheckIn?.id ?? null,

    stats,
    filters,
    hasFilters,

    updateSearch,
    updateStatus,
    updateMethod,
    updateBoarding,

    resetFilters,

    selectCheckIn: setSelectedCheckInId,
  };
}
