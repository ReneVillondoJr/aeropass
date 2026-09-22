'use client';

import { Bell, Gauge } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';

import { AdminBreadcrumbs } from '@/components/admin/layout/breadcrumbs';
import { AdminUserMenu } from '@/components/admin/layout/user-menu';

import { useAdminNavigation } from '@/hooks/admin/use-admin-navigation';

import type { AdminHeaderProps } from '@/types/header';

export function AdminHeader({
  showStatusButton = true,
  showNotifications = true,
}: AdminHeaderProps) {
  const { pageTitle, breadcrumb } = useAdminNavigation();

  return (
    <header className='sticky top-0 z-30 flex h-16 shrink-0 items-center border-b border-border/70 bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/80 lg:px-6'>
      <div className='flex min-w-0 flex-1 items-center gap-3'>
        <SidebarTrigger className='-ml-1' />

        <Separator orientation='vertical' className='hidden h-5 sm:block' />

        <AdminBreadcrumbs title={breadcrumb?.title} />

        <div className='sm:hidden'>
          <p className='text-sm font-semibold'>{pageTitle}</p>
        </div>
      </div>

      <div className='flex items-center gap-1'>
        {showStatusButton ?
          <Button
            variant='ghost'
            size='icon'
            className='size-9 text-muted-foreground hover:bg-muted hover:text-foreground'
            aria-label='System status'
          >
            <Gauge className='size-4' />
          </Button>
        : null}

        {showNotifications ?
          <Button
            variant='ghost'
            size='icon'
            className='relative size-9 text-muted-foreground hover:bg-muted hover:text-foreground'
            aria-label='Notifications'
          >
            <Bell className='size-4' />

            <span className='absolute right-2 top-2 size-1.5 rounded-full bg-primary' />
          </Button>
        : null}

        <Separator orientation='vertical' className='mx-2 h-6' />

        <AdminUserMenu />
      </div>
    </header>
  );
}
