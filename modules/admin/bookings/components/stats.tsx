import {
  BadgeCheck,
  CircleDollarSign,
  Clock3,
  RefreshCcw,
  Ticket,
  Users,
} from 'lucide-react';

import type { BookingStats } from '../types/booking';

import { formatPhp } from '../data/booking';

interface BookingStatsProps {
  stats: BookingStats;
}

export function BookingStats({ stats }: BookingStatsProps) {
  const cards = [
    {
      label: 'Total bookings',
      value: stats.totalBookings.toLocaleString(),
      description: 'Reservation records',
      icon: Ticket,
    },
    {
      label: 'Travel ready',
      value: stats.confirmedBookings.toLocaleString(),
      description: 'Confirmed or checked in',
      icon: BadgeCheck,
    },
    {
      label: 'Pending payment',
      value: stats.pendingPayment.toLocaleString(),
      description: 'Awaiting payment completion',
      icon: Clock3,
    },
    {
      label: 'Checked in',
      value: stats.checkedInBookings.toLocaleString(),
      description: 'Passengers checked in',
      icon: Users,
    },
    {
      label: 'Cancelled',
      value: stats.cancelledBookings.toLocaleString(),
      description: 'Cancelled reservations',
      icon: RefreshCcw,
    },
    {
      label: 'Booking value',
      value: formatPhp(stats.totalValue),
      description: 'Total recorded booking value',
      icon: CircleDollarSign,
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
