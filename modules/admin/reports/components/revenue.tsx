import { ArrowUpRight, Banknote } from 'lucide-react';

import type { RevenuePoint } from '../types/reports';

interface ReportRevenueProps {
  points: RevenuePoint[];
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    maximumFractionDigits: 0,
  }).format(value);
}

export function ReportRevenue({ points }: ReportRevenueProps) {
  const total = points.reduce((sum, item) => sum + item.amount, 0);

  const max = Math.max(...points.map((item) => item.amount), 1);

  return (
    <section className='rounded-2xl border border-border/70 bg-card p-5 shadow-sm'>
      <div className='flex items-start justify-between gap-4'>
        <div>
          <p className='text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground'>
            Revenue trend
          </p>

          <h2 className='mt-1 text-lg font-semibold'>Paid revenue</h2>
        </div>

        <div className='flex size-9 items-center justify-center rounded-xl bg-muted text-muted-foreground'>
          <Banknote className='size-4' />
        </div>
      </div>

      <div className='mt-5'>
        <p className='text-3xl font-semibold tracking-tight'>
          {formatCurrency(total)}
        </p>

        <p className='mt-1 inline-flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400'>
          <ArrowUpRight className='size-3.5' />
          Paid transaction volume
        </p>
      </div>

      {points.length > 0 ?
        <div className='mt-7'>
          <div className='flex h-48 items-end gap-2'>
            {points.map((point) => {
              const height = Math.max((point.amount / max) * 100, 5);

              return (
                <div
                  key={point.date}
                  className='group flex h-full min-w-0 flex-1 flex-col justify-end'
                >
                  <div className='relative flex h-full items-end'>
                    <div
                      className='w-full rounded-t-lg bg-primary/75 transition-all duration-200 group-hover:bg-primary'
                      style={{
                        height: `${height}%`,
                      }}
                    />

                    <div className='pointer-events-none absolute bottom-full left-1/2 mb-2 hidden -translate-x-1/2 whitespace-nowrap rounded-lg bg-foreground px-2 py-1 text-[10px] font-medium text-background shadow-sm group-hover:block'>
                      {formatCurrency(point.amount)}
                    </div>
                  </div>

                  <p className='mt-2 truncate text-center text-[10px] text-muted-foreground'>
                    {point.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      : <div className='mt-8 rounded-xl border border-dashed border-border px-4 py-10 text-center'>
          <p className='text-sm font-medium'>No revenue data</p>

          <p className='mt-1 text-xs text-muted-foreground'>
            Paid transactions will appear here.
          </p>
        </div>
      }
    </section>
  );
}
