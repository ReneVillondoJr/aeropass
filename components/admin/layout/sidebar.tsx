'use client';

import { CheckCircle2 } from 'lucide-react';

import { useRouter } from 'next/navigation';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar';

import { useAdminNavigation } from '@/hooks/admin/use-admin-navigation';

import {
  adminNavigationGroups,
  adminSupportNavigation,
} from '@/components/admin/layout/config/side-nav';

export function AdminSidebar() {
  const router = useRouter();

  const { pathname } = useAdminNavigation();

  const SupportIcon = adminSupportNavigation.icon;

  return (
    <Sidebar
      collapsible='icon'
      variant='sidebar'
      className='border-r border-border/70'
    >
      {/* Brand */}
      <SidebarHeader className='border-b border-border/70 p-2'>
        <button
          type='button'
          onClick={() => router.push('/admin/dashboard')}
          className='group flex h-12 w-full items-center gap-3 rounded-xl px-2.5 text-left outline-none transition-colors hover:bg-muted/70 focus-visible:ring-2 focus-visible:ring-ring'
        >
          <div className='relative flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm'>
            <svg
              viewBox='0 0 24 24'
              fill='none'
              className='size-4.5'
              aria-hidden='true'
            >
              <path
                d='M3 12.5 21 3l-5.2 18-4.1-7.1L3 12.5Z'
                fill='currentColor'
              />

              <path
                d='m10.7 13.9 1.7-1.7'
                stroke='currentColor'
                strokeWidth='1.5'
                strokeLinecap='round'
              />
            </svg>
          </div>

          <div className='min-w-0 group-data-[collapsible=icon]:hidden'>
            <p className='truncate text-sm font-semibold tracking-tight text-foreground'>
              AeroPass
            </p>

            <p className='mt-0.5 truncate text-[11px] font-medium text-muted-foreground'>
              Airline Operations
            </p>
          </div>
        </button>
      </SidebarHeader>

      {/* Navigation */}
      <SidebarContent className='px-2 py-3'>
        {adminNavigationGroups.map((group) => (
          <SidebarGroup key={group.label} className='mb-1 last:mb-0'>
            <SidebarGroupLabel className='mb-1 px-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground/70 group-data-[collapsible=icon]:hidden'>
              {group.label}
            </SidebarGroupLabel>

            <SidebarGroupContent>
              <SidebarMenu className='gap-0.5'>
                {group.items.map((item) => {
                  const Icon = item.icon;

                  const active =
                    pathname === item.href ||
                    pathname.startsWith(`${item.href}/`);

                  return (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton
                        type='button'
                        isActive={active}
                        tooltip={item.title}
                        onClick={() => router.push(item.href)}
                        className={[
                          'relative h-9 rounded-lg px-2.5 text-muted-foreground transition-all duration-150',
                          'hover:bg-muted hover:text-foreground',
                          'data-[active=true]:bg-primary data-[active=true]:text-primary-foreground',
                          'data-[active=true]:shadow-sm',
                        ].join(' ')}
                      >
                        {active ?
                          <span
                            aria-hidden='true'
                            className='absolute left-0.5 top-1/2 h-4 w-0.5 -translate-y-1/2 rounded-full bg-primary-foreground/90'
                          />
                        : null}

                        <Icon className='size-4 shrink-0' />

                        <span className='truncate'>{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      {/* Support */}
      <SidebarFooter className='border-t border-border/70 p-2'>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              type='button'
              tooltip={adminSupportNavigation.title}
              onClick={() => router.push(adminSupportNavigation.href)}
              className='h-9 rounded-lg px-2.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground'
            >
              <SupportIcon className='size-4 shrink-0' />

              <span className='truncate'>{adminSupportNavigation.title}</span>

              <span className='ml-auto flex size-5 items-center justify-center rounded-md bg-emerald-500/10 text-emerald-600 group-data-[collapsible=icon]:hidden'>
                <CheckCircle2 className='size-3' />
              </span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
