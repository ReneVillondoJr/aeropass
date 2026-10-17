'use client';

import Link from 'next/link';
import { AlertCircle, ArrowRight } from 'lucide-react';

import { CustomerEmptyState } from '@/components/customer/shared/empty-state';

import { useCustomerPayments } from './hooks/use-customer-payments';
import { PaymentFilters } from './components/payment-filters';
import { PaymentList } from './components/payment-list';
import { PaymentsHeader } from './components/payments-header';
import { PaymentStats } from './components/payment-stats';

interface CustomerPaymentsModuleProps {
  customerId: string;
}

export function CustomerPaymentsModule({ customerId }: CustomerPaymentsModuleProps) {
  const {
    view,
    search,
    setSearch,
    status,
    setStatus,
    counts,
    filteredPayments,
    hasFilters,
    resetFilters,
  } = useCustomerPayments(customerId);

  if (!view.accountAvailable) {
    return (
      <section className="space-y-6">
        <CustomerEmptyState
          title="Customer account unavailable"
          description="Sign in with an active AeroPass customer account to view payment records connected to your bookings."
          icon={AlertCircle}
          actionLabel="View my bookings"
          actionHref="/customer/bookings"
        />
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <PaymentsHeader customerName={view.customerName} />
      <PaymentStats stats={view.stats} />
      <PaymentFilters
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
        counts={counts}
        hasFilters={hasFilters}
        resultCount={filteredPayments.length}
        onReset={resetFilters}
      />
      <PaymentList
        payments={filteredPayments}
        totalPayments={view.payments.length}
        hasFilters={hasFilters}
        onReset={resetFilters}
      />
      <div className="flex flex-col gap-3 rounded-2xl border border-[#D9EAF3] bg-[#EEF7FB]/70 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
        <div>
          <p className="text-sm font-semibold text-[#102A43]">Need to review a reservation?</p>
          <p className="mt-1 text-xs leading-5 text-[#34556D]">
            Booking details include your itinerary, fare breakdown, payment status, and any linked refund request.
          </p>
        </div>
        <Link
          href="/customer/bookings"
          className="inline-flex min-h-9 shrink-0 items-center justify-center gap-2 rounded-xl border border-[#B8D6E6] bg-white px-3.5 py-2 text-xs font-semibold text-[#102A43] outline-none transition hover:bg-[#E5F5FC] focus-visible:ring-2 focus-visible:ring-[#5BA9D6] focus-visible:ring-offset-2"
        >
          Open bookings <ArrowRight className="size-3.5" aria-hidden="true" />
        </Link>
      </div>
      <p className="text-[11px] leading-5 text-muted-foreground">
        AeroPass local mock mode: these records are for demonstration only and do not represent live charges or a real payment gateway.
      </p>
    </section>
  );
}
