'use client';

import { Search, X } from 'lucide-react';
import type { ChangeEvent } from 'react';

import type { CustomerTicketStatusFilter } from '../types/ticket';

interface TicketFiltersProps {
  search: string;
  setSearch: (value: string) => void;
  status: CustomerTicketStatusFilter;
  setStatus: (value: CustomerTicketStatusFilter) => void;
  counts: Record<CustomerTicketStatusFilter, number>;
  hasFilters: boolean;
  onReset: () => void;
}

const statusOptions: Array<{ value: CustomerTicketStatusFilter; label: string }> = [
  { value: 'ALL', label: 'All tickets' },
  { value: 'VALID', label: 'Valid' },
  { value: 'PENDING', label: 'Pending' },
  { value: 'USED', label: 'Used' },
  { value: 'EXPIRED', label: 'Expired' },
  { value: 'CANCELLED', label: 'Cancelled' },
  { value: 'REFUNDED', label: 'Refunded' },
];

export function TicketFilters({ search, setSearch, status, setStatus, counts, hasFilters, onReset }: TicketFiltersProps) {
  return (
    <section className="rounded-2xl border border-border/70 bg-card p-3 shadow-sm sm:p-4">
      <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_210px_auto] md:items-center">
        <label className="relative block min-w-0">
          <span className="sr-only">Search tickets</span>
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
          <input
            value={search}
            onChange={(event: ChangeEvent<HTMLInputElement>) => setSearch(event.target.value)}
            placeholder="Search ticket, booking, passenger, flight…"
            className="h-10 w-full rounded-xl border border-border bg-background pl-9 pr-3 text-xs text-foreground outline-none transition placeholder:text-muted-foreground focus:border-[#5BA9D6] focus:ring-2 focus:ring-[#5BA9D6]/20"
          />
        </label>
        <label>
          <span className="sr-only">Filter by ticket status</span>
          <select
            value={status}
            onChange={(event: ChangeEvent<HTMLSelectElement>) => setStatus(event.target.value as CustomerTicketStatusFilter)}
            className="h-10 w-full rounded-xl border border-border bg-background px-3 text-xs text-foreground outline-none transition focus:border-[#5BA9D6] focus:ring-2 focus:ring-[#5BA9D6]/20"
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label} ({counts[option.value]})
              </option>
            ))}
          </select>
        </label>
        {hasFilters ? (
          <button type="button" onClick={onReset} className="inline-flex h-10 items-center justify-center gap-1.5 rounded-xl border border-border px-3 text-xs font-semibold text-muted-foreground outline-none transition hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-[#5BA9D6] focus-visible:ring-offset-2">
            <X className="size-3.5" aria-hidden="true" />
            Reset
          </button>
        ) : <span className="hidden md:block" aria-hidden="true" />}
      </div>
    </section>
  );
}
