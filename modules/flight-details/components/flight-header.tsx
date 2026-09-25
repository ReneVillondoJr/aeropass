import Link from 'next/link';

import { ArrowLeft, CircleAlert, Plane } from 'lucide-react';

import type { PublicFlightData } from '../types/flight';

interface FlightHeaderProps {
  flight: PublicFlightData;
}

const statusLabels: Record<PublicFlightData['status'], string> = {
  SCHEDULED: 'Scheduled',
  CHECK_IN_OPEN: 'Check-in open',
  BOARDING: 'Boarding',
  DEPARTED: 'Departed',
  ARRIVED: 'Arrived',
  DELAYED: 'Delayed',
  CANCELLED: 'Cancelled',
};

export function FlightHeader({ flight }: FlightHeaderProps) {
  const isUnavailable =
    flight.status === 'CANCELLED' ||
    flight.status === 'ARRIVED' ||
    flight.status === 'DEPARTED';

  return (
    <section className='border-b border-sky-100 bg-white'>
      <div className='mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-10 lg:py-10'>
        <Link
          href='/search'
          className='inline-flex items-center gap-2 text-xs font-medium text-slate-400 transition-colors hover:text-[#102a43]'
        >
          <ArrowLeft className='size-3.5' />
          Back to flights
        </Link>

        <div className='mt-7 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between'>
          <div>
            <div className='flex flex-wrap items-center gap-2'>
              <span className='flex size-9 items-center justify-center rounded-xl bg-[#102a43] text-white'>
                <Plane className='size-4' />
              </span>

              <span className='text-sm font-semibold text-[#102a43]'>
                {flight.flightNumber}
              </span>

              <span className='rounded-full bg-sky-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-[#3f7194]'>
                {statusLabels[flight.status]}
              </span>
            </div>

            <p className='mt-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400'>
              Flight details
            </p>

            <h1 className='mt-2 text-3xl font-semibold tracking-tight text-[#102a43] sm:text-4xl'>
              {flight.originCity} to {flight.destinationCity}
            </h1>

            <p className='mt-2 text-sm text-slate-500'>
              {flight.departureDate}
            </p>
          </div>

          {isUnavailable ?
            <div className='flex items-center gap-2 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs text-amber-700'>
              <CircleAlert className='size-4' />
              This flight is not available for new bookings.
            </div>
          : null}
        </div>
      </div>
    </section>
  );
}
