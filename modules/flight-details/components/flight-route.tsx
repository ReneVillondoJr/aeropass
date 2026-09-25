'use client';

import { Clock3, Plane } from 'lucide-react';

import type { PublicFlightData } from '../types/flight';

interface FlightRouteProps {
  flight: PublicFlightData;
}

function getProgress(status: PublicFlightData['status']) {
  switch (status) {
    case 'CHECK_IN_OPEN':
      return 18;

    case 'BOARDING':
      return 32;

    case 'DEPARTED':
      return 70;

    case 'ARRIVED':
      return 100;

    case 'DELAYED':
      return 28;

    default:
      return 6;
  }
}

export function FlightRoute({ flight }: FlightRouteProps) {
  const progress = getProgress(flight.status);

  const showMotion =
    flight.status === 'BOARDING' ||
    flight.status === 'DEPARTED' ||
    flight.status === 'DELAYED';

  return (
    <section className='overflow-hidden rounded-2xl border border-sky-100 bg-white'>
      <div className='border-b border-sky-100 px-6 py-5 sm:px-8'>
        <div className='flex items-center justify-between gap-4'>
          <div>
            <p className='text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400'>
              Journey
            </p>

            <h2 className='mt-1 text-lg font-semibold tracking-tight text-[#102a43]'>
              Flight route
            </h2>
          </div>

          <div className='rounded-lg bg-[#f4f9fc] px-3 py-2 text-right'>
            <p className='text-[10px] uppercase tracking-wide text-slate-400'>
              Duration
            </p>

            <p className='mt-0.5 text-sm font-semibold text-[#102a43]'>
              {flight.durationMinutes} min
            </p>
          </div>
        </div>
      </div>

      <div className='relative overflow-hidden bg-gradient-to-b from-[#f3fbff] to-white px-6 py-10 sm:px-8'>
        <div className='pointer-events-none absolute inset-0'>
          <div className='absolute left-[18%] top-7 size-16 rounded-full border border-sky-100' />

          <div className='absolute right-[12%] top-16 size-24 rounded-full border border-sky-100' />

          <div className='absolute bottom-8 left-[45%] size-10 rounded-full border border-sky-50' />
        </div>

        <div className='relative'>
          <div className='flex items-start justify-between gap-5'>
            <div className='min-w-0'>
              <p className='text-4xl font-semibold tracking-tight text-[#102a43]'>
                {flight.originCode}
              </p>

              <p className='mt-1 text-sm font-medium text-slate-600'>
                {flight.originCity}
              </p>

              <p className='mt-4 flex items-center gap-2 text-sm text-slate-500'>
                <Clock3 className='size-3.5' />
                {flight.departureTime}
              </p>

              <p className='mt-1 text-xs text-slate-400'>
                {flight.originAirport}
              </p>
            </div>

            <div className='text-right'>
              <p className='text-4xl font-semibold tracking-tight text-[#102a43]'>
                {flight.destinationCode}
              </p>

              <p className='mt-1 text-sm font-medium text-slate-600'>
                {flight.destinationCity}
              </p>

              <p className='mt-4 flex items-center justify-end gap-2 text-sm text-slate-500'>
                <Clock3 className='size-3.5' />
                {flight.arrivalTime}
              </p>

              <p className='mt-1 text-xs text-slate-400'>
                {flight.destinationAirport}
              </p>
            </div>
          </div>

          <div className='relative mt-12 h-16'>
            <div className='absolute left-0 right-0 top-1/2 h-px bg-slate-200' />

            <div
              className='absolute left-0 top-1/2 h-px bg-[#5ba9d6] transition-all duration-1000'
              style={{
                width: `${progress}%`,
              }}
            />

            <div className='absolute left-0 top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#102a43]' />

            <div className='absolute right-0 top-1/2 size-3 translate-x-1/2 -translate-y-1/2 rounded-full bg-[#c5a46d]' />

            <div
              className='absolute top-1/2 -translate-y-1/2 transition-all duration-1000'
              style={{
                left: `${progress}%`,
              }}
            >
              <div
                className={`flex size-11 -translate-x-1/2 items-center justify-center rounded-full border border-white bg-white text-[#102a43] shadow-[0_12px_30px_-12px_rgba(16,42,67,0.4)] ${
                  showMotion ?
                    'animate-[public-flight-float_2.5s_ease-in-out_infinite]'
                  : ''
                }`}
              >
                <Plane className='size-5 -rotate-6' />
              </div>

              {showMotion ?
                <div className='absolute left-1/2 top-1/2 -z-10 size-14 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#5ba9d6]/20 blur-xl' />
              : null}
            </div>
          </div>

          <div className='mt-3 flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400'>
            <span>Departure</span>

            <span>{flight.gate}</span>

            <span>Arrival</span>
          </div>
        </div>
      </div>
    </section>
  );
}
