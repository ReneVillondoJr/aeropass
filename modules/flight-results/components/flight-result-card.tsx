import Link from 'next/link';

import { ArrowRight, Clock3, DoorOpen, Plane } from 'lucide-react';

import type { FlightSearchResult } from '../types/search';

interface FlightResultCardProps {
  flight: FlightSearchResult;
}

const statusLabels: Record<FlightSearchResult['status'], string> = {
  SCHEDULED: 'Scheduled',
  CHECK_IN_OPEN: 'Check-in open',
  BOARDING: 'Boarding',
  DEPARTED: 'Departed',
  ARRIVED: 'Arrived',
  DELAYED: 'Delayed',
  CANCELLED: 'Cancelled',
};

const statusClasses: Record<FlightSearchResult['status'], string> = {
  SCHEDULED: 'bg-slate-100 text-slate-600',
  CHECK_IN_OPEN: 'bg-sky-50 text-sky-700',
  BOARDING: 'bg-amber-50 text-amber-700',
  DEPARTED: 'bg-emerald-50 text-emerald-700',
  ARRIVED: 'bg-slate-100 text-slate-500',
  DELAYED: 'bg-orange-50 text-orange-700',
  CANCELLED: 'bg-red-50 text-red-700',
};

export function FlightResultCard({ flight }: FlightResultCardProps) {
  const unavailable =
    flight.status === 'CANCELLED' ||
    flight.status === 'DEPARTED' ||
    flight.status === 'ARRIVED' ||
    flight.seatsAvailable === 0;

  return (
    <article className='group rounded-2xl border border-sky-100 bg-white p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-sky-200 hover:shadow-[0_20px_55px_-35px_rgba(16,42,67,0.35)] sm:p-6'>
      <div className='flex flex-col gap-6 lg:flex-row lg:items-center'>
        <div className='min-w-0 flex-1'>
          <div className='flex flex-wrap items-center gap-2'>
            <span className='text-sm font-semibold text-[#102a43]'>
              {flight.flightNumber}
            </span>

            <span
              className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide ${statusClasses[flight.status]}`}
            >
              {statusLabels[flight.status]}
            </span>
          </div>

          <div className='mt-5 grid grid-cols-[auto_1fr_auto] items-center gap-4'>
            <div>
              <p className='text-2xl font-semibold tracking-tight text-[#102a43]'>
                {flight.originCode}
              </p>

              <p className='mt-1 text-xs text-slate-400'>
                {flight.departureTime}
              </p>
            </div>

            <div className='relative flex items-center'>
              <div className='h-px flex-1 bg-slate-200' />

              <span className='mx-3 flex size-8 items-center justify-center rounded-full bg-[#f4f9fc] text-[#3f88b2]'>
                <Plane className='size-3.5' />
              </span>

              <div className='h-px flex-1 bg-slate-200' />
            </div>

            <div className='text-right'>
              <p className='text-2xl font-semibold tracking-tight text-[#102a43]'>
                {flight.destinationCode}
              </p>

              <p className='mt-1 text-xs text-slate-400'>
                {flight.arrivalTime}
              </p>
            </div>
          </div>

          <div className='mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-slate-500'>
            <span>{flight.originCity}</span>

            <ArrowRight className='size-3.5 text-slate-300' />

            <span>{flight.destinationCity}</span>

            <span className='inline-flex items-center gap-1.5'>
              <Clock3 className='size-3.5 text-slate-400' />
              {flight.durationMinutes} min
            </span>

            <span className='inline-flex items-center gap-1.5'>
              <DoorOpen className='size-3.5 text-slate-400' />
              Gate {flight.gate}
            </span>
          </div>
        </div>

        <div className='border-t border-slate-100 pt-5 lg:w-48 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0'>
          <div className='flex items-end justify-between gap-4 lg:block'>
            <div>
              <p className='text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400'>
                From
              </p>

              <p className='mt-1 text-2xl font-semibold tracking-tight text-[#102a43]'>
                {flight.startingFare !== null ?
                  `₱${flight.startingFare.toLocaleString('en-PH')}`
                : '—'}
              </p>

              <p className='mt-1 text-[10px] text-slate-400'>Base fare</p>
            </div>

            <p className='text-xs text-slate-400 lg:mt-3'>
              {flight.seatsAvailable} seats available
            </p>
          </div>

          <Link
            href={`/flights/${flight.id}`}
            className={`mt-5 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl px-4 text-sm font-medium transition-colors ${
              unavailable ?
                'pointer-events-none bg-slate-100 text-slate-400'
              : 'bg-[#102a43] text-white hover:bg-[#183b5b]'
            }`}
            aria-disabled={unavailable}
          >
            {unavailable ? 'Unavailable' : 'View flight'}

            {!unavailable ?
              <ArrowRight className='size-4 transition-transform group-hover:translate-x-0.5' />
            : null}
          </Link>
        </div>
      </div>
    </article>
  );
}
