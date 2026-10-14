'use client';

import { useMemo, useState } from 'react';

import type { BookingScope, BookingStatusFilter, CustomerBookingItem } from '../types/booking';

const scopeLabels: Record<BookingScope, string> = {
  ALL: 'All bookings',
  UPCOMING: 'Upcoming',
  PAST: 'Past trips',
  ACTION_REQUIRED: 'Action needed',
  CANCELLED: 'Cancelled / refunds',
};

export function useCustomerBookings(bookings: CustomerBookingItem[]) {
  const [scope, setScope] = useState<BookingScope>('ALL');
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<BookingStatusFilter>('ALL_STATUSES');

  const counts = useMemo<Record<BookingScope, number>>(() => ({
    ALL: bookings.length,
    UPCOMING: bookings.filter((booking) => booking.isUpcoming).length,
    PAST: bookings.filter((booking) => booking.isPast).length,
    ACTION_REQUIRED: bookings.filter((booking) => booking.needsAttention).length,
    CANCELLED: bookings.filter((booking) => booking.isCancelled).length,
  }), [bookings]);

  const filteredBookings = useMemo(() => {
    const query = search.trim().toLocaleLowerCase();

    return bookings.filter((booking) => {
      if (scope === 'UPCOMING' && !booking.isUpcoming) return false;
      if (scope === 'PAST' && !booking.isPast) return false;
      if (scope === 'ACTION_REQUIRED' && !booking.needsAttention) return false;
      if (scope === 'CANCELLED' && !booking.isCancelled) return false;
      if (status !== 'ALL_STATUSES' && booking.status !== status) return false;

      if (!query) return true;

      const searchable = [
        booking.bookingReference,
        booking.flightNumber,
        booking.originCode,
        booking.originCity,
        booking.destinationCode,
        booking.destinationCity,
        booking.status,
        booking.paymentStatus,
      ].filter(Boolean).join(' ').toLocaleLowerCase();

      return searchable.includes(query);
    });
  }, [bookings, scope, search, status]);

  const hasFilters = search.trim().length > 0 || status !== 'ALL_STATUSES' || scope !== 'ALL';

  function resetFilters() {
    setScope('ALL');
    setSearch('');
    setStatus('ALL_STATUSES');
  }

  return {
    scope,
    setScope,
    search,
    setSearch,
    status,
    setStatus,
    counts,
    filteredBookings,
    hasFilters,
    resetFilters,
    scopeLabels,
  };
}
