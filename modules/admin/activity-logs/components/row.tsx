import { ArrowRight, CalendarClock, UserRound } from 'lucide-react';

import { Badge } from '@/components/ui/badge';

import {
  formatActivityLabel,
  getActivityActionClass,
  getActivityIcon,
} from './activity-style';

import type { ActivityLogViewModel } from '../types/activity-log';

interface ActivityLogRowProps {
  activity: ActivityLogViewModel;
  selected: boolean;
  onClick: () => void;
}

function formatDateTime(value: string) {
  return new Intl.DateTimeFormat('en-PH', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(value));
}

export function ActivityLogRow({
  activity,
  selected,
  onClick,
}: ActivityLogRowProps) {
  return (
    <button
      type='button'
      aria-pressed={selected}
      onClick={onClick}
      className={[
        'group w-full rounded-2xl border p-4 text-left transition',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5BA9D6]/40',
        selected ?
          'border-[#5BA9D6]/50 bg-[#E5F5FC]/70 shadow-sm'
        : 'border-border/70 bg-card hover:border-border hover:bg-muted/20',
      ].join(' ')}
    >
      <div className='flex min-w-0 items-start gap-3'>
        <div
          className={[
            'flex size-10 shrink-0 items-center justify-center rounded-xl border',
            selected ?
              'border-[#5BA9D6]/30 bg-white text-[#102A43]'
            : 'border-border/70 bg-muted/40 text-muted-foreground',
          ].join(' ')}
        >
          {getActivityIcon(activity.action, 'size-4')}
        </div>

        <div className='min-w-0 flex-1'>
          <div className='flex flex-wrap items-start justify-between gap-2'>
            <div className='min-w-0 flex-1'>
              <div className='flex flex-wrap items-center gap-2'>
                <p className='text-sm font-semibold tracking-tight'>
                  {activity.description}
                </p>
              </div>

              <p className='mt-1 text-xs text-muted-foreground'>
                {activity.actorName}
              </p>
            </div>

            <Badge
              variant='outline'
              className={[
                'shrink-0 text-[10px]',
                getActivityActionClass(activity.action),
              ].join(' ')}
            >
              {formatActivityLabel(activity.action)}
            </Badge>
          </div>

          <div className='mt-4 grid gap-3 sm:grid-cols-2'>
            <div className='min-w-0'>
              <p className='text-[10px] font-medium uppercase tracking-[0.12em] text-muted-foreground'>
                Entity
              </p>

              <div className='mt-1 flex min-w-0 items-center gap-1.5 text-xs'>
                <span className='truncate font-medium'>
                  {formatActivityLabel(activity.entity)}
                </span>

                {activity.entityId ?
                  <span className='truncate font-mono text-[10px] text-muted-foreground'>
                    {activity.entityId}
                  </span>
                : null}
              </div>
            </div>

            <div className='min-w-0'>
              <p className='text-[10px] font-medium uppercase tracking-[0.12em] text-muted-foreground'>
                Actor
              </p>

              <div className='mt-1 flex min-w-0 items-center gap-1.5 text-xs'>
                <UserRound className='size-3.5 shrink-0 text-muted-foreground' />

                <span className='truncate'>
                  {activity.actorRole ?
                    formatActivityLabel(activity.actorRole)
                  : 'Unknown role'}
                </span>
              </div>
            </div>
          </div>

          <div className='mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-border/60 pt-3'>
            <span className='inline-flex items-center gap-1.5 text-[10px] text-muted-foreground'>
              <CalendarClock className='size-3.5' />
              {formatDateTime(activity.createdAt)}
            </span>

            <span className='inline-flex items-center gap-1.5 text-[10px] text-muted-foreground'>
              {activity.id}
              <ArrowRight className='size-3.5 transition-transform group-hover:translate-x-0.5' />
            </span>
          </div>
        </div>
      </div>
    </button>
  );
}
