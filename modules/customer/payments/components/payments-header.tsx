import Link from 'next/link';
import { ArrowUpRight, CreditCard } from 'lucide-react';

import { CustomerPageHeader } from '@/components/customer/shared/customer-page-header';

interface PaymentsHeaderProps {
  customerName: string;
}

export function PaymentsHeader({ customerName }: PaymentsHeaderProps) {
  return (
    <div className="space-y-4">
      <div className="relative overflow-hidden rounded-[1.5rem] border border-border/70 bg-card shadow-sm">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_90%_5%,rgba(91,169,214,0.16),transparent_32%),radial-gradient(circle_at_12%_115%,rgba(16,42,67,0.06),transparent_30%)]" />
        <div className="relative flex flex-col gap-5 p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex min-w-0 items-start gap-4">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-[#102A43] text-white shadow-lg shadow-[#102A43]/15">
              <CreditCard className="size-5" aria-hidden="true" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#2879A8]">
                Payments and transactions
              </p>
              <h1 className="mt-1 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                My payments
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
                {`Hello, ${customerName}. Review payment records, transaction references, payment status, and any linked refund requests.`}
              </p>
            </div>
          </div>
          <Link
            href="/customer/bookings"
            className="inline-flex min-h-10 shrink-0 items-center justify-center gap-2 rounded-xl bg-[#102A43] px-4 py-2.5 text-xs font-semibold text-white outline-none transition hover:bg-[#183F5D] focus-visible:ring-2 focus-visible:ring-[#5BA9D6] focus-visible:ring-offset-2"
          >
            View my bookings
            <ArrowUpRight className="size-3.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
      <CustomerPageHeader
        eyebrow="Your transaction history"
        title="Payment center"
        description="Find a transaction by payment reference, booking reference, payment method, flight, route, or status. Payment records shown here are from the AeroPass local mock system."
      />
    </div>
  );
}
