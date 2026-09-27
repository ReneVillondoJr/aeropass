import { CheckCircle2, Plane } from 'lucide-react';

import type { CheckoutSummary } from '../types/checkout';

interface CheckoutSummaryProps {
  flightNumber: string;
  origin: string;
  destination: string;
  fareName: string;
  passengerName: string;
  seat: string;
  summary: CheckoutSummary;
}

export function CheckoutSummaryCard({
  flightNumber,
  origin,
  destination,
  fareName,
  passengerName,
  seat,
  summary,
}: CheckoutSummaryProps) {
  return (
    <div className='grid gap-5 lg:grid-cols-[1fr_320px]'>
      <div className='rounded-2xl border border-sky-100 bg-white p-6 sm:p-8'>
        <div className='flex items-center gap-2'>
          <CheckCircle2 className='size-4 text-emerald-500' />

          <p className='text-sm font-semibold text-[#102a43]'>
            Review your booking
          </p>
        </div>

        <div className='mt-6 rounded-2xl bg-[#f4f9fc] p-5'>
          <div className='flex items-center gap-4'>
            <Plane className='size-5 text-[#3f88b2]' />

            <div>
              <p className='text-sm font-semibold text-[#102a43]'>
                {flightNumber}
              </p>

              <p className='mt-1 text-xs text-slate-400'>
                {origin} → {destination}
              </p>
            </div>
          </div>
        </div>

        <div className='mt-5 divide-y divide-slate-100 rounded-2xl border border-sky-100'>
          <div className='flex justify-between gap-4 px-5 py-4'>
            <span className='text-sm text-slate-500'>Passenger</span>

            <span className='text-right text-sm font-medium text-[#102a43]'>
              {passengerName}
            </span>
          </div>

          <div className='flex justify-between gap-4 px-5 py-4'>
            <span className='text-sm text-slate-500'>Fare</span>

            <span className='text-sm font-medium text-[#102a43]'>
              {fareName}
            </span>
          </div>

          <div className='flex justify-between gap-4 px-5 py-4'>
            <span className='text-sm text-slate-500'>Seat</span>

            <span className='text-sm font-medium text-[#102a43]'>{seat}</span>
          </div>
        </div>
      </div>

      <div className='h-fit rounded-2xl border border-sky-100 bg-white p-6'>
        <p className='text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400'>
          Price summary
        </p>

        <div className='mt-5 space-y-3'>
          <div className='flex justify-between text-sm'>
            <span className='text-slate-500'>Fare</span>

            <span>₱{summary.baseFare.toLocaleString('en-PH')}</span>
          </div>

          <div className='flex justify-between text-sm'>
            <span className='text-slate-500'>Taxes</span>

            <span>₱{summary.taxes.toLocaleString('en-PH')}</span>
          </div>

          <div className='flex justify-between text-sm'>
            <span className='text-slate-500'>Fees</span>

            <span>₱{summary.fees.toLocaleString('en-PH')}</span>
          </div>

          <div className='flex justify-between text-sm'>
            <span className='text-slate-500'>Add-ons</span>

            <span>
              ₱{(summary.baggage + summary.addons).toLocaleString('en-PH')}
            </span>
          </div>
        </div>

        <div className='mt-5 border-t border-slate-100 pt-5'>
          <div className='flex items-end justify-between'>
            <span className='text-sm font-medium text-[#102a43]'>Total</span>

            <span className='text-2xl font-semibold tracking-tight text-[#102a43]'>
              ₱{summary.total.toLocaleString('en-PH')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
