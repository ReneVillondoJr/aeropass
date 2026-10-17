import { CalendarClock, CheckCircle2, CreditCard, ReceiptText } from 'lucide-react';

import { CustomerStatusBadge } from '@/components/customer/shared/customer-status-badge';

import type { CustomerPaymentDetailView } from '@/modules/customer/payments/types/payment';

interface PaymentOverviewProps {
  payment: CustomerPaymentDetailView;
}

function formatMoney(amount: number, currency = 'PHP') {
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency,
    maximumFractionDigits: 2,
  }).format(amount);
}

function formatDateTime(value: string | null) {
  if (!value) return 'Not recorded';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'Date unavailable';
  return new Intl.DateTimeFormat('en-PH', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Asia/Manila',
  }).format(date);
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 py-2.5 text-xs">
      <span className="text-muted-foreground">{label}</span>
      <span className="max-w-[65%] break-words text-right font-medium text-foreground">{value}</span>
    </div>
  );
}

export function PaymentOverview({ payment }: PaymentOverviewProps) {
  return (
    <section className="space-y-4">
      <div className="relative overflow-hidden rounded-[1.5rem] border border-border/70 bg-card p-5 shadow-sm sm:p-6">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_92%_5%,rgba(91,169,214,0.14),transparent_33%)]" />
        <div className="relative">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex min-w-0 items-start gap-3">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#EEF7FB] text-[#2879A8]">
                <CreditCard className="size-5" aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#2879A8]">Transaction record</p>
                <h2 className="mt-1 text-base font-semibold text-foreground">{payment.providerReference}</h2>
                <p className="mt-1 text-xs text-muted-foreground">Booking reference {payment.bookingReference}</p>
              </div>
            </div>
            <CustomerStatusBadge status={payment.status} />
          </div>
          <div className="mt-6 border-t border-border/60 pt-5">
            <p className="text-xs font-medium text-muted-foreground">Payment amount</p>
            <p className="mt-1 text-3xl font-semibold tracking-tight text-[#102A43]">{formatMoney(payment.amount, payment.currency)}</p>
            <p className="mt-2 text-xs text-muted-foreground">{payment.status === 'PAID' ? 'Paid on ' : 'Created on '}{formatDateTime(payment.status === 'PAID' ? payment.paidAt : payment.createdAt)}</p>
          </div>
        </div>
      </div>

      <section className="rounded-2xl border border-border/70 bg-card p-4 shadow-sm sm:p-5">
        <div className="flex items-center gap-3">
          <span className="flex size-9 items-center justify-center rounded-xl bg-muted text-muted-foreground">
            <ReceiptText className="size-4.5" aria-hidden="true" />
          </span>
          <div>
            <h2 className="text-sm font-semibold text-foreground">Transaction information</h2>
            <p className="mt-0.5 text-xs text-muted-foreground">Reference and processing details</p>
          </div>
        </div>
        <div className="mt-4 divide-y divide-border/60 border-y border-border/60">
          <SummaryRow label="Payment method" value={payment.paymentMethod.replaceAll('_', ' ')} />
          <SummaryRow label="Provider" value="Local mock provider" />
          <SummaryRow label="Created at" value={formatDateTime(payment.createdAt)} />
          <SummaryRow label="Paid at" value={formatDateTime(payment.paidAt)} />
          <SummaryRow label="Booking status" value={payment.bookingStatus.replaceAll('_', ' ')} />
          <SummaryRow label="Provider reference" value={payment.providerReference} />
        </div>
        <div className="mt-4 flex items-start gap-2 rounded-xl border border-[#D9EAF3] bg-[#EEF7FB]/70 p-3 text-xs leading-5 text-[#34556D]">
          {payment.status === 'PAID' ? <CheckCircle2 className="mt-0.5 size-4 shrink-0" aria-hidden="true" /> : <CalendarClock className="mt-0.5 size-4 shrink-0" aria-hidden="true" />}
          <p>{payment.status === 'PAID' ? 'The local mock record marks this payment as paid. No money was charged by this demonstration.' : 'This local mock transaction is not marked as paid. Use the booking details to review the reservation status; this screen does not initiate a real payment.'}</p>
        </div>
      </section>
    </section>
  );
}
