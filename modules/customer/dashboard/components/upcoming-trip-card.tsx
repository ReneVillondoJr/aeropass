import Link from 'next/link';
import { ArrowRight, CalendarClock, CheckCircle2, MapPin, PlaneTakeoff, Ticket } from 'lucide-react';

import { CustomerEmptyState } from '@/components/customer/shared/empty-state';
import { CustomerStatusBadge } from '@/components/customer/shared/customer-status-badge';
import { FlightRouteSummary } from '@/components/customer/shared/flight-route-summary';

import type { UpcomingTripView } from '../types/customer-dashboard';

interface UpcomingTripCardProps {
  trip: UpcomingTripView | null;
}

function formatDepartureDate(value?: string | Date | null): string {
  if (!value) return 'Departure date unavailable';
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return 'Departure date unavailable';
  return new Intl.DateTimeFormat('en-PH', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'Asia/Manila',
  }).format(date);
}

function checkInLabel(state: UpcomingTripView['checkInState']): string {
  switch (state) {
    case 'COMPLETED':
      return 'Check-in completed';
    case 'OPEN':
      return 'Online check-in is open';
    case 'UPCOMING':
      return 'Check-in opens closer to departure';
    case 'UNAVAILABLE':
      return 'Check-in is unavailable for this trip';
  }
}

export function UpcomingTripCard({ trip }: UpcomingTripCardProps) {
  return (
    <section className="overflow-hidden rounded-2xl border border-border/70 bg-card shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-border/60 px-4 py-4 sm:px-5">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#2879A8]">Your travel plan</p>
          <h2 className="mt-1 text-base font-semibold tracking-tight text-foreground">Upcoming trip</h2>
        </div>
        {trip ? <CustomerStatusBadge status={trip.status} /> : null}
      </div>

      {trip ? (
        <div className="p-4 sm:p-5">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <div className="flex min-w-0 items-center gap-2 text-xs text-muted-foreground">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#EEF7FB] text-[#102A43]">
                <PlaneTakeoff className="size-4" aria-hidden="true" />
              </span>
              <span className="min-w-0">
                <span className="block text-[10px] uppercase tracking-wider">Booking reference</span>
                <span className="mt-0.5 block truncate font-mono font-semibold text-foreground">{trip.bookingReference}</span>
              </span>
            </div>
            <CustomerStatusBadge status={trip.flightStatus} />
          </div>

          <FlightRouteSummary
            originCode={trip.originCode}
            originCity={trip.originCity}
            destinationCode={trip.destinationCode}
            destinationCity={trip.destinationCity}
            departureAt={trip.departureAt}
            arrivalAt={trip.arrivalAt}
            flightNumber={trip.flightNumber}
            duration={trip.duration}
          />

          <p className="mt-4 flex items-start gap-2 text-xs leading-5 text-muted-foreground">
            <CalendarClock className="mt-0.5 size-3.5 shrink-0 text-[#2879A8]" aria-hidden="true" />
            <span>{formatDepartureDate(trip.departureAt)}</span>
          </p>

          <div className="mt-4 grid grid-cols-2 gap-2 sm:gap-3">
            <div className="rounded-xl border border-border/60 bg-muted/20 p-3">
              <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Terminal</p>
              <p className="mt-1 text-sm font-semibold text-foreground">{trip.terminal || 'To be announced'}</p>
            </div>
            <div className="rounded-xl border border-border/60 bg-muted/20 p-3">
              <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Gate</p>
              <p className="mt-1 text-sm font-semibold text-foreground">{trip.gate || 'To be announced'}</p>
            </div>
          </div>

          <div className="mt-3 flex items-start gap-2 rounded-xl bg-[#F3F9FC] px-3 py-3 text-xs text-[#234B65]">
            {trip.checkInState === 'COMPLETED' ? (
              <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-600" aria-hidden="true" />
            ) : trip.checkInState === 'OPEN' ? (
              <Ticket className="mt-0.5 size-4 shrink-0 text-[#2879A8]" aria-hidden="true" />
            ) : (
              <MapPin className="mt-0.5 size-4 shrink-0 text-[#2879A8]" aria-hidden="true" />
            )}
            <span className="leading-5">{checkInLabel(trip.checkInState)}</span>
          </div>

          <div className="mt-5 flex flex-wrap justify-end gap-2">
            {trip.checkInState === 'OPEN' ? (
              <Link
                href={`/customer/check-in/${trip.id}`}
                className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl bg-[#102A43] px-4 py-2 text-xs font-semibold text-white outline-none transition hover:bg-[#183F5D] focus-visible:ring-2 focus-visible:ring-[#5BA9D6] focus-visible:ring-offset-2"
              >
                Check in <ArrowRight className="size-3.5" aria-hidden="true" />
              </Link>
            ) : null}
            <Link
              href={`/customer/bookings/${trip.id}`}
              className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-border bg-background px-4 py-2 text-xs font-semibold text-foreground outline-none transition hover:bg-muted focus-visible:ring-2 focus-visible:ring-[#5BA9D6] focus-visible:ring-offset-2"
            >
              View trip details <ArrowRight className="size-3.5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      ) : (
        <div className="p-4 sm:p-5">
          <CustomerEmptyState
            title="No upcoming trips yet"
            description="When you have a confirmed booking with a future departure date, your trip details and check-in actions will appear here."
            icon={PlaneTakeoff}
            actionLabel="Explore flights"
            actionHref="/search"
          />
        </div>
      )}
    </section>
  );
}
