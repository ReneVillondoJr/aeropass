import {
  BellRing,
  CalendarDays,
  CheckCheck,
  Clock3,
  Mail,
  MailOpen,
  ShieldCheck,
  UserRound,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

import type { NotificationViewModel } from '../types/notification';

import { notificationTypeConfig } from './notification-style';

interface NotificationDetailProps {
  notification: NotificationViewModel | null;
}

function formatDateTime(value: string) {
  return new Intl.DateTimeFormat('en-PH', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(value));
}

function DetailItem({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon?: typeof UserRound;
}) {
  return (
    <div className='min-w-0'>
      <p className='text-[10px] font-medium uppercase tracking-[0.12em] text-muted-foreground'>
        {label}
      </p>

      <div className='mt-1 flex min-w-0 items-center gap-2'>
        {Icon ?
          <Icon className='size-3.5 shrink-0 text-muted-foreground' />
        : null}

        <p className='break-words text-xs font-medium'>{value}</p>
      </div>
    </div>
  );
}

export function NotificationDetail({ notification }: NotificationDetailProps) {
  if (!notification) {
    return (
      <section className='rounded-[1.5rem] border border-border/70 bg-card shadow-sm xl:sticky xl:top-6'>
        <div className='flex min-h-[420px] flex-col items-center justify-center px-6 py-10 text-center'>
          <div className='flex size-12 items-center justify-center rounded-2xl bg-muted/50'>
            <BellRing className='size-6 text-muted-foreground' />
          </div>

          <h2 className='mt-4 text-sm font-semibold'>Select a notification</h2>

          <p className='mt-1 max-w-xs text-xs leading-5 text-muted-foreground'>
            Select an item from the inbox to inspect the complete message,
            recipient, category, and read status.
          </p>
        </div>
      </section>
    );
  }

  const config = notificationTypeConfig[notification.type];
  const TypeIcon = config.icon;

  return (
    <section className='overflow-hidden rounded-[1.5rem] border border-border/70 bg-card shadow-sm xl:sticky xl:top-6'>
      <div className='max-h-[760px] overflow-y-auto overscroll-contain'>
        <div className='border-b border-border/70 bg-muted/20 px-5 py-5 sm:px-6'>
          <div className='flex items-start gap-3'>
            <div className='flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#E5F5FC] text-[#102A43]'>
              <TypeIcon className='size-5' />
            </div>

            <div className='min-w-0 flex-1'>
              <div className='flex flex-wrap items-center gap-2'>
                <h2 className='text-lg font-semibold tracking-tight'>
                  Notification details
                </h2>

                <Badge
                  variant='outline'
                  className={`text-[10px] ${config.className}`}
                >
                  {config.label}
                </Badge>
              </div>

              <p className='mt-1 break-all font-mono text-[10px] text-muted-foreground'>
                {notification.id}
              </p>
            </div>
          </div>

          <div
            className={[
              'mt-5 rounded-2xl border p-4',
              notification.read ?
                'border-border/70 bg-background'
              : 'border-[#5BA9D6]/25 bg-[#E5F5FC]/60',
            ].join(' ')}
          >
            <div className='flex items-start gap-3'>
              <div className='mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-background'>
                {notification.read ?
                  <MailOpen className='size-4 text-muted-foreground' />
                : <Mail className='size-4 text-[#102A43]' />}
              </div>

              <div className='min-w-0 flex-1'>
                <div className='flex flex-wrap items-center gap-2'>
                  <p className='text-xs font-semibold'>
                    {notification.read ?
                      'Read notification'
                    : 'Unread notification'}
                  </p>

                  <Badge
                    variant='outline'
                    className={
                      notification.read ?
                        'border-border/70 bg-background text-[10px]'
                      : 'border-[#5BA9D6]/40 bg-background text-[10px] text-[#102A43]'
                    }
                  >
                    {notification.read ? 'Read' : 'Unread'}
                  </Badge>
                </div>

                <p className='mt-1 text-[11px] leading-5 text-muted-foreground'>
                  Current read status from the local notification record.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className='grid gap-6 px-5 py-6 sm:px-6'>
          <section>
            <div className='mb-4 flex items-center gap-2'>
              <BellRing className='size-4 text-muted-foreground' />

              <h3 className='text-sm font-semibold'>Message</h3>
            </div>

            <div className='rounded-2xl border border-border/70 bg-background p-4'>
              <p className='text-sm font-semibold leading-6'>
                {notification.title}
              </p>

              <p className='mt-3 whitespace-pre-wrap break-words text-xs leading-6 text-muted-foreground'>
                {notification.message}
              </p>

              <div className='mt-4 flex items-center gap-2 border-t border-border/60 pt-3 text-[10px] text-muted-foreground'>
                <TypeIcon className='size-3.5' />
                {config.label} notification
              </div>
            </div>
          </section>

          <Separator />

          <section>
            <div className='mb-4 flex items-center gap-2'>
              <UserRound className='size-4 text-muted-foreground' />

              <h3 className='text-sm font-semibold'>Recipient</h3>
            </div>

            <div className='grid gap-4 sm:grid-cols-2'>
              <DetailItem
                label='Name'
                value={notification.recipientName}
                icon={UserRound}
              />

              <DetailItem
                label='Email'
                value={notification.recipientEmail}
                icon={Mail}
              />

              <DetailItem
                label='Role'
                value={notification.recipientRole ?? 'Unknown'}
                icon={ShieldCheck}
              />

              <DetailItem
                label='Account status'
                value={notification.recipientStatus ?? 'Unknown'}
                icon={CheckCheck}
              />

              <DetailItem label='User ID' value={notification.userId} />
            </div>
          </section>

          <Separator />

          <section>
            <div className='mb-4 flex items-center gap-2'>
              <CalendarDays className='size-4 text-muted-foreground' />

              <h3 className='text-sm font-semibold'>Notification activity</h3>
            </div>

            <div className='grid gap-3'>
              <div className='flex items-start gap-3 rounded-2xl border border-border/70 bg-muted/20 p-4'>
                <div className='flex size-8 shrink-0 items-center justify-center rounded-lg bg-background'>
                  <CalendarDays className='size-4 text-muted-foreground' />
                </div>

                <div className='min-w-0'>
                  <p className='text-xs font-semibold'>Created at</p>

                  <p className='mt-1 text-[11px] leading-5 text-muted-foreground'>
                    {formatDateTime(notification.createdAt)}
                  </p>
                </div>
              </div>

              <div className='flex items-start gap-3 rounded-2xl border border-border/70 bg-muted/20 p-4'>
                <div className='flex size-8 shrink-0 items-center justify-center rounded-lg bg-background'>
                  {notification.read ?
                    <CheckCheck className='size-4 text-emerald-600' />
                  : <Clock3 className='size-4 text-amber-600' />}
                </div>

                <div className='min-w-0'>
                  <p className='text-xs font-semibold'>Read status</p>

                  <p className='mt-1 text-[11px] leading-5 text-muted-foreground'>
                    {notification.read ?
                      'This record is currently marked as read.'
                    : 'This record is currently marked as unread.'}
                  </p>
                </div>
              </div>
            </div>
          </section>

          <div className='rounded-2xl border border-[#5BA9D6]/20 bg-[#E5F5FC]/60 p-4'>
            <div className='flex items-start gap-3'>
              <ShieldCheck className='mt-0.5 size-4 shrink-0 text-[#102A43]' />

              <div>
                <p className='text-xs font-semibold'>Notification record</p>

                <p className='mt-1 text-[11px] leading-5 text-muted-foreground'>
                  This screen displays the canonical local notification and
                  recipient records. Read status is view-only until a shared
                  update function is added to the mock database.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
