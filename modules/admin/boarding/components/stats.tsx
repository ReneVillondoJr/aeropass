import {
  CheckCircle2,
  CircleSlash2,
  Plane,
  ScanLine,
  ShieldAlert,
  Users,
} from 'lucide-react';

import type { BoardingStats } from '../types/boarding';

interface BoardingStatsProps {
  stats: BoardingStats;
}

const cardClass =
  'rounded-[1.4rem] border border-border/70 bg-card p-4 shadow-sm';

export function BoardingStats({ stats }: BoardingStatsProps) {
  const items = [
    {
      label: 'Total records',
      value: stats.total,
      description: 'Boarding records',
      icon: Users,
    },
    {
      label: 'Boarded',
      value: stats.boarded,
      description: 'Passengers boarded',
      icon: CheckCircle2,
    },
    {
      label: 'Not boarded',
      value: stats.notBoarded,
      description: 'Awaiting boarding',
      icon: CircleSlash2,
    },
    {
      label: 'Denied',
      value: stats.denied,
      description: 'Boarding denied',
      icon: ShieldAlert,
    },
    {
      label: 'Checked in',
      value: stats.checkedIn,
      description: 'Ready for boarding',
      icon: ScanLine,
    },
    {
      label: 'Flights',
      value: stats.flightCount,
      description: 'Flights represented',
      icon: Plane,
    },
  ];

  return (
    <section className='grid gap-3 sm:grid-cols-2 xl:grid-cols-3'>
      {items.map((item) => {
        const Icon = item.icon;

        return (
          <div key={item.label} className={cardClass}>
            <div className='flex items-start justify-between gap-4'>
              <div className='min-w-0'>
                <p className='text-xs font-medium text-muted-foreground'>
                  {item.label}
                </p>

                <p className='mt-2 text-2xl font-semibold tracking-tight text-foreground'>
                  {item.value}
                </p>

                <p className='mt-1 text-[10px] text-muted-foreground'>
                  {item.description}
                </p>
              </div>

              <div className='flex size-9 shrink-0 items-center justify-center rounded-xl bg-[#E5F5FC] text-[#5BA9D6]'>
                <Icon className='size-4' />
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}
