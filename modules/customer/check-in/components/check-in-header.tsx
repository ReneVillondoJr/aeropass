import { CheckCircle2, PlaneTakeoff } from 'lucide-react';

import type { CustomerCheckInStats } from '../types/check-in';

interface CheckInHeaderProps {
  customerName: string;
  stats: CustomerCheckInStats;
}

export function CheckInHeader({ customerName, stats }: CheckInHeaderProps) {
  const firstName = customerName.trim().split(/\s+/)[0] || 'traveler';

  return (
    <section className="relative overflow-hidden rounded-[1.5rem] border border-border/70 bg-card shadow-sm">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_90%_10%,rgba(91,169,214,0.16),transparent_30%),radial-gradient(circle_at_8%_115%,rgba(16,42,67,0.06),transparent_30%)]" />
      <div className="relative flex flex-col gap-6 p-5 sm:p-7 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex min-w-0 items-start gap-4">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-[#102A43] text-white shadow-lg shadow-[#102A43]/15">
            <PlaneTakeoff className="size-5" aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#2879A8]">Passenger services</p>
              <span className="rounded-full bg-[#EEF7FB] px-2.5 py-1 text-[9px] font-semibold text-[#102A43]">Online check-in</span>
            </div>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">Check in for your flight</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
              Welcome back, {firstName}. Review passenger details, choose an available seat, and prepare for your journey.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-border/70 bg-background/75 px-3 py-2">
                <CheckCircle2 className="size-3.5 text-emerald-600" />
                Check-in opens 24 hours before departure
              </span>
              <span className="rounded-lg border border-border/70 bg-background/75 px-3 py-2">Closes 60 minutes before departure</span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 xl:w-[440px] xl:grid-cols-2">
          <Stat label="Tickets" value={stats.totalTickets} tone="default" />
          <Stat label="Eligible now" value={stats.available} tone="blue" />
          <Stat label="Checked in" value={stats.completed} tone="green" />
          <Stat label="Not available" value={stats.notAvailable} tone="default" />
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value, tone }: { label: string; value: number; tone: 'default' | 'blue' | 'green' }) {
  const valueClass = tone === 'blue' ? 'text-[#2879A8]' : tone === 'green' ? 'text-emerald-600' : 'text-foreground';
  return (
    <div className="rounded-xl border border-border/70 bg-background/75 px-4 py-3">
      <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">{label}</p>
      <p className={`mt-1 text-xl font-semibold tracking-tight ${valueClass}`}>{value}</p>
    </div>
  );
}
