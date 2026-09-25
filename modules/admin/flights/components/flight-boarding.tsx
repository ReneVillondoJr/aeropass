'use client';

import { CheckCircle2, Clock3, Plane, UserRound, XCircle } from 'lucide-react';

import type { FlightOperations } from '../types/flights';

interface FlightBoardingProps {
  operations: FlightOperations | null;
}

export function FlightBoarding({ operations }: FlightBoardingProps) {
  if (!operations) {
    return (
      <section className='rounded-2xl border border-dashed border-border bg-card p-6'>
        <div className='flex flex-col items-center justify-center py-8 text-center'>
          <Plane className='size-5 text-muted-foreground' />

          <p className='mt-3 text-sm font-medium'>
            Boarding information unavailable
          </p>

          <p className='mt-1 max-w-sm text-xs leading-5 text-muted-foreground'>
            Select a valid flight to view passenger boarding activity.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className='overflow-hidden rounded-2xl border border-border bg-card'>
      <div className='border-b border-border p-6'>
        <div className='flex items-start justify-between gap-4'>
          <div>
            <div className='flex items-center gap-2'>
              <span className='flex size-8 items-center justify-center rounded-lg bg-muted'>
                <UserRound className='size-4 text-muted-foreground' />
              </span>

              <div>
                <h2 className='text-sm font-semibold'>Boarding activity</h2>

                <p className='mt-1 text-xs text-muted-foreground'>
                  {operations.flightNumber} · {operations.originCode} →{' '}
                  {operations.destinationCode}
                </p>
              </div>
            </div>
          </div>

          <div className='text-right'>
            <p className='text-lg font-semibold tracking-tight'>
              {operations.boarded}
              <span className='text-sm font-normal text-muted-foreground'>
                /{operations.total}
              </span>
            </p>

            <p className='text-[10px] uppercase tracking-[0.16em] text-muted-foreground'>
              Boarded
            </p>
          </div>
        </div>
      </div>

      <div className='grid grid-cols-2 divide-x border-b border-border'>
        <div className='p-4'>
          <p className='text-[10px] uppercase tracking-[0.16em] text-muted-foreground'>
            Checked in
          </p>

          <p className='mt-1 text-xl font-semibold tracking-tight'>
            {operations.checkedIn}
          </p>
        </div>

        <div className='p-4'>
          <p className='text-[10px] uppercase tracking-[0.16em] text-muted-foreground'>
            Remaining
          </p>

          <p className='mt-1 text-xl font-semibold tracking-tight'>
            {Math.max(operations.total - operations.boarded, 0)}
          </p>
        </div>
      </div>

      <div className='divide-y divide-border'>
        {operations.boardingPassengers.length > 0 ?
          operations.boardingPassengers.map((passenger) => (
            <div
              key={passenger.id}
              className='flex items-center justify-between gap-4 px-6 py-4'
            >
              <div className='min-w-0'>
                <div className='flex items-center gap-2'>
                  <p className='truncate text-sm font-medium'>
                    {passenger.name}
                  </p>

                  {passenger.status === 'BOARDED' ?
                    <CheckCircle2 className='size-3.5 shrink-0 text-emerald-500' />
                  : passenger.status === 'DENIED' ?
                    <XCircle className='size-3.5 shrink-0 text-destructive' />
                  : null}
                </div>

                <div className='mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground'>
                  <span>Seat {passenger.seat}</span>

                  <span>{passenger.ticketNumber}</span>

                  {passenger.boardedAt ?
                    <span className='inline-flex items-center gap-1'>
                      <Clock3 className='size-3' />
                      {passenger.boardedAt}
                    </span>
                  : null}
                </div>
              </div>

              <span
                className={`shrink-0 rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] ${
                  passenger.status === 'BOARDED' ?
                    'border-emerald-500/20 bg-emerald-500/10 text-emerald-600'
                  : passenger.status === 'DENIED' ?
                    'border-destructive/20 bg-destructive/10 text-destructive'
                  : 'border-border bg-muted text-muted-foreground'
                }`}
              >
                {passenger.status.replace(/_/g, ' ')}
              </span>
            </div>
          ))
        : <div className='px-6 py-10 text-center'>
            <p className='text-sm font-medium'>No boarding activity</p>

            <p className='mt-1 text-xs leading-5 text-muted-foreground'>
              Passenger boarding records will appear here when available.
            </p>
          </div>
        }
      </div>
    </section>
  );
}
