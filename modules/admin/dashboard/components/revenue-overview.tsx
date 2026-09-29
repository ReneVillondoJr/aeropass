import { ArrowUpRight, Banknote, Clock3, RotateCcw } from 'lucide-react';

import type { DashboardData } from '../types/dashboard';

interface RevenueOverviewProps {
  revenue: DashboardData['revenue'];
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    maximumFractionDigits: 0,
  }).format(value);
}

export function RevenueOverview({ revenue }: RevenueOverviewProps) {
  return (
    <section className='rounded-2xl border border-border/70 bg-card p-5 shadow-sm'>
      <div className='flex items-start justify-between gap-3'>
        <div>
          <p className='text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground'>
            Revenue
          </p>

          <h2 className='mt-1 text-lg font-semibold'>Financial overview</h2>
        </div>

        <div className='flex size-9 items-center justify-center rounded-xl bg-muted text-muted-foreground'>
          <Banknote className='size-4' />
        </div>
      </div>

      <div className='mt-6'>
        <p className='text-3xl font-semibold tracking-tight'>
          {formatCurrency(revenue.grossRevenue)}
        </p>

        <div className='mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400'>
          <ArrowUpRight className='size-3.5' />
          Paid revenue
        </div>
      </div>

      <div className='mt-7 space-y-4'>
        <div className='flex items-center justify-between gap-4'>
          <div className='flex items-center gap-2.5'>
            <div className='flex size-8 items-center justify-center rounded-lg bg-amber-500/10 text-amber-600'>
              <Clock3 className='size-4' />
            </div>

            <div>
              <p className='text-sm font-medium'>Pending</p>

              <p className='text-xs text-muted-foreground'>Awaiting payment</p>
            </div>
          </div>

          <p className='text-sm font-semibold'>
            {formatCurrency(revenue.pendingRevenue)}
          </p>
        </div>

        <div className='flex items-center justify-between gap-4'>
          <div className='flex items-center gap-2.5'>
            <div className='flex size-8 items-center justify-center rounded-lg bg-violet-500/10 text-violet-600'>
              <RotateCcw className='size-4' />
            </div>

            <div>
              <p className='text-sm font-medium'>Refunded</p>

              <p className='text-xs text-muted-foreground'>Completed refunds</p>
            </div>
          </div>

          <p className='text-sm font-semibold'>
            {formatCurrency(revenue.refundedAmount)}
          </p>
        </div>

        <div className='border-t border-border/70 pt-4'>
          <div className='flex items-center justify-between gap-4'>
            <p className='text-sm text-muted-foreground'>
              Average booking value
            </p>

            <p className='text-sm font-semibold'>
              {formatCurrency(revenue.averageBookingValue)}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
