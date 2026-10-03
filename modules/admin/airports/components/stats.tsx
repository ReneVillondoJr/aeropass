import {
  CalendarDays,
  Globe2,
  Map,
  Plane,
  RadioTower,
  Route,
} from 'lucide-react';

import type { AirportStats } from '../types/airports';

interface AirportStatsProps {
  stats: AirportStats;
}

const statConfig = [
  {
    key: 'total',
    label: 'Airports',
    icon: Globe2,
  },
  {
    key: 'routes',
    label: 'Active routes',
    icon: Route,
  },
  {
    key: 'schedules',
    label: 'Schedules',
    icon: CalendarDays,
  },
  {
    key: 'flightInstances',
    label: 'Flight instances',
    icon: Plane,
  },
  {
    key: 'terminals',
    label: 'Terminal groups',
    icon: RadioTower,
  },
  {
    key: 'countries',
    label: 'Countries',
    icon: Map,
  },
] as const;

export function AirportStats({ stats }: AirportStatsProps) {
  return (
    <div className='grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6'>
      {statConfig.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.key}
            className='rounded-2xl border border-border/70 bg-card p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md'
          >
            <div className='flex items-center justify-between'>
              <div className='flex size-8 items-center justify-center rounded-xl bg-muted'>
                <Icon className='size-3.5 text-muted-foreground' />
              </div>

              {item.key === 'routes' ?
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
