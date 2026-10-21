import { BellRing, ShieldCheck } from 'lucide-react';

import type { NotificationStats } from '../types/notification';

interface NotificationHeaderProps {
  stats: NotificationStats;
}

export function NotificationHeader({ stats }: NotificationHeaderProps) {
  return (
    <section className='relative overflow-hidden rounded-[1.5rem] border border-border/70 bg-card shadow-sm'>
      <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_90%_10%,rgba(91,169,214,0.15),transparent_30%),radial-gradient(circle_at_10%_110%,rgba(16,42,67,0.06),transparent_30%)]' />

      <div className='relative p-5 sm:p-7'>
        <div className='flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between'>
          <div className='flex items-start gap-4'>
            <div className='flex size-12 shrink-0 items-center justify-center rounded-2xl bg-[#102A43] text-white shadow-lg shadow-[#102A43]/15'>
              <BellRing className='size-5' />
            </div>

            <div className='min-w-0'>
              <p className='text-[10px] font-semibold uppercase tracking-[0.18em] text-[#5BA9D6]'>
                Your account
              </p>

              <h1 className='mt-1 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl'>
                Notifications
              </h1>

              <p className='mt-2 max-w-xl text-sm leading-6 text-muted-foreground'>
                Stay informed about your bookings, payments, flight updates,
                check-in, and boarding information.
              </p>

              <div className='mt-4 inline-flex items-center gap-2 rounded-xl bg-[#EEF7FB] px-3 py-2 text-[#102A43]'>
                <ShieldCheck className='size-4' />

                <span className='text-xs font-medium'>
                  Personal account updates
                </span>
              </div>
            </div>
          </div>

          <div className='grid grid-cols-2 gap-3 sm:grid-cols-4 xl:min-w-[400px]'>
            <Stat label='All' value={stats.total} />
            <Stat label='Unread' value={stats.unread} highlight />
            <Stat label='Read' value={stats.read} />
            <Stat label='Today' value={stats.today} />
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: number;
  highlight?: boolean;
}) {
  return (
    <div className='rounded-xl border border-border/70 bg-background/75 px-3 py-3'>
      <p className='text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground'>
        {label}
      </p>

      <p
        className={[
          'mt-1 text-xl font-semibold tracking-tight',
          highlight ? 'text-[#2879A8]' : 'text-foreground',
        ].join(' ')}
      >
        {value}
      </p>
    </div>
  );
}
