'use client';

import { Bell, CheckCircle2, Gauge } from 'lucide-react';

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
    <header className='sticky top-0 z-30 flex h-16 shrink-0 items-center border-b border-border/70 bg-background/90 px-3 backdrop-blur-xl supports-[backdrop-filter]:bg-background/75 sm:px-4 lg:px-6'>
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

      <div className='flex items-center gap-1 sm:gap-1.5'>
        {showStatusButton ?
          <Button
            type='button'
            variant='ghost'
            size='sm'
            aria-label='System status'
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
        : null}

        {showNotifications ?
          <Button
            type='button'
            variant='ghost'
            size='icon'
            aria-label='Notifications'
            className='relative size-9 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground'
          >
            <Bell className='size-4' />

            <span
              aria-hidden='true'
              className='absolute right-2 top-1.5 flex size-2 items-center justify-center'
            >
              <span className='absolute size-2 rounded-full bg-primary/20' />

              <span className='relative size-1.5 rounded-full bg-primary' />
            </span>
          </Button>
        : null}

        <Separator orientation='vertical' className='mx-1.5 h-7 sm:mx-2' />

        <AdminUserMenu />
      </div>
    </header>
  );
}
