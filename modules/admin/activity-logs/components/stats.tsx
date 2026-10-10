import { Activity, Boxes, Fingerprint, UsersRound } from 'lucide-react';

import type { LucideIcon } from 'lucide-react';

import type { ActivityLogStats } from '../types/activity-log';

interface ActivityLogsStatsProps {
  stats: ActivityLogStats;
}

function StatCard({
  icon: Icon,
  label,
  value,
  helper,
  iconClassName = 'text-muted-foreground',
}: {
  icon: LucideIcon;
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

export function ActivityLogsStats({ stats }: ActivityLogsStatsProps) {
  return (
    <section className='grid gap-4 sm:grid-cols-2 xl:grid-cols-4'>
      <StatCard
        icon={Activity}
        label='Total events'
        value={stats.total}
        helper='All recorded activity entries'
        iconClassName='text-[#102A43]'
      />

      <StatCard
        icon={UsersRound}
        label='Unique actors'
        value={stats.uniqueActors}
        helper='Distinct accounts in the logs'
      />

      <StatCard
        icon={Boxes}
        label='Entity types'
        value={stats.entityTypes}
        helper='Different record categories'
      />

      <StatCard
        icon={Fingerprint}
        label='Action types'
        value={stats.actionTypes}
        helper='Distinct recorded actions'
      />
    </section>
  );
}
