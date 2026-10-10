import { Activity } from 'lucide-react';

import type { ActivityLogViewModel } from '../types/activity-log';

import { ActivityLogRow } from './row';

interface ActivityLogsListProps {
  activityLogs: ActivityLogViewModel[];
  selectedId: string | null;
  onSelect: (activity: ActivityLogViewModel) => void;
}

export function ActivityLogsList({
  activityLogs,
  selectedId,
  onSelect,
}: ActivityLogsListProps) {
  return (
    <section className='min-w-0 rounded-[1.5rem] border border-border/70 bg-card p-4 shadow-sm sm:p-5'>
      <div className='mb-4 flex items-center justify-between gap-4'>
        <div>
          <h2 className='text-sm font-semibold tracking-tight'>Audit trail</h2>

          <p className='mt-1 text-xs text-muted-foreground'>
            Recorded actions across AeroPass accounts and operations.
          </p>
        </div>

        <div className='flex size-9 shrink-0 items-center justify-center rounded-xl bg-muted/50'>
          <Activity className='size-4 text-muted-foreground' />
        </div>
      </div>

      {activityLogs.length > 0 ?
        <div className='max-h-[640px] overflow-y-auto overscroll-contain pr-1'>
          <div className='grid min-w-0 gap-3'>
            {activityLogs.map((activity) => (
              <ActivityLogRow
                key={activity.id}
                activity={activity}
                selected={activity.id === selectedId}
                onClick={() => onSelect(activity)}
              />
            ))}
          </div>
        </div>
      : <div className='flex min-h-64 flex-col items-center justify-center rounded-2xl border border-dashed border-border/70 bg-muted/20 px-6 text-center'>
          <div className='flex size-11 items-center justify-center rounded-xl bg-background'>
            <Activity className='size-5 text-muted-foreground' />
          </div>

          <h3 className='mt-4 text-sm font-semibold'>
            No activity records found
          </h3>

          <p className='mt-1 max-w-sm text-xs leading-5 text-muted-foreground'>
            Try changing your search or removing one of the active action or
            entity filters.
          </p>
        </div>
      }
    </section>
  );
}
