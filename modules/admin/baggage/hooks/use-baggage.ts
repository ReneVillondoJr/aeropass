'use client';

import { useMemo, useState } from 'react';

import {
  buildBaggageStats,
  buildBaggageViewModels,
  getBaggageFlightOptions,
} from '../data/baggage';

import { baggageFilterSchema } from '../schema';

import type {
  BaggageFilterStatus,
  BaggageFilterType,
  BaggageViewModel,
} from '../types/baggage';

export function useBaggage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const [filters, setFilters] = useState({
    search: '',
    status: 'ALL' as BaggageFilterStatus,
    type: 'ALL' as BaggageFilterType,
    flightId: 'ALL',
  });

  const allBaggage = useMemo(() => buildBaggageViewModels(), []);

  const stats = useMemo(() => buildBaggageStats(allBaggage), [allBaggage]);

  const flightOptions = useMemo(
    () => getBaggageFlightOptions(allBaggage),
    [allBaggage],
  );

  const filteredBaggage = useMemo(() => {
    const parsed = baggageFilterSchema.safeParse(filters);

    if (!parsed.success) {
      return allBaggage;
    }

    const values = parsed.data;
    const search = values.search.trim().toLowerCase();

    return allBaggage.filter((item) => {
      const matchesSearch =
        !search ||
        [
          item.bagTag,
          item.passengerName,
          item.passengerEmail,
          item.passengerPhone,
          item.bookingReference,
          item.flightNumber,
          item.originCode,
          item.destinationCode,
          item.originCity,
          item.destinationCity,
          item.destination,
          item.ticketNumber ?? '',
          item.seatNumber ?? '',
        ]
          .join(' ')
          .toLowerCase()
          .includes(search);

      const matchesStatus =
        values.status === 'ALL' || item.status === values.status;

      const matchesType = values.type === 'ALL' || item.type === values.type;

      const matchesFlight =
        values.flightId === 'ALL' || item.flightId === values.flightId;

      return matchesSearch && matchesStatus && matchesType && matchesFlight;
    });
  }, [allBaggage, filters]);

  const selectedBaggage =
    filteredBaggage.find((item) => item.id === selectedId) ?? null;

  const hasFilters =
    filters.search.trim().length > 0 ||
    filters.status !== 'ALL' ||
    filters.type !== 'ALL' ||
    filters.flightId !== 'ALL';

  function setSearch(search: string) {
    setFilters((current) => ({
      ...current,
      search,
    }));
  }

  function setStatus(status: BaggageFilterStatus) {
    setFilters((current) => ({
      ...current,
      status,
    }));
  }

  function setType(type: BaggageFilterType) {
    setFilters((current) => ({
      ...current,
      type,
    }));
  }

  function setFlightId(flightId: string) {
    setFilters((current) => ({
      ...current,
      flightId,
    }));
  }

  function resetFilters() {
    setFilters({
      search: '',
      status: 'ALL',
      type: 'ALL',
      flightId: 'ALL',
    });
  }

  function selectBaggage(item: BaggageViewModel) {
    setSelectedId(item.id);
  }

  return {
    baggage: filteredBaggage,
    allBaggage,
    selectedBaggage,
    selectedId,
    stats,
    flightOptions,
    filters,
    hasFilters,
    setSearch,
    setStatus,
    setType,
    setFlightId,
    resetFilters,
    selectBaggage,
  };
}
