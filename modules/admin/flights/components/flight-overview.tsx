'use client';

import { Clock3, DoorOpen, Plane, Radio, Sparkles } from 'lucide-react';

import type { FlightListItem } from '../types/flights';

interface FlightOverviewProps {
  flight: FlightListItem;
}

function isMoving(status: FlightListItem['status']) {
  return ['BOARDING', 'DEPARTED', 'DELAYED'].includes(status);
}

export function FlightOverview({ flight }: FlightOverviewProps) {
  const moving = isMoving(flight.status);

  const progress =
    flight.status === 'ARRIVED' ? 100
    : flight.status === 'DEPARTED' ? 82
    : flight.status === 'BOARDING' ? 58
    : flight.status === 'CHECK_IN_OPEN' ? 28
    : 5;

  return (
    <section className='overflow-hidden rounded-2xl border border-border bg-card'>
      <div className='border-b border-border p-6'>
        <div className='flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between'>
          <div>
            <div className='flex items-center gap-2'>
              <span className='flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground'>
                <Plane className='size-4' />
              </span>

              <div>
                <p className='text-sm font-semibold'>{flight.flightNumber}</p>

                <p className='text-xs text-muted-foreground'>
                  Live flight overview
                </p>
              </div>
            </div>
          </div>

          <div className='flex items-center gap-2 rounded-full border border-border bg-muted/40 px-3 py-1.5'>
            <span
              className={`size-1.5 rounded-full ${
                moving ? 'animate-pulse bg-emerald-500' : 'bg-muted-foreground'
              }`}
            />

            <span className='text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground'>
              {flight.status.replace(/_/g, ' ')}
            </span>
          </div>
        </div>
      </div>

      <div className='relative overflow-hidden bg-gradient-to-b from-sky-50/80 via-background to-background px-6 py-10'>
        <div className='pointer-events-none absolute inset-0 opacity-40'>
          <div className='absolute left-[10%] top-8 size-24 rounded-full border border-sky-200' />
          <div className='absolute right-[14%] top-20 size-16 rounded-full border border-sky-100' />
          <div className='absolute left-[35%] bottom-6 size-20 rounded-full border border-sky-100' />
        </div>

        <div className='relative'>
          <div className='flex items-end justify-between gap-6'>
            <div>
              <p className='text-3xl font-semibold tracking-tight'>
                {flight.originCode}
              </p>

              <p className='mt-1 text-xs text-muted-foreground'>
                {flight.originCity}
              </p>

              <p className='mt-3 flex items-center gap-1.5 text-xs font-medium'>
                <Clock3 className='size-3.5 text-muted-foreground' />
                {flight.departureTime}
              </p>
            </div>

            <div className='text-right'>
              <p className='text-3xl font-semibold tracking-tight'>
                {flight.destinationCode}
              </p>

              <p className='mt-1 text-xs text-muted-foreground'>
                {flight.destinationCity}
              </p>

              <p className='mt-3 flex items-center justify-end gap-1.5 text-xs font-medium'>
                <Clock3 className='size-3.5 text-muted-foreground' />
                {flight.arrivalTime}
              </p>
            </div>
          </div>

          <div className='relative mt-12 h-16'>
            <div className='absolute left-0 right-0 top-1/2 h-px bg-border' />

            <div
              className='absolute left-0 top-1/2 h-px bg-primary transition-all duration-1000'
              style={{
                width: `${progress}%`,
              }}
            />

            <div className='absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2'>
              <div className='flex size-8 items-center justify-center rounded-full border border-border bg-background'>
                <Radio className='size-3.5 text-muted-foreground' />
              </div>
            </div>

            <div
              className='absolute top-1/2 -translate-y-1/2 transition-all duration-1000'
              style={{
                left: `${progress}%`,
              }}
            >
              <div
                className={`flex size-11 -translate-x-1/2 items-center justify-center rounded-full border border-primary/20 bg-background shadow-md ${
                  moving ?
                    'animate-[flight-float_2.4s_ease-in-out_infinite]'
                  : ''
                }`}
              >
                <Plane className='size-5 -rotate-6 text-primary' />
              </div>

              {moving ?
                <div className='absolute left-1/2 top-1/2 -z-10 size-12 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-xl' />
              : null}
            </div>

            <div className='absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2'>
              <div className='flex size-8 items-center justify-center rounded-full border border-border bg-background'>
                <DoorOpen className='size-3.5 text-muted-foreground' />
              </div>
            </div>
          </div>

          <div className='mt-4 flex items-center justify-between text-[10px] uppercase tracking-[0.16em] text-muted-foreground'>
            <span>Departure</span>

            <span>{flight.gate}</span>

            <span>Destination</span>
          </div>

          <div className='mt-8 flex items-center justify-between rounded-xl border border-border bg-background/80 px-4 py-3'>
            <div>
              <p className='text-[10px] uppercase tracking-[0.16em] text-muted-foreground'>
                Terminal
              </p>

              <p className='mt-1 text-sm font-semibold'>{flight.terminal}</p>
            </div>

            <div className='text-right'>
              <p className='text-[10px] uppercase tracking-[0.16em] text-muted-foreground'>
                Gate
              </p>

              <p className='mt-1 text-sm font-semibold'>{flight.gate}</p>
            </div>

            {moving ?
              <Sparkles className='size-4 text-amber-500' />
            : null}
          </div>
        </div>
      </div>
    </section>
  );
}
