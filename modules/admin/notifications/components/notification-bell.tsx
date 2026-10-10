'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { ArrowRight, Bell, Inbox, Mail } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { notifications as notificationRecords } from '@/data/aeropass';

function formatNotificationDate(value: string) {
  return new Intl.DateTimeFormat('en-PH', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(value));
}

export function NotificationBell() {
  const [showNotifications, setShowNotifications] = useState(false);

  const recentNotifications = useMemo(
    () =>
      [...notificationRecords]
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        )
        .slice(0, 5),
    [],
  );

  const unreadCount = notificationRecords.filter(
    (notification) => !notification.read,
  ).length;

  return (
    <div className='relative'>
      {/* Header notification bell */}
      <Button
        type='button'
        variant='ghost'
        size='icon'
        aria-label='Notifications'
        aria-haspopup='dialog'
        aria-expanded={showNotifications}
        aria-controls='header-notifications-panel'
        onClick={() => setShowNotifications((current) => !current)}
        className='relative size-9 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground'
      >
        <Bell className='size-4' />

        {unreadCount > 0 ?
          <span
            aria-label={`${unreadCount} unread notifications`}
            className='absolute right-1.5 top-1.5 flex size-2.5 items-center justify-center'
          >
            <span className='absolute size-2.5 rounded-full bg-primary/20' />
            <span className='relative size-1.5 rounded-full bg-primary' />
          </span>
        : null}
      </Button>

      {/* Notification dropdown */}
      {showNotifications ?
        <div
          id='header-notifications-panel'
          role='dialog'
          aria-label='Recent notifications'
          className='absolute right-0 top-full z-50 mt-2 w-[min(24rem,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-border/70 bg-popover text-popover-foreground shadow-xl'
        >
          {/* Panel header */}
          <div className='flex items-center justify-between gap-3 border-b border-border/70 px-4 py-4'>
            <div>
              <h2 className='text-sm font-semibold'>Notifications</h2>

              <p className='mt-1 text-xs text-muted-foreground'>
                {unreadCount > 0 ?
                  `${unreadCount} unread notifications`
                : 'You are all caught up'}
              </p>
            </div>

            <div className='flex size-9 items-center justify-center rounded-xl bg-muted/60'>
              <Inbox className='size-4 text-muted-foreground' />
            </div>
          </div>

          {/* Recent notifications */}
          <div className='max-h-[360px] overflow-y-auto overscroll-contain'>
            {recentNotifications.length > 0 ?
              recentNotifications.map((notification) => (
                <Link
                  key={notification.id}
                  href='/admin/notifications'
                  onClick={() => setShowNotifications(false)}
                  className='flex gap-3 border-b border-border/50 px-4 py-3 transition-colors last:border-b-0 hover:bg-muted/50'
                >
                  <div className='mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted/60'>
                    <Mail className='size-4 text-muted-foreground' />
                  </div>

                  <div className='min-w-0 flex-1'>
                    <div className='flex items-start justify-between gap-2'>
                      <p className='text-xs font-semibold leading-5'>
                        {notification.title}
                      </p>

                      {!notification.read ?
                        <span
                          aria-label='Unread'
                          className='mt-1.5 size-2 shrink-0 rounded-full bg-primary'
                        />
                      : null}
                    </div>

                    <p className='mt-1 line-clamp-2 text-xs leading-5 text-muted-foreground'>
                      {notification.message}
                    </p>

                    <p className='mt-2 text-[10px] text-muted-foreground'>
                      {formatNotificationDate(notification.createdAt)}
                    </p>
                  </div>
                </Link>
              ))
            : <div className='px-4 py-10 text-center'>
                <Inbox className='mx-auto size-6 text-muted-foreground' />

                <p className='mt-3 text-sm font-medium'>No notifications</p>

                <p className='mt-1 text-xs text-muted-foreground'>
                  New notifications will appear here.
                </p>
              </div>
            }
          </div>

          {/* Footer link */}
          <div className='border-t border-border/70 p-3'>
            <Link
              href='/admin/notifications'
              onClick={() => setShowNotifications(false)}
              className='flex h-9 items-center justify-center gap-2 rounded-lg text-xs font-medium transition-colors hover:bg-muted'
            >
              View all notifications
              <ArrowRight className='size-3.5' />
            </Link>
          </div>
        </div>
      : null}
    </div>
  );
}
