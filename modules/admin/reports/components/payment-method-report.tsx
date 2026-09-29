import { CreditCard } from 'lucide-react';

import type { PaymentMethodSummary } from '../types/reports';

interface PaymentMethodReportProps {
  methods: PaymentMethodSummary[];
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    maximumFractionDigits: 0,
  }).format(value);
}

export function PaymentMethodReport({ methods }: PaymentMethodReportProps) {
  return (
    <section className='rounded-2xl border border-border/70 bg-card p-5 shadow-sm'>
      <div className='flex items-start justify-between'>
        <div>
          <p className='text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground'>
            Payments
          </p>

          <h2 className='mt-1 text-lg font-semibold'>Payment methods</h2>
        </div>

        <div className='flex size-9 items-center justify-center rounded-xl bg-muted text-muted-foreground'>
          <CreditCard className='size-4' />
        </div>
      </div>

      <div className='mt-6 space-y-5'>
        {methods.length > 0 ?
          methods.map((item) => (
            <div key={item.method}>
              <div className='flex items-center justify-between gap-4'>
                <div>
                  <p className='text-sm font-medium'>{item.label}</p>

                  <p className='mt-0.5 text-xs text-muted-foreground'>
                    {item.count} transaction
                    {item.count === 1 ? '' : 's'}
                  </p>
                </div>

                <p className='text-sm font-semibold'>
                  {formatCurrency(item.amount)}
                </p>
              </div>

              <div className='mt-2 h-2 overflow-hidden rounded-full bg-muted'>
                <div
                  className='h-full rounded-full bg-primary/70'
                  style={{
                    width: `${item.percentage}%`,
                  }}
                />
              </div>

              <p className='mt-1 text-right text-[10px] text-muted-foreground'>
                {item.percentage}%
              </p>
            </div>
          ))
        : <div className='rounded-xl border border-dashed border-border px-4 py-10 text-center'>
            <p className='text-sm font-medium'>No paid transactions</p>
          </div>
        }
      </div>
    </section>
  );
}
