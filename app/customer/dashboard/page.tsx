import type { Metadata } from 'next';

import { CustomerDashboardModule } from '@/modules/customer/dashboard';

export const metadata: Metadata = {
  title: 'Dashboard',
  description:
    'View your upcoming trips, manage AeroPass bookings, and stay updated on your travel plans.',
};

export default function CustomerDashboardPage() {
  return <CustomerDashboardModule />;
}
