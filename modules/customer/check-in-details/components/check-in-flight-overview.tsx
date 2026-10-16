import { CalendarDays, Clock3, MapPin, Plane, Ticket, type LucideIcon } from 'lucide-react';

import { CustomerStatusBadge } from '@/components/customer/shared/customer-status-badge';
import type { CustomerCheckInDetailView } from '@/modules/customer/check-in/types/check-in';

function formatDateTime(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'Date unavailable';
  return new Intl.DateTimeFormat('en-PH', { dateStyle: 'full', timeStyle: 'short', timeZone: 'Asia/Manila' }).format(date);
}

export function CheckInFlightOverview({ detail }: { detail: CustomerCheckInDetailView }) {
  return (
    <section className="overflow-hidden rounded-2xl border border-border/70 bg-card shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 px-5 py-4 sm:px-6">
        <div className="flex items-center gap-2.5">
          <span className="flex size-9 items-center justify-center rounded-xl bg-[#EEF7FB] text-[#102A43]"><Plane className="size-4" /></span>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#2879A8]">Flight overview</p>
            <p className="mt-0.5 text-sm font-semibold text-foreground">{detail.flightNumber}</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <CustomerStatusBadge status={detail.bookingStatus} />
          <CustomerStatusBadge status={detail.paymentStatus} />
        </div>
      </div>

      <div className="grid gap-5 p-5 sm:p-6 lg:grid-cols-[1fr_230px] lg:items-center">
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 sm:gap-5">
          <div className="min-w-0">
            <p className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">{detail.originCode}</p>
            <p className="mt-1 truncate text-xs font-medium text-muted-foreground">{detail.originCity}</p>
            <p className="mt-1 line-clamp-2 text-[10px] leading-4 text-muted-foreground">{detail.originAirportName}</p>
          </div>
          <div className="flex w-16 flex-col items-center gap-2 text-[#5BA9D6] sm:w-24">
            <Plane className="size-5" />
            <div className="relative h-px w-full bg-[#B8DCEB]"><span className="absolute -top-0.5 right-0 size-1.5 rounded-full bg-[#5BA9D6]" /></div>
            <span className="text-[9px] font-semibold uppercase tracking-wider text-muted-foreground">Direct flight</span>
          </div>
          <div className="min-w-0 text-right">
            <p className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">{detail.destinationCode}</p>
            <p className="mt-1 truncate text-xs font-medium text-muted-foreground">{detail.destinationCity}</p>
            <p className="mt-1 line-clamp-2 text-[10px] leading-4 text-muted-foreground">{detail.destinationAirportName}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 border-t border-border/60 pt-4 text-xs sm:grid-cols-2 lg:grid-cols-1 lg:border-l lg:border-t-0 lg:pl-5 lg:pt-0">
          <Info icon={CalendarDays} label="Departure" value={formatDateTime(detail.departureAt)} />
          <Info icon={Clock3} label="Arrival" value={formatDateTime(detail.arrivalAt)} />
          <Info icon={Ticket} label="Booking reference" value={detail.bookingReference} mono />
          <Info icon={MapPin} label="Terminal & gate" value={`${detail.terminal ? `Terminal ${detail.terminal}` : 'Terminal pending'} · ${detail.gate ? `Gate ${detail.gate}` : 'Gate pending'}`} />
        </div>
      </div>
    </section>
  );
}

function Info({ icon: Icon, label, value, mono = false }: { icon: LucideIcon; label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex items-start gap-2.5">
      <Icon className="mt-0.5 size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
      <div className="min-w-0"><p className="text-[10px] text-muted-foreground">{label}</p><p className={['mt-0.5 text-xs font-semibold text-foreground', mono ? 'font-mono tracking-wide' : ''].join(' ')}>{value}</p></div>
    </div>
  );
}
