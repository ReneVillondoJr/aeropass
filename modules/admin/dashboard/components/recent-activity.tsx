import { Activity, ArrowUpRight } from 'lucide-react';

import { actionLabels } from '../data/dashboard';

import type { DashboardActivity } from '../types/dashboard';

interface RecentActivityProps {
  activities: DashboardActivity[];
}

function formatRelativeDate(value: string) {
  const date = new Date(value);

  return new Intl.DateTimeFormat('en-PH', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(date);
}

export function RecentActivity({ activities }: RecentActivityProps) {
  return (
    <section className='overflow-hidden rounded-2xl border border-border/70 bg-card shadow-sm'>
      {/* Header */}
      <div className='flex items-center justify-between gap-4 border-b border-border/70 px-5 py-4'>
        <div>
          <h2 className='text-sm font-semibold'>Recent activity</h2>

          <p className='mt-1 text-xs text-muted-foreground'>
            Latest actions across AeroPass operations.
          </p>
        </div>

        <Activity className='size-4 text-muted-foreground' />
      </div>

      {/* Scrollable activity list */}
      <div className='h-[360px] overflow-y-auto overscroll-contain scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent'>
        <div className='divide-y divide-border/70'>
          {activities.length > 0 ?
            activities.map((activity) => (
              <div
                key={activity.id}
                className='flex gap-3 px-5 py-4 transition-colors hover:bg-muted/30'
              >
                {/* Activity icon */}
                <div className='mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground'>
                  <ArrowUpRight className='size-3.5' />
                </div>

                {/* Activity content */}
                <div className='min-w-0 flex-1'>
                  <div className='flex flex-wrap items-center gap-x-2 gap-y-1'>
                    <p className='text-sm font-medium'>
                      {actionLabels[activity.action] ?? activity.action}
                    </p>

                    <span className='rounded-md bg-muted/70 px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground'>
                      {activity.entity}
                    </span>
                  </div>

                  <p className='mt-1 text-xs leading-5 text-muted-foreground'>
                    {activity.description}
                  </p>

                  <div className='mt-1.5 flex flex-wrap items-center gap-2 text-[10px] text-muted-foreground/80'>
                    <span className='truncate'>{activity.userName}</span>

                    <span aria-hidden='true'>•</span>

                    <span>{formatRelativeDate(activity.createdAt)}</span>
                  </div>
                </div>
              </div>
            ))
          : <div className='px-5 py-12 text-center'>
              <Activity className='mx-auto size-5 text-muted-foreground/60' />

              <p className='mt-3 text-sm font-medium'>No recent activity</p>

              <p className='mt-1 text-xs text-muted-foreground'>
                Activity will appear here as operations occur.
              </p>
            </div>
          }
        </div>
      </div>

      {/* Footer */}
      {activities.length > 5 ?
        <div className='border-t border-border/70 bg-muted/20 px-5 py-2.5'>
          <p className='text-center text-[10px] font-medium text-muted-foreground'>
            Scroll to view more activity
          </p>
        </div>
      : null}
    </section>
  );
}
