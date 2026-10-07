import { CreditCard, WalletCards } from 'lucide-react';

import type { PaymentStats } from '../types/payment';

interface PaymentHeaderProps {
  stats: PaymentStats;
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function PaymentHeader({ stats }: PaymentHeaderProps) {
  return (
    <section className='overflow-hidden rounded-[1.75rem] bg-[#102A43] text-white shadow-sm'>
      <div className='flex flex-col gap-6 px-5 py-6 sm:px-7 lg:flex-row lg:items-end lg:justify-between lg:px-8 lg:py-7'>
        <div className='min-w-0'>
          <div className='mb-3 flex items-center gap-2 text-[#9CCBE8]'>
            <CreditCard className='size-4' />

            <span className='text-[10px] font-semibold uppercase tracking-[0.18em]'>
              Payment Operations
            </span>
          </div>

          <h1 className='text-2xl font-semibold tracking-tight sm:text-3xl'>
            Payments
          </h1>

          <p className='mt-2 max-w-2xl text-sm leading-6 text-white/65'>
            Monitor payment transactions, payment methods, provider references,
            attempts, and refund activity across AeroPass bookings.
          </p>
        </div>

        <div className='grid grid-cols-2 gap-2 sm:flex'>
          <div className='rounded-2xl border border-white/10 bg-white/5 px-4 py-3'>
            <p className='text-[10px] uppercase tracking-wide text-white/45'>
              Transactions
            </p>

            <p className='mt-1 text-lg font-semibold'>{stats.total}</p>
          </div>

          <div className='rounded-2xl border border-white/10 bg-white/5 px-4 py-3'>
            <div className='flex items-center gap-1.5'>
              <WalletCards className='size-3.5 text-[#C5A46D]' />

              <p className='text-[10px] uppercase tracking-wide text-white/45'>
                Collected
              </p>
            </div>

            <p className='mt-1 text-lg font-semibold'>
              {formatCurrency(stats.paidAmount)}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
