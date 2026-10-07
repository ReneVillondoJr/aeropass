import {
  CheckCircle2,
  Clock3,
  CreditCard,
  RotateCcw,
  XCircle,
} from 'lucide-react';

import type { RefundStats } from '../types/refund';

interface RefundStatsProps {
  stats: RefundStats;
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

export function RefundStats({ stats }: RefundStatsProps) {
  const items = [
    {
      label: 'Total refunds',
      value: stats.total.toString(),
      description: formatCurrency(stats.totalAmount),
      icon: RotateCcw,
    },
    {
      label: 'Requested',
      value: stats.requested.toString(),
      description: 'Awaiting processing',
      icon: Clock3,
    },
    {
      label: 'Processing',
      value: stats.processing.toString(),
      description: formatCurrency(stats.processingAmount),
      icon: CreditCard,
    },
    {
      label: 'Completed',
      value: stats.completed.toString(),
      description: formatCurrency(stats.completedAmount),
      icon: CheckCircle2,
    },
    {
      label: 'Rejected',
      value: stats.rejected.toString(),
      description: 'Rejected requests',
      icon: XCircle,
    },
  ];

  return (
    <section className='grid gap-3 sm:grid-cols-2 xl:grid-cols-5'>
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

                <p className='mt-1 truncate text-[10px] text-muted-foreground'>
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
