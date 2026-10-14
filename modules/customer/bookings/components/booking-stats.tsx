import { AlertCircle, BookOpenCheck, PlaneTakeoff, XCircle, type LucideIcon } from 'lucide-react';

import type { BookingStatsSummary } from '../types/booking';

interface BookingStatsProps {
  stats: BookingStatsSummary;
}

const statDefinitions: Array<{
  key: keyof BookingStatsSummary;
  label: string;
  description: string;
  icon: LucideIcon;
  iconClassName: string;
}> = [
  { key: 'total', label: 'Total bookings', description: 'All reservations', icon: BookOpenCheck, iconClassName: 'bg-[#EEF7FB] text-[#2879A8]' },
  { key: 'upcoming', label: 'Upcoming trips', description: 'Confirmed future travel', icon: PlaneTakeoff, iconClassName: 'bg-emerald-50 text-emerald-700' },
  { key: 'needsAttention', label: 'Action needed', description: 'Payment or refund updates', icon: AlertCircle, iconClassName: 'bg-amber-50 text-amber-700' },
  { key: 'cancelled', label: 'Cancelled / refunds', description: 'Cancelled or refunding', icon: XCircle, iconClassName: 'bg-rose-50 text-rose-700' },
];

export function BookingStats({ stats }: BookingStatsProps) {
  return (
    <section aria-label="Booking summary" className="grid grid-cols-2 gap-3 xl:grid-cols-4">
      {statDefinitions.map((item) => {
        const Icon = item.icon;

        return (
          <article key={item.key} className="rounded-2xl border border-border/70 bg-card p-4 shadow-sm sm:p-5">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-xs font-medium text-muted-foreground">{item.label}</p>
                <p className="mt-2 text-2xl font-semibold tracking-tight text-foreground tabular-nums">{stats[item.key]}</p>
              </div>
              <span className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${item.iconClassName}`}>
                <Icon className="size-4.5" aria-hidden="true" />
              </span>
            </div>
            <p className="mt-3 text-[11px] leading-5 text-muted-foreground">{item.description}</p>
          </article>
        );
      })}
    </section>
  );
}
