import {
  CheckCircle2,
  CircleAlert,
  Clock3,
  Plane,
  Route as RouteIcon,
  Ruler,
} from 'lucide-react';

import type { RouteStatsData } from '../types/route';

interface RouteStatsProps {
  stats: RouteStatsData;
}

export function RouteStats({ stats }: RouteStatsProps) {
  const items = [
    {
      label: 'Total routes',
      value: stats.total,
      icon: RouteIcon,
      description: 'Configured airport routes',
    },
    {
      label: 'Active',
      value: stats.active,
      icon: CheckCircle2,
      description: 'Operational routes',
    },
    {
      label: 'Inactive',
      value: stats.inactive,
      icon: CircleAlert,
      description: 'Currently unavailable',
    },
    {
      label: 'Schedules',
      value: stats.schedules,
      icon: Clock3,
      description: 'Published flight schedules',
    },
    {
      label: 'Flights',
      value: stats.flights,
      icon: Plane,
      description: 'Flight records using routes',
    },
    {
      label: 'Network distance',
      value: `${stats.totalDistanceKm.toLocaleString()} km`,
      icon: Ruler,
      description: 'Combined route distance',
    },
  ];

  return (
    <section
      aria-label='Airline route statistics'
      className='grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6'
    >
      {items.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.label}
            className='rounded-xl border border-border bg-card p-4'
          >
            <div className='flex items-start justify-between gap-3'>
              <div className='min-w-0'>
                <p className='text-sm text-muted-foreground'>{item.label}</p>

                <p className='mt-2 text-2xl font-semibold tracking-tight'>
                  {item.value}
                </p>
              </div>

              <div className='flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted/50'>
                <Icon className='size-4 text-muted-foreground' />
              </div>
            </div>

            <p className='mt-2 text-xs text-muted-foreground'>
              {item.description}
            </p>
          </div>
        );
      })}
    </section>
  );
}
