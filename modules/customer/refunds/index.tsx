'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import type { CustomerRefundRecord } from './types/refund';

import { useCustomerRefunds } from './hooks/use-refund';
import { RefundsHeader } from './components/header';
import { RefundStats } from './components/stats';
import { RefundFilters } from './components/filters';
import { RefundList } from './components/list';

interface CustomerRefundsModuleProps {
  initialRefunds: CustomerRefundRecord[];
}

export function CustomerRefundsModule({
  initialRefunds,
}: CustomerRefundsModuleProps) {
  const {
    search,
    setSearch,
    status,
    setStatus,
    counts,
    stats,
    filteredRefunds,
    hasFilters,
    resetFilters,
  } = useCustomerRefunds(initialRefunds);

  return (
    <section className='space-y-6'>
      <RefundsHeader />

      <RefundStats stats={stats} />

      <RefundFilters
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
        counts={counts}
        hasFilters={hasFilters}
        resultCount={filteredRefunds.length}
        onReset={resetFilters}
      />

      <RefundList
        refunds={filteredRefunds}
        totalRefunds={initialRefunds.length}
        hasFilters={hasFilters}
        onReset={resetFilters}
      />

      <div className='flex flex-col gap-3 rounded-2xl border border-[#D9EAF3] bg-[#EEF7FB]/70 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5'>
        <div>
          <h2 className='text-sm font-semibold text-[#102A43]'>
            Need to review a reservation?
          </h2>

          <p className='mt-1 text-xs leading-5 text-[#34556D]'>
            Open your booking to check its itinerary, cancellation status, fare
            conditions, and original payment information.
          </p>
        </div>

        <Link
          href='/customer/bookings'
          className='inline-flex min-h-9 shrink-0 items-center justify-center gap-2 rounded-xl border border-[#B8D6E6] bg-white px-3.5 py-2 text-xs font-semibold text-[#102A43] outline-none transition hover:bg-[#E5F5FC] focus-visible:ring-2 focus-visible:ring-[#5BA9D6] focus-visible:ring-offset-2'
        >
          Open bookings
          <ArrowRight className='size-3.5' aria-hidden='true' />
        </Link>
      </div>

      <p className='text-[11px] leading-5 text-muted-foreground'>
        AeroPass local mock mode: refund records display the statuses stored in
        the local mock data. This page does not transfer money or initiate a
        real refund.
      </p>
    </section>
  );
}
