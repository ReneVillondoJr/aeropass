import { AlertCircle, CreditCard, RotateCcw, Wallet } from 'lucide-react';

import type { CustomerPaymentStats } from '../types/payment';

interface PaymentStatsProps {
  stats: CustomerPaymentStats;
}

function formatMoney(amount: number) {
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    maximumFractionDigits: 2,
  }).format(amount);
}

export function PaymentStats({ stats }: PaymentStatsProps) {
  const items = [
    {
      label: 'Payment records',
      value: stats.total.toLocaleString('en-PH'),
      icon: CreditCard,
      tone: 'text-[#2879A8]',
      iconBg: 'bg-[#E5F5FC]',
    },
    {
      label: 'Pending / processing',
      value: stats.pending.toLocaleString('en-PH'),
      icon: AlertCircle,
      tone: 'text-amber-700',
      iconBg: 'bg-amber-50',
    },
    {
      label: 'Gross paid amount',
      value: formatMoney(stats.paidAmount),
      icon: Wallet,
      tone: 'text-emerald-700',
      iconBg: 'bg-emerald-50',
    },
    {
      label: 'Refund records',
      value: stats.refundRequests.toLocaleString('en-PH'),
      icon: RotateCcw,
      tone: 'text-violet-700',
      iconBg: 'bg-violet-50',
    },
  ];

  return (
    <section aria-label="Payment summary" className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <article key={item.label} className="rounded-2xl border border-border/70 bg-card p-4 shadow-sm sm:p-5">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-xs font-medium text-muted-foreground">{item.label}</p>
                <p className="mt-2 break-words text-2xl font-semibold tracking-tight tabular-nums text-foreground">{item.value}</p>
              </div>
              <span className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${item.iconBg} ${item.tone}`}>
                <Icon className="size-4.5" aria-hidden="true" />
              </span>
            </div>
          </article>
        );
      })}
    </section>
  );
}
