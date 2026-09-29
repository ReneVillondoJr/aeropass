import { dashboardKpiMeta } from '../data/dashboard';

import type { DashboardData } from '../types/dashboard';

interface DashboardKpiGridProps {
  stats: DashboardData['stats'];
}

export function DashboardKpiGrid({ stats }: DashboardKpiGridProps) {
  const values = {
    'todays-flights': stats.todaysFlights,
    'active-flights': stats.activeFlights,
    bookings: stats.totalBookings,
    'pending-payments': stats.pendingPayments,
    'checked-in': stats.checkedInPassengers,
    aircraft: stats.activeAircraft,
  } as const;

  return (
    <section className='grid gap-3 sm:grid-cols-2 xl:grid-cols-6'>
      {dashboardKpiMeta.map((item) => {
        const Icon = item.icon;

        return (
          <article
            key={item.id}
            className='group rounded-2xl border border-border/70 bg-card p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md'
          >
            <div className='flex items-start justify-between gap-3'>
              <div className='flex size-9 items-center justify-center rounded-xl bg-muted text-muted-foreground transition-colors group-hover:bg-primary/10 group-hover:text-primary'>
                <Icon className='size-4' />
              </div>
            </div>

            <p className='mt-4 text-2xl font-semibold tracking-tight'>
              {values[item.id as keyof typeof values]}
            </p>

            <p className='mt-1 text-sm font-medium'>{item.label}</p>

            <p className='mt-1 text-xs leading-5 text-muted-foreground'>
              {item.description}
            </p>
          </article>
        );
      })}
    </section>
  );
}
