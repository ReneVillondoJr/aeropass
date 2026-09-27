'use client';

import { Luggage, ShieldCheck, Sofa } from 'lucide-react';

interface AddonOptionsProps {
  baggageKg: number;
  travelProtection: boolean;
  loungeAccess: boolean;
  onBaggageChange: (value: number) => void;
  onProtectionChange: (value: boolean) => void;
  onLoungeChange: (value: boolean) => void;
}

export function AddonOptions({
  baggageKg,
  travelProtection,
  loungeAccess,
  onBaggageChange,
  onProtectionChange,
  onLoungeChange,
}: AddonOptionsProps) {
  return (
    <div className='grid gap-4 lg:grid-cols-3'>
      <label className='cursor-pointer rounded-2xl border border-sky-100 bg-white p-5 transition hover:border-sky-200'>
        <div className='flex items-center justify-between'>
          <Luggage className='size-5 text-[#3f88b2]' />

          <input
            type='number'
            min='0'
            step='15'
            value={baggageKg}
            onChange={(event) => onBaggageChange(Number(event.target.value))}
            className='h-9 w-20 rounded-md border border-input px-2 text-sm'
          />
        </div>

        <h3 className='mt-5 text-sm font-semibold text-[#102a43]'>
          Checked baggage
        </h3>

        <p className='mt-1 text-xs leading-5 text-slate-400'>
          Add checked baggage in 15 kg increments.
        </p>

        <p className='mt-4 text-xs font-medium text-slate-500'>₱50 per kg</p>
      </label>

      <button
        type='button'
        onClick={() => onProtectionChange(!travelProtection)}
        className={`rounded-2xl border p-5 text-left transition ${
          travelProtection ?
            'border-[#5ba9d6] bg-[#f4fbfe]'
          : 'border-sky-100 bg-white hover:border-sky-200'
        }`}
      >
        <ShieldCheck className='size-5 text-emerald-500' />

        <h3 className='mt-5 text-sm font-semibold text-[#102a43]'>
          Travel protection
        </h3>

        <p className='mt-1 text-xs leading-5 text-slate-400'>
          Added protection for qualifying travel interruptions.
        </p>

        <p className='mt-4 text-xs font-medium text-slate-500'>₱350</p>
      </button>

      <button
        type='button'
        onClick={() => onLoungeChange(!loungeAccess)}
        className={`rounded-2xl border p-5 text-left transition ${
          loungeAccess ?
            'border-[#5ba9d6] bg-[#f4fbfe]'
          : 'border-sky-100 bg-white hover:border-sky-200'
        }`}
      >
        <Sofa className='size-5 text-[#c5a46d]' />

        <h3 className='mt-5 text-sm font-semibold text-[#102a43]'>
          Lounge access
        </h3>

        <p className='mt-1 text-xs leading-5 text-slate-400'>
          Add airport lounge access to this booking.
        </p>

        <p className='mt-4 text-xs font-medium text-slate-500'>₱700</p>
      </button>
    </div>
  );
}
