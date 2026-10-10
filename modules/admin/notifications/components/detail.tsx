'use client';

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

import type { LucideIcon } from 'lucide-react';

import { Badge } from '@/components/ui/badge';

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

export function NotificationDetail({ notification }: NotificationDetailProps) {
  if (!notification) {
    return (
      <section className='rounded-[1.5rem] border border-border/70 bg-card shadow-sm xl:sticky xl:top-6'>
        <div className='flex min-h-105 flex-col items-center justify-center px-6 py-10 text-center'>
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
    <section className='flex max-h-184.5 flex-col overflow-hidden rounded-[1.5rem] border border-border/70 bg-card shadow-sm xl:sticky xl:top-6'>
      {/* Fixed notification summary */}
      <div className='shrink-0 border-b border-border/70 bg-muted/20 px-5 py-5 sm:px-6'>
        <div className='flex items-start gap-4'>
          <div className='flex size-12 shrink-0 items-center justify-center rounded-2xl bg-[#E5F5FC] text-[#102A43]'>
            <TypeIcon className='size-6' />
          </div>

          <div className='min-w-0 flex-1'>
            <div className='flex flex-wrap items-center gap-2'>
              <h2 className='wrap-break-word text-lg font-semibold tracking-tight'>
                {notification.title}
              </h2>

              <Badge
                variant='outline'
                className={`text-[10px] ${config.className}`}
              >
                {config.label}
              </Badge>
            </div>

            <p className='mt-2 break-all font-mono text-[10px] text-muted-foreground'>
              {notification.id}
            </p>

            <div className='mt-2 flex flex-wrap items-center gap-2'>
              <Badge
                variant='outline'
                className='border-border/60 bg-background/80 text-[10px]'
              >
                {notification.read ? 'Read' : 'Unread'}
              </Badge>

              <Badge
                variant='outline'
                className='border-border/60 bg-background/80 text-[10px]'
              >
                {notification.recipientRole ?
                  notification.recipientRole.replaceAll('_', ' ')
                : 'Unknown role'}
              </Badge>
            </div>
          </div>
        </div>

        <div className='mt-5 grid grid-cols-2 gap-3'>
          <div className='rounded-xl border border-border/60 bg-background/80 p-3'>
            <div className='flex items-center gap-2 text-[10px] uppercase tracking-[0.12em] text-muted-foreground'>
              {notification.read ?
                <MailOpen className='size-3.5' />
              : <Mail className='size-3.5' />}
              Read status
            </div>

            <p className='mt-2 text-sm font-semibold'>
              {notification.read ? 'Read' : 'Unread'}
            </p>
          </div>

          <div className='rounded-xl border border-border/60 bg-background/80 p-3'>
            <div className='flex items-center gap-2 text-[10px] uppercase tracking-[0.12em] text-muted-foreground'>
              <BellRing className='size-3.5' />
              Category
            </div>

            <p className='mt-2 wrap-break-word text-sm font-semibold'>
              {config.label}
            </p>
          </div>
        </div>
      </div>

      {/* Scrollable notification details */}
      <div className='min-h-0 overflow-y-auto overscroll-contain scrollbar-subtle'>
        <div className='grid gap-7 px-5 py-6 sm:px-6'>
          {/* Message */}
          <section>
            <div className='mb-4 flex items-center gap-2'>
              <BellRing className='size-4 text-muted-foreground' />

              <h3 className='text-sm font-semibold'>Message</h3>
            </div>

            <div className='rounded-2xl border border-border/60 bg-muted/15 p-4'>
              <div className='flex items-start gap-3'>
                <div className='flex size-8 shrink-0 items-center justify-center rounded-lg bg-background'>
                  <TypeIcon className='size-4 text-muted-foreground' />
                </div>

                <div className='min-w-0'>
                  <p className='text-xs font-semibold'>{notification.title}</p>

                  <p className='mt-1 whitespace-pre-wrap wrap-break-word text-[11px] leading-5 text-muted-foreground'>
                    {notification.message}
                  </p>
                </div>
              </div>

              <div className='mt-4 border-t border-border/50 pt-4'>
                <DetailItem
                  label='Notification category'
                  value={config.label}
                  icon={BellRing}
                />
              </div>
            </div>
          </section>

          {/* Recipient information */}
          <section className='border-t border-border/60 pt-7'>
            <div className='mb-4 flex items-center gap-2'>
              <UserRound className='size-4 text-muted-foreground' />

              <h3 className='text-sm font-semibold'>Recipient information</h3>
            </div>

            <div className='rounded-2xl border border-border/60 bg-muted/15 p-4'>
              <div className='flex items-start gap-3'>
                <div className='flex size-8 shrink-0 items-center justify-center rounded-lg bg-background'>
                  <UserRound className='size-4 text-muted-foreground' />
                </div>

                <div className='min-w-0'>
                  <p className='text-xs font-semibold'>
                    {notification.recipientName}
                  </p>

                  <p className='mt-1 wrap-break-word text-[11px] leading-5 text-muted-foreground'>
                    {notification.recipientRole ?
                      notification.recipientRole.replaceAll('_', ' ')
                    : 'Unknown role'}
                  </p>
                </div>
              </div>

              <div className='mt-4 grid gap-4 border-t border-border/50 pt-4'>
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

                <DetailItem
                  label='User ID'
                  value={notification.userId}
                  icon={UserRound}
                />
              </div>
            </div>
          </section>

          {/* Notification activity */}
          <section className='border-t border-border/60 pt-7'>
            <div className='mb-4 flex items-center gap-2'>
              <CalendarDays className='size-4 text-muted-foreground' />

              <h3 className='text-sm font-semibold'>Notification activity</h3>
            </div>

            <div className='grid gap-3'>
              <div className='rounded-2xl border border-border/60 bg-muted/15 p-4'>
                <div className='flex items-start gap-3'>
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
              </div>

              <div className='rounded-2xl border border-border/60 bg-muted/15 p-4'>
                <div className='flex items-start gap-3'>
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
            </div>
          </section>

          {/* Notification record note */}
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
