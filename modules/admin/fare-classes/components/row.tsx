import {
  ArrowRightLeft,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  Luggage,
  RefreshCcw,
} from 'lucide-react';

import { cabinClassMeta, flexibilityMeta, formatPhp } from '../data/fare-class';

import type { FareClassViewModel } from '../types/fare-class';

interface FareClassRowProps {
  item: FareClassViewModel;

  selected: boolean;

  onSelect: (fareClassId: string) => void;
}

export function FareClassRow({ item, selected, onSelect }: FareClassRowProps) {
  const fare = item.fareClass;

  const cabin = cabinClassMeta[fare.cabinClass];

  return (
    <button
      type='button'
      onClick={() => onSelect(fare.id)}
      className={[
        'w-full min-w-0 rounded-2xl border p-5 text-left transition-all',
        'focus:outline-none focus:ring-2 focus:ring-[#5BA9D6]/30',
        selected ?
          'border-[#5BA9D6]/60 bg-[#EEF7FB] shadow-sm'
        : 'border-border/70 bg-background hover:border-border hover:bg-muted/20',
      ].join(' ')}
    >
      <div className='flex min-w-0 flex-col gap-5'>
        {/* Header */}
        <div className='flex min-w-0 items-start justify-between gap-4'>
          <div className='flex min-w-0 items-start gap-3'>
            <div className='flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#102A43] text-white'>
              <CircleDollarSign className='size-5' />
            </div>

            <div className='min-w-0'>
              <div className='flex min-w-0 flex-wrap items-center gap-2'>
                <h3 className='truncate text-base font-semibold tracking-tight'>
                  {fare.name}
                </h3>

                <span
                  className={[
                    'shrink-0 rounded-full px-2.5 py-1 text-[10px] font-semibold',
                    cabin.badgeClassName,
                  ].join(' ')}
                >
                  {fare.code}
                </span>
              </div>

              <p className='mt-1 break-words text-xs text-muted-foreground'>
                {fare.cabinClass.replace('_', ' ')}
              </p>
            </div>
          </div>

          <ChevronRight
            className={[
              'mt-1 size-4 shrink-0',
              selected ? 'text-[#102A43]' : 'text-muted-foreground',
            ].join(' ')}
          />
        </div>

        {/* Description */}
        <p className='text-sm leading-6 text-muted-foreground'>
          {fare.description}
        </p>

        {/* Metrics */}
        <div className='grid gap-3 sm:grid-cols-2 xl:grid-cols-4'>
          <Metric
            icon={<CircleDollarSign className='size-3.5' />}
            label='Average'
            value={formatPhp(item.averagePrice)}
          />

          <Metric
            icon={<Luggage className='size-3.5' />}
            label='Baggage'
            value={`${fare.baggageAllowanceKg} kg`}
          />

          <Metric
            icon={<ArrowRightLeft className='size-3.5' />}
            label='Change fee'
            value={formatPhp(fare.changeFee)}
          />

          <Metric
            icon={<CheckCircle2 className='size-3.5' />}
            label='Flight fares'
            value={item.totalFlightFares}
          />
        </div>

        {/* Rules */}
        <div className='flex min-w-0 flex-col gap-3 border-t border-border/60 pt-4'>
          <div className='flex min-w-0 flex-wrap gap-2'>
            <RuleBadge
              icon={<RefreshCcw className='size-3' />}
              label={flexibilityMeta.refundable.label}
              active={fare.refundable}
            />

            <RuleBadge
              icon={<ArrowRightLeft className='size-3' />}
              label={flexibilityMeta.changeable.label}
              active={fare.changeable}
            />
          </div>

          <div className='flex min-w-0 items-center justify-between gap-3'>
            <span className='text-xs text-muted-foreground'>
              Published range
            </span>

            <span className='shrink-0 text-sm font-semibold tabular-nums'>
              {formatPhp(item.minimumPrice)} – {formatPhp(item.maximumPrice)}
            </span>
          </div>
        </div>
      </div>
    </button>
  );
}

function Metric({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}) {
  return (
    <div className='min-w-0 rounded-xl border border-border/60 bg-background/70 p-3'>
      <div className='flex min-w-0 items-center gap-1.5 text-muted-foreground'>
        {icon}

        <span className='truncate text-[10px] font-medium uppercase tracking-[0.06em]'>
          {label}
        </span>
      </div>

      <p className='mt-1.5 truncate text-sm font-semibold tabular-nums'>
        {value}
      </p>
    </div>
  );
}

function RuleBadge({
  icon,
  label,
  active,
}: {
  icon: React.ReactNode;
  label: string;
  active: boolean;
}) {
  return (
    <span
      className={[
        'inline-flex w-fit items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[10px] font-semibold',
        active ?
          flexibilityMeta.changeable.activeClassName
        : flexibilityMeta.changeable.inactiveClassName,
      ].join(' ')}
    >
      {icon}

      {active ? label : `No ${label.toLowerCase()}`}
    </span>
  );
}
