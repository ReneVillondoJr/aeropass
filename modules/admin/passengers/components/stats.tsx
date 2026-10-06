import { Accessibility, BadgeCheck, Contact, Mars, Venus } from 'lucide-react';

import type { PassengerStats } from '../types/passenger';

interface PassengerStatsProps {
  stats: PassengerStats;
}

const cardClass =
  'rounded-[1.4rem] border border-border/70 bg-card p-4 shadow-sm';

export function PassengerStats({ stats }: PassengerStatsProps) {
  const items = [
    {
      label: 'Total passengers',
      value: stats.total,
      description: 'Passenger records',
      icon: Contact,
    },
    {
      label: 'Male',
      value: stats.male,
      description: 'Registered travelers',
      icon: Mars,
    },
    {
      label: 'Female',
      value: stats.female,
      description: 'Registered travelers',
      icon: Venus,
    },
    {
      label: 'Assistance',
      value: stats.specialAssistance,
      description: 'Require special support',
      icon: Accessibility,
    },
    {
      label: 'Frequent flyers',
      value: stats.frequentFlyers,
      description: 'With loyalty number',
      icon: BadgeCheck,
    },
    {
      label: 'Documents complete',
      value: stats.passportComplete,
      description: 'Passport data available',
      icon: BadgeCheck,
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
