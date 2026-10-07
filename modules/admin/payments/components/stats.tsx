import {
  Ban,
  CheckCircle2,
  Clock3,
  CreditCard,
  LoaderCircle,
  RotateCcw,
} from 'lucide-react';

import type { PaymentStats } from '../types/payment';

interface PaymentStatsProps {
  stats: PaymentStats;
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    maximumFractionDigits: 0,
  }).format(amount);
}

const cardClass =
  'rounded-[1.4rem] border border-border/70 bg-card p-4 shadow-sm';

export function PaymentStats({ stats }: PaymentStatsProps) {
  const items = [
    {
      label: 'Total payments',
      value: stats.total.toString(),
      description: 'Payment transactions',
      icon: CreditCard,
    },
    {
      label: 'Paid',
      value: stats.paid.toString(),
      description: formatCurrency(stats.paidAmount),
      icon: CheckCircle2,
    },
    {
      label: 'Pending',
      value: stats.pending.toString(),
      description: formatCurrency(stats.pendingAmount),
      icon: Clock3,
    },
    {
      label: 'Processing',
      value: stats.processing.toString(),
      description: 'Transactions processing',
      icon: LoaderCircle,
    },
    {
      label: 'Cancelled',
      value: stats.cancelled.toString(),
      description: 'Cancelled transactions',
      icon: Ban,
    },
    {
      label: 'Refunded',
      value: stats.refunded.toString(),
      description: 'Refunded transactions',
      icon: RotateCcw,
    },
  ];

  return (
    <section className='grid gap-3 sm:grid-cols-2 xl:grid-cols-3'>
      {items.map((item) => {
        const Icon = item.icon;

        return (
          <div key={item.label} className={cardClass}>
            <div className='flex items-start justify-between gap-4'>
              <div className='min-w-0'>
                <p className='text-xs font-medium text-muted-foreground'>
                  {item.label}
                </p>

                <p className='mt-2 text-2xl font-semibold tracking-tight text-foreground'>
                  {item.value}
                </p>

                <p className='mt-1 text-[10px] text-muted-foreground'>
                  {item.description}
                </p>
              </div>

              <div className='flex size-9 shrink-0 items-center justify-center rounded-xl bg-[#E5F5FC] text-[#5BA9D6]'>
                <Icon className='size-4' />
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}
