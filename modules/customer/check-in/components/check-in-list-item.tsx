import Link from 'next/link';
import {
  ArrowRight,
  CalendarClock,
  CheckCircle2,
  Clock3,
  MapPin,
  Plane,
  Ticket,
} from 'lucide-react';

import { CustomerStatusBadge } from '@/components/customer/shared/customer-status-badge';

import type { CustomerCheckInItem } from '../types/check-in';

function formatDateTime(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'Date unavailable';
  return new Intl.DateTimeFormat('en-PH', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Asia/Manila',
  }).format(date);
}

function statusForBadge(item: CustomerCheckInItem) {
  if (item.displayStatus === 'AVAILABLE') return 'CHECK_IN_OPEN';
  if (item.displayStatus === 'NOT_OPEN') return 'SCHEDULED';
  if (item.displayStatus === 'COMPLETED') return 'COMPLETED';
  if (item.displayStatus === 'EXPIRED') return 'EXPIRED';
  if (item.displayStatus === 'CANCELLED') return 'CANCELLED';
  return 'PENDING';
}

interface DetailItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

function DetailItem({ icon, label, value }: DetailItemProps) {
  return (
    <div className='flex min-w-0 items-start gap-2.5 py-3 sm:px-4 sm:py-0 sm:first:pl-0 sm:last:pr-0'>
      <span className='mt-0.5 shrink-0'>{icon}</span>

      <div className='min-w-0'>
        <dt className='text-[11px] font-medium text-muted-foreground'>
          {label}
        </dt>

        <dd className='mt-0.5 text-xs font-semibold leading-5 text-foreground'>
          {value}
        </dd>
      </div>
    </div>
  );
}

export function CheckInListItem({ item }: { item: CustomerCheckInItem }) {
  const departurePassed = ['COMPLETED', 'EXPIRED', 'CANCELLED'].includes(item.displayStatus);
  const isCompleted = item.displayStatus === 'COMPLETED';

  const checkInLabel = isCompleted ? 'Checked in' : 'Check-in';

  const checkInValue =
    isCompleted && item.checkedInAt ?
      formatDateTime(item.checkedInAt)
    : (item.unavailableReason ?? 'Ready for online check-in');

  const locationValue = [
    item.terminal ? `Terminal ${item.terminal}` : 'Terminal pending',
    item.gate ? `Gate ${item.gate}` : 'Gate pending',
  ].join(' · ');

  return (
    <article className='overflow-hidden rounded-2xl border border-border/70 bg-card shadow-sm transition-all duration-200 hover:border-[#5BA9D6]/60 hover:shadow-md'>
      <div className='p-5'>
        {/* Header */}
        <div className='flex flex-wrap items-center justify-between gap-x-3 gap-y-2'>
          <div className='flex min-w-0 items-center gap-2.5'>
            <div className='flex size-9 shrink-0 items-center justify-center rounded-xl bg-[#EEF7FB] text-[#102A43]'>
              <Plane className='size-4' aria-hidden='true' />
            </div>

            <div className='min-w-0'>
              <p className='truncate font-mono text-xs font-semibold tracking-wide text-foreground'>
                {item.bookingReference}
              </p>

              <p className='truncate text-[11px] text-muted-foreground'>
                {item.passengerName}
              </p>
            </div>
          </div>

          <CustomerStatusBadge status={statusForBadge(item)} />
        </div>

        {/* Route */}
        <div className='mt-5 grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-3'>
          <div className='min-w-0'>
            <p className='text-2xl font-semibold tracking-tight text-foreground'>
              {item.originCode}
            </p>

            <p className='truncate text-xs text-muted-foreground'>
              {item.originCity}
            </p>
          </div>

          <div
            aria-hidden='true'
            className='flex min-w-12 flex-col items-center gap-1 text-[#5BA9D6] sm:min-w-24'
          >
            <span className='text-[11px] font-semibold tabular-nums text-muted-foreground'>
              {item.flightNumber}
            </span>

            <div className='flex w-full items-center gap-1.5'>
              <span className='flex-1 border-t border-dashed border-border' />
              <Plane className='size-4 shrink-0' />
              <span className='flex-1 border-t border-dashed border-border' />
            </div>
          </div>

          <div className='min-w-0 text-right'>
            <p className='text-2xl font-semibold tracking-tight text-foreground'>
              {item.destinationCode}
            </p>

            <p className='truncate text-xs text-muted-foreground'>
              {item.destinationCity}
            </p>
          </div>
        </div>

        {/* Details */}
        <dl className='mt-5 grid grid-cols-1 divide-y divide-border/60 border-t border-border/60 sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:pt-4'>
          <DetailItem
            icon={<CalendarClock className='size-4 text-muted-foreground' />}
            label='Departure'
            value={formatDateTime(item.departureAt)}
          />

          <DetailItem
            icon={
              isCompleted ?
                <CheckCircle2 className='size-4 text-emerald-600' />
              : <Clock3 className='size-4 text-muted-foreground' />
            }
            label={checkInLabel}
            value={checkInValue}
          />

          <DetailItem
            icon={<MapPin className='size-4 text-muted-foreground' />}
            label={`Seat ${item.currentSeatNumber}`}
            value={locationValue}
          />
        </dl>
      </div>

      {/* Actions */}
      <div className='flex flex-col gap-2 border-t border-border/60 bg-muted/20 px-5 py-3 sm:flex-row sm:items-center sm:justify-between'>
        <p className='text-[11px] text-muted-foreground'>
          {departurePassed ? 'Past flight record' : 'Upcoming flight'}
        </p>

        <div className='flex flex-col gap-2 sm:flex-row sm:items-center'>
          <Link
            href={`/customer/tickets/${item.ticketId}`}
            className='inline-flex min-h-9 items-center justify-center gap-2 rounded-xl px-3 text-xs font-semibold text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5BA9D6]'
          >
            <Ticket className='size-3.5' />
            View ticket
          </Link>

          <Link
            href={`/customer/check-in/${item.bookingId}`}
            className={[
              'inline-flex min-h-9 items-center justify-center gap-2 rounded-xl px-4 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5BA9D6] focus-visible:ring-offset-2',
              item.canCheckIn ?
                'bg-[#102A43] text-white hover:bg-[#183F5D]'
              : 'border border-border bg-background text-foreground hover:bg-muted',
            ].join(' ')}
          >
            {item.canCheckIn ? 'Check in' : 'View details'}
            <ArrowRight className='size-3.5' />
          </Link>
        </div>
      </div>
    </article>
  );
}
