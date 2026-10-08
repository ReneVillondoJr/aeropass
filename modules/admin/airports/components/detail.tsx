'use client';

import {
  ArrowDownToLine,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Clock3,
  Globe2,
  MapPin,
  Plane,
  RadioTower,
  Route,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';

import type {
  AirportFlightView,
  AirportRouteView,
  AirportViewModel,
} from '../types/airports';

interface AirportDetailProps {
  airport: AirportViewModel | null;
}

function formatFlightDate(value: string) {
  const date = new Date(`${value}T00:00:00`);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat('en-PH', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}

function formatFlightStatus(value: string) {
  return value
    .replaceAll('_', ' ')
    .toLowerCase()
    .replace(/^\w/, (letter) => letter.toUpperCase());
}

function FlightActivityRow({ item }: { item: AirportFlightView }) {
  const { flight, counterpart } = item;
  const isDeparture = item.direction === 'DEPARTURE';

  return (
    <div className='flex items-center gap-3 px-4 py-3.5 transition-colors hover:bg-muted/20 sm:px-5'>
      <div
        className={[
          'flex size-9 shrink-0 items-center justify-center rounded-xl',
          isDeparture ?
            'bg-[#EEF7FB] text-[#102A43]'
          : 'bg-emerald-50 text-emerald-600',
        ].join(' ')}
      >
        {isDeparture ?
          <ArrowUpRight className='size-4' />
        : <ArrowDownToLine className='size-4' />}
      </div>

      <div className='min-w-0 flex-1'>
        <div className='flex min-w-0 items-center gap-2'>
          <span className='truncate text-xs font-semibold tabular-nums'>
            {flight.flightNumber}
          </span>

          <Badge
            variant='outline'
            className='shrink-0 px-2 py-0.5 text-[9px] font-medium'
          >
            {isDeparture ? 'Departure' : 'Arrival'}
          </Badge>
        </div>

        <div className='mt-1 flex min-w-0 items-center gap-1.5 text-[10px] text-muted-foreground'>
          <span className='font-medium text-foreground'>
            {counterpart.code}
          </span>

          <span>·</span>

          <span className='truncate'>
            {formatFlightDate(flight.departureDate)}
          </span>
        </div>
      </div>

      <div className='hidden shrink-0 text-right sm:block'>
        <p className='text-sm font-semibold tabular-nums'>
          {flight.departureTime}
        </p>

        <p className='mt-0.5 text-[9px] text-muted-foreground'>
          {formatFlightStatus(flight.status)}
        </p>
      </div>

      <span className='shrink-0 rounded-full bg-muted px-2.5 py-1 text-[9px] font-semibold text-muted-foreground'>
        Gate {flight.gate}
      </span>
    </div>
  );
}

function RouteStat({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className='flex items-center gap-1.5'>
      <span className='text-[10px] text-muted-foreground'>{label}</span>
      <span className='text-xs font-semibold tabular-nums'>{value}</span>
    </div>
  );
}

function RouteCity({
  city,
  align = 'left',
}: {
  city: string;
  align?: 'left' | 'right';
}) {
  return (
    <p
      title={city}
      className={[
        'min-w-0 truncate text-[10px] text-muted-foreground',
        align === 'right' ? 'text-right' : 'text-left',
      ].join(' ')}
    >
      {city}
    </p>
  );
}

function RouteCard({ item }: { item: AirportRouteView }) {
  const isOutbound = item.direction === 'OUTBOUND';

  return (
    <article className='rounded-2xl border border-border/60 bg-background p-4 transition-colors hover:bg-muted/10 sm:p-5'>
      <div className='flex items-center justify-between gap-3'>
        <Badge
          variant='outline'
          className={[
            'gap-1.5 px-2.5 py-1 text-[9px] font-semibold',
            isOutbound ?
              'border-[#D7EBF5] bg-[#EEF7FB] text-[#102A43]'
            : 'border-emerald-200 bg-emerald-50 text-emerald-700',
          ].join(' ')}
        >
          <span
            aria-hidden='true'
            className={[
              'size-1.5 rounded-full',
              isOutbound ? 'bg-[#5BA9D6]' : 'bg-emerald-500',
            ].join(' ')}
          />
          {isOutbound ? 'Outbound' : 'Inbound'}
        </Badge>

        <span className='text-[10px] tabular-nums text-muted-foreground'>
          {item.route.distanceKm} km
        </span>
      </div>

      <div className='mt-5'>
        <div className='flex items-center gap-2'>
          <span className='text-2xl font-semibold tracking-tight'>
            {item.origin.code}
          </span>

          <div className='flex min-w-0 flex-1 items-center gap-1.5 text-[#5BA9D6]'>
            <span className='flex-1 border-t border-dashed border-border' />

            <span className='flex-1 border-t border-dashed border-border' />
          </div>

          <span className='text-2xl font-semibold tracking-tight'>
            {item.destination.code}
          </span>
        </div>

        <div className='mt-1 grid grid-cols-2 gap-3'>
          <RouteCity city={item.origin.city} />
          <RouteCity city={item.destination.city} align='right' />
        </div>
      </div>

      <div className='mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-border/60 pt-4'>
        <RouteStat label='Schedules' value={item.schedules.length} />
        <RouteStat label='Flights' value={item.flights.length} />
        <RouteStat
          label='Duration'
          value={`${item.route.durationMinutes} min`}
        />
      </div>
    </article>
  );
}

export function AirportDetail({ airport }: AirportDetailProps) {
  if (!airport) {
    return (
      <section className='xl:sticky xl:top-6'>
        <div className='flex min-h-110 flex-col items-center justify-center rounded-2xl border border-dashed border-border/70 bg-background px-6 text-center shadow-sm'>
          <div className='flex size-12 items-center justify-center rounded-2xl bg-[#E5F5FC] text-[#5BA9D6]'>
            <Globe2 className='size-5' />
          </div>

          <h2 className='mt-4 text-sm font-semibold'>Select an airport</h2>

          <p className='mt-1 max-w-sm text-xs leading-5 text-muted-foreground'>
            Choose an airport to inspect its routes and flight activity.
          </p>
        </div>
      </section>
    );
  }

  const recentActivity = [
    ...airport.departures.map((item) => ({
      ...item,
      sortDate: `${item.flight.departureDate}T${item.flight.departureTime}`,
    })),
    ...airport.arrivals.map((item) => ({
      ...item,
      sortDate: `${item.flight.departureDate}T${item.flight.departureTime}`,
    })),
  ]
    .sort(
      (a, b) => new Date(b.sortDate).getTime() - new Date(a.sortDate).getTime(),
    )
    .slice(0, 6);

  const connectedAirports = Array.from(
    new Map(
      [...airport.uniqueDestinations, ...airport.uniqueOrigins].map((item) => [
        item.id,
        item,
      ]),
    ).values(),
  );

  return (
    <section className='min-w-0 xl:sticky xl:top-6'>
      <div className='overflow-hidden rounded-2xl border border-border/70 bg-background shadow-sm'>
        {/* Hero */}
        <div className='relative overflow-hidden bg-[#102A43] px-5 py-5 text-white sm:px-6'>
          <div className='absolute inset-0 bg-[radial-gradient(circle_at_90%_0%,rgba(91,169,214,0.24),transparent_35%)]' />

          <div className='relative'>
            <div className='flex items-start gap-3'>
              <div className='flex size-11 shrink-0 items-center justify-center rounded-2xl bg-white/10'>
                <Plane className='size-5' />
              </div>

              <div className='min-w-0 flex-1'>
                <p className='text-[9px] font-medium uppercase tracking-[0.16em] text-white/45'>
                  Airport
                </p>

                <div className='mt-1 flex min-w-0 items-baseline gap-3'>
                  <h2 className='text-3xl font-semibold tracking-tight'>
                    {airport.airport.code}
                  </h2>

                  <span className='truncate text-xs text-white/55'>
                    {airport.airport.city}
                  </span>
                </div>

                <p className='mt-1 truncate text-[11px] text-white/55'>
                  {airport.airport.name}
                </p>
              </div>
            </div>

            <div className='mt-5 grid grid-cols-3 gap-2'>
              <div className='rounded-xl bg-white/[0.08] px-3 py-2.5'>
                <p className='text-[8px] uppercase tracking-[0.13em] text-white/40'>
                  Routes
                </p>
                <p className='mt-1 text-sm font-semibold'>
                  {airport.routes.length}
                </p>
              </div>

              <div className='rounded-xl bg-white/[0.08] px-3 py-2.5'>
                <p className='text-[8px] uppercase tracking-[0.13em] text-white/40'>
                  Schedules
                </p>
                <p className='mt-1 text-sm font-semibold'>
                  {airport.schedules.length}
                </p>
              </div>

              <div className='rounded-xl bg-white/[0.08] px-3 py-2.5'>
                <p className='text-[8px] uppercase tracking-[0.13em] text-white/40'>
                  Flights
                </p>
                <p className='mt-1 text-sm font-semibold'>
                  {airport.flights.length}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className='max-h-138 overflow-y-scroll overscroll-contain scrollbar-subtle'>
          <div className='space-y-5 p-5 sm:p-6'>
            {/* Airport information */}
            <section>
              <div className='mb-3 flex items-center gap-2'>
                <MapPin className='size-4 text-[#5BA9D6]' />
                <h3 className='text-xs font-semibold uppercase tracking-wide'>
                  Airport information
                </h3>
              </div>

              <div className='grid gap-3 sm:grid-cols-2'>
                <div>
                  <p className='text-[10px] text-muted-foreground'>Location</p>
                  <p className='mt-1 text-xs font-medium'>
                    {airport.airport.city}, {airport.airport.country}
                  </p>
                </div>

                <div>
                  <p className='text-[10px] text-muted-foreground'>Terminal</p>
                  <p className='mt-1 text-xs font-medium'>
                    {airport.airport.terminal}
                  </p>
                </div>

                <div>
                  <p className='text-[10px] text-muted-foreground'>Timezone</p>
                  <p className='mt-1 text-xs font-medium'>
                    {airport.airport.timezone}
                  </p>
                </div>

                <div>
                  <p className='text-[10px] text-muted-foreground'>Schedules</p>
                  <p className='mt-1 text-xs font-medium'>
                    {airport.schedules.length}
                  </p>
                </div>
              </div>
            </section>

            {/* Route network */}
            <section className='border-t border-border/60 pt-5'>
              <div className='mb-3 flex items-center justify-between gap-3'>
                <div className='flex items-center gap-2'>
                  <Route className='size-4 text-[#5BA9D6]' />
                  <h3 className='text-xs font-semibold uppercase tracking-wide'>
                    Route network
                  </h3>
                </div>

                <span className='text-[10px] font-medium text-muted-foreground'>
                  {airport.routes.length}{' '}
                  {airport.routes.length === 1 ? 'route' : 'routes'}
                </span>
              </div>

              {airport.routes.length > 0 ?
                <div className='grid gap-3 sm:grid-cols-2'>
                  {airport.routes.map((item) => (
                    <RouteCard key={item.route.id} item={item} />
                  ))}
                </div>
              : <div className='rounded-2xl border border-dashed border-border/70 px-5 py-8 text-center'>
                  <Route className='mx-auto size-5 text-muted-foreground' />
                  <p className='mt-2 text-xs font-medium'>No route records</p>
                </div>
              }
            </section>

            {/* Flight activity */}
            <section className='border-t border-border/60 pt-5'>
              <div className='mb-3 flex items-center justify-between gap-3'>
                <div className='flex items-center gap-2'>
                  <Clock3 className='size-4 text-[#5BA9D6]' />
                  <h3 className='text-xs font-semibold uppercase tracking-wide'>
                    Flight activity
                  </h3>
                </div>

                <span className='text-[10px] font-medium text-muted-foreground'>
                  {recentActivity.length} shown
                </span>
              </div>

              <div className='overflow-hidden rounded-2xl border border-border/60 bg-background'>
                {recentActivity.length > 0 ?
                  <div className='divide-y divide-border/60'>
                    {recentActivity.map((item) => (
                      <FlightActivityRow
                        key={`${item.direction}-${item.flight.id}`}
                        item={item}
                      />
                    ))}
                  </div>
                : <div className='px-5 py-9 text-center'>
                    <Clock3 className='mx-auto size-5 text-muted-foreground' />

                    <p className='mt-3 text-xs font-medium'>
                      No linked flight activity
                    </p>

                    <p className='mt-1 text-[10px] leading-5 text-muted-foreground'>
                      No flight instances are associated with this airport.
                    </p>
                  </div>
                }
              </div>
            </section>

            {/* Connected airports */}
            <section className='border-t border-border/60 pt-5'>
              <div className='mb-3 flex items-center gap-2'>
                <RadioTower className='size-4 text-[#5BA9D6]' />
                <h3 className='text-xs font-semibold uppercase tracking-wide'>
                  Connected airports
                </h3>
              </div>

              {connectedAirports.length > 0 ?
                <div className='flex flex-wrap gap-2'>
                  {connectedAirports.map((connectedAirport) => (
                    <div
                      key={connectedAirport.id}
                      className='flex items-center gap-2 rounded-xl border border-border/60 bg-muted/20 px-3 py-2'
                    >
                      <div className='flex size-7 shrink-0 items-center justify-center rounded-lg bg-[#EEF7FB] text-[8px] font-bold text-[#102A43]'>
                        {connectedAirport.code}
                      </div>

                      <div className='min-w-0'>
                        <p className='truncate text-[10px] font-semibold'>
                          {connectedAirport.city}
                        </p>

                        <p className='truncate text-[8px] text-muted-foreground'>
                          {connectedAirport.terminal}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              : <div className='rounded-2xl border border-dashed border-border/70 px-5 py-8 text-center'>
                  <RadioTower className='mx-auto size-5 text-muted-foreground' />
                  <p className='mt-2 text-xs font-medium'>
                    No connected airports
                  </p>
                </div>
              }
            </section>

            {/* Operational summary */}
            <section className='border-t border-border/60 pt-5'>
              <div className='flex items-center gap-2'>
                <CalendarDays className='size-4 text-[#5BA9D6]' />
                <h3 className='text-xs font-semibold uppercase tracking-wide'>
                  Network summary
                </h3>
              </div>

              <div className='mt-3 flex flex-wrap gap-x-6 gap-y-2'>
                <div>
                  <p className='text-[10px] text-muted-foreground'>
                    Destinations
                  </p>
                  <p className='mt-1 text-xs font-semibold tabular-nums'>
                    {airport.uniqueDestinations.length}
                  </p>
                </div>

                <div>
                  <p className='text-[10px] text-muted-foreground'>Origins</p>
                  <p className='mt-1 text-xs font-semibold tabular-nums'>
                    {airport.uniqueOrigins.length}
                  </p>
                </div>

                <div>
                  <p className='text-[10px] text-muted-foreground'>
                    Flight instances
                  </p>
                  <p className='mt-1 text-xs font-semibold tabular-nums'>
                    {airport.flights.length}
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </section>
  );
}
