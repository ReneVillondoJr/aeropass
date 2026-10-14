'use client';

import { Search, X } from 'lucide-react';
import type { ChangeEvent } from 'react';

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

const statusOptions = [
  { value: 'ALL_STATUSES', label: 'All statuses' },
  { value: 'PENDING_PAYMENT', label: 'Pending payment' },
  { value: 'CONFIRMED', label: 'Confirmed' },
  { value: 'CHECKED_IN', label: 'Checked in' },
  { value: 'COMPLETED', label: 'Completed' },
  { value: 'CANCELLED', label: 'Cancelled' },
  { value: 'REFUND_PENDING', label: 'Refund pending' },
  { value: 'REFUNDED', label: 'Refunded' },
] as const;

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
    <section className="rounded-2xl border border-border/70 bg-card p-3 shadow-sm sm:p-4">
      <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex gap-1.5 overflow-x-auto pb-1 xl:pb-0" role="group" aria-label="Filter bookings by trip category">
          {scopes.map((item) => {
            const active = scope === item.value;

            return (
              <button
                key={item.value}
                type="button"
                aria-pressed={active}
                onClick={() => setScope(item.value)}
                className={[
                  'inline-flex min-h-9 shrink-0 items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold outline-none transition focus-visible:ring-2 focus-visible:ring-[#5BA9D6] focus-visible:ring-offset-2',
                  active ? 'bg-[#102A43] text-white shadow-sm' : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                ].join(' ')}
              >
                {item.label}
                <span className={active ? 'rounded-md bg-white/15 px-1.5 py-0.5 text-[10px] text-white' : 'rounded-md bg-muted px-1.5 py-0.5 text-[10px]'}>
                  {counts[item.value]}
                </span>
              </button>
            );
          })}
        </div>

        <div className="grid gap-2 sm:grid-cols-[minmax(220px,1fr)_180px_auto] xl:w-[min(100%,560px)] xl:shrink-0">
          <label className="relative block min-w-0">
            <span className="sr-only">Search bookings</span>
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
            <input
              value={search}
              onChange={(event: ChangeEvent<HTMLInputElement>) => setSearch(event.target.value)}
              placeholder="Search reference, flight, route…"
              className="h-10 w-full rounded-xl border border-border bg-background pl-9 pr-3 text-xs text-foreground outline-none transition placeholder:text-muted-foreground focus:border-[#5BA9D6] focus:ring-2 focus:ring-[#5BA9D6]/20"
            />
          </label>

          <label>
            <span className="sr-only">Filter by booking status</span>
            <select
              value={status}
              onChange={(event: ChangeEvent<HTMLSelectElement>) => setStatus(event.target.value as BookingStatusFilter)}
              className="h-10 w-full rounded-xl border border-border bg-background px-3 text-xs text-foreground outline-none transition focus:border-[#5BA9D6] focus:ring-2 focus:ring-[#5BA9D6]/20"
            >
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </label>

          {hasFilters ? (
            <button
              type="button"
              onClick={onReset}
              className="inline-flex h-10 items-center justify-center gap-1.5 rounded-xl border border-border px-3 text-xs font-semibold text-muted-foreground outline-none transition hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-[#5BA9D6] focus-visible:ring-offset-2"
            >
              <X className="size-3.5" aria-hidden="true" />
              Reset
            </button>
          ) : null}
        </div>
      </div>
    </section>
  );
}
