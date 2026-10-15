import { CheckCircle2, Clock3, History, Ticket, XCircle } from 'lucide-react';

import type { CustomerTicketStats } from '../types/ticket';

interface TicketStatsProps {
  stats: CustomerTicketStats;
}

export function TicketStats({ stats }: TicketStatsProps) {
  const items = [
    { label: 'Total tickets', value: stats.total, icon: Ticket, tone: 'text-[#2879A8]', iconBg: 'bg-[#E5F5FC]' },
    { label: 'Currently valid', value: stats.valid, icon: CheckCircle2, tone: 'text-emerald-700', iconBg: 'bg-emerald-50' },
    { label: 'Used tickets', value: stats.used, icon: History, tone: 'text-slate-700', iconBg: 'bg-slate-100' },
    { label: 'Expired / cancelled', value: stats.expired + stats.cancelled, icon: Clock3, tone: 'text-amber-700', iconBg: 'bg-amber-50' },
  ];

  return (
    <section aria-label="Ticket summary" className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <article key={item.label} className="rounded-2xl border border-border/70 bg-card p-4 shadow-sm sm:p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-medium text-muted-foreground">{item.label}</p>
                <p className="mt-2 text-2xl font-semibold tracking-tight tabular-nums text-foreground">{item.value}</p>
              </div>
              <span className={`flex size-10 items-center justify-center rounded-xl ${item.iconBg} ${item.tone}`}>
                <Icon className="size-4.5" aria-hidden="true" />
              </span>
            </div>
          </article>
        );
      })}
    </section>
  );
}
