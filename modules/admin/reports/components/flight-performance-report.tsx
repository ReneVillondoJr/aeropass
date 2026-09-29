import Link from 'next/link';

import { ArrowRight, Plane } from 'lucide-react';

import { flightStatusLabels } from '../data/reports';

import type { FlightPerformanceRow } from '../types/reports';

interface FlightPerformanceReportProps {
  flights: FlightPerformanceRow[];
}

function getStatusClasses(status: FlightPerformanceRow['status']) {
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

export function FlightPerformanceReport({
  flights,
}: FlightPerformanceReportProps) {
  return (
    <section className='rounded-2xl border border-border/70 bg-card shadow-sm'>
      <div className='flex items-center justify-between gap-4 border-b border-border/70 px-5 py-4'>
        <div>
          <h2 className='text-sm font-semibold'>Flight performance</h2>

          <p className='mt-1 text-xs text-muted-foreground'>
            Flight load and passenger operation details.
          </p>
        </div>

        <Link
          href='/admin/flights'
          className='inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground'
        >
          View flights
          <ArrowRight className='size-3.5' />
        </Link>
      </div>

      <div className='overflow-x-auto'>
        <div className='min-w-[820px]'>
          <div className='grid grid-cols-[1.4fr_1fr_1fr_0.9fr_0.9fr_0.9fr] gap-4 border-b border-border/70 bg-muted/20 px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground'>
            <span>Flight</span>
            <span>Departure</span>
            <span>Status</span>
            <span>Load</span>
            <span>Check-in</span>
            <span>Boarded</span>
          </div>

          <div className='divide-y divide-border/70'>
            {flights.map((flight) => (
              <div
                key={flight.id}
                className='grid grid-cols-[1.4fr_1fr_1fr_0.9fr_0.9fr_0.9fr] items-center gap-4 px-5 py-4 transition-colors hover:bg-muted/30'
              >
                <div className='flex items-center gap-3'>
                  <div className='flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground'>
                    <Plane className='size-3.5' />
                  </div>

                  <div className='min-w-0'>
                    <p className='text-sm font-semibold'>
                      {flight.flightNumber}
                    </p>

                    <p className='mt-0.5 text-xs text-muted-foreground'>
                      {flight.originCode}
                      {' → '}
                      {flight.destinationCode}
                    </p>
                  </div>
                </div>

                <div>
                  <p className='text-sm font-medium'>{flight.departureDate}</p>

                  <p className='mt-0.5 text-xs text-muted-foreground'>
                    {flight.departureTime}
                  </p>
                </div>

                <div>
                  <span
                    className={[
                      'inline-flex rounded-full px-2 py-1 text-[10px] font-semibold',
                      getStatusClasses(flight.status),
                    ].join(' ')}
                  >
                    {flightStatusLabels[flight.status]}
                  </span>

                  {flight.delayMinutes > 0 ?
                    <p className='mt-1 text-[10px] font-medium text-orange-600'>
                      +{flight.delayMinutes} min
                    </p>
                  : null}
                </div>

                <div>
                  <p className='text-sm font-semibold'>{flight.loadFactor}%</p>

                  <div className='mt-1 h-1.5 w-20 overflow-hidden rounded-full bg-muted'>
                    <div
                      className='h-full rounded-full bg-primary'
                      style={{
                        width: `${Math.min(flight.loadFactor, 100)}%`,
                      }}
                    />
                  </div>
                </div>

                <div>
                  <p className='text-sm font-semibold'>
                    {flight.checkedInPassengers}
                  </p>

                  <p className='text-xs text-muted-foreground'>
                    / {flight.capacity}
                  </p>
                </div>

                <div>
                  <p className='text-sm font-semibold'>
                    {flight.boardedPassengers}
                  </p>

                  <p className='text-xs text-muted-foreground'>boarded</p>
                </div>
              </div>
            ))}
          </div>

          {flights.length === 0 ?
            <div className='px-5 py-12 text-center'>
              <p className='text-sm font-medium'>No flights in this period</p>

              <p className='mt-1 text-xs text-muted-foreground'>
                Try a different reporting period.
              </p>
            </div>
          : null}
        </div>
      </div>
    </section>
  );
}
