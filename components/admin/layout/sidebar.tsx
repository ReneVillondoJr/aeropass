'use client';

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
      <SidebarHeader className='border-b border-border/70'>
        <button
          type='button'
          onClick={() => router.push('/admin/dashboard')}
          className='flex h-16 w-full items-center gap-3 px-2 text-left outline-none focus-visible:ring-2 focus-visible:ring-ring'
        >
          <div className='flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm'>
            <svg
              viewBox='0 0 24 24'
              fill='none'
              className='size-4'
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
            <p className='truncate text-sm font-semibold tracking-tight'>
              AeroPass
            </p>

            <p className='truncate text-xs text-muted-foreground'>
              Airline Operations
            </p>
          </div>
        </button>
      </SidebarHeader>

      <SidebarContent className='px-2 py-3'>
        {adminNavigationGroups.map((group) => (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel className='px-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground/80 group-data-[collapsible=icon]:hidden'>
              {group.label}
            </SidebarGroupLabel>

            <SidebarGroupContent>
              <SidebarMenu>
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
                        className='h-9 rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground data-[active=true]:bg-primary data-[active=true]:text-primary-foreground data-[active=true]:shadow-sm'
                      >
                        <Icon className='size-4' />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className='border-t border-border/70 p-2'>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              type='button'
              tooltip={adminSupportNavigation.title}
              onClick={() => router.push(adminSupportNavigation.href)}
              className='h-9 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground'
            >
              <SupportIcon className='size-4' />
              <span>{adminSupportNavigation.title}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
