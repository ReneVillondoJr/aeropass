import { CalendarDays, Clock3, MapPin, Plane, RadioTower } from 'lucide-react';

import { CustomerStatusBadge } from '@/components/customer/shared/customer-status-badge';
import { FlightRouteSummary } from '@/components/customer/shared/flight-route-summary';

import type { CustomerBookingDetailView } from '@/modules/customer/bookings/types/booking';

interface BookingItineraryProps {
  booking: CustomerBookingDetailView;
}

function formatFullDate(value?: string | Date | null): string {
  if (!value) return 'Date unavailable';
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return 'Date unavailable';

  return new Intl.DateTimeFormat('en-PH', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'Asia/Manila',
  }).format(date);
}

export function BookingItinerary({ booking }: BookingItineraryProps) {
  return (
    <section className="overflow-hidden rounded-2xl border border-border/70 bg-card shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-border/60 px-4 py-4 sm:px-5">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#2879A8]">Flight itinerary</p>
          <h2 className="mt-1 text-base font-semibold tracking-tight text-foreground">{booking.flightNumber}</h2>
          <p className="mt-1 text-xs text-muted-foreground">Booking reference <span className="font-mono font-semibold text-foreground">{booking.bookingReference}</span></p>
        </div>
        <CustomerStatusBadge status={booking.status} />
      </div>

      <div className="p-4 sm:p-5">
        <FlightRouteSummary
          originCode={booking.originCode}
          originCity={booking.originCity}
          destinationCode={booking.destinationCode}
          destinationCity={booking.destinationCity}
          departureAt={booking.departureAt}
          arrivalAt={booking.arrivalAt}
          flightNumber={booking.flightNumber}
          duration={booking.duration}
        />

        <div className="mt-5 grid gap-3 border-t border-border/60 pt-4 sm:grid-cols-2">
          <div className="flex items-start gap-2.5">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#EEF7FB] text-[#2879A8]">
              <CalendarDays className="size-4" aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">Departure date</p>
              <p className="mt-1 text-xs font-semibold text-foreground">{formatFullDate(booking.departureAt)}</p>
            </div>
          </div>
          <div className="flex items-start gap-2.5">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#EEF7FB] text-[#2879A8]">
              <Plane className="size-4" aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">Flight status</p>
              <div className="mt-1"><CustomerStatusBadge status={booking.flightStatus} /></div>
            </div>
          </div>
          <div className="flex items-start gap-2.5">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
              <RadioTower className="size-4" aria-hidden="true" />
            </span>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">Terminal / gate</p>
              <p className="mt-1 text-xs font-semibold text-foreground">{booking.terminal || 'To be announced'} / {booking.gate || 'TBA'}</p>
            </div>
          </div>
          <div className="flex items-start gap-2.5">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
              <MapPin className="size-4" aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">Airports</p>
              <p className="mt-1 text-xs font-semibold text-foreground">{booking.originAirportName}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">to {booking.destinationAirportName}</p>
            </div>
          </div>
        </div>

        {booking.expiresAt && booking.status === 'PENDING_PAYMENT' ? (
          <div className="mt-4 flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 p-3 text-amber-950">
            <Clock3 className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            <div>
              <p className="text-xs font-semibold">Payment deadline</p>
              <p className="mt-1 text-xs leading-5">This reservation expires {formatFullDate(booking.expiresAt)}. Check the payment status before the hold expires.</p>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
