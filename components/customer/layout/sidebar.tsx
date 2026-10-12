'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Plane } from 'lucide-react';

import {
  customerNavigation,
  isCustomerNavigationItemActive,
  type CustomerNavigationGroup,
} from './navigation';

interface CustomerSidebarProps {
  variant?: 'desktop' | 'mobile';
  onNavigate?: () => void;
}

const navigationGroups: CustomerNavigationGroup[] = [
  'Overview',
  'Travel',
  'Account',
];

export function CustomerSidebar({
  variant = 'desktop',
  onNavigate,
}: CustomerSidebarProps) {
  const pathname = usePathname();
  const isMobile = variant === 'mobile';

  return (
    <aside
      aria-label='Customer navigation'
      className={[
        'flex flex-col border-r border-border/70 bg-card',
        isMobile ? 'h-full w-72' : (
          'fixed inset-y-0 left-0 z-30 hidden w-72 lg:flex'
        ),
      ].join(' ')}
    >
      <Link
        href='/customer/dashboard'
        onClick={onNavigate}
        className='flex h-[76px] shrink-0 items-center gap-3 border-b border-border/70 px-6 outline-none transition-colors hover:bg-muted/40 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#5BA9D6]'
      >
        <span className='flex size-10 items-center justify-center rounded-xl bg-[#102A43] text-white shadow-sm'>
          <Plane className='size-5' aria-hidden='true' />
        </span>
        <span className='min-w-0'>
          <span className='block text-base font-bold tracking-tight text-foreground'>
            AeroPass
          </span>
          <span className='mt-0.5 block text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground'>
            Customer portal
          </span>
        </span>
      </Link>

      <nav
        className='flex-1 space-y-6 overflow-y-auto px-3 py-5'
        aria-label='Main menu'
      >
        {navigationGroups.map((group) => {
          const items = customerNavigation.filter(
            (item) => item.group === group,
          );

          return (
            <div key={group} className='space-y-1.5'>
              <p className='px-3 pb-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground/80'>
                {group}
              </p>

              {items.map((item) => {
                const Icon = item.icon;
                const active = isCustomerNavigationItemActive(pathname, item);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onNavigate}
                    aria-current={active ? 'page' : undefined}
                    className={[
                      'group flex min-h-10 items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[#5BA9D6]',
                      active ?
                        'bg-[#EEF7FB] text-[#102A43] shadow-sm'
                      : 'text-muted-foreground hover:bg-muted/70 hover:text-foreground',
                    ].join(' ')}
                  >
                    <Icon
                      className={[
                        'size-[17px] shrink-0 transition-colors',
                        active ? 'text-[#2879A8]' : (
                          'text-muted-foreground group-hover:text-foreground'
                        ),
                      ].join(' ')}
                      aria-hidden='true'
                    />
                    <span className='flex-1'>{item.title}</span>
                    {active ?
                      <span
                        className='size-1.5 rounded-full bg-[#5BA9D6]'
                        aria-hidden='true'
                      />
                    : null}
                  </Link>
                );
              })}
            </div>
          );
        })}
      </nav>

      <div className='shrink-0 border-t border-border/70 p-4'>
        <div className='rounded-2xl border border-[#D9EAF3] bg-[#F4FAFD] p-4'>
          <div className='flex size-8 items-center justify-center rounded-lg bg-white text-[#2879A8] shadow-sm'>
            <Plane className='size-4' aria-hidden='true' />
          </div>
          <p className='mt-3 text-sm font-semibold text-[#102A43]'>
            Ready for your next trip?
          </p>
          <p className='mt-1 text-xs leading-5 text-[#486581]'>
            Find a route and plan your next journey with AeroPass.
          </p>
          <Link
            href='/'
            onClick={onNavigate}
            className='mt-3 inline-flex items-center gap-1 text-xs font-semibold text-[#176B96] outline-none hover:text-[#102A43] focus-visible:underline'
          >
            Explore flights <span aria-hidden='true'>→</span>
          </Link>
        </div>
        <p className='mt-4 px-1 text-[10px] text-muted-foreground'>
          AeroPass · Customer services
        </p>
      </div>
    </aside>
  );
}
