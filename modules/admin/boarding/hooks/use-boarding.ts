'use client';

import { useMemo, useState } from 'react';

import {
  buildBoardingFlightOptions,
  buildBoardingStats,
  buildBoardingViewModels,
  filterBoardingViewModels,
} from '../data/boarding';

import type { BoardingFilters } from '../types/boarding';

const initialFilters: BoardingFilters = {
  search: '',
  status: 'ALL',
  checkIn: 'ALL',
  flightId: 'ALL',
};

export function useBoarding() {
  const [filters, setFilters] = useState<BoardingFilters>(initialFilters);

  const [selectedBoardingId, setSelectedBoardingId] = useState<string | null>(
    null,
  );

  const boarding = useMemo(() => buildBoardingViewModels(), []);

  const stats = useMemo(() => buildBoardingStats(boarding), [boarding]);

  const flightOptions = useMemo(
    () => buildBoardingFlightOptions(boarding),
    [boarding],
  );

  const filteredBoarding = useMemo(
    () => filterBoardingViewModels(boarding, filters),
    [boarding, filters],
  );

  const selectedBoarding =
    filteredBoarding.find((item) => item.id === selectedBoardingId) ??
    filteredBoarding[0] ??
    null;

  const hasFilters =
    filters.search.trim().length > 0 ||
    filters.status !== 'ALL' ||
    filters.checkIn !== 'ALL' ||
    filters.flightId !== 'ALL';

  function updateSearch(value: string) {
    setFilters((current) => ({
      ...current,
      search: value,
    }));
  }

  function updateStatus(value: BoardingFilters['status']) {
    setFilters((current) => ({
      ...current,
      status: value,
    }));
  }

  function updateCheckIn(value: BoardingFilters['checkIn']) {
    setFilters((current) => ({
      ...current,
      checkIn: value,
    }));
  }

  function updateFlight(value: string) {
    setFilters((current) => ({
      ...current,
      flightId: value,
    }));
  }

  function resetFilters() {
    setFilters(initialFilters);
    setSelectedBoardingId(null);
  }

  return {
    boarding,
    filteredBoarding,
    selectedBoarding,
    selectedBoardingId: selectedBoarding?.id ?? null,

    stats,
    flightOptions,
    filters,
    hasFilters,

    updateSearch,
    updateStatus,
    updateCheckIn,
    updateFlight,

    resetFilters,

    selectBoarding: setSelectedBoardingId,
  };
}
