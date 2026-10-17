import { Clock3, History } from 'lucide-react';

import { CustomerStatusBadge } from '@/components/customer/shared/customer-status-badge';
import type { CustomerPaymentDetailView } from '@/modules/customer/payments/types/payment';

interface PaymentAttemptsProps {
  payment: CustomerPaymentDetailView;
}

function formatMoney(amount: number) {
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    maximumFractionDigits: 2,
  }).format(amount);
}

function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'Date unavailable';
  return new Intl.DateTimeFormat('en-PH', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Asia/Manila',
  }).format(date);
}

export function PaymentAttempts({ payment }: PaymentAttemptsProps) {
  return (
    <section className="rounded-2xl border border-border/70 bg-card p-4 shadow-sm sm:p-5">
      <div className="flex items-center gap-3">
        <span className="flex size-9 items-center justify-center rounded-xl bg-muted text-muted-foreground">
          <History className="size-4.5" aria-hidden="true" />
        </span>
        <div>
          <h2 className="text-sm font-semibold text-foreground">Payment attempts</h2>
          <p className="mt-0.5 text-xs text-muted-foreground">Attempt history linked to this booking</p>
        </div>
        <span className="ml-auto rounded-lg bg-muted px-2 py-1 text-[10px] font-semibold text-muted-foreground">{payment.paymentAttempts.length}</span>
      </div>
      {payment.paymentAttempts.length === 0 ? (
        <p className="mt-4 rounded-xl border border-dashed border-border p-4 text-xs leading-5 text-muted-foreground">No separate payment-attempt records are linked to this booking.</p>
      ) : (
        <ol className="mt-4 space-y-3">
          {payment.paymentAttempts.map((attempt, index) => (
            <li key={attempt.id} className="relative flex gap-3">
              <span className="relative z-10 flex size-8 shrink-0 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground">
                <Clock3 className="size-3.5" aria-hidden="true" />
              </span>
              <div className="min-w-0 flex-1 rounded-xl border border-border/70 p-3">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-foreground">{attempt.method.replaceAll('_', ' ')}</p>
                    <p className="mt-1 break-all font-mono text-[10px] text-muted-foreground">{attempt.reference}</p>
                  </div>
                  <CustomerStatusBadge status={attempt.status} />
                </div>
                <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-[11px] text-muted-foreground">
                  <span>{formatDate(attempt.attemptedAt)}</span>
                  <span className="font-semibold text-foreground">{formatMoney(attempt.amount)}</span>
                </div>
              </div>
              {index < payment.paymentAttempts.length - 1 ? <span className="absolute left-4 top-8 h-[calc(100%+12px)] w-px bg-border" aria-hidden="true" /> : null}
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}
