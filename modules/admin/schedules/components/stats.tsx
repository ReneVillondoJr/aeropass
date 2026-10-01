import {
  CalendarDays,
  CalendarRange,
  Clock3,
  Plane,
  Route,
  UsersRound,
} from 'lucide-react';

import type { ScheduleStats } from '../types/schedule';

interface ScheduleStatsProps {
  stats: ScheduleStats;
}

const statConfig = [
  {
    key: 'total',
    label: 'Total schedules',
    icon: CalendarDays,
  },
  {
    key: 'active',
    label: 'Active services',
    icon: Plane,
  },
  {
    key: 'daily',
    label: 'Daily',
    icon: Clock3,
  },
  {
    key: 'weekdays',
    label: 'Weekdays',
    icon: CalendarRange,
  },
  {
    key: 'routes',
    label: 'Routes',
    icon: Route,
  },
  {
    key: 'aircraft',
    label: 'Aircraft',
    icon: UsersRound,
  },
] as const;

export function ScheduleStats({ stats }: ScheduleStatsProps) {
  return (
    <div className='grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6'>
      {statConfig.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.key}
            className='rounded-2xl border border-border/70 bg-card p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md'
          >
            <div className='flex items-center justify-between gap-3'>
              <div className='flex size-8 items-center justify-center rounded-xl bg-muted'>
                <Icon className='size-3.5 text-muted-foreground' />
              </div>

              {item.key === 'active' ?
                <span className='size-2 rounded-full bg-emerald-500' />
              : null}
            </div>

            <p className='mt-4 text-[9px] font-semibold uppercase tracking-[0.14em] text-muted-foreground'>
              {item.label}
            </p>

            <p className='mt-1 text-2xl font-semibold tracking-tight'>
              {stats[item.key]}
            </p>
          </div>
        );
      })}
    </div>
  );
}
