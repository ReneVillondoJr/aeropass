import Link from 'next/link';

import { ArrowRight, CheckCircle2, Plane } from 'lucide-react';

import { Button } from '@/components/ui/button';

import type { ConfirmationData } from '../types/confirmation';

interface ConfirmationCardProps {
  data: ConfirmationData;
}

export function ConfirmationCard({ data }: ConfirmationCardProps) {
  return (
    <div className='mx-auto max-w-2xl'>
      <div className='rounded-2xl border border-emerald-100 bg-white p-6 text-center shadow-[0_20px_60px_-40px_rgba(16,42,67,0.3)] sm:p-8'>
        <div className='mx-auto flex size-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600'>
          <CheckCircle2 className='size-7' />
        </div>

        <p className='mt-6 text-[10px] font-semibold uppercase tracking-[0.18em] text-emerald-600'>
          Demo confirmation
        </p>

        <h1 className='mt-2 text-2xl font-semibold tracking-tight text-[#102a43] sm:text-3xl'>
          Your booking flow is complete
        </h1>

        <p className='mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500'>
          This local AeroPass demo has completed the booking flow. No real
          payment or reservation record has been created.
        </p>

        <div className='mt-7 rounded-2xl bg-[#f4f9fc] p-5 text-left'>
          <div className='flex items-center gap-3'>
            <Plane className='size-5 text-[#3f88b2]' />

            <div>
              <p className='text-sm font-semibold text-[#102a43]'>
                {data.flightNumber}
              </p>

              <p className='mt-1 text-xs text-slate-400'>
                {data.origin} → {data.destination}
              </p>
            </div>
          </div>

          <div className='mt-5 divide-y divide-slate-100 rounded-xl bg-white'>
            <div className='flex justify-between px-4 py-3'>
              <span className='text-xs text-slate-500'>Passenger</span>

              <span className='text-xs font-medium text-[#102a43]'>
                {data.passengerName}
              </span>
            </div>

            <div className='flex justify-between px-4 py-3'>
              <span className='text-xs text-slate-500'>Seat</span>

              <span className='text-xs font-medium text-[#102a43]'>
                {data.seat}
              </span>
            </div>

            <div className='flex justify-between px-4 py-3'>
              <span className='text-xs text-slate-500'>Payment</span>

              <span className='text-xs font-medium text-[#102a43]'>
                {data.paymentMethod}
              </span>
            </div>
          </div>
        </div>

        <Link href='/search' className='mt-6 block'>
          <Button className='h-11 w-full gap-2 rounded-xl bg-[#102a43] text-white hover:bg-[#183b5b]'>
            Browse more flights
            <ArrowRight className='size-4' />
          </Button>
        </Link>
      </div>
    </div>
  );
}
