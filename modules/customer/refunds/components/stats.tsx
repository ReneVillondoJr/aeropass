import { CheckCircle2, Clock3, RotateCcw, Wallet, XCircle } from 'lucide-react';

import type { CustomerRefundStats } from '../types/refund';

interface RefundStatsProps {
  stats: CustomerRefundStats;
}

function formatMoney(amount: number) {
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    maximumFractionDigits: 2,
  }).format(amount);
}

export function RefundStats({ stats }: RefundStatsProps) {
  const items = [
    {
      label: 'Total requests',
      value: stats.total.toLocaleString('en-PH'),
      icon: RotateCcw,
      tone: 'bg-[#EEF7FB] text-[#2879A8]',
    },
    {
      label: 'Under review',
      value: (stats.requested + stats.processing).toLocaleString('en-PH'),
      icon: Clock3,
      tone: 'bg-amber-50 text-amber-700',
    },
    {
      label: 'Completed refunds',
      value: stats.completed.toLocaleString('en-PH'),
      icon: CheckCircle2,
      tone: 'bg-emerald-50 text-emerald-700',
    },
    {
      label: 'Completed amount',
      value: formatMoney(stats.completedAmount),
      icon: Wallet,
      tone: 'bg-violet-50 text-violet-700',
    },
  ];

  return (
    <section
      aria-label='Refund statistics'
      className='grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4'
    >
      {items.map((item) => {
        const Icon = item.icon;

        return (
          <article
            key={item.label}
            className='rounded-2xl border border-border/70 bg-card p-4 shadow-sm transition-shadow hover:shadow-md sm:p-5'
          >
            <div className='flex items-start justify-between gap-3'>
              <div className='min-w-0'>
                <p className='text-xs font-medium text-muted-foreground'>
                  {item.label}
                </p>

                <p className='mt-3 break-words text-xl font-semibold tracking-tight text-foreground'>
                  {item.value}
                </p>
              </div>

              <span
                className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${item.tone}`}
              >
                <Icon className='size-4' aria-hidden='true' />
              </span>
            </div>
          </article>
        );
      })}
    </section>
  );
}
