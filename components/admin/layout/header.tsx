'use client';

import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';

import {
  ArrowRight,
  Bell,
  CheckCheck,
  CheckCircle2,
  Gauge,
  Inbox,
  Mail,
  Settings2,
  XCircle,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';

import { AdminBreadcrumbs } from '@/components/admin/layout/breadcrumbs';
import { AdminUserMenu } from '@/components/admin/layout/user-menu';

import { notifications as notificationRecords } from '@/data/aeropass';

import { useAdminNavigation } from '@/hooks/admin/use-admin-navigation';

import type { AdminHeaderProps } from '@/types/header';

function formatNotificationDate(value: string) {
  return new Intl.DateTimeFormat('en-PH', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(value));
}

export function AdminHeader({
  showStatusButton = true,
  showNotifications = true,
}: AdminHeaderProps) {
  const { pageTitle, breadcrumb } = useAdminNavigation();

  const [statusOpen, setStatusOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const statusContainerRef = useRef<HTMLDivElement>(null);
  const notificationContainerRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    if (!statusOpen && !notificationsOpen) {
      return;
    }

    function handleOutsideClick(event: PointerEvent) {
      if (!(event.target instanceof Node)) {
        return;
      }

      if (!statusContainerRef.current?.contains(event.target)) {
        setStatusOpen(false);
      }

      if (!notificationContainerRef.current?.contains(event.target)) {
        setNotificationsOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setStatusOpen(false);
        setNotificationsOpen(false);
      }
    }

    document.addEventListener('pointerdown', handleOutsideClick);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('pointerdown', handleOutsideClick);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [statusOpen, notificationsOpen]);

  return (
    <header className='sticky top-0 z-30 flex h-16 shrink-0 items-center border-b border-border/70 bg-background/90 px-3 backdrop-blur-xl supports-[backdrop-filter]:bg-background/75 sm:px-4 lg:px-6'>
      {/* Navigation and breadcrumbs */}
      <div className='flex min-w-0 flex-1 items-center gap-2.5 sm:gap-3'>
        <SidebarTrigger className='-ml-1 size-9 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground' />

        <Separator orientation='vertical' className='hidden h-5 sm:block' />

        <div className='hidden min-w-0 sm:block'>
          <AdminBreadcrumbs title={breadcrumb?.title} />
        </div>

        <div className='min-w-0 sm:hidden'>
          <p className='truncate text-sm font-semibold tracking-tight text-foreground'>
            {pageTitle}
          </p>
        </div>
      </div>

      {/* Header actions */}
      <div className='flex items-center gap-1 sm:gap-1.5'>
        {/* System status */}
        {showStatusButton ?
          <div ref={statusContainerRef} className='relative'>
            <Button
              type='button'
              variant='ghost'
              size='sm'
              aria-label='System status'
              aria-haspopup='dialog'
              aria-expanded={statusOpen}
              aria-controls='admin-system-status-panel'
              onClick={() => {
                setNotificationsOpen(false);
                setStatusOpen((current) => !current);
              }}
              className='h-9 gap-2 rounded-lg px-2.5 text-muted-foreground hover:bg-muted hover:text-foreground'
            >
              <span className='flex size-2 items-center justify-center'>
                <span className='size-1.5 rounded-full bg-emerald-500' />
              </span>

              <span className='hidden text-xs font-medium md:inline'>
                Operational
              </span>

              <Gauge className='size-4' />
            </Button>

            {statusOpen ?
              <div
                id='admin-system-status-panel'
                role='dialog'
                aria-label='System status details'
                className='absolute right-0 top-full z-50 mt-2 w-[min(21rem,calc(100vw-1.5rem))] overflow-hidden rounded-2xl border border-border/70 bg-popover text-popover-foreground shadow-xl'
              >
                {/* Status heading */}
                <div className='border-b border-border/70 px-4 py-4'>
                  <div className='flex items-center gap-3'>
                    <div className='flex size-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700'>
                      <CheckCircle2 className='size-5' />
                    </div>

                    <div className='min-w-0'>
                      <h2 className='text-sm font-semibold'>System status</h2>

                      <p className='mt-1 text-xs text-muted-foreground'>
                        AeroPass environment overview
                      </p>
                    </div>

                    <Button
                      type='button'
                      variant='ghost'
                      size='icon'
                      aria-label='Close system status'
                      onClick={() => setStatusOpen(false)}
                      className='ml-auto size-8 shrink-0 text-muted-foreground'
                    >
                      <XCircle className='size-4' />
                    </Button>
                  </div>
                </div>

                {/* Status information */}
                <div className='grid gap-4 p-4'>
                  <div className='flex items-start justify-between gap-4'>
                    <div className='min-w-0'>
                      <p className='text-xs font-medium'>
                        Application interface
                      </p>

                      <p className='mt-1 text-[11px] text-muted-foreground'>
                        Current admin UI
                      </p>
                    </div>

                    <span className='inline-flex shrink-0 items-center gap-1.5 text-[11px] font-medium text-emerald-700'>
                      <span className='size-1.5 rounded-full bg-emerald-500' />
                      Loaded
                    </span>
                  </div>

                  <Separator />

                  <div className='flex items-start justify-between gap-4'>
                    <div className='min-w-0'>
                      <p className='text-xs font-medium'>Data source</p>

                      <p className='mt-1 text-[11px] text-muted-foreground'>
                        Local AeroPass mock database
                      </p>
                    </div>

                    <span className='shrink-0 rounded-md border border-amber-200 bg-amber-50 px-2 py-1 text-[10px] font-medium text-amber-700'>
                      Demo
                    </span>
                  </div>

                  <Separator />

                  <div className='flex items-start justify-between gap-4'>
                    <div className='min-w-0'>
                      <p className='text-xs font-medium'>Backend health</p>

                      <p className='mt-1 text-[11px] text-muted-foreground'>
                        Server and database connectivity
                      </p>
                    </div>

                    <span className='shrink-0 rounded-md border border-border bg-muted px-2 py-1 text-[10px] font-medium text-muted-foreground'>
                      Not checked
                    </span>
                  </div>

                  <Separator />

                  <div className='flex items-start justify-between gap-4'>
                    <div className='min-w-0'>
                      <p className='text-xs font-medium'>
                        External integrations
                      </p>

                      <p className='mt-1 text-[11px] text-muted-foreground'>
                        Payment and third-party services
                      </p>
                    </div>

                    <span className='shrink-0 rounded-md border border-border bg-muted px-2 py-1 text-[10px] font-medium text-muted-foreground'>
                      Not checked
                    </span>
                  </div>
                </div>

                <div className='border-t border-border/70 bg-muted/20 px-4 py-3'>
                  <p className='text-[10px] leading-5 text-muted-foreground'>
                    Status details are informational only. Live health checks
                    have not been implemented.
                  </p>
                </div>
              </div>
            : null}
          </div>
        : null}

        {/* Notifications */}
        {showNotifications ?
          <div ref={notificationContainerRef} className='relative'>
            <Button
              type='button'
              variant='ghost'
              size='icon'
              aria-label={
                unreadCount > 0 ?
                  `Notifications, ${unreadCount} unread`
                : 'Notifications'
              }
              aria-haspopup='dialog'
              aria-expanded={notificationsOpen}
              aria-controls='admin-notifications-panel'
              onClick={() => {
                setStatusOpen(false);
                setNotificationsOpen((current) => !current);
              }}
              className='relative size-9 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground'
            >
              <Bell className='size-4' />

              {unreadCount > 0 ?
                <span
                  aria-hidden='true'
                  className='absolute right-1.5 top-1.5 flex size-2 items-center justify-center'
                >
                  <span className='absolute size-2 rounded-full bg-primary/20' />

                  <span className='relative size-1.5 rounded-full bg-primary' />
                </span>
              : null}
            </Button>

            {notificationsOpen ?
              <div
                id='admin-notifications-panel'
                role='dialog'
                aria-label='Recent notifications'
                className='absolute right-0 top-full z-50 mt-2 w-[min(24rem,calc(100vw-1.5rem))] overflow-hidden rounded-2xl border border-border/70 bg-popover text-popover-foreground shadow-xl'
              >
                {/* Notification heading */}
                <div className='flex items-center justify-between gap-3 border-b border-border/70 px-4 py-4'>
                  <div className='min-w-0'>
                    <h2 className='text-sm font-semibold'>Notifications</h2>

                    <p className='mt-1 text-xs text-muted-foreground'>
                      {unreadCount > 0 ?
                        `${unreadCount} unread notifications`
                      : 'You are all caught up'}
                    </p>
                  </div>

                  <div className='flex size-9 shrink-0 items-center justify-center rounded-xl bg-muted/60'>
                    <Inbox className='size-4 text-muted-foreground' />
                  </div>
                </div>

                {/* Recent notification list */}
                <div className='max-h-[360px] overflow-y-auto overscroll-contain'>
                  {recentNotifications.length > 0 ?
                    recentNotifications.map((notification) => (
                      <Link
                        key={notification.id}
                        href='/admin/notifications'
                        onClick={() => setNotificationsOpen(false)}
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

                          <div className='mt-2 flex flex-wrap items-center justify-between gap-2'>
                            <span className='text-[10px] text-muted-foreground'>
                              {notification.type.replace('_', ' ')}
                            </span>

                            <span className='text-[10px] text-muted-foreground'>
                              {formatNotificationDate(notification.createdAt)}
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))
                  : <div className='px-4 py-10 text-center'>
                      <Inbox className='mx-auto size-6 text-muted-foreground' />

                      <p className='mt-3 text-sm font-medium'>
                        No notifications
                      </p>

                      <p className='mt-1 text-xs text-muted-foreground'>
                        New notifications will appear here.
                      </p>
                    </div>
                  }
                </div>

                {/* Notification footer */}
                <div className='border-t border-border/70 p-3'>
                  <Link
                    href='/admin/notifications'
                    onClick={() => setNotificationsOpen(false)}
                    className='flex h-9 items-center justify-center gap-2 rounded-lg text-xs font-medium transition-colors hover:bg-muted'
                  >
                    View all notifications
                    <ArrowRight className='size-3.5' />
                  </Link>
                </div>

                {unreadCount === 0 ?
                  <div className='flex items-center justify-center gap-2 border-t border-border/50 px-3 py-2 text-[10px] text-muted-foreground'>
                    <CheckCheck className='size-3.5' />
                    All notifications read
                  </div>
                : null}
              </div>
            : null}
          </div>
        : null}

        <Separator orientation='vertical' className='mx-1.5 h-7 sm:mx-2' />

        <AdminUserMenu />
      </div>
    </header>
  );
}
