import {
  AlertTriangle,
  Box,
  CheckCircle2,
  Clock3,
  Luggage,
  MoveRight,
  Scale,
} from 'lucide-react';

import type { BaggageStats } from '../types/baggage';

interface BaggageStatsProps {
  stats: BaggageStats;
}

function StatCard({
  icon: Icon,
  label,
  value,
  helper,
  iconClassName = 'text-muted-foreground',
}: {
  icon: typeof Luggage;
  label: string;
  value: string | number;
  helper: string;
  iconClassName?: string;
}) {
  return (
    <div className='rounded-[1.5rem] border border-border/70 bg-card p-5 shadow-sm'>
      <div className='flex items-start justify-between gap-4'>
        <div>
          <p className='text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground'>
            {label}
          </p>

          <p className='mt-2 text-2xl font-semibold tracking-tight'>{value}</p>

          <p className='mt-1 text-xs text-muted-foreground'>{helper}</p>
        </div>

        <div className='rounded-xl border border-border/70 bg-muted/40 p-2.5'>
          <Icon className={`size-4 ${iconClassName}`} />
        </div>
      </div>
    </div>
  );
}

export function BaggageStats({ stats }: BaggageStatsProps) {
  return (
    <section className='grid gap-4 sm:grid-cols-2 xl:grid-cols-4'>
      <StatCard
        icon={Luggage}
        label='Total baggage'
        value={stats.total}
        helper={`${stats.cabin} cabin • ${stats.checkedType} checked`}
      />

      <StatCard
        icon={Scale}
        label='Total weight'
        value={`${stats.totalWeightKg.toLocaleString('en-PH')} kg`}
        helper='Current baggage load'
      />

      <StatCard
        icon={CheckCircle2}
        label='Received'
        value={stats.received}
        helper={`${stats.checked} currently checked`}
        iconClassName='text-emerald-600'
      />

      <StatCard
        icon={AlertTriangle}
        label='Attention'
        value={stats.lost}
        helper={`${stats.pending} pending • ${stats.inTransit} in transit`}
        iconClassName={
          stats.lost > 0 ? 'text-amber-600' : 'text-muted-foreground'
        }
      />
    </section>
  );
}
