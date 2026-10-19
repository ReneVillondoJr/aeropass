import { Info, RotateCcw } from 'lucide-react';

export function RefundsHeader() {
  return (
    <div className='relative overflow-hidden rounded-[1.5rem] border border-border/70 bg-card shadow-sm'>
      <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_90%_5%,rgba(91,169,214,0.16),transparent_32%),radial-gradient(circle_at_12%_115%,rgba(16,42,67,0.06),transparent_30%)]' />

      <div className='relative p-5 sm:p-6'>
        <div className='flex min-w-0 items-start gap-4'>
          <div className='flex size-12 shrink-0 items-center justify-center rounded-2xl bg-[#102A43] text-white shadow-lg shadow-[#102A43]/15'>
            <RotateCcw className='size-5' aria-hidden='true' />
          </div>

          <div className='min-w-0 flex-1'>
            <p className='text-[10px] font-semibold uppercase tracking-[0.18em] text-[#2879A8]'>
              Customer account
            </p>

            <h1 className='mt-1 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl'>
              My refunds
            </h1>

            <p className='mt-2 max-w-2xl text-sm leading-6 text-muted-foreground'>
              Track refund requests connected to your AeroPass bookings, review
              their status, and open the associated booking and payment
              information.
            </p>
          </div>
        </div>

        <div className='mt-5 flex items-start gap-2.5 rounded-xl bg-[#EEF7FB] px-3.5 py-3 text-[#34556D]'>
          <Info
            className='mt-0.5 size-4 shrink-0 text-[#102A43]'
            aria-hidden='true'
          />

          <p className='text-xs leading-5'>
            Refund status is based on the recorded AeroPass refund request.
            Review the linked booking, original payment, and recorded processing
            dates for more information.
          </p>
        </div>
      </div>
    </div>
  );
}
