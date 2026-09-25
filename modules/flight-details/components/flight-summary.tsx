import { Armchair, Clock3, DoorOpen, Luggage, Plane } from 'lucide-react';

import type { PublicFlightData } from '../types/flight';

interface FlightSummaryProps {
  flight: PublicFlightData;
}

function formatNumber(value: number) {
  return new Intl.NumberFormat('en-PH').format(value);
}

export function FlightSummary({ flight }: FlightSummaryProps) {
  const occupancy =
    flight.capacity > 0 ?
      Math.round(
        ((flight.capacity - flight.seatsAvailable) / flight.capacity) * 100,
      )
    : 0;

  return (
    <section className='rounded-2xl border border-sky-100 bg-white p-6 sm:p-8'>
      <div className='flex items-center gap-2'>
        <Plane className='size-4 text-[#3f88b2]' />

        <h2 className='text-lg font-semibold tracking-tight text-[#102a43]'>
          Flight information
        </h2>
      </div>

      <div className='mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4'>
        <div className='rounded-xl bg-[#f4f9fc] p-4'>
          <Clock3 className='size-4 text-slate-400' />

          <p className='mt-4 text-[10px] uppercase tracking-[0.16em] text-slate-400'>
            Flight time
          </p>

          <p className='mt-1 text-sm font-semibold text-[#102a43]'>
            {flight.durationMinutes} minutes
          </p>
        </div>

        <div className='rounded-xl bg-[#f4f9fc] p-4'>
          <DoorOpen className='size-4 text-slate-400' />

          <p className='mt-4 text-[10px] uppercase tracking-[0.16em] text-slate-400'>
            Gate
          </p>

          <p className='mt-1 text-sm font-semibold text-[#102a43]'>
            {flight.gate}
          </p>
        </div>

        <div className='rounded-xl bg-[#f4f9fc] p-4'>
          <Armchair className='size-4 text-slate-400' />

          <p className='mt-4 text-[10px] uppercase tracking-[0.16em] text-slate-400'>
            Aircraft
          </p>

          <p className='mt-1 text-sm font-semibold text-[#102a43]'>
            {flight.aircraftModel}
          </p>
        </div>

        <div className='rounded-xl bg-[#f4f9fc] p-4'>
          <Luggage className='size-4 text-slate-400' />

          <p className='mt-4 text-[10px] uppercase tracking-[0.16em] text-slate-400'>
            Available seats
          </p>

          <p className='mt-1 text-sm font-semibold text-[#102a43]'>
            {formatNumber(flight.seatsAvailable)}
          </p>
        </div>
      </div>

      <div className='mt-6 rounded-xl border border-sky-100 bg-white p-4'>
        <div className='flex items-center justify-between gap-4'>
          <div>
            <p className='text-xs font-medium text-[#102a43]'>
              Seat availability
            </p>

            <p className='mt-1 text-xs text-slate-400'>
              {occupancy}% of aircraft capacity currently reserved
            </p>
          </div>

          <span className='text-sm font-semibold text-[#102a43]'>
            {flight.seatsAvailable}
          </span>
        </div>

        <div className='mt-4 h-2 overflow-hidden rounded-full bg-slate-100'>
          <div
            className='h-full rounded-full bg-[#5ba9d6] transition-all duration-700'
            style={{
              width: `${occupancy}%`,
            }}
          />
        </div>
      </div>
    </section>
  );
}
