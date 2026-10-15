import Link from 'next/link';
import { ArrowUpRight, CalendarDays, CheckCircle2, Clock3, MapPin, Plane, Ticket } from 'lucide-react';

import { CustomerStatusBadge } from '@/components/customer/shared/customer-status-badge';

import type { CustomerTicketItem } from '../types/ticket';

function formatDate(value: string, options: Intl.DateTimeFormatOptions): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'Date unavailable';
  return new Intl.DateTimeFormat('en-PH', { ...options, timeZone: 'Asia/Manila' }).format(date);
}

function formatTime(value: string): string {
  return formatDate(value, { hour: '2-digit', minute: '2-digit', hour12: true });
}

export function TicketListItem({ ticket }: { ticket: CustomerTicketItem }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-border/70 bg-card shadow-sm transition duration-200 hover:border-[#5BA9D6]/50 hover:shadow-md">
      <div className="flex flex-col gap-4 p-4 sm:p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex min-w-0 items-start gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#EEF7FB] text-[#2879A8]">
              <Ticket className="size-4.5" aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <p className="font-mono text-sm font-semibold tracking-wide text-foreground">{ticket.ticketNumber}</p>
              <p className="mt-1 truncate text-xs text-muted-foreground">Booking reference {ticket.bookingReference}</p>
              <p className="mt-1 truncate text-xs font-medium text-foreground">{ticket.passengerName}</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2 sm:justify-end">
            <CustomerStatusBadge status={ticket.displayStatus} />
            <CustomerStatusBadge status={ticket.paymentStatus} />
          </div>
        </div>

        <div className="rounded-xl border border-border/70 bg-background/70 p-3 sm:p-4">
          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
            <div className="min-w-0">
              <p className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">{ticket.originCode}</p>
              <p className="mt-0.5 truncate text-xs text-muted-foreground">{ticket.originCity}</p>
              <p className="mt-2 text-xs font-semibold text-foreground">{formatTime(ticket.departureAt)}</p>
            </div>
            <div className="flex min-w-[64px] flex-col items-center gap-1 text-[#2879A8]">
              <Plane className="size-4" aria-hidden="true" />
              <span className="w-full border-t border-dashed border-[#5BA9D6]" />
              <span className="text-[10px] font-medium text-muted-foreground">{ticket.flightNumber}</span>
            </div>
            <div className="min-w-0 text-right">
              <p className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">{ticket.destinationCode}</p>
              <p className="mt-0.5 truncate text-xs text-muted-foreground">{ticket.destinationCity}</p>
              <p className="mt-2 text-xs font-semibold text-foreground">{formatTime(ticket.arrivalAt)}</p>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-border/70 pt-3 text-[11px] text-muted-foreground">
            <span className="inline-flex items-center gap-1.5"><CalendarDays className="size-3.5" aria-hidden="true" />{formatDate(ticket.departureAt, { day: 'numeric', month: 'short', year: 'numeric', weekday: 'short' })}</span>
            <span className="inline-flex items-center gap-1.5"><MapPin className="size-3.5" aria-hidden="true" />Gate {ticket.gate || 'To be announced'}</span>
            <span className="inline-flex items-center gap-1.5"><Clock3 className="size-3.5" aria-hidden="true" />Seat {ticket.seatNumber}</span>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-muted-foreground">
            <span>Issued {formatDate(ticket.issuedAt, { day: 'numeric', month: 'short', year: 'numeric' })}</span>
            <span>{ticket.cabinClass}</span>
            {ticket.isBoardingPassReady ? (
              <span className="inline-flex items-center gap-1 text-emerald-700"><CheckCircle2 className="size-3.5" aria-hidden="true" />Boarding pass ready</span>
            ) : null}
          </div>
          <Link href={`/customer/tickets/${ticket.id}`} className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl bg-[#102A43] px-4 py-2.5 text-xs font-semibold text-white outline-none transition hover:bg-[#183F5D] focus-visible:ring-2 focus-visible:ring-[#5BA9D6] focus-visible:ring-offset-2">
            View ticket
            <ArrowUpRight className="size-3.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}
