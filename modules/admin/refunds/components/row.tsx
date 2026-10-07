'use client';

import {
  CheckCircle2,
  ChevronRight,
  Clock3,
  CreditCard,
  Plane,
  RotateCcw,
  XCircle,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';

import type { RefundViewModel } from '../types/refund';

interface RefundRowProps {
  refund: RefundViewModel;
  selected: boolean;
  onSelect: (id: string) => void;
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    maximumFractionDigits: 0,
  }).format(amount);
}

function getInitials(name: string | null) {
  if (!name) {
    return 'AP';
  }

  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join('');
}

function getStatusClasses(status: RefundViewModel['status']) {
  switch (status) {
    case 'REQUESTED':
      return 'border-amber-200 bg-amber-50 text-amber-700';

    case 'PROCESSING':
      return 'border-sky-200 bg-sky-50 text-sky-700';

    case 'COMPLETED':
      return 'border-emerald-200 bg-emerald-50 text-emerald-700';

    case 'REJECTED':
      return 'border-rose-200 bg-rose-50 text-rose-700';

    default:
      return 'border-border/70 bg-muted/40 text-muted-foreground';
  }
}

const STATUS_ICONS = {
  REQUESTED: Clock3,
  PROCESSING: RotateCcw,
  COMPLETED: CheckCircle2,
  REJECTED: XCircle,
} as const satisfies Record<
  Exclude<RefundViewModel['status'], undefined>,
  typeof Clock3
>;

export function RefundRow({ refund, selected, onSelect }: RefundRowProps) {
  const StatusIcon = STATUS_ICONS[refund.status] ?? RotateCcw;

  return (
    <button
      type='button'
      onClick={() => onSelect(refund.id)}
      className={[
        'group w-full rounded-2xl border p-4 text-left transition-all',
        selected ?
          'border-[#5BA9D6]/50 bg-[#E5F5FC]/60 shadow-sm'
        : 'border-border/70 bg-background hover:border-[#5BA9D6]/40 hover:bg-muted/30',
      ].join(' ')}
    >
      <div className='flex min-w-0 items-start gap-3'>
        <div
          className={[
            'flex size-10 shrink-0 items-center justify-center rounded-xl text-xs font-semibold',
            selected ?
              'bg-[#5BA9D6] text-white'
            : 'bg-[#E5F5FC] text-[#356D91]',
          ].join(' ')}
        >
          {getInitials(refund.passengerName)}
        </div>

        <div className='min-w-0 flex-1'>
          <div className='flex min-w-0 flex-col gap-2 sm:flex-row sm:items-start sm:justify-between'>
            <div className='min-w-0'>
              <div className='flex flex-wrap items-center gap-2'>
                <p className='truncate text-sm font-semibold text-foreground'>
                  {formatCurrency(refund.amount)}
                </p>

                {refund.paymentMethod ?
                  <span className='rounded-full bg-muted/50 px-2 py-0.5 text-[9px] font-medium text-muted-foreground'>
                    {refund.paymentMethod}
                  </span>
                : null}
              </div>

              <p className='mt-0.5 truncate text-[11px] text-muted-foreground'>
                {refund.bookingReference ?? 'No booking'}
                {' · '}
                {refund.passengerName ?? 'Unknown passenger'}
              </p>
            </div>

            <Badge
              variant='outline'
              className={`flex w-fit shrink-0 items-center gap-1 text-[9px] font-medium ${getStatusClasses(
                refund.status,
              )}`}
            >
              <StatusIcon className='size-3' />

              {refund.status.toLowerCase().charAt(0).toUpperCase() +
                refund.status.toLowerCase().slice(1)}
            </Badge>
          </div>

          <div className='mt-3 grid gap-2 text-[10px] text-muted-foreground sm:grid-cols-3'>
            <div className='flex min-w-0 items-center gap-1.5'>
              <CreditCard className='size-3.5 shrink-0' />

              <span className='truncate'>
                {refund.providerReference ?? 'No payment reference'}
              </span>
            </div>

            <div className='flex min-w-0 items-center gap-1.5'>
              <Plane className='size-3.5 shrink-0' />

              <span className='truncate'>
                {refund.flightNumber ?
                  `${refund.flightNumber} · ${refund.originCode ?? '—'} → ${refund.destinationCode ?? '—'}`
                : 'Flight unavailable'}
              </span>
            </div>

            <div className='min-w-0 truncate'>{refund.reason}</div>
          </div>

          <div className='mt-3 flex flex-wrap items-center gap-2'>
            <span className='rounded-full border border-border/60 bg-muted/20 px-2 py-1 text-[9px] text-muted-foreground'>
              Requested by:{' '}
              <span className='font-medium text-foreground'>
                {refund.requestedBy}
              </span>
            </span>

            <span className='rounded-full border border-border/60 bg-muted/20 px-2 py-1 text-[9px] text-muted-foreground'>
              Payment:{' '}
              <span className='font-medium text-foreground'>
                {refund.paymentStatus ?? '—'}
              </span>
            </span>
          </div>
        </div>

        <ChevronRight
          className={[
            'mt-3 size-4 shrink-0 transition-transform',
            selected ? 'text-[#5BA9D6]' : (
              'text-muted-foreground/50 group-hover:translate-x-0.5 group-hover:text-foreground'
            ),
          ].join(' ')}
        />
      </div>
    </button>
  );
}
