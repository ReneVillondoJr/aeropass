import { CheckCircle2, CircleX, Clock3, FileCheck2 } from 'lucide-react';

import { CustomerStatusBadge } from '@/components/customer/shared/customer-status-badge';

import type { CustomerRefundDetail } from '@/modules/customer/refunds/types/refund';

interface RefundStatusTimelineProps {
  record: CustomerRefundDetail;
}

function formatDateTime(value?: string | null) {
  if (!value) return null;

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return null;

  return new Intl.DateTimeFormat('en-PH', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Asia/Manila',
  }).format(date);
}

export function RefundStatusTimeline({ record }: RefundStatusTimelineProps) {
  const { refund } = record;

  const finalStatus =
    refund.status === 'REJECTED' ? 'Request rejected' : 'Refund completed';

  const isFinished =
    refund.status === 'COMPLETED' || refund.status === 'REJECTED';

  const steps = [
    {
      title: 'Request submitted',
      description: 'The refund request was recorded in AeroPass.',
      completed: true,
      date: formatDateTime(refund.requestedAt),
      icon: FileCheck2,
    },
    {
      title: 'Under review',
      description:
        refund.status === 'REQUESTED' ? 'The request is awaiting review.'
        : refund.status === 'PROCESSING' ?
          'The request is currently being processed.'
        : 'The recorded request has moved beyond the review stage.',
      completed:
        refund.status === 'PROCESSING' ||
        refund.status === 'COMPLETED' ||
        refund.status === 'REJECTED',
      current: refund.status === 'REQUESTED' || refund.status === 'PROCESSING',
      date: null,
      icon: Clock3,
    },
    {
      title: finalStatus,
      description:
        refund.status === 'COMPLETED' ?
          'The local refund record is marked completed.'
        : refund.status === 'REJECTED' ?
          'The local refund record is marked rejected.'
        : 'A final status has not been recorded yet.',
      completed: isFinished,
      date: formatDateTime(refund.processedAt),
      icon: refund.status === 'REJECTED' ? CircleX : CheckCircle2,
    },
  ];

  return (
    <section className='rounded-2xl border border-border/70 bg-card p-4 shadow-sm sm:p-5'>
      <div className='flex flex-wrap items-start justify-between gap-3'>
        <div>
          <h2 className='text-sm font-semibold text-foreground'>
            Refund status history
          </h2>

          <p className='mt-1 text-xs leading-5 text-muted-foreground'>
            Progress based on the recorded refund status and timestamps.
          </p>
        </div>

        <CustomerStatusBadge status={refund.status} />
      </div>

      <div className='mt-6 space-y-0'>
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isLast = index === steps.length - 1;

          return (
            <div
              key={step.title}
              className='relative flex gap-3 pb-6 last:pb-0'
            >
              {!isLast ?
                <div
                  className={[
                    'absolute bottom-0 left-[15px] top-8 w-px',
                    step.completed ? 'bg-[#5BA9D6]' : 'bg-border',
                  ].join(' ')}
                  aria-hidden='true'
                />
              : null}

              <span
                className={[
                  'relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full border',
                  step.completed ?
                    'border-[#B8D6E6] bg-[#EEF7FB] text-[#2879A8]'
                  : step.current ? 'border-amber-200 bg-amber-50 text-amber-700'
                  : 'border-border bg-muted text-muted-foreground',
                ].join(' ')}
              >
                <Icon className='size-4' aria-hidden='true' />
              </span>

              <div className='min-w-0 flex-1 pt-0.5'>
                <div className='flex flex-wrap items-center gap-2'>
                  <h3 className='text-xs font-semibold text-foreground'>
                    {step.title}
                  </h3>

                  {step.current ?
                    <span className='rounded-full bg-amber-50 px-2 py-0.5 text-[9px] font-semibold text-amber-700'>
                      Current stage
                    </span>
                  : null}
                </div>

                <p className='mt-1 text-xs leading-5 text-muted-foreground'>
                  {step.description}
                </p>

                {step.date ?
                  <p className='mt-1.5 text-[10px] text-muted-foreground'>
                    {step.date}
                  </p>
                : null}
              </div>
            </div>
          );
        })}
      </div>

      <p className='mt-5 rounded-xl border border-border/70 bg-muted/30 p-3 text-[11px] leading-5 text-muted-foreground'>
        The local refund model stores the request date and processed date, but
        it does not store a separate review timestamp. The review stage above
        therefore shows the current status without inventing a processing date.
      </p>
    </section>
  );
}
