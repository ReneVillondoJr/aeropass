'use client';

import { ListFilter } from 'lucide-react';

import { AdminFilterBar } from '@/components/filter-bar';
import { AdminFilterSelect } from '@/components/filter-select';

import type { BookingScope, BookingStatusFilter } from '../types/booking';

interface BookingFiltersProps {
  scope: BookingScope;
  setScope: (scope: BookingScope) => void;
  search: string;
  setSearch: (search: string) => void;
  status: BookingStatusFilter;
  setStatus: (status: BookingStatusFilter) => void;
  counts: Record<BookingScope, number>;
  hasFilters: boolean;
  onReset: () => void;
}

const scopes: Array<{ value: BookingScope; label: string }> = [
  { value: 'ALL', label: 'All bookings' },
  { value: 'UPCOMING', label: 'Upcoming' },
  { value: 'PAST', label: 'Past trips' },
  { value: 'ACTION_REQUIRED', label: 'Action needed' },
  { value: 'CANCELLED', label: 'Cancelled / refunds' },
];

const statusOptions: Array<{
  value: BookingStatusFilter;
  label: string;
}> = [
  { value: 'ALL_STATUSES', label: 'All statuses' },
  { value: 'PENDING_PAYMENT', label: 'Pending payment' },
  { value: 'CONFIRMED', label: 'Confirmed' },
  { value: 'CHECKED_IN', label: 'Checked in' },
  { value: 'COMPLETED', label: 'Completed' },
  { value: 'CANCELLED', label: 'Cancelled' },
  { value: 'REFUND_PENDING', label: 'Refund pending' },
  { value: 'REFUNDED', label: 'Refunded' },
];

export function BookingFilters({
  scope,
  setScope,
  search,
  setSearch,
  status,
  setStatus,
  counts,
  hasFilters,
  onReset,
}: BookingFiltersProps) {
  return (
    <AdminFilterBar
      search={search}
      searchPlaceholder='Search reference, flight, route...'
      resultCount={counts[scope]}
      resultLabel='booking'
      resultLabelPlural='bookings'
      hasFilters={hasFilters}
      onSearchChange={setSearch}
      onReset={onReset}
      helperText='Search by booking reference, flight number, route, passenger, or booking status.'
    >
      <div
        className='flex max-w-full flex-wrap items-center gap-1.5'
        role='group'
        aria-label='Filter bookings by trip category'
      >
        {scopes.map((item) => {
          const active = scope === item.value;

          return (
            <button
              key={item.value}
              type='button'
              aria-pressed={active}
              onClick={() => setScope(item.value)}
              className={[
                'inline-flex min-h-9 shrink-0 items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[#5BA9D6] focus-visible:ring-offset-2',
                active ?
                  'bg-[#102A43] text-white shadow-sm'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground',
              ].join(' ')}
            >
              {item.label}

              <span
                className={
                  active ?
                    'rounded-md bg-white/15 px-1.5 py-0.5 text-[10px] text-white'
                  : 'rounded-md bg-muted px-1.5 py-0.5 text-[10px]'
                }
              >
                {counts[item.value]}
              </span>
            </button>
          );
        })}
      </div>

      <AdminFilterSelect
        id='customer-booking-status'
        label='Booking status'
        value={status}
        options={statusOptions}
        onChange={(value) => setStatus(value as BookingStatusFilter)}
        className='w-full sm:w-[190px]'
        icon={
          <ListFilter className='size-3.5 shrink-0 text-muted-foreground' />
        }
      />
    </AdminFilterBar>
  );
}
