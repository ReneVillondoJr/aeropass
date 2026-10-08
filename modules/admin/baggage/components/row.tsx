import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  Luggage,
  MapPin,
  Plane,
  UserRound,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';

import type { BaggageViewModel } from '../types/baggage';

interface BaggageRowProps {
  baggage: BaggageViewModel;
  selected: boolean;
  onClick: () => void;
}

const statusConfig = {
  PENDING: {
    label: 'Pending',
    className: 'border-slate-200 bg-slate-50 text-slate-700',
    icon: Clock3,
  },
  CHECKED: {
    label: 'Checked',
    className: 'border-blue-200 bg-blue-50 text-blue-700',
    icon: CheckCircle2,
  },
  IN_TRANSIT: {
    label: 'In Transit',
    className: 'border-violet-200 bg-violet-50 text-violet-700',
    icon: Plane,
  },
  RECEIVED: {
    label: 'Received',
    className: 'border-emerald-200 bg-emerald-50 text-emerald-700',
    icon: CheckCircle2,
  },
  LOST: {
    label: 'Lost',
    className: 'border-rose-200 bg-rose-50 text-rose-700',
    icon: Clock3,
  },
} as const;

export function BaggageRow({ baggage, selected, onClick }: BaggageRowProps) {
  const status = statusConfig[baggage.status];
  const StatusIcon = status.icon;

  return (
    <button
      type='button'
      onClick={onClick}
      className={[
        'group w-full rounded-2xl border p-4 text-left transition',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5BA9D6]/40',
        selected ?
          'border-[#5BA9D6]/50 bg-[#E5F5FC]/70 shadow-sm'
        : 'border-border/70 bg-card hover:border-border hover:bg-muted/20',
      ].join(' ')}
    >
      <div className='flex min-w-0 items-start gap-4'>
        <div
          className={[
            'flex size-11 shrink-0 items-center justify-center rounded-xl border',
            selected ?
              'border-[#5BA9D6]/30 bg-white text-[#102A43]'
            : 'border-border/70 bg-muted/40 text-muted-foreground',
          ].join(' ')}
        >
          <Luggage className='size-5' />
        </div>

        <div className='min-w-0 flex-1'>
          <div className='flex flex-wrap items-start justify-between gap-2'>
            <div className='min-w-0'>
              <div className='flex flex-wrap items-center gap-2'>
                <p className='font-semibold tracking-tight'>{baggage.bagTag}</p>

                <Badge
                  variant='outline'
                  className='border-border/70 bg-background text-[10px]'
                >
                  {baggage.type === 'CHECKED' ? 'Checked' : 'Cabin'}
                </Badge>
              </div>

              <div className='mt-1 flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground'>
                <span className='inline-flex items-center gap-1'>
                  <UserRound className='size-3' />
                  {baggage.passengerName}
                </span>

                <span className='text-border'>•</span>

                <span>{baggage.bookingReference}</span>
              </div>
            </div>

            <Badge
              variant='outline'
              className={[
                'shrink-0 gap-1 text-[10px] font-medium',
                status.className,
              ].join(' ')}
            >
              <StatusIcon className='size-3' />
              {status.label}
            </Badge>
          </div>

          <div className='mt-4 grid gap-3 sm:grid-cols-[1fr_auto] sm:items-center'>
            <div className='grid gap-2 sm:grid-cols-2'>
              <div className='min-w-0'>
                <p className='text-[10px] font-medium uppercase tracking-[0.12em] text-muted-foreground'>
                  Flight
                </p>

                <div className='mt-1 flex items-center gap-1.5 text-xs font-medium'>
                  <Plane className='size-3.5 text-muted-foreground' />
                  {baggage.flightNumber}
                  <span className='text-muted-foreground'>
                    {baggage.originCode}
                  </span>
                  <ArrowRight className='size-3 text-muted-foreground' />
                  <span>{baggage.destinationCode}</span>
                </div>
              </div>

              <div className='min-w-0'>
                <p className='text-[10px] font-medium uppercase tracking-[0.12em] text-muted-foreground'>
                  Destination
                </p>

                <div className='mt-1 flex items-center gap-1.5 text-xs font-medium'>
                  <MapPin className='size-3.5 text-muted-foreground' />
                  <span className='truncate'>{baggage.destination}</span>
                </div>
              </div>
            </div>

            <div className='flex items-center justify-between gap-4 sm:justify-end'>
              <div className='text-right'>
                <p className='text-[10px] font-medium uppercase tracking-[0.12em] text-muted-foreground'>
                  Weight
                </p>
                <p className='mt-1 text-sm font-semibold'>
                  {baggage.weightKg} kg
                </p>
              </div>

              <ArrowRight className='size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5' />
            </div>
          </div>
        </div>
      </div>
    </button>
  );
}
