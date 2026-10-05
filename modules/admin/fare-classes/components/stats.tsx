import {
  CalendarRange,
  CircleDollarSign,
  RefreshCcw,
  ShieldCheck,
  Tag,
  Ticket,
} from 'lucide-react';

import type { FareClassStats } from '../types/fare-class';

import { formatPhp } from '../data/fare-class';

interface FareClassStatsProps {
  stats: FareClassStats;
}

export function FareClassStats({ stats }: FareClassStatsProps) {
  const cards = [
    {
      label: 'Fare classes',
      value: stats.totalClasses.toLocaleString(),
      description: 'Configured fare families',
      icon: Tag,
    },
    {
      label: 'Fare records',
      value: stats.totalFlightFares.toLocaleString(),
      description: 'Flight-level prices',
      icon: Ticket,
    },
    {
      label: 'Refundable',
      value: stats.refundableClasses.toLocaleString(),
      description: 'Classes with refund rights',
      icon: ShieldCheck,
    },
    {
      label: 'Changeable',
      value: stats.changeableClasses.toLocaleString(),
      description: 'Classes allowing changes',
      icon: RefreshCcw,
    },
    {
      label: 'Average fare',
      value: formatPhp(stats.averageFare),
      description: 'Across published fares',
      icon: CircleDollarSign,
    },
    {
      label: 'Fare inventory',
      value: stats.totalSeatsAvailable.toLocaleString(),
      description: 'Seats available in fare records',
      icon: CalendarRange,
    },
  ];

  return (
    <section className='grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6'>
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.label}
            className='min-w-0 rounded-2xl border border-border/70 bg-background p-5 shadow-sm'
          >
            <div className='flex min-w-0 items-start justify-between gap-3'>
              <div className='min-w-0'>
                <p className='truncate text-xs font-medium text-muted-foreground'>
                  {card.label}
                </p>

                <p className='mt-2 truncate text-2xl font-semibold tracking-tight tabular-nums'>
                  {card.value}
                </p>
              </div>

              <div className='flex size-9 shrink-0 items-center justify-center rounded-xl bg-[#EEF7FB] text-[#102A43]'>
                <Icon className='size-4' />
              </div>
            </div>

            <p className='mt-3 text-xs leading-5 text-muted-foreground'>
              {card.description}
            </p>
          </div>
        );
      })}
    </section>
  );
}
