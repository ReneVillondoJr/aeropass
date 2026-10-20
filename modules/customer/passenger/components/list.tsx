'use client';

import { UsersRound } from 'lucide-react';

import { CustomerEmptyState } from '@/components/customer/shared/empty-state';

import { PassengerListItem } from './list-item';
import type { CustomerPassengerRecord } from '../types/passenger';

interface PassengerListProps {
  passengers: CustomerPassengerRecord[];
  total: number;
  hasFilters: boolean;
  onReset: () => void;
}

export function PassengerList({
  passengers,
  total,
  hasFilters,
  onReset,
}: PassengerListProps) {
  if (passengers.length === 0 && !hasFilters) {
    return (
      <CustomerEmptyState
        title='No passenger records yet'
        description='Passenger information will appear here after passengers are attached to your AeroPass reservations.'
        icon={UsersRound}
        actionLabel='View my bookings'
        actionHref='/customer/bookings'
      />
    );
  }

  if (passengers.length === 0) {
    return (
      <section className='rounded-2xl border border-dashed border-border bg-card px-5 py-10 text-center'>
        <span className='mx-auto flex size-12 items-center justify-center rounded-xl bg-muted text-muted-foreground'>
          <UsersRound className='size-5' aria-hidden='true' />
        </span>

        <h2 className='mt-4 text-sm font-semibold text-foreground'>
          No matching passengers
        </h2>

        <p className='mt-1 text-xs leading-5 text-muted-foreground'>
          Try another search term or clear the filters.
        </p>

        <button
          type='button'
          onClick={onReset}
          className='mt-4 inline-flex min-h-9 items-center justify-center rounded-xl bg-[#102A43] px-3.5 py-2 text-xs font-semibold text-white outline-none transition hover:bg-[#183F5D] focus-visible:ring-2 focus-visible:ring-[#5BA9D6] focus-visible:ring-offset-2'
        >
          Reset filters
        </button>
      </section>
    );
  }

  return (
    <section className='space-y-3'>
      <div className='flex items-center justify-between gap-3 px-1'>
        <h2 className='text-sm font-semibold text-foreground'>
          Passenger records
        </h2>

        <p className='text-[11px] text-muted-foreground'>
          Showing {passengers.length} of {total}
        </p>
      </div>

      <div className='max-h-[640px] space-y-3 overflow-y-auto overscroll-contain pr-1'>
        {passengers.map((record) => (
          <PassengerListItem key={record.passenger.id} record={record} />
        ))}
      </div>
    </section>
  );
}
