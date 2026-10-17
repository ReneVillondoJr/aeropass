import Link from 'next/link';
import { ArrowUpRight, PlaneTakeoff, ReceiptText } from 'lucide-react';

import { CustomerStatusBadge } from '@/components/customer/shared/customer-status-badge';
import type { CustomerPaymentDetailView } from '@/modules/customer/payments/types/payment';

interface PaymentBookingSummaryProps {
  payment: CustomerPaymentDetailView;
}

function formatMoney(amount: number, currency = 'PHP') {
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency,
    maximumFractionDigits: 2,
  }).format(amount);
}

function formatDeparture(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'Date unavailable';
  return new Intl.DateTimeFormat('en-PH', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Asia/Manila',
  }).format(date);
}

function BreakdownRow({ label, amount, muted = false }: { label: string; amount: number; muted?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-3 py-2 text-xs">
      <span className={muted ? 'text-muted-foreground' : 'text-foreground'}>{label}</span>
      <span className={muted ? 'text-muted-foreground' : 'font-medium text-foreground'}>{formatMoney(amount)}</span>
    </div>
  );
}

export function PaymentBookingSummary({ payment }: PaymentBookingSummaryProps) {
  return (
    <div className="space-y-4">
      <section className="rounded-2xl border border-border/70 bg-card p-4 shadow-sm sm:p-5">
        <div className="flex items-center gap-3">
          <span className="flex size-9 items-center justify-center rounded-xl bg-[#EEF7FB] text-[#2879A8]">
            <PlaneTakeoff className="size-4.5" aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <h2 className="text-sm font-semibold text-foreground">Linked booking</h2>
            <p className="mt-0.5 text-xs text-muted-foreground">Booking {payment.bookingReference}</p>
          </div>
          <div className="ml-auto"><CustomerStatusBadge status={payment.bookingStatus} /></div>
        </div>
        <div className="mt-4 rounded-xl bg-muted/35 p-3">
          <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">Flight {payment.flightNumber}</p>
          <div className="mt-3 flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="text-xl font-semibold tracking-tight text-[#102A43]">{payment.originCode}</p>
              <p className="mt-1 truncate text-[11px] text-muted-foreground">{payment.originCity}</p>
            </div>
            <div className="flex min-w-16 flex-1 items-center gap-2 text-[#5BA9D6]">
              <span className="h-px flex-1 bg-[#B8D6E6]" />
              <PlaneTakeoff className="size-4 shrink-0" aria-hidden="true" />
              <span className="h-px flex-1 bg-[#B8D6E6]" />
            </div>
            <div className="min-w-0 text-right">
              <p className="text-xl font-semibold tracking-tight text-[#102A43]">{payment.destinationCode}</p>
              <p className="mt-1 truncate text-[11px] text-muted-foreground">{payment.destinationCity}</p>
            </div>
          </div>
          <p className="mt-3 border-t border-border/60 pt-3 text-[11px] text-muted-foreground">Departure: {formatDeparture(payment.departureAt)}</p>
        </div>
        <Link href={`/customer/bookings/${payment.bookingId}`} className="mt-4 inline-flex min-h-9 w-full items-center justify-center gap-2 rounded-xl border border-border px-3 py-2 text-xs font-semibold text-foreground outline-none transition hover:bg-muted focus-visible:ring-2 focus-visible:ring-[#5BA9D6] focus-visible:ring-offset-2">
          Open booking details <ArrowUpRight className="size-3.5" aria-hidden="true" />
        </Link>
      </section>

      <section className="rounded-2xl border border-border/70 bg-card p-4 shadow-sm sm:p-5">
        <div className="flex items-center gap-3">
          <span className="flex size-9 items-center justify-center rounded-xl bg-muted text-muted-foreground">
            <ReceiptText className="size-4.5" aria-hidden="true" />
          </span>
          <div>
            <h2 className="text-sm font-semibold text-foreground">Booking fare breakdown</h2>
            <p className="mt-0.5 text-xs text-muted-foreground">Amounts recorded for this reservation</p>
          </div>
        </div>
        <div className="mt-4 divide-y divide-border/60 border-y border-border/60">
          <BreakdownRow label="Base fare" amount={payment.subtotal} />
          <BreakdownRow label="Taxes" amount={payment.taxes} muted />
          <BreakdownRow label="Booking fees" amount={payment.fees} muted />
          {payment.baggageFees > 0 ? <BreakdownRow label="Baggage fees" amount={payment.baggageFees} muted /> : null}
          {payment.seatFees > 0 ? <BreakdownRow label="Seat selection" amount={payment.seatFees} muted /> : null}
          {payment.discount > 0 ? <BreakdownRow label="Discount" amount={-payment.discount} muted /> : null}
        </div>
        <div className="flex items-center justify-between gap-3 pt-4">
          <div>
            <p className="text-xs font-semibold text-foreground">Booking total</p>
            <p className="mt-1 text-[10px] text-muted-foreground">Status: {payment.status.replaceAll('_', ' ').toLowerCase()}</p>
          </div>
          <p className="text-xl font-semibold tracking-tight text-[#102A43]">{formatMoney(payment.bookingTotal, payment.currency)}</p>
        </div>
        {payment.amount !== payment.bookingTotal ? (
          <p className="mt-3 text-[11px] leading-5 text-muted-foreground">The payment amount differs from the current booking total. This may reflect a partial or separate transaction in the local mock records.</p>
        ) : null}
      </section>
    </div>
  );
}
