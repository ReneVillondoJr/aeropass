import { CalendarDays, Clock3, MapPin, Plane } from 'lucide-react';

import type { CustomerTicketDetailView } from '@/modules/customer/tickets/types/ticket';

function formatDate(value: string, includeWeekday = false): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'Date unavailable';
  return new Intl.DateTimeFormat('en-PH', {
    weekday: includeWeekday ? 'short' : undefined,
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'Asia/Manila',
  }).format(date);
}

function formatTime(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '--:--';
  return new Intl.DateTimeFormat('en-PH', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    timeZone: 'Asia/Manila',
  }).format(date);
}

function formatDuration(totalMinutes: number): string {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  if (!hours) return `${minutes} min`;
  return minutes ? `${hours}h ${minutes}m` : `${hours}h`;
}

export function TicketItinerary({ ticket }: { ticket: CustomerTicketDetailView }) {
  return (
    <section className="overflow-hidden rounded-2xl border border-border/70 bg-card shadow-sm">
      <div className="border-b border-border/70 p-4 sm:p-5">
        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#2879A8]">Flight itinerary</p>
        <div className="mt-1 flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-base font-semibold text-foreground">{ticket.originCity} to {ticket.destinationCity}</h2>
          <span className="text-xs text-muted-foreground">{ticket.flightNumber}</span>
        </div>
      </div>
      <div className="p-4 sm:p-5">
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 sm:gap-5">
          <div className="min-w-0">
            <p className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">{ticket.originCode}</p>
            <p className="mt-1 text-xs font-medium text-foreground">{formatTime(ticket.departureAt)}</p>
            <p className="mt-1 text-xs leading-5 text-muted-foreground">{ticket.originCity}</p>
            <p className="mt-1 line-clamp-2 text-[10px] leading-4 text-muted-foreground">{ticket.originAirportName}</p>
          </div>
          <div className="flex min-w-[76px] flex-col items-center gap-2 text-[#2879A8]">
            <Plane className="size-5" aria-hidden="true" />
            <div className="w-full border-t border-dashed border-[#5BA9D6]" />
            <span className="text-[10px] font-medium text-muted-foreground">{formatDuration(ticket.flightDurationMinutes)}</span>
          </div>
          <div className="min-w-0 text-right">
            <p className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">{ticket.destinationCode}</p>
            <p className="mt-1 text-xs font-medium text-foreground">{formatTime(ticket.arrivalAt)}</p>
            <p className="mt-1 text-xs leading-5 text-muted-foreground">{ticket.destinationCity}</p>
            <p className="mt-1 line-clamp-2 text-[10px] leading-4 text-muted-foreground">{ticket.destinationAirportName}</p>
          </div>
        </div>
        <div className="mt-5 grid gap-3 border-t border-border/70 pt-4 sm:grid-cols-2">
          <div className="flex items-start gap-2.5">
            <CalendarDays className="mt-0.5 size-4 text-muted-foreground" aria-hidden="true" />
            <div><p className="text-[10px] text-muted-foreground">Departure date</p><p className="mt-1 text-xs font-semibold text-foreground">{formatDate(ticket.departureAt, true)}</p></div>
          </div>
          <div className="flex items-start gap-2.5">
            <Clock3 className="mt-0.5 size-4 text-muted-foreground" aria-hidden="true" />
            <div><p className="text-[10px] text-muted-foreground">Departure and arrival times</p><p className="mt-1 text-xs font-semibold text-foreground">{formatTime(ticket.departureAt)} – {formatTime(ticket.arrivalAt)} PHT</p></div>
          </div>
          <div className="flex items-start gap-2.5">
            <MapPin className="mt-0.5 size-4 text-muted-foreground" aria-hidden="true" />
            <div><p className="text-[10px] text-muted-foreground">Departure terminal</p><p className="mt-1 text-xs font-semibold text-foreground">{ticket.terminal || 'To be announced'}</p></div>
          </div>
          <div className="flex items-start gap-2.5">
            <MapPin className="mt-0.5 size-4 text-muted-foreground" aria-hidden="true" />
            <div><p className="text-[10px] text-muted-foreground">Gate</p><p className="mt-1 text-xs font-semibold text-foreground">{ticket.gate || 'To be announced'}</p></div>
          </div>
        </div>
      </div>
    </section>
  );
}
