'use client';

import { RotateCcw } from 'lucide-react';

import { CustomerEmptyState } from '@/components/customer/shared/empty-state';

import { RefundListItem } from './list-item';

import type { CustomerRefundRecord } from '../types/refund';

interface RefundListProps {
  refunds: CustomerRefundRecord[];
  totalRefunds: number;
  hasFilters: boolean;
  onReset: () => void;
}

export function RefundList({
  refunds,
  totalRefunds,
  hasFilters,
  onReset,
}: RefundListProps) {
  if (refunds.length === 0 && !hasFilters) {
    return (
      <CustomerEmptyState
        title='No refund requests yet'
        description='Refund records linked to your AeroPass bookings will appear here when available.'
        icon={RotateCcw}
        actionLabel='View my bookings'
        actionHref='/customer/bookings'
      />
    );
  }

  if (refunds.length === 0) {
    return (
      <section className='rounded-2xl border border-dashed border-border bg-card px-5 py-10 text-center'>
        <span className='mx-auto flex size-12 items-center justify-center rounded-xl bg-muted text-muted-foreground'>
          <RotateCcw className='size-5' aria-hidden='true' />
        </span>

        <h2 className='mt-4 text-sm font-semibold text-foreground'>
          No matching refunds
        </h2>

        <p className='mt-1 text-xs leading-5 text-muted-foreground'>
          Try another search term or clear your filters.
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
          Refund history
        </h2>

        <p className='text-[11px] text-muted-foreground'>
          Showing {refunds.length} of {totalRefunds}
        </p>
      </div>

      <div className='space-y-3'>
        {refunds.map((record) => (
          <RefundListItem key={record.refund.id} record={record} />
        ))}
      </div>
    </section>
  );
}
