import {
  AlertTriangle,
  ShieldCheck,
  UserCheck,
  UserRound,
  UsersRound,
} from 'lucide-react';

import type { UserStats } from '../types/user';

interface UsersStatsProps {
  stats: UserStats;
}

function StatCard({
  icon: Icon,
  label,
  value,
  helper,
  iconClassName = 'text-muted-foreground',
}: {
  icon: typeof UsersRound;
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

export function UsersStats({ stats }: UsersStatsProps) {
  const attention = stats.inactive + stats.suspended;

  return (
    <section className='grid gap-4 sm:grid-cols-2 xl:grid-cols-4'>
      <StatCard
        icon={UsersRound}
        label='Total users'
        value={stats.total}
        helper={`${stats.staff} staff • ${stats.customers} customers`}
      />

      <StatCard
        icon={UserCheck}
        label='Active'
        value={stats.active}
        helper='Accounts currently enabled'
        iconClassName='text-emerald-600'
      />

      <StatCard
        icon={ShieldCheck}
        label='Staff access'
        value={stats.staff}
        helper='Operational and administrative roles'
        iconClassName='text-[#102A43]'
      />

      <StatCard
        icon={AlertTriangle}
        label='Attention'
        value={attention}
        helper={`${stats.inactive} inactive • ${stats.suspended} suspended`}
        iconClassName={
          attention > 0 ? 'text-amber-600' : 'text-muted-foreground'
        }
      />
    </section>
  );
}
