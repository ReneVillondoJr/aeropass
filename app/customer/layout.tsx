import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import { CustomerShell } from '@/components/customer/layout/shell';

export const metadata: Metadata = {
  title: {
    default: 'Customer Portal',
    template: '%s | AeroPass',
  },
  description:
    'Manage your AeroPass bookings, flight tickets, payments, check-in, and travel details.',
};

interface CustomerLayoutProps {
  children: ReactNode;
}

export default function CustomerLayout({ children }: CustomerLayoutProps) {
  return (
    <CustomerShell>
      <main
        id='customer-main'
        tabIndex={-1}
        className='min-h-[calc(100dvh-76px)] scroll-mt-[76px] outline-none'
      >
        {children}
      </main>
    </CustomerShell>
  );
}
