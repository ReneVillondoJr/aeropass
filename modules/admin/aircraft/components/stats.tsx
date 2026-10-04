import {
  Activity,
  Armchair,
  CalendarClock,
  Factory,
  Plane,
  Wrench,
} from 'lucide-react';

import type { AircraftStats } from '../types/aircraft';

interface AircraftStatsProps {
  stats: AircraftStats;
}

export function AircraftStats({ stats }: AircraftStatsProps) {
  const cards = [
    {
      label: 'Total aircraft',
      value: stats.total,
      description: 'Fleet records',
      icon: Plane,
    },
    {
      label: 'Active',
      value: stats.active,
      description: 'Ready for service',
      icon: Activity,
    },
    {
      label: 'Maintenance',
      value: stats.maintenance,
      description: 'Currently unavailable',
      icon: Wrench,
    },
    {
      label: 'Seat capacity',
      value: stats.totalSeats,
      description: 'Configured fleet capacity',
      icon: Armchair,
    },
    {
      label: 'Schedules',
      value: stats.schedules,
      description: 'Active assignments',
      icon: CalendarClock,
    },
    {
      label: 'Manufacturers',
      value: stats.manufacturers,
      description: 'Fleet manufacturers',
      icon: Factory,
    },
  ];

  return (
    <section className='grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6'>
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.label}
            className='rounded-2xl border border-border/70 bg-background p-5 shadow-sm'
          >
            <div className='flex items-start justify-between gap-3'>
              <div className='min-w-0'>
                <p className='text-xs font-medium text-muted-foreground'>
                  {card.label}
                </p>

                <p className='mt-2 text-2xl font-semibold tracking-tight tabular-nums'>
                  {card.value.toLocaleString()}
                </p>
              </div>

              <div className='flex size-9 shrink-0 items-center justify-center rounded-xl bg-[#EEF7FB] text-[#102A43]'>
                <Icon className='size-4' />
              </div>
            </div>

            <p className='mt-3 text-xs text-muted-foreground'>
              {card.description}
            </p>
          </div>
        );
      })}
    </section>
  );
}
