import Link from 'next/link';
import { ArrowRight, CalendarClock, CheckCircle2, Clock3, MapPin, Plane, Ticket } from 'lucide-react';

import { CustomerStatusBadge } from '@/components/customer/shared/customer-status-badge';

import type { CustomerCheckInItem } from '../types/check-in';

function formatDateTime(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'Date unavailable';
  return new Intl.DateTimeFormat('en-PH', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'Asia/Manila' }).format(date);
}

function statusForBadge(item: CustomerCheckInItem) {
  if (item.displayStatus === 'AVAILABLE') return 'CHECK_IN_OPEN';
  if (item.displayStatus === 'NOT_OPEN') return 'SCHEDULED';
  if (item.displayStatus === 'COMPLETED') return 'COMPLETED';
  if (item.displayStatus === 'EXPIRED') return 'EXPIRED';
  if (item.displayStatus === 'CANCELLED') return 'CANCELLED';
  return 'PENDING';
}

export function CheckInListItem({ item }: { item: CustomerCheckInItem }) {
  const departurePassed = item.departureTimestamp <= Date.now();

  return (
    <article className="group overflow-hidden rounded-2xl border border-border/70 bg-card shadow-sm transition-all duration-200 hover:border-[#5BA9D6]/60 hover:shadow-md">
      <div className="flex flex-col gap-4 p-4 sm:p-5 lg:flex-row lg:items-center lg:gap-6">
        <div className="flex min-w-0 flex-1 items-start gap-3 sm:gap-4">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#EEF7FB] text-[#102A43] ring-1 ring-[#D9EAF3]">
            <Plane className="size-5" aria-hidden="true" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs font-semibold tracking-wide text-foreground">{item.bookingReference}</span>
              <CustomerStatusBadge status={statusForBadge(item)} />
            </div>
            <div className="mt-3 grid grid-cols-[1fr_auto_1fr] items-center gap-3 sm:max-w-[390px]">
              <div className="min-w-0">
                <p className="text-xl font-semibold tracking-tight text-foreground">{item.originCode}</p>
                <p className="truncate text-[11px] text-muted-foreground">{item.originCity}</p>
              </div>
              <div className="flex w-16 flex-col items-center gap-1 text-[#5BA9D6] sm:w-20">
                <Plane className="size-4" aria-hidden="true" />
                <div className="h-px w-full bg-[#B8DCEB]" />
              </div>
              <div className="min-w-0 text-right">
                <p className="text-xl font-semibold tracking-tight text-foreground">{item.destinationCode}</p>
                <p className="truncate text-[11px] text-muted-foreground">{item.destinationCity}</p>
              </div>
            </div>
            <p className="mt-3 truncate text-xs text-muted-foreground">{item.passengerName} <span className="px-1 text-border">•</span> {item.flightNumber} <span className="px-1 text-border">•</span> Seat {item.currentSeatNumber}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 border-t border-border/60 pt-4 text-xs sm:grid-cols-2 lg:w-[275px] lg:border-l lg:border-t-0 lg:pl-5 lg:pt-0">
          <div className="flex items-start gap-2">
            <CalendarClock className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
            <div><p className="font-medium text-foreground">Departure</p><p className="mt-1 leading-5 text-muted-foreground">{formatDateTime(item.departureAt)}</p></div>
          </div>
          <div className="flex items-start gap-2">
            {item.displayStatus === 'COMPLETED' ? <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-600" /> : <Clock3 className="mt-0.5 size-4 shrink-0 text-muted-foreground" />}
            <div><p className="font-medium text-foreground">{item.displayStatus === 'COMPLETED' ? 'Checked in' : 'Check-in status'}</p><p className="mt-1 leading-5 text-muted-foreground">{item.displayStatus === 'COMPLETED' && item.checkedInAt ? formatDateTime(item.checkedInAt) : item.unavailableReason ?? 'Ready for online check-in'}</p></div>
          </div>
          <div className="flex items-start gap-2 sm:col-span-2">
            <MapPin className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
            <p className="text-muted-foreground">{item.terminal ? `Terminal ${item.terminal}` : 'Terminal pending'} <span className="px-1">•</span> {item.gate ? `Gate ${item.gate}` : 'Gate pending'}</p>
          </div>
        </div>

        <div className="flex shrink-0 flex-col gap-2 border-t border-border/60 pt-4 lg:w-40 lg:border-t-0 lg:pt-0">
          {item.canCheckIn ? (
            <Link href={`/customer/check-in/${item.bookingId}`} className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl bg-[#102A43] px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-[#183F5D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5BA9D6] focus-visible:ring-offset-2">
              Check in <ArrowRight className="size-3.5" />
            </Link>
          ) : (
            <Link href={`/customer/check-in/${item.bookingId}`} className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-border bg-background px-4 py-2.5 text-xs font-semibold text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5BA9D6] focus-visible:ring-offset-2">
              View details <ArrowRight className="size-3.5" />
            </Link>
          )}
          <Link href={`/customer/tickets/${item.ticketId}`} className="inline-flex min-h-9 items-center justify-center gap-2 rounded-xl px-3 py-2 text-[11px] font-semibold text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
            <Ticket className="size-3.5" /> View ticket
          </Link>
          {departurePassed ? <p className="text-center text-[10px] text-muted-foreground">Past flight record</p> : null}
        </div>
      </div>
    </article>
  );
}
