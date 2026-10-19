import {
  CalendarClock,
  CheckCircle2,
  CircleDollarSign,
  FileText,
} from 'lucide-react';

import { CustomerStatusBadge } from '@/components/customer/shared/customer-status-badge';

import type { CustomerRefundDetail } from '@/modules/customer/refunds/types/refund';

interface RefundOverviewProps {
  record: CustomerRefundDetail;
}

function formatMoney(amount: number, currency = 'PHP') {
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency,
    maximumFractionDigits: 2,
  }).format(amount);
}

function formatDateTime(value?: string | null) {
  if (!value) return 'Not recorded';

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return 'Not recorded';

  return new Intl.DateTimeFormat('en-PH', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Asia/Manila',
  }).format(date);
}

export function RefundOverview({ record }: RefundOverviewProps) {
  const refund = record.refund;

  return (
    <section className='overflow-hidden rounded-2xl border border-border/70 bg-card shadow-sm'>
      <div className='border-b border-border/60 px-4 py-4 sm:px-5'>
        <div className='flex flex-wrap items-start justify-between gap-3'>
          <div className='flex min-w-0 items-start gap-3'>
            <span className='flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#EEF7FB] text-[#2879A8]'>
              <CircleDollarSign className='size-5' aria-hidden='true' />
            </span>

            <div className='min-w-0'>
              <p className='text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground'>
                Refund request
              </p>

              <h2 className='mt-1 break-all text-base font-semibold tracking-tight text-foreground'>
                {refund.id}
              </h2>

              <p className='mt-1 text-xs text-muted-foreground'>
                Booking {record.booking.bookingReference}
              </p>
            </div>
          </div>

          <CustomerStatusBadge status={refund.status} className='px-3 py-1.5' />
        </div>
      </div>

      <div className='p-4 sm:p-5'>
        <div className='rounded-2xl bg-[#EEF7FB]/75 p-4 sm:p-5'>
          <p className='text-[10px] font-semibold uppercase tracking-[0.14em] text-[#34556D]'>
            Requested refund amount
          </p>

          <p className='mt-2 text-3xl font-semibold tracking-tight text-[#102A43] sm:text-4xl'>
            {formatMoney(refund.amount, record.booking.currency)}
          </p>

          <p className='mt-2 text-xs leading-5 text-[#34556D]'>
            This is the amount recorded on the refund request. The final
            transferred amount can only be confirmed by the actual payment
            processor.
          </p>
        </div>

        <div className='mt-5 grid gap-4 sm:grid-cols-2'>
          <div className='min-w-0'>
            <p className='flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground'>
              <CalendarClock className='size-3.5' aria-hidden='true' />
              Request submitted
            </p>

            <p className='mt-2 text-xs font-medium text-foreground'>
              {formatDateTime(refund.requestedAt)}
            </p>
          </div>

          <div className='min-w-0'>
            <p className='flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground'>
              {refund.status === 'COMPLETED' ?
                <CheckCircle2 className='size-3.5' aria-hidden='true' />
              : <CalendarClock className='size-3.5' aria-hidden='true' />}
              Processed date
            </p>

            <p className='mt-2 text-xs font-medium text-foreground'>
              {formatDateTime(refund.processedAt)}
            </p>
          </div>
        </div>

        <div className='mt-5 rounded-xl border border-border/70 p-4'>
          <p className='flex items-center gap-2 text-xs font-semibold text-foreground'>
            <FileText
              className='size-4 text-muted-foreground'
              aria-hidden='true'
            />
            Refund reason
          </p>

          <p className='mt-2 text-sm leading-6 text-muted-foreground'>
            {refund.reason}
          </p>
        </div>

        <div className='mt-4 grid gap-3 sm:grid-cols-2'>
          <div className='rounded-xl border border-border/70 p-3'>
            <p className='text-[10px] font-medium uppercase tracking-[0.1em] text-muted-foreground'>
              Original payment method
            </p>

            <p className='mt-2 text-xs font-semibold text-foreground'>
              {record.payment?.paymentMethod.replaceAll('_', ' ') ??
                record.booking.paymentMethod.replaceAll('_', ' ')}
            </p>
          </div>

          <div className='rounded-xl border border-border/70 p-3'>
            <p className='text-[10px] font-medium uppercase tracking-[0.1em] text-muted-foreground'>
              Original payment reference
            </p>

            <p className='mt-2 break-all font-mono text-xs font-semibold text-foreground'>
              {record.payment?.providerReference ?? 'Not available'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
