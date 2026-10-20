'use client';

import { useMemo, useState } from 'react';

import {
  getPassengerSearchText,
  hasCheckedIn,
  hasSpecialAssistance,
  hasTicket,
} from '../data/passenger';

import type {
  CustomerPassengerCounts,
  CustomerPassengerFilter,
  CustomerPassengerRecord,
  CustomerPassengerStats,
} from '../types/passenger';

interface UseCustomerPassengersResult {
  search: string;
  setSearch: (value: string) => void;

  filter: CustomerPassengerFilter;
  setFilter: (value: CustomerPassengerFilter) => void;

  counts: CustomerPassengerCounts;
  stats: CustomerPassengerStats;

  filteredPassengers: CustomerPassengerRecord[];
  hasFilters: boolean;
  resetFilters: () => void;
}

export function useCustomerPassengers(
  initialPassengers: CustomerPassengerRecord[],
): UseCustomerPassengersResult {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<CustomerPassengerFilter>('ALL');

  const counts = useMemo<CustomerPassengerCounts>(() => {
    const result: CustomerPassengerCounts = {
      ALL: initialPassengers.length,
      HAS_TICKET: 0,
      CHECKED_IN: 0,
      SPECIAL_ASSISTANCE: 0,
      NO_TICKET: 0,
    };

    for (const passenger of initialPassengers) {
      if (hasTicket(passenger)) {
        result.HAS_TICKET += 1;
      } else {
        result.NO_TICKET += 1;
      }

      if (hasCheckedIn(passenger)) {
        result.CHECKED_IN += 1;
      }

      if (hasSpecialAssistance(passenger)) {
        result.SPECIAL_ASSISTANCE += 1;
      }
    }

    return result;
  }, [initialPassengers]);

  const stats = useMemo<CustomerPassengerStats>(() => {
    return {
      total: initialPassengers.length,

      linkedBookings: new Set(
        initialPassengers.map((record) => record.booking.id),
      ).size,

      ticketed: initialPassengers.filter(hasTicket).length,

      checkedIn: initialPassengers.filter(hasCheckedIn).length,

      specialAssistance: initialPassengers.filter(hasSpecialAssistance).length,
    };
  }, [initialPassengers]);

  const hasFilters = search.trim().length > 0 || filter !== 'ALL';

  const filteredPassengers = useMemo(() => {
    const query = search.trim().toLowerCase();

    return initialPassengers.filter((record) => {
      const matchesFilter =
        filter === 'ALL' ||
        (filter === 'HAS_TICKET' && hasTicket(record)) ||
        (filter === 'CHECKED_IN' && hasCheckedIn(record)) ||
        (filter === 'SPECIAL_ASSISTANCE' && hasSpecialAssistance(record)) ||
        (filter === 'NO_TICKET' && !hasTicket(record));

      if (!matchesFilter) {
        return false;
      }

      if (!query) {
        return true;
      }

      return getPassengerSearchText(record).includes(query);
    });
  }, [initialPassengers, search, filter]);

  function resetFilters() {
    setSearch('');
    setFilter('ALL');
  }

  return {
    search,
    setSearch,
    filter,
    setFilter,
    counts,
    stats,
    filteredPassengers,
    hasFilters,
    resetFilters,
  };
}
