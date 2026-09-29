import Link from 'next/link';

import { ArrowRight, CalendarDays, Clock3, Plane } from 'lucide-react';

import type { DashboardFlightRow } from '../types/dashboard';

interface UpcomingFlightsProps {
  flights: DashboardFlightRow[];
}

export function UpcomingFlights({ flights }: UpcomingFlightsProps) {
  const upcoming = flights
    .filter(
      (flight) => flight.status !== 'ARRIVED' && flight.status !== 'DEPARTED',
    )
    .slice(0, 5);

  return (
    <section className='rounded-2xl border border-border/70 bg-card shadow-sm'>
      <div className='flex items-center justify-between gap-4 border-b border-border/70 px-5 py-4'>
        <div>
          <h2 className='text-sm font-semibold'>Upcoming flights</h2>

          <p className='mt-1 text-xs text-muted-foreground'>
            Flights requiring attention.
          </p>
        </div>

        <Link
          href='/admin/flights'
          className='inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground'
        >
          Flights
          <ArrowRight className='size-3.5' />
        </Link>
      </div>

      <div className='divide-y divide-border/70'>
        {upcoming.length > 0 ?
          upcoming.map((flight) => (
            <div key={flight.id} className='flex items-center gap-3 px-5 py-4'>
              <div className='flex size-9 shrink-0 items-center justify-center rounded-xl bg-muted text-muted-foreground'>
                <Plane className='size-4' />
              </div>

              <div className='min-w-0 flex-1'>
                <div className='flex items-center gap-2'>
                  <p className='text-sm font-semibold'>{flight.flightNumber}</p>

                  <span className='text-xs text-muted-foreground'>
                    {flight.originCode}
                    {' → '}
                    {flight.destinationCode}
                  </span>
                </div>

                <div className='mt-1 flex flex-wrap items-center gap-3 text-xs text-muted-foreground'>
                  <span className='inline-flex items-center gap-1'>
                    <CalendarDays className='size-3' />
                    {flight.departureDate}
                  </span>

                  <span className='inline-flex items-center gap-1'>
                    <Clock3 className='size-3' />
                    {flight.departureTime}
                  </span>

                  <span>Gate {flight.gate}</span>
                </div>
              </div>

              <div className='hidden text-right sm:block'>
                <p className='text-sm font-semibold'>{flight.seatsAvailable}</p>

                <p className='text-[10px] text-muted-foreground'>seats left</p>
              </div>
            </div>
          ))
        : <div className='px-5 py-10 text-center'>
            <p className='text-sm font-medium'>
              No upcoming flights in this snapshot.
            </p>

            <p className='mt-1 text-xs text-muted-foreground'>
              Flight data will appear here when available.
            </p>
          </div>
        }
      </div>
    </section>
  );
}
