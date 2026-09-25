'use client';

import { Check, Luggage, RefreshCcw } from 'lucide-react';

import type { PublicFareOption } from '../types/flight';

interface FlightFareCardProps {
  fare: PublicFareOption;
  selected: boolean;
  onSelect: () => void;
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    maximumFractionDigits: 0,
  }).format(value);
}

export function FlightFareCard({
  fare,
  selected,
  onSelect,
}: FlightFareCardProps) {
  return (
    <button
      type='button'
      onClick={onSelect}
      className={`group relative w-full rounded-2xl border p-5 text-left transition-all duration-200 ${
        selected ?
          'border-[#5ba9d6] bg-[#f8fcfe] shadow-[0_18px_45px_-30px_rgba(16,42,67,0.3)]'
        : 'border-sky-100 bg-white hover:-translate-y-0.5 hover:border-sky-200 hover:shadow-sm'
      }`}
    >
      {selected ?
        <span className='absolute right-4 top-4 flex size-6 items-center justify-center rounded-full bg-[#102a43] text-white'>
          <Check className='size-3.5' />
        </span>
      : null}

      <div className='pr-8'>
        <p className='text-[10px] font-semibold uppercase tracking-[0.18em] text-[#3f7194]'>
          {fare.code}
        </p>

        <h3 className='mt-1 text-lg font-semibold tracking-tight text-[#102a43]'>
          {fare.name}
        </h3>

        <p className='mt-2 text-xs leading-5 text-slate-500'>
          {fare.description}
        </p>
      </div>

      <div className='mt-5 border-t border-slate-100 pt-4'>
        <p className='text-[10px] uppercase tracking-[0.16em] text-slate-400'>
          From
        </p>

        <p className='mt-1 text-2xl font-semibold tracking-tight text-[#102a43]'>
          {formatCurrency(fare.price)}
        </p>

        <p className='mt-1 text-[10px] text-slate-400'>Taxes not included</p>
      </div>

      <div className='mt-5 space-y-2.5 border-t border-slate-100 pt-4'>
        <div className='flex items-center gap-2 text-xs text-slate-600'>
          <Luggage className='size-3.5 text-[#c5a46d]' />
          {fare.baggageAllowanceKg} kg baggage allowance
        </div>

        <div className='flex items-center gap-2 text-xs text-slate-600'>
          <RefreshCcw className='size-3.5 text-[#c5a46d]' />

          {fare.refundable ? 'Refundable' : 'Non-refundable'}
        </div>

        <div className='flex items-center gap-2 text-xs text-slate-600'>
          <Check className='size-3.5 text-[#c5a46d]' />

          {fare.changeable ?
            fare.changeFee === 0 ?
              'Changes included'
            : `Changes from PHP ${fare.changeFee.toLocaleString('en-PH')}`
          : 'Changes not permitted'}
        </div>
      </div>

      <div className='mt-5 text-[10px] font-medium text-slate-400'>
        {fare.seatsAvailable} seats currently available
      </div>
    </button>
  );
}
