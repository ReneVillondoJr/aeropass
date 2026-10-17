'use client';

import Link from 'next/link';
import { AlertCircle, ArrowRight } from 'lucide-react';

import { CustomerEmptyState } from '@/components/customer/shared/empty-state';
import { useCustomerId } from '@/modules/auth/hooks/use-customer-id';

import { TicketFilters } from './components/ticket-filters';
import { TicketList } from './components/ticket-list';
import { TicketStats } from './components/ticket-stats';
import { TicketsHeader } from './components/tickets-header';
import { useCustomerTickets } from './hooks/use-customer-tickets';

export function CustomerTicketsModule() {
  const customerId = useCustomerId();
  const {
    view,
    search,
    setSearch,
    status,
    setStatus,
    counts,
    filteredTickets,
    hasFilters,
    resetFilters,
  } = useCustomerTickets(customerId ?? '');

  if (!view.accountAvailable) {
    return (
      <section className="space-y-6">
        <CustomerEmptyState
          title="Customer account unavailable"
          description="Sign in with an active AeroPass customer account to view tickets connected to your bookings."
          icon={AlertCircle}
          actionLabel="View my bookings"
          actionHref="/customer/bookings"
        />
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <TicketsHeader customerName={view.customerName} />
      <TicketStats stats={view.stats} />
      <TicketFilters
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
        counts={counts}
        hasFilters={hasFilters}
        onReset={resetFilters}
      />
      <TicketList
        tickets={filteredTickets}
        hasFilters={hasFilters}
        onReset={resetFilters}
        totalTickets={view.tickets.length}
      />
      <div className="flex flex-col gap-3 rounded-2xl border border-[#D9EAF3] bg-[#EEF7FB]/70 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
        <div>
          <p className="text-sm font-semibold text-[#102A43]">Need to check a reservation?</p>
          <p className="mt-1 text-xs leading-5 text-[#34556D]">Booking details include fare, payment, passenger, and reservation information.</p>
        </div>
        <Link href="/customer/bookings" className="inline-flex min-h-9 shrink-0 items-center justify-center gap-2 rounded-xl border border-[#B8D6E6] bg-white px-3.5 py-2 text-xs font-semibold text-[#102A43] outline-none transition hover:bg-[#E5F5FC] focus-visible:ring-2 focus-visible:ring-[#5BA9D6] focus-visible:ring-offset-2">
          Open bookings <ArrowRight className="size-3.5" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
