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
      className='border-r border-border/60'
    >
      {/* Brand */}
      <SidebarHeader className='border-b border-border/60 p-3 group-data-[collapsible=icon]:p-2'>
        <button
          type='button'
          aria-label='Go to dashboard'
          onClick={() => router.push('/admin/dashboard')}
          className='group/brand flex min-h-12 w-full min-w-0 items-center gap-3 rounded-xl px-2 text-left outline-none transition-colors hover:bg-muted/60 focus-visible:ring-2 focus-visible:ring-ring group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:gap-0 group-data-[collapsible=icon]:px-0'
        >
          <div className='relative flex size-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-sm ring-1 ring-inset ring-white/10 transition-transform duration-200 group-hover/brand:scale-[1.03] group-data-[collapsible=icon]:size-8'>
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
            <p className='truncate text-sm font-semibold leading-none tracking-tight text-foreground'>
              AeroPass
            </p>

            <p className='mt-1.5 truncate text-[10px] font-medium uppercase leading-none tracking-[0.12em] text-muted-foreground'>
              Airline Operations
            </p>
          </div>
        </button>
      </SidebarHeader>

      {/* Navigation */}
      <SidebarContent className='gap-0 px-2 py-4'>
        {adminNavigationGroups.map((group) => (
          <SidebarGroup key={group.label} className='mb-2 p-0 last:mb-0'>
            <SidebarGroupLabel className='mb-1.5 h-auto px-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground/60 group-data-[collapsible=icon]:hidden'>
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
                          'relative h-9 rounded-lg px-3 text-[13px] font-medium text-muted-foreground transition-colors duration-150',
                          'hover:bg-muted/70 hover:text-foreground',
                          'data-[active=true]:bg-primary/10 data-[active=true]:font-semibold data-[active=true]:text-primary',
                          'data-[active=true]:hover:bg-primary/15',
                        ].join(' ')}
                      >
                        {active ?
                          <span
                            aria-hidden='true'
                            className='absolute -left-2 top-1/2 h-5 w-1 -translate-y-1/2 rounded-r-full bg-primary group-data-[collapsible=icon]:-left-1'
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
      <SidebarFooter className='border-t border-border/60 p-2'>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              type='button'
              tooltip={adminSupportNavigation.title}
              onClick={() => router.push(adminSupportNavigation.href)}
              className='h-10 rounded-lg border border-border/60 bg-muted/30 px-3 text-[13px] font-medium text-muted-foreground transition-colors hover:border-border hover:bg-muted/70 hover:text-foreground group-data-[collapsible=icon]:border-transparent group-data-[collapsible=icon]:bg-transparent'
            >
              <SupportIcon className='size-4 shrink-0' />

              <span className='truncate'>{adminSupportNavigation.title}</span>

              <span className='ml-auto flex size-5 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 group-data-[collapsible=icon]:hidden'>
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
