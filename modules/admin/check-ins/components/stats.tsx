import {
  CheckCircle2,
  CircleUserRound,
  Monitor,
  Smartphone,
  UserRoundCheck,
  XCircle,
} from 'lucide-react';

import type { CheckInStats } from '../types/check-in';

interface CheckInStatsProps {
  stats: CheckInStats;
}

const cardClass =
  'rounded-[1.4rem] border border-border/70 bg-card p-4 shadow-sm';

export function CheckInStats({ stats }: CheckInStatsProps) {
  const items = [
    {
      label: 'Total check-ins',
      value: stats.total,
      description: 'Check-in records',
      icon: CircleUserRound,
    },
    {
      label: 'Completed',
      value: stats.completed,
      description: 'Successfully checked in',
      icon: CheckCircle2,
    },
    {
      label: 'Cancelled',
      value: stats.cancelled,
      description: 'Cancelled check-ins',
      icon: XCircle,
    },
    {
      label: 'Web',
      value: stats.web,
      description: 'Online check-ins',
      icon: Monitor,
    },
    {
      label: 'Mobile',
      value: stats.mobile,
      description: 'Mobile check-ins',
      icon: Smartphone,
    },
    {
      label: 'Counter',
      value: stats.counter,
      description: 'Airport counter check-ins',
      icon: UserRoundCheck,
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
