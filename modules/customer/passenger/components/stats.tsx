import {
  Accessibility,
  Armchair,
  CheckCircle2,
  Ticket,
  UsersRound,
} from 'lucide-react';

import type { CustomerPassengerStats } from '../types/passenger';

interface PassengerStatsProps {
  stats: CustomerPassengerStats;
}

export function PassengerStats({ stats }: PassengerStatsProps) {
  const items = [
    {
      label: 'Passenger records',
      value: stats.total,
      icon: UsersRound,
      tone: 'bg-[#EEF7FB] text-[#2879A8]',
    },
    {
      label: 'Linked bookings',
      value: stats.linkedBookings,
      icon: Armchair,
      tone: 'bg-slate-100 text-slate-700',
    },
    {
      label: 'With tickets',
      value: stats.ticketed,
      icon: Ticket,
      tone: 'bg-violet-50 text-violet-700',
    },
    {
      label: 'Checked in',
      value: stats.checkedIn,
      icon: CheckCircle2,
      tone: 'bg-emerald-50 text-emerald-700',
    },
    {
      label: 'Special assistance',
      value: stats.specialAssistance,
      icon: Accessibility,
      tone: 'bg-amber-50 text-amber-700',
    },
  ];

  return (
    <section
      aria-label='Passenger statistics'
      className='grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-5'
    >
      {items.map((item) => {
        const Icon = item.icon;

        return (
          <article
            key={item.label}
            className='rounded-2xl border border-border/70 bg-card p-4 shadow-sm transition-shadow hover:shadow-md'
          >
            <div className='flex items-start justify-between gap-2'>
              <div className='min-w-0'>
                <p className='text-[11px] font-medium text-muted-foreground'>
                  {item.label}
                </p>

                <p className='mt-3 text-2xl font-semibold tracking-tight text-foreground'>
                  {item.value.toLocaleString('en-PH')}
                </p>
              </div>

              <span
                className={`flex size-9 shrink-0 items-center justify-center rounded-xl ${item.tone}`}
              >
                <Icon className='size-4' aria-hidden='true' />
              </span>
            </div>
          </article>
        );
      })}
    </section>
  );
}
