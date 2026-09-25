'use client';

import { CreditCard, ShieldCheck } from 'lucide-react';

import type { FareSelectionSchema } from '../schema';

import type { PublicFareOption } from '../types/flight';

import { FlightFareCard } from './flight-fare-card';

interface FlightFareOptionsProps {
  fares: PublicFareOption[];
  selectedFareId: string | null;
  onSelect: (values: FareSelectionSchema) => void;
}

export function FlightFareOptions({
  fares,
  selectedFareId,
  onSelect,
}: FlightFareOptionsProps) {
  return (
    <section className='rounded-2xl border border-sky-100 bg-white p-6 sm:p-8'>
      <div className='flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between'>
        <div>
          <p className='text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400'>
            Choose your fare
          </p>

          <h2 className='mt-1 text-lg font-semibold tracking-tight text-[#102a43]'>
            Select a travel experience
          </h2>

          <p className='mt-1 max-w-xl text-xs leading-5 text-slate-500'>
            Compare baggage, flexibility, and refund options before continuing.
          </p>
        </div>

        <div className='flex items-center gap-2 text-xs text-slate-400'>
          <ShieldCheck className='size-3.5 text-emerald-500' />
          Secure booking
        </div>
      </div>

      <div className='mt-6 grid gap-4 lg:grid-cols-3'>
        {fares.map((fare) => (
          <FlightFareCard
            key={fare.id}
            fare={fare}
            selected={fare.id === selectedFareId}
            onSelect={() =>
              onSelect({
                fareId: fare.id,
              })
            }
          />
        ))}
      </div>

      <div className='mt-6 flex items-start gap-3 rounded-xl border border-sky-100 bg-[#f4f9fc] p-4'>
        <CreditCard className='mt-0.5 size-4 shrink-0 text-[#3f88b2]' />

        <p className='text-xs leading-5 text-slate-500'>
          Final taxes, fees, seat selection, baggage extras, and other optional
          services are shown during booking and checkout.
        </p>
      </div>
    </section>
  );
}
