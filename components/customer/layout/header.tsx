'use client';

import Link from 'next/link';
import { Bell, Menu } from 'lucide-react';

import { CustomerAccountMenu } from './account-menu';
import { CustomerBreadcrumbs } from '../shared/customer-breadcrumbs';

interface CustomerHeaderProps {
  onOpenMobileNav: () => void;
  customerName?: string;
  customerEmail?: string;
  notificationCount?: number;
  onSignOut?: () => void | Promise<void>;
}

export function CustomerHeader({
  onOpenMobileNav,
  customerName = 'Customer',
  customerEmail,
  notificationCount = 0,
  onSignOut,
}: CustomerHeaderProps) {
  const unreadCount = Math.max(0, Math.floor(notificationCount));

  return (
    <header className='sticky top-0 z-20 border-b border-border/70 bg-background/90 backdrop-blur-xl'>
      <div className='flex min-h-[76px] items-center justify-between gap-3 px-4 sm:px-6 lg:px-8'>
        <div className='flex min-w-0 items-center gap-3'>
          <button
            type='button'
            onClick={onOpenMobileNav}
            aria-label='Open navigation menu'
            className='inline-flex size-10 shrink-0 items-center justify-center rounded-xl border border-border bg-card text-muted-foreground outline-none transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-[#5BA9D6] lg:hidden'
          >
            <Menu className='size-5' aria-hidden='true' />
          </button>

          <div className='min-w-0'>
            <CustomerBreadcrumbs />
            <p className='mt-1 hidden text-xs text-muted-foreground sm:block'>
              Manage your journeys and travel details.
            </p>
          </div>
        </div>

        <div className='flex shrink-0 items-center gap-2 sm:gap-3'>
          <Link
            href='/customer/notifications'
            aria-label={
              unreadCount > 0 ?
                `Notifications, ${unreadCount} unread`
              : 'Notifications'
            }
            className='relative inline-flex size-10 items-center justify-center rounded-xl border border-border bg-card text-muted-foreground outline-none transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-[#5BA9D6]'
          >
            <Bell className='size-[18px]' aria-hidden='true' />
            {unreadCount > 0 ?
              <span className='absolute right-1 top-1 flex min-w-4 items-center justify-center rounded-full bg-[#102A43] px-1 text-[9px] font-bold leading-4 text-white ring-2 ring-background'>
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            : null}
          </Link>

          <span
            className='hidden h-8 w-px bg-border sm:block'
            aria-hidden='true'
          />

          <CustomerAccountMenu
            customerName={customerName}
            customerEmail={customerEmail}
            onSignOut={onSignOut}
          />
        </div>
      </div>
    </header>
  );
}
