'use client';

import { SlidersHorizontal } from 'lucide-react';

import { useCustomerBookings } from '../hooks/use-customer-bookings';
import type { CustomerBookingItem } from '../types/booking';
import { BookingFilters } from './booking-filters';
import { BookingList } from './booking-list';

interface BookingsExplorerProps {
  bookings: CustomerBookingItem[];
}

export function BookingsExplorer({ bookings }: BookingsExplorerProps) {
  const filters = useCustomerBookings(bookings);

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <SlidersHorizontal className="size-3.5" aria-hidden="true" />
        Search and filter your reservation history
      </div>
      <BookingFilters
        scope={filters.scope}
        setScope={filters.setScope}
        search={filters.search}
        setSearch={filters.setSearch}
        status={filters.status}
        setStatus={filters.setStatus}
        counts={filters.counts}
        hasFilters={filters.hasFilters}
        onReset={filters.resetFilters}
      />
      <BookingList
        bookings={filters.filteredBookings}
        hasFilters={filters.hasFilters}
        onReset={filters.resetFilters}
      />
    </div>
  );
}
