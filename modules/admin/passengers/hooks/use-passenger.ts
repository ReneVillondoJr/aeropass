'use client';

import { useMemo, useState } from 'react';

import {
  buildPassengerStats,
  buildPassengerViewModels,
  filterPassengerViewModels,
} from '../data/passenger';

import type { PassengerFilters } from '../types/passenger';

const initialFilters: PassengerFilters = {
  search: '',
  gender: 'ALL',
  bookingStatus: 'ALL',
  assistance: 'ALL',
};

export function usePassengers() {
  const [filters, setFilters] = useState<PassengerFilters>(initialFilters);

  const [selectedPassengerId, setSelectedPassengerId] = useState<string | null>(
    null,
  );

  const passengers = useMemo(() => buildPassengerViewModels(), []);

  const stats = useMemo(() => buildPassengerStats(passengers), [passengers]);

  const filteredPassengers = useMemo(
    () => filterPassengerViewModels(passengers, filters),
    [passengers, filters],
  );

  const selectedPassenger =
    filteredPassengers.find((item) => item.id === selectedPassengerId) ??
    filteredPassengers[0] ??
    null;

  const hasFilters =
    filters.search.trim().length > 0 ||
    filters.gender !== 'ALL' ||
    filters.bookingStatus !== 'ALL' ||
    filters.assistance !== 'ALL';

  function updateSearch(value: string) {
    setFilters((current) => ({
      ...current,
      search: value,
    }));
  }

  function updateGender(value: PassengerFilters['gender']) {
    setFilters((current) => ({
      ...current,
      gender: value,
    }));
  }

  function updateBookingStatus(value: PassengerFilters['bookingStatus']) {
    setFilters((current) => ({
      ...current,
      bookingStatus: value,
    }));
  }

  function updateAssistance(value: PassengerFilters['assistance']) {
    setFilters((current) => ({
      ...current,
      assistance: value,
    }));
  }

  function resetFilters() {
    setFilters(initialFilters);
    setSelectedPassengerId(null);
  }

  return {
    passengers,
    filteredPassengers,
    selectedPassenger,
    selectedPassengerId: selectedPassenger?.id ?? null,
    stats,
    filters,
    hasFilters,
    updateSearch,
    updateGender,
    updateBookingStatus,
    updateAssistance,
    resetFilters,
    selectPassenger: setSelectedPassengerId,
  };
}
