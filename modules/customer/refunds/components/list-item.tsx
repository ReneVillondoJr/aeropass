import Link from 'next/link';
import { ArrowUpRight, CalendarClock, Plane, ReceiptText } from 'lucide-react';

import { CustomerStatusBadge } from '@/components/customer/shared/customer-status-badge';

import type { CustomerRefundRecord } from '../types/refund';

interface RefundListItemProps {
  record: CustomerRefundRecord;
}

function formatMoney(amount: number, currency: string) {
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency,
    maximumFractionDigits: 2,
  }).format(amount);
}

function formatDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return 'Date unavailable';
  }

  return new Intl.DateTimeFormat('en-PH', {
    dateStyle: 'medium',
    timeZone: 'Asia/Manila',
  }).format(date);
}

function formatDateTime(date: string, time: string) {
  const normalizedTime = time.length === 5 ? `${time}:00` : time;

  const value = new Date(`${date}T${normalizedTime}+08:00`);

  if (Number.isNaN(value.getTime())) {
    return 'Schedule unavailable';
  }

  return new Intl.DateTimeFormat('en-PH', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Asia/Manila',
  }).format(value);
}

export function RefundListItem({ record }: RefundListItemProps) {
  const { refund, booking, flight } = record;

  return (
    <Link
      href={`/customer/refunds/${encodeURIComponent(refund.id)}`}
      className='group block rounded-2xl border border-border/70 bg-card p-4 shadow-sm outline-none transition-all hover:border-[#B8D6E6] hover:shadow-md focus-visible:ring-2 focus-visible:ring-[#5BA9D6] focus-visible:ring-offset-2 sm:p-5'
    >
      <div className='flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between'>
        <div className='flex min-w-0 items-start gap-3'>
          <span className='flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#EEF7FB] text-[#2879A8]'>
            <ReceiptText className='size-4' aria-hidden='true' />
          </span>

          <div className='min-w-0'>
            <div className='flex flex-wrap items-center gap-2'>
              <h3 className='break-all text-sm font-semibold text-foreground'>
                Refund {refund.id}
              </h3>

              <CustomerStatusBadge status={refund.status} />
            </div>

            <p className='mt-1 break-words text-xs leading-5 text-muted-foreground'>
              {refund.reason}
            </p>

            <div className='mt-3 flex flex-wrap gap-x-4 gap-y-2 text-[11px] text-muted-foreground'>
              <span>
                Booking{' '}
                <span className='font-semibold text-foreground'>
                  {booking.bookingReference}
                </span>
              </span>

              <span className='inline-flex items-center gap-1.5'>
                <Plane className='size-3.5' aria-hidden='true' />
                {flight.flightNumber}
              </span>
            </div>
          </div>
        </div>

        <div className='shrink-0 sm:text-right'>
          <p className='text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground'>
            Refund amount
          </p>

          <p className='mt-1 text-xl font-semibold tracking-tight text-foreground'>
            {formatMoney(refund.amount, booking.currency)}
          </p>

          <p className='mt-1 text-[10px] text-muted-foreground'>
            {refund.status === 'COMPLETED' ?
              'Recorded as completed'
            : 'Requested amount'}
          </p>
        </div>
      </div>

      <div className='mt-4 grid gap-3 rounded-xl bg-muted/35 p-3 sm:grid-cols-3'>
        <div>
          <p className='text-[9px] font-semibold uppercase tracking-[0.1em] text-muted-foreground'>
            Route
          </p>

          <p className='mt-1 text-xs font-semibold text-foreground'>
            {flight.origin.code} → {flight.destination.code}
          </p>

          <p className='mt-1 text-[10px] text-muted-foreground'>
            {flight.origin.city} to {flight.destination.city}
          </p>
        </div>

        <div>
          <p className='text-[9px] font-semibold uppercase tracking-[0.1em] text-muted-foreground'>
            Flight departure
          </p>

          <p className='mt-1 text-xs font-medium text-foreground'>
            {formatDateTime(flight.departureDate, flight.departureTime)}
          </p>
        </div>

        <div>
          <p className='text-[9px] font-semibold uppercase tracking-[0.1em] text-muted-foreground'>
            Request submitted
          </p>

          <p className='mt-1 inline-flex items-center gap-1.5 text-xs font-medium text-foreground'>
            <CalendarClock className='size-3.5 text-muted-foreground' />
            {formatDate(refund.requestedAt)}
          </p>
        </div>
      </div>

      <div className='mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-border/60 pt-3'>
        <p className='text-[10px] text-muted-foreground'>
          {record.payment ?
            `Original payment: ${record.payment.providerReference}`
          : 'No linked payment reference available'}
        </p>

        <span className='inline-flex items-center gap-1.5 text-xs font-semibold text-[#2879A8] transition-colors group-hover:text-[#102A43]'>
          View refund details
          <ArrowUpRight className='size-3.5' aria-hidden='true' />
        </span>
      </div>
    </Link>
  );
}
