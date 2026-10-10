import { BellRing, CheckCheck, Inbox, Settings2 } from 'lucide-react';

import type { LucideIcon } from 'lucide-react';

import type { NotificationStats } from '../types/notification';

interface NotificationsStatsProps {
  stats: NotificationStats;
}

function StatCard({
  icon: Icon,
  label,
  value,
  helper,
  iconClassName = 'text-muted-foreground',
}: {
  icon: LucideIcon;
  label: string;
  value: string | number;
  helper: string;
  iconClassName?: string;
}) {
  return (
    <div className='rounded-[1.5rem] border border-border/70 bg-card p-5 shadow-sm'>
      <div className='flex items-start justify-between gap-4'>
        <div>
          <p className='text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground'>
            {label}
          </p>

          <p className='mt-2 text-2xl font-semibold tracking-tight'>{value}</p>

          <p className='mt-1 text-xs text-muted-foreground'>{helper}</p>
        </div>

        <div className='rounded-xl border border-border/70 bg-muted/40 p-2.5'>
          <Icon className={`size-4 ${iconClassName}`} />
        </div>
      </div>
    </div>
  );
}

export function NotificationsStats({ stats }: NotificationsStatsProps) {
  return (
    <section className='grid gap-4 sm:grid-cols-2 xl:grid-cols-4'>
      <StatCard
        icon={Inbox}
        label='Total'
        value={stats.total}
        helper='Recorded notification entries'
      />

      <StatCard
        icon={BellRing}
        label='Unread'
        value={stats.unread}
        helper='Awaiting acknowledgement'
        iconClassName='text-amber-600'
      />

      <StatCard
        icon={CheckCheck}
        label='Read'
        value={stats.read}
        helper='Already marked as read'
        iconClassName='text-emerald-600'
      />

      <StatCard
        icon={Settings2}
        label='System alerts'
        value={stats.system}
        helper='System-related notifications'
      />
    </section>
  );
}
