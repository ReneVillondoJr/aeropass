import Link from 'next/link';
import {
  ArrowUpRight,
  Banknote,
  CalendarDays,
  CreditCard,
  Smartphone,
} from 'lucide-react';

import { CustomerStatusBadge } from '@/components/customer/shared/customer-status-badge';

import type { CustomerPaymentItem } from '../types/payment';

interface PaymentListItemProps {
  payment: CustomerPaymentItem;
}

function formatMoney(amount: number, currency: string) {
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency,
    maximumFractionDigits: 2,
  }).format(amount);
}

function formatDate(value: string | null) {
  if (!value) return 'Not paid';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'Date unavailable';
  return new Intl.DateTimeFormat('en-PH', {
    dateStyle: 'medium',
    timeZone: 'Asia/Manila',
  }).format(date);
}

function getMethodIcon(method: string) {
  if (method === 'GCASH' || method === 'MAYA') return Smartphone;
  if (method === 'BANK_TRANSFER') return Banknote;
  return CreditCard;
}

function formatMethod(method: string) {
  return method.replaceAll('_', ' ').replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export function PaymentListItem({ payment }: PaymentListItemProps) {
  const MethodIcon = getMethodIcon(payment.paymentMethod);

  return (
    <article className="rounded-2xl border border-border/70 bg-card p-4 shadow-sm transition hover:border-[#B8D6E6] sm:p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex min-w-0 items-start gap-3">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#EEF7FB] text-[#2879A8]">
            <MethodIcon className="size-5" aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-sm font-semibold text-foreground">{formatMethod(payment.paymentMethod)}</h3>
              <CustomerStatusBadge status={payment.status} />
            </div>
            <p className="mt-1 break-all font-mono text-[11px] text-muted-foreground">{payment.providerReference}</p>
            <p className="mt-2 text-xs text-muted-foreground">
              Booking <span className="font-semibold text-foreground">{payment.bookingReference}</span>
              <span className="mx-2 text-border">•</span>
              Flight <span className="font-medium text-foreground">{payment.flightNumber}</span>
            </p>
          </div>
        </div>
        <div className="sm:text-right">
          <p className="text-xl font-semibold tracking-tight text-[#102A43]">{formatMoney(payment.amount, payment.currency)}</p>
          <p className="mt-1 inline-flex items-center gap-1.5 text-[11px] text-muted-foreground">
            <CalendarDays className="size-3.5" aria-hidden="true" />
            {payment.status === 'PAID' ? formatDate(payment.paidAt) : `Created ${formatDate(payment.createdAt)}`}
          </p>
        </div>
      </div>

      <div className="mt-4 grid gap-3 rounded-xl bg-muted/35 p-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
        <div className="min-w-0">
          <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">Flight route</p>
          <p className="mt-1 truncate text-xs font-semibold text-foreground">
            {payment.originCity} ({payment.originCode}) <span className="mx-1.5 text-[#5BA9D6]">→</span> {payment.destinationCity} ({payment.destinationCode})
          </p>
          {payment.refund ? (
            <p className="mt-2 flex flex-wrap items-center gap-2 text-[11px] text-muted-foreground">
              Refund request <CustomerStatusBadge status={payment.refund.status} />
            </p>
          ) : null}
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            href={`/customer/bookings/${payment.bookingId}`}
            className="inline-flex min-h-9 items-center justify-center rounded-xl border border-border bg-background px-3 py-2 text-xs font-semibold text-foreground outline-none transition hover:bg-muted focus-visible:ring-2 focus-visible:ring-[#5BA9D6] focus-visible:ring-offset-2"
          >
            View booking
          </Link>
          <Link
            href={`/customer/payments/${payment.id}`}
            className="inline-flex min-h-9 items-center justify-center gap-1.5 rounded-xl bg-[#102A43] px-3 py-2 text-xs font-semibold text-white outline-none transition hover:bg-[#183F5D] focus-visible:ring-2 focus-visible:ring-[#5BA9D6] focus-visible:ring-offset-2"
          >
            Payment details <ArrowUpRight className="size-3.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}
