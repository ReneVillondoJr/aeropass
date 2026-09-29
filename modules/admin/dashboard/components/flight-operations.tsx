'use client';

import Link from 'next/link';

import { ArrowRight, Plane } from 'lucide-react';

import { flightStatusLabels } from '../data/dashboard';

import type { DashboardFlightRow } from '../types/dashboard';

interface FlightOperationsProps {
  flights: DashboardFlightRow[];
}

function getStatusClasses(status: DashboardFlightRow['status']) {
  switch (status) {
    case 'BOARDING':
      return 'bg-blue-500/10 text-blue-700 dark:text-blue-400';

    case 'CHECK_IN_OPEN':
      return 'bg-amber-500/10 text-amber-700 dark:text-amber-400';

    case 'DELAYED':
      return 'bg-orange-500/10 text-orange-700 dark:text-orange-400';

    case 'CANCELLED':
      return 'bg-red-500/10 text-red-700 dark:text-red-400';

    case 'ARRIVED':
      return 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400';

    case 'DEPARTED':
      return 'bg-violet-500/10 text-violet-700 dark:text-violet-400';

    default:
      return 'bg-muted text-muted-foreground';
  }
}

export function FlightOperations({ flights }: FlightOperationsProps) {
  return (
    <section className='rounded-2xl border border-border/70 bg-card shadow-sm'>
      <div className='flex items-center justify-between gap-4 border-b border-border/70 px-5 py-4'>
        <div>
          <h2 className='text-sm font-semibold'>Flight operations</h2>

          <p className='mt-1 text-xs text-muted-foreground'>
            Recent flight activity across the network.
          </p>
        </div>

        <Link
          href='/admin/flights'
          className='inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground'
        >
          View all
          <ArrowRight className='size-3.5' />
        </Link>
      </div>

      <div className='divide-y divide-border/70'>
        {flights.map((flight) => {
          const load =
            flight.capacity > 0 ?
              Math.round(
                ((flight.capacity - flight.seatsAvailable) / flight.capacity) *
                  100,
              )
            : 0;

          return (
            <div
              key={flight.id}
              className='px-5 py-4 transition-colors hover:bg-muted/30'
            >
              <div className='flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between'>
                <div className='flex min-w-0 items-start gap-3'>
                  <div className='mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-xl bg-muted text-muted-foreground'>
                    <Plane className='size-4' />
                  </div>

                  <div className='min-w-0'>
                    <div className='flex flex-wrap items-center gap-2'>
                      <p className='font-semibold'>{flight.flightNumber}</p>

                      <span
                        className={[
                          'rounded-full px-2 py-0.5 text-[10px] font-semibold',
                          getStatusClasses(flight.status),
                        ].join(' ')}
                      >
                        {flightStatusLabels[flight.status]}
                      </span>

                      {flight.delayMinutes > 0 ?
                        <span className='text-[10px] font-medium text-orange-600'>
                          +{flight.delayMinutes} min
                        </span>
                      : null}
                    </div>

                    <div className='mt-1.5 flex flex-wrap items-center gap-2 text-sm text-muted-foreground'>
                      <span className='font-medium text-foreground'>
                        {flight.originCode}
                      </span>

                      <ArrowRight className='size-3.5' />

                      <span className='font-medium text-foreground'>
                        {flight.destinationCode}
                      </span>

                      <span className='text-border'>•</span>

                      <span>{flight.departureDate}</span>

                      <span>{flight.departureTime}</span>
                    </div>
                  </div>
                </div>

                <div className='grid grid-cols-3 gap-5 text-sm xl:min-w-[300px]'>
                  <div>
                    <p className='text-[10px] font-medium uppercase tracking-wider text-muted-foreground'>
                      Gate
                    </p>

                    <p className='mt-1 font-semibold'>{flight.gate}</p>

                    <p className='text-xs text-muted-foreground'>
                      {flight.terminal}
                    </p>
                  </div>

                  <div>
                    <p className='text-[10px] font-medium uppercase tracking-wider text-muted-foreground'>
                      Check-in
                    </p>

                    <p className='mt-1 font-semibold'>
                      {flight.checkedInPassengers}
                      <span className='font-normal text-muted-foreground'>
                        {' '}
                        / {flight.capacity}
                      </span>
                    </p>
                  </div>

                  <div>
                    <p className='text-[10px] font-medium uppercase tracking-wider text-muted-foreground'>
                      Load
                    </p>

                    <p className='mt-1 font-semibold'>{load}%</p>

                    <div className='mt-1.5 h-1.5 overflow-hidden rounded-full bg-muted'>
                      <div
                        className='h-full rounded-full bg-primary transition-all'
                        style={{
                          width: `${Math.min(load, 100)}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
