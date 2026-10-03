'use client';

import {
  ArrowDownToLine,
  ArrowUpRight,
  CalendarDays,
  Clock3,
  Globe2,
  MapPin,
  Plane,
  RadioTower,
  Route,
} from 'lucide-react';

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

  return (
    <div className='flex items-center justify-between gap-4 border-b border-border/60 px-4 py-4 last:border-b-0'>
      <div className='flex min-w-0 items-center gap-3'>
        <div
          className={[
            'flex size-9 shrink-0 items-center justify-center rounded-xl',
            item.direction === 'DEPARTURE' ?
              'bg-[#EEF7FB] text-[#102A43]'
            : 'bg-emerald-50 text-emerald-600',
          ].join(' ')}
        >
          {item.direction === 'DEPARTURE' ?
            <ArrowUpRight className='size-4' />
          : <ArrowDownToLine className='size-4' />}
        </div>

        <div className='min-w-0'>
          <div className='flex items-center gap-2'>
            <p className='text-xs font-semibold'>{flight.flightNumber}</p>

            <span className='text-[9px] text-muted-foreground'>
              {item.direction === 'DEPARTURE' ? 'Departure' : 'Arrival'}
            </span>
          </div>

          <div className='mt-1 flex items-center gap-1.5'>
            <span className='text-[10px] font-medium'>
              {item.direction === 'DEPARTURE' ?
                counterpart.code
              : counterpart.code}
            </span>

            <span className='text-border'>·</span>

            <span className='text-[9px] text-muted-foreground'>
              {formatFlightDate(flight.departureDate)}
            </span>
          </div>
        </div>
      </div>

      <div className='hidden text-right sm:block'>
        <p className='text-sm font-semibold tabular-nums'>
          {flight.departureTime}
        </p>

        <p className='mt-0.5 text-[9px] text-muted-foreground'>
          {formatFlightStatus(flight.status)}
        </p>
      </div>

      <div className='shrink-0 text-right'>
        <span className='rounded-full bg-muted px-2.5 py-1 text-[9px] font-semibold text-muted-foreground'>
          Gate {flight.gate}
        </span>
      </div>
    </div>
  );
}

interface RouteStatProps {
  label: string;
  value: string | number;
}

function RouteStat({ label, value }: RouteStatProps) {
  return (
    <div className='flex items-baseline justify-between gap-3 py-2.5'>
      <dt className='text-xs text-muted-foreground'>{label}</dt>
      <dd className='text-sm font-semibold tabular-nums text-foreground'>
        {value}
      </dd>
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
        'line-clamp-2 min-w-0 break-words text-sm leading-5 text-muted-foreground',
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
    <div className='w-full min-w-0 rounded-2xl border border-border/60 bg-background p-5 shadow-sm transition-all duration-200 hover:border-border hover:shadow-md'>
      {/* Header */}
      <div className='flex flex-wrap items-center justify-between gap-x-3 gap-y-2'>
        <span
          className={[
            'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium',
            isOutbound ?
              'bg-[#EEF7FB] text-[#102A43]'
            : 'bg-emerald-50 text-emerald-700',
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
        </span>

        <span className='text-sm tabular-nums text-muted-foreground'>
          {item.route.distanceKm} km
        </span>
      </div>

      {/* Route */}
      <div className='mt-5'>
        <div className='flex items-center gap-2'>
          <span className='text-2xl font-semibold tracking-tight text-foreground'>
            {item.origin.code}
          </span>

          <div
            aria-hidden='true'
            className='flex min-w-0 flex-1 items-center gap-1.5 text-[#5BA9D6]'
          >
            <span className='flex-1 border-t border-dashed border-border' />
            <Plane className='size-4 shrink-0' />
            <span className='flex-1 border-t border-dashed border-border' />
          </div>

          <span className='text-2xl font-semibold tracking-tight text-foreground'>
            {item.destination.code}
          </span>
        </div>

        <div className='mt-1 grid grid-cols-2 gap-3'>
          <RouteCity city={item.origin.city} />
          <RouteCity city={item.destination.city} align='right' />
        </div>
      </div>

      {/* Stats */}
      <dl className='mt-5 divide-y divide-border/60 border-t border-border/60'>
        <RouteStat label='Schedules' value={item.schedules.length} />
        <RouteStat label='Instances' value={item.flights.length} />
        <RouteStat
          label='Duration'
          value={`${item.route.durationMinutes} min`}
        />
      </dl>
    </div>
  );
}
export function AirportDetail({ airport }: AirportDetailProps) {
  if (!airport) {
    return (
      <section className='flex min-h-155 items-center justify-center rounded-[1.5rem] border border-dashed border-border bg-card px-6 text-center'>
        <div>
          <div className='mx-auto flex size-12 items-center justify-center rounded-2xl bg-muted'>
            <Globe2 className='size-5 text-muted-foreground' />
          </div>

          <p className='mt-4 text-sm font-semibold'>Select an airport</p>

          <p className='mt-1 max-w-sm text-xs leading-5 text-muted-foreground'>
            Choose an airport from the network list to inspect its route
            connectivity and flight activity.
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

  return (
    <section className='overflow-hidden rounded-[1.5rem] border border-border/70 bg-card shadow-sm'>
      {/* Hero */}
      <div className='relative overflow-hidden bg-[#102A43] px-5 py-6 text-white sm:px-6'>
        <div className='absolute inset-0 bg-[radial-gradient(circle_at_90%_0%,rgba(91,169,214,0.26),transparent_35%)]' />

        <div className='relative'>
          <div className='flex items-start justify-between gap-4'>
            <div>
              <span className='inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.13em]'>
                <span className='size-1.5 rounded-full bg-emerald-400' />
                Airport network node
              </span>

              <div className='mt-4 flex items-end gap-3'>
                <h2 className='text-4xl font-semibold tracking-tight'>
                  {airport.airport.code}
                </h2>

                <p className='pb-1 text-xs text-white/55'>
                  {airport.airport.city}
                </p>
              </div>

              <p className='mt-1 max-w-xs text-[11px] leading-5 text-white/55'>
                {airport.airport.name}
              </p>
            </div>

            <div className='flex size-11 items-center justify-center rounded-2xl bg-white/10'>
              <Plane className='size-5' />
            </div>
          </div>

          <div className='mt-6 grid grid-cols-3 gap-2'>
            <div className='rounded-xl bg-white/8 px-3 py-2.5'>
              <p className='text-[8px] uppercase tracking-[0.13em] text-white/40'>
                Routes
              </p>

              <p className='mt-1 text-sm font-semibold'>
                {airport.routes.length}
              </p>
            </div>

            <div className='rounded-xl bg-white/8 px-3 py-2.5'>
              <p className='text-[8px] uppercase tracking-[0.13em] text-white/40'>
                Schedules
              </p>

              <p className='mt-1 text-sm font-semibold'>
                {airport.schedules.length}
              </p>
            </div>

            <div className='rounded-xl bg-white/8 px-3 py-2.5'>
              <p className='text-[8px] uppercase tracking-[0.13em] text-white/40'>
                Instances
              </p>

              <p className='mt-1 text-sm font-semibold'>
                {airport.flights.length}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className='space-y-5 p-5 sm:p-6'>
        {/* Airport information */}
        <div className='grid grid-cols-2 gap-3'>
          <div className='rounded-2xl border border-border/70 bg-background/60 p-4'>
            <div className='flex items-center gap-2'>
              <MapPin className='size-3.5 text-muted-foreground' />

              <p className='text-[9px] font-semibold uppercase tracking-[0.14em] text-muted-foreground'>
                Location
              </p>
            </div>

            <p className='mt-2 text-sm font-semibold'>{airport.airport.city}</p>

            <p className='mt-1 text-[10px] text-muted-foreground'>
              {airport.airport.country}
            </p>
          </div>

          <div className='rounded-2xl border border-border/70 bg-background/60 p-4'>
            <div className='flex items-center gap-2'>
              <RadioTower className='size-3.5 text-muted-foreground' />

              <p className='text-[9px] font-semibold uppercase tracking-[0.14em] text-muted-foreground'>
                Terminal
              </p>
            </div>

            <p className='mt-2 text-sm font-semibold'>
              {airport.airport.terminal}
            </p>

            <p className='mt-1 text-[10px] text-muted-foreground'>
              Passenger operations
            </p>
          </div>
        </div>

        <div className='grid grid-cols-2 gap-3'>
          <div className='rounded-2xl border border-border/70 bg-background/60 p-4'>
            <div className='flex items-center gap-2'>
              <Globe2 className='size-3.5 text-muted-foreground' />

              <p className='text-[9px] font-semibold uppercase tracking-[0.14em] text-muted-foreground'>
                Timezone
              </p>
            </div>

            <p className='mt-2 text-xs font-semibold'>
              {airport.airport.timezone}
            </p>
          </div>

          <div className='rounded-2xl border border-border/70 bg-background/60 p-4'>
            <div className='flex items-center gap-2'>
              <CalendarDays className='size-3.5 text-muted-foreground' />

              <p className='text-[9px] font-semibold uppercase tracking-[0.14em] text-muted-foreground'>
                Services
              </p>
            </div>

            <p className='mt-2 text-xs font-semibold'>
              {airport.schedules.length} schedules
            </p>
          </div>
        </div>

        {/* Network */}
        <div className='space-y-3'>
          <div className='flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between'>
            <div className='min-w-0'>
              <h3 className='text-sm font-semibold'>Route network</h3>

              <p className='mt-0.5 text-[10px] leading-4 text-muted-foreground'>
                Linked inbound and outbound routes
              </p>
            </div>

            <span className='w-fit shrink-0 rounded-full bg-[#EEF7FB] px-2.5 py-1 text-[9px] font-semibold text-[#102A43]'>
              {airport.routes.length}{' '}
              {airport.routes.length === 1 ? 'route' : 'routes'}
            </span>
          </div>

          <div className='grid gap-3 sm:grid-cols-2'>
            {airport.routes.map((item) => (
              <RouteCard key={item.route.id} item={item} />
            ))}
          </div>
        </div>

        {/* Flight activity */}
        <div className='overflow-hidden rounded-2xl border border-border/70 bg-background/60'>
          <div className='flex items-center justify-between gap-3 border-b border-border/70 px-4 py-4'>
            <div className='flex items-center gap-2'>
              <Clock3 className='size-3.5 text-muted-foreground' />

              <div>
                <h3 className='text-xs font-semibold'>Flight activity</h3>

                <p className='mt-0.5 text-[9px] text-muted-foreground'>
                  Linked airport flight instances
                </p>
              </div>
            </div>

            <span className='text-[9px] font-semibold text-muted-foreground'>
              {recentActivity.length} shown
            </span>
          </div>

          {recentActivity.length > 0 ?
            <div className='divide-y divide-border/60'>
              {recentActivity.map((item) => (
                <FlightActivityRow
                  key={`${item.direction}-${item.flight.id}`}
                  item={item}
                />
              ))}
            </div>
          : <div className='px-4 py-10 text-center'>
              <Clock3 className='mx-auto size-5 text-muted-foreground' />

              <p className='mt-3 text-sm font-medium'>
                No linked flight activity
              </p>

              <p className='mt-1 text-[10px] text-muted-foreground'>
                This airport does not currently have flight instances in the
                local dataset.
              </p>
            </div>
          }
        </div>

        {/* Network destinations */}
        <div className='rounded-2xl border border-border/70 bg-[#F7FAFC] p-4'>
          <div className='flex items-center gap-2'>
            <Route className='size-3.5 text-muted-foreground' />

            <h3 className='text-xs font-semibold'>Connected airports</h3>
          </div>

          <div className='mt-4 flex flex-wrap gap-2'>
            {Array.from(
              new Map(
                [...airport.uniqueDestinations, ...airport.uniqueOrigins].map(
                  (item) => [item.id, item],
                ),
              ).values(),
            ).map((connectedAirport) => (
              <div
                key={connectedAirport.id}
                className='flex items-center gap-2 rounded-xl border border-border/70 bg-white px-3 py-2 shadow-sm'
              >
                <div className='flex size-7 items-center justify-center rounded-lg bg-[#EEF7FB] text-[8px] font-bold text-[#102A43]'>
                  {connectedAirport.code}
                </div>

                <div>
                  <p className='text-[10px] font-semibold'>
                    {connectedAirport.city}
                  </p>

                  <p className='text-[8px] text-muted-foreground'>
                    {connectedAirport.terminal}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
