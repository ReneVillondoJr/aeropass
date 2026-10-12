import { Bell, CalendarCheck, Plane, Ticket } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import type { DashboardStat, DashboardStatIcon } from '../types/customer-dashboard';

const statIcons: Record<DashboardStatIcon, LucideIcon> = {
  bookings: CalendarCheck,
  flights: Plane,
  tickets: Ticket,
  notifications: Bell,
};

const iconStyles: Record<DashboardStatIcon, string> = {
  bookings: 'bg-[#EEF7FB] text-[#102A43]',
  flights: 'bg-sky-50 text-sky-700',
  tickets: 'bg-violet-50 text-violet-700',
  notifications: 'bg-amber-50 text-amber-700',
};

interface DashboardStatsProps {
  stats: DashboardStat[];
}

export function DashboardStats({ stats }: DashboardStatsProps) {
  return (
    <section aria-label="Your account summary" className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = statIcons[stat.icon];

        return (
          <article
            key={stat.id}
            className="min-w-0 rounded-2xl border border-border/70 bg-card p-4 shadow-sm sm:p-5"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-xs font-medium text-muted-foreground sm:text-sm">{stat.label}</p>
                <p className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                  {stat.value.toLocaleString('en-PH')}
                </p>
              </div>
              <span className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${iconStyles[stat.icon]}`}>
                <Icon className="size-[18px]" aria-hidden="true" />
              </span>
            </div>
            <p className="mt-2 text-[10px] leading-4 text-muted-foreground sm:text-xs">{stat.description}</p>
          </article>
        );
      })}
    </section>
  );
}
