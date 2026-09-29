import { Plane, Route, Ticket, Users } from 'lucide-react';

import type { DashboardData } from '../types/dashboard';

interface FleetOverviewProps {
  stats: DashboardData['stats'];
}

export function FleetOverview({ stats }: FleetOverviewProps) {
  const items = [
    {
      label: 'Aircraft',
      value: stats.totalAircraft,
      description: `${stats.activeAircraft} active`,
      icon: Plane,
    },
    {
      label: 'Passengers',
      value: stats.totalPassengers,
      description: 'Total passengers',
      icon: Users,
    },
    {
      label: 'Tickets',
      value: stats.totalTickets,
      description: `${stats.validTickets} valid`,
      icon: Ticket,
    },
    {
      label: 'Routes',
      value: stats.totalRoutes,
      description: `${stats.totalAirports} airports`,
      icon: Route,
    },
  ] as const;

  return (
    <section className='rounded-2xl border border-border/70 bg-card p-5 shadow-sm'>
      <div className='mb-5'>
        <p className='text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground'>
          Network
        </p>

        <h2 className='mt-1 text-lg font-semibold'>Fleet & network</h2>
      </div>

      <div className='grid grid-cols-2 gap-3'>
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.label}
              className='rounded-xl border border-border/70 bg-muted/20 p-3.5'
            >
              <div className='flex size-8 items-center justify-center rounded-lg bg-background text-muted-foreground'>
                <Icon className='size-4' />
              </div>

              <p className='mt-3 text-xl font-semibold'>{item.value}</p>

              <p className='text-xs font-medium'>{item.label}</p>

              <p className='mt-0.5 text-[10px] text-muted-foreground'>
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
