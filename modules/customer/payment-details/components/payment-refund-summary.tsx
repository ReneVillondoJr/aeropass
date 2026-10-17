import { CheckCircle2, Clock3, RotateCcw } from 'lucide-react';

import { CustomerStatusBadge } from '@/components/customer/shared/customer-status-badge';
import type { CustomerPaymentDetailView } from '@/modules/customer/payments/types/payment';

interface PaymentRefundSummaryProps {
  payment: CustomerPaymentDetailView;
}

function formatMoney(amount: number) {
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    maximumFractionDigits: 2,
  }).format(amount);
}

function formatDate(value: string | null) {
  if (!value) return 'Not processed';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'Date unavailable';
  return new Intl.DateTimeFormat('en-PH', {
    dateStyle: 'medium',
    timeZone: 'Asia/Manila',
  }).format(date);
}

export function PaymentRefundSummary({ payment }: PaymentRefundSummaryProps) {
  const refund = payment.refund;

  if (!refund) {
    return (
      <section className="rounded-2xl border border-border/70 bg-card p-4 shadow-sm sm:p-5">
        <div className="flex items-center gap-3">
          <span className="flex size-9 items-center justify-center rounded-xl bg-muted text-muted-foreground">
            <RotateCcw className="size-4.5" aria-hidden="true" />
          </span>
          <div>
            <h2 className="text-sm font-semibold text-foreground">Refund information</h2>
            <p className="mt-0.5 text-xs text-muted-foreground">No refund record linked to this booking</p>
          </div>
        </div>
        <p className="mt-4 text-xs leading-5 text-muted-foreground">If a refund request is created in the AeroPass system, its status and details will appear here.</p>
      </section>
    );
  }

  const isCompleted = refund.status === 'COMPLETED';

  return (
    <section className="rounded-2xl border border-violet-200 bg-violet-50/70 p-4 sm:p-5">
      <div className="flex flex-wrap items-center gap-3">
        <span className="flex size-9 items-center justify-center rounded-xl bg-white/80 text-violet-700 ring-1 ring-violet-200">
          {isCompleted ? <CheckCircle2 className="size-4.5" aria-hidden="true" /> : <Clock3 className="size-4.5" aria-hidden="true" />}
        </span>
        <div>
          <h2 className="text-sm font-semibold text-violet-950">Refund request</h2>
          <p className="mt-0.5 text-xs text-violet-900/70">{refund.id}</p>
        </div>
        <div className="ml-auto"><CustomerStatusBadge status={refund.status} /></div>
      </div>
      <p className="mt-4 text-xs leading-5 text-violet-950/80">{refund.reason}</p>
      <div className="mt-4 divide-y divide-violet-200 border-y border-violet-200">
        <div className="flex items-center justify-between gap-3 py-2.5 text-xs">
          <span className="text-violet-900/70">Refund amount</span>
          <span className="font-semibold text-violet-950">{formatMoney(refund.amount)}</span>
        </div>
        <div className="flex items-center justify-between gap-3 py-2.5 text-xs">
          <span className="text-violet-900/70">Requested on</span>
          <span className="text-right font-medium text-violet-950">{formatDate(refund.requestedAt)}</span>
        </div>
        <div className="flex items-center justify-between gap-3 py-2.5 text-xs">
          <span className="text-violet-900/70">Processed on</span>
          <span className="text-right font-medium text-violet-950">{formatDate(refund.processedAt)}</span>
        </div>
      </div>
      <p className="mt-3 text-[11px] leading-5 text-violet-900/70">This is a local mock refund record, not a confirmation of funds being returned by a payment provider.</p>
    </section>
  );
}
