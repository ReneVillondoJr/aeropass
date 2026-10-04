import {
  Armchair,
  CheckCircle2,
  LayoutGrid,
  Plane,
  ShieldAlert,
  Wrench,
} from 'lucide-react';

import type { SeatMapStats } from '../types/seat-map';

interface SeatMapStatsProps {
  stats: SeatMapStats;
}

export function SeatMapStats({ stats }: SeatMapStatsProps) {
  const cards = [
    {
      label: 'Aircraft maps',
      value: stats.aircraftCount,
      description: 'Configured fleet layouts',
      icon: Plane,
    },
    {
      label: 'Total seats',
      value: stats.totalSeats,
      description: 'Configured seat capacity',
      icon: LayoutGrid,
    },
    {
      label: 'Available',
      value: stats.availableSeats,
      description: 'Assignable seat positions',
      icon: CheckCircle2,
    },
    {
      label: 'Blocked',
      value: stats.blockedSeats,
      description: 'Unavailable positions',
      icon: ShieldAlert,
    },
    {
      label: 'Maintenance',
      value: stats.maintenanceSeats,
      description: 'Maintenance positions',
      icon: Wrench,
    },
    {
      label: 'Business',
      value: stats.businessSeats,
      description: 'Business cabin seats',
      icon: Armchair,
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
