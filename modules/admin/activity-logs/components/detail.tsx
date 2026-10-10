'use client';

import {
  Activity,
  CalendarClock,
  Copy,
  Database,
  Fingerprint,
  Mail,
  ShieldCheck,
  UserRound,
} from 'lucide-react';

import type { LucideIcon } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

import type { ActivityLogViewModel } from '../types/activity-log';

import {
  formatActivityLabel,
  getActivityActionClass,
  getActivityIcon,
} from './activity-style';

interface ActivityLogDetailProps {
  activity: ActivityLogViewModel | null;
}

function formatDateTime(value: string) {
  return new Intl.DateTimeFormat('en-PH', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
  }).format(new Date(value));
}

function DetailItem({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon?: LucideIcon;
}) {
  return (
    <div className='min-w-0'>
      <p className='text-[10px] font-medium uppercase tracking-[0.12em] text-muted-foreground'>
        {label}
      </p>

      <div className='mt-1 flex min-w-0 items-start gap-2'>
        {Icon ?
          <Icon className='mt-0.5 size-3.5 shrink-0 text-muted-foreground' />
        : null}

        <p className='wrap-break-word text-xs font-medium'>{value}</p>
      </div>
    </div>
  );
}

export function ActivityLogDetail({ activity }: ActivityLogDetailProps) {
  if (!activity) {
    return (
      <section className='rounded-[1.5rem] border border-border/70 bg-card shadow-sm xl:sticky xl:top-6'>
        <div className='flex min-h-105 flex-col items-center justify-center px-6 py-10 text-center'>
          <div className='flex size-12 items-center justify-center rounded-2xl bg-muted/50'>
            <Activity className='size-6 text-muted-foreground' />
          </div>

          <h2 className='mt-4 text-sm font-semibold'>Select an activity</h2>

          <p className='mt-1 max-w-xs text-xs leading-5 text-muted-foreground'>
            Select an event from the audit trail to inspect the actor, action,
            entity, and recorded timestamp.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className='flex max-h-184.5 flex-col overflow-hidden rounded-[1.5rem] border border-border/70 bg-card shadow-sm xl:sticky xl:top-6'>
      {/* Fixed activity summary */}
      <div className='shrink-0 border-b border-border/70 bg-muted/20 px-5 py-5 sm:px-6'>
        <div className='flex items-start gap-4'>
          <div className='flex size-12 shrink-0 items-center justify-center rounded-2xl bg-[#E5F5FC] text-[#102A43]'>
            {getActivityIcon(activity.action, 'size-6')}
          </div>

          <div className='min-w-0 flex-1'>
            <div className='flex flex-wrap items-center gap-2'>
              <h2 className='wrap-break-word text-lg font-semibold tracking-tight'>
                {activity.description}
              </h2>

              <Badge
                variant='outline'
                className={`text-[10px] ${getActivityActionClass(activity.action)}`}
              >
                {formatActivityLabel(activity.action)}
              </Badge>
            </div>

            <p className='mt-2 break-all font-mono text-[10px] text-muted-foreground'>
              {activity.id}
            </p>

            <div className='mt-2 flex flex-wrap items-center gap-2'>
              <Badge
                variant='outline'
                className='border-border/60 bg-background/80 text-[10px]'
              >
                {formatActivityLabel(activity.entity)}
              </Badge>

              {activity.entityId ?
                <Badge
                  variant='outline'
                  className='max-w-full truncate border-border/60 bg-background/80 font-mono text-[10px]'
                >
                  {activity.entityId}
                </Badge>
              : null}
            </div>
          </div>
        </div>

        <div className='mt-5 grid grid-cols-2 gap-3'>
          <div className='rounded-xl border border-border/60 bg-background/80 p-3'>
            <div className='flex items-center gap-2 text-[10px] uppercase tracking-[0.12em] text-muted-foreground'>
              <UserRound className='size-3.5' />
              Actor
            </div>

            <p className='mt-2 wrap-break-word text-sm font-semibold'>
              {activity.actorName}
            </p>
          </div>

          <div className='rounded-xl border border-border/60 bg-background/80 p-3'>
            <div className='flex items-center gap-2 text-[10px] uppercase tracking-[0.12em] text-muted-foreground'>
              <CalendarClock className='size-3.5' />
              Recorded
            </div>

            <p className='mt-2 text-xs font-semibold leading-5'>
              {formatDateTime(activity.createdAt)}
            </p>
          </div>
        </div>
      </div>

      {/* Scrollable activity details */}
      <div className='min-h-0 overflow-y-auto overscroll-contain scrollbar-subtle'>
        <div className='grid gap-7 px-5 py-6 sm:px-6'>
          {/* Event details */}
          <section>
            <div className='mb-4 flex items-center gap-2'>
              <Activity className='size-4 text-muted-foreground' />

              <h3 className='text-sm font-semibold'>Event details</h3>
            </div>

            <div className='rounded-2xl border border-border/60 bg-muted/15 p-4'>
              <div className='flex items-start gap-3'>
                <div className='flex size-8 shrink-0 items-center justify-center rounded-lg bg-background'>
                  {getActivityIcon(activity.action, 'size-4')}
                </div>

                <div className='min-w-0'>
                  <p className='text-xs font-semibold'>
                    {formatActivityLabel(activity.action)}
                  </p>

                  <p className='mt-1 wrap-break-word text-[11px] leading-5 text-muted-foreground'>
                    {activity.description}
                  </p>
                </div>
              </div>

              <div className='mt-4 border-t border-border/50 pt-4'>
                <DetailItem
                  label='Recorded action'
                  value={formatActivityLabel(activity.action)}
                  icon={Activity}
                />

                <div className='mt-4'>
                  <DetailItem
                    label='Timestamp'
                    value={formatDateTime(activity.createdAt)}
                    icon={CalendarClock}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Actor information */}
          <section className='border-t border-border/60 pt-7'>
            <div className='mb-4 flex items-center gap-2'>
              <UserRound className='size-4 text-muted-foreground' />

              <h3 className='text-sm font-semibold'>Actor information</h3>
            </div>

            <div className='rounded-2xl border border-border/60 bg-muted/15 p-4'>
              <div className='flex items-start gap-3'>
                <div className='flex size-8 shrink-0 items-center justify-center rounded-lg bg-background'>
                  <UserRound className='size-4 text-muted-foreground' />
                </div>

                <div className='min-w-0'>
                  <p className='text-xs font-semibold'>{activity.actorName}</p>

                  <p className='mt-1 text-[11px] leading-5 text-muted-foreground'>
                    {activity.actorRole ?
                      formatActivityLabel(activity.actorRole)
                    : 'Unknown role'}
                  </p>
                </div>
              </div>

              <div className='mt-4 grid gap-4 border-t border-border/50 pt-4'>
                <DetailItem
                  label='Email'
                  value={activity.actorEmail}
                  icon={Mail}
                />

                <DetailItem
                  label='User ID'
                  value={activity.userId}
                  icon={Fingerprint}
                />

                <DetailItem
                  label='Role'
                  value={
                    activity.actorRole ?
                      formatActivityLabel(activity.actorRole)
                    : 'Unknown role'
                  }
                  icon={ShieldCheck}
                />
              </div>
            </div>
          </section>

          {/* Entity reference */}
          <section className='border-t border-border/60 pt-7'>
            <div className='mb-4 flex items-center gap-2'>
              <Database className='size-4 text-muted-foreground' />

              <h3 className='text-sm font-semibold'>Entity reference</h3>
            </div>

            <div className='rounded-2xl border border-border/60 bg-muted/15 p-4'>
              <div className='grid gap-4'>
                <DetailItem
                  label='Entity type'
                  value={formatActivityLabel(activity.entity)}
                  icon={Database}
                />

                <DetailItem
                  label='Entity ID'
                  value={activity.entityId ?? 'Not recorded'}
                  icon={Fingerprint}
                />

                <DetailItem
                  label='Activity ID'
                  value={activity.id}
                  icon={Activity}
                />
              </div>

              {activity.entityId ?
                <div className='mt-4 border-t border-border/50 pt-3'>
                  <Button
                    type='button'
                    variant='outline'
                    onClick={() =>
                      void navigator.clipboard.writeText(
                        activity.entityId ?? '',
                      )
                    }
                    className='h-9 w-full gap-2 text-xs'
                  >
                    <Copy className='size-3.5' />
                    Copy entity ID
                  </Button>
                </div>
              : null}
            </div>
          </section>

          {/* Audit note */}
          <div className='rounded-2xl border border-[#5BA9D6]/20 bg-[#E5F5FC]/60 p-4'>
            <div className='flex items-start gap-3'>
              <ShieldCheck className='mt-0.5 size-4 shrink-0 text-[#102A43]' />

              <div>
                <p className='text-xs font-semibold'>Audit record</p>

                <p className='mt-1 text-[11px] leading-5 text-muted-foreground'>
                  This panel displays the recorded activity and resolves the
                  actor from the centralized AeroPass user records. The local
                  mock log is demonstration data and does not independently
                  verify events outside the application.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
