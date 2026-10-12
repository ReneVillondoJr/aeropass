'use client';

import { useState, type ReactNode } from 'react';

import { CustomerHeader } from './header';
import { CustomerMobileNav } from './mobile-nav';
import { CustomerSidebar } from './sidebar';

interface CustomerShellProps {
  children: ReactNode;
  customerName?: string;
  customerEmail?: string;
  notificationCount?: number;
  onSignOut?: () => void | Promise<void>;
}

/**
 * Shared customer chrome only. Keep the single page-level <main> in
 * app/customer/layout.tsx and pass that element through children.
 */
export function CustomerShell({
  children,
  customerName = 'Customer',
  customerEmail,
  notificationCount = 0,
  onSignOut,
}: CustomerShellProps) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className='min-h-screen bg-muted/20 text-foreground'>
      <CustomerSidebar />

      <div className='min-w-0 lg:pl-72'>
        <CustomerHeader
          onOpenMobileNav={() => setMobileNavOpen(true)}
          customerName={customerName}
          customerEmail={customerEmail}
          notificationCount={notificationCount}
          onSignOut={onSignOut}
        />

        <div className='mx-auto w-full max-w-[1600px] px-4 py-6 sm:px-6 sm:py-8 lg:px-10 lg:py-10'>
          {children}
        </div>
      </div>

      <CustomerMobileNav
        open={mobileNavOpen}
        onClose={() => setMobileNavOpen(false)}
      />
    </div>
  );
}
