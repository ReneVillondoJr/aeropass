import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import { CustomerShell } from '@/components/customer/layout/shell';
import {
  getCustomerNotifications,
  getNotificationStats,
} from '@/modules/customer/notifications/data/notification';

const DEMO_CUSTOMER_ID = 'user-006';

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
  const notificationCount = getNotificationStats(
    getCustomerNotifications(DEMO_CUSTOMER_ID),
  ).unread;

  return (
    <CustomerShell notificationCount={notificationCount}>
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
