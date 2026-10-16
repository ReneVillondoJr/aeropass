'use client';

import { useMemo, useState } from 'react';

import { getCustomerCheckInView } from '../data/check-in-view';
import type { CheckInFilter } from '../types/check-in';

export function useCustomerCheckIn(customerId: string) {
  const view = useMemo(() => getCustomerCheckInView(customerId), [customerId]);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<CheckInFilter>('ALL');

  const filteredItems = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return view.items.filter((item) => {
      if (filter === 'AVAILABLE' && !item.canCheckIn) return false;
      if (filter === 'COMPLETED' && item.displayStatus !== 'COMPLETED') return false;
      if (filter === 'NOT_AVAILABLE' && (item.canCheckIn || item.displayStatus === 'COMPLETED')) return false;

      if (!normalizedQuery) return true;
      const searchable = [
        item.bookingReference,
        item.ticketNumber,
        item.passengerName,
        item.flightNumber,
        item.originCode,
        item.originCity,
        item.destinationCode,
        item.destinationCity,
        item.displayStatus,
      ].join(' ').toLowerCase();

      return searchable.includes(normalizedQuery);
    });
  }, [filter, query, view.items]);

  return {
    view,
    query,
    setQuery,
    filter,
    setFilter,
    filteredItems,
  };
}
