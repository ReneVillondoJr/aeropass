import {
  BadgeCheck,
  Ban,
  CheckCircle2,
  QrCode,
  TicketCheck,
  TicketX,
} from 'lucide-react';

import type { TicketStats } from '../types/ticket';

interface TicketStatsProps {
  stats: TicketStats;
}

const cardClass =
  'rounded-[1.4rem] border border-border/70 bg-card p-4 shadow-sm';

export function TicketStats({ stats }: TicketStatsProps) {
  const items = [
    {
      label: 'Total tickets',
      value: stats.total,
      description: 'Issued ticket records',
      icon: TicketCheck,
    },
    {
      label: 'Valid',
      value: stats.valid,
      description: 'Active travel credentials',
      icon: BadgeCheck,
    },
    {
      label: 'Used',
      value: stats.used,
      description: 'Tickets already used',
      icon: CheckCircle2,
    },
    {
      label: 'Pending',
      value: stats.pending,
      description: 'Awaiting ticket completion',
      icon: QrCode,
    },
    {
      label: 'Cancelled',
      value: stats.cancelled,
      description: 'Cancelled credentials',
      icon: Ban,
    },
    {
      label: 'Refunded',
      value: stats.refunded,
      description: 'Refunded credentials',
      icon: TicketX,
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
