import type { Metadata } from 'next';

import { CustomerBookingsModule } from '@/modules/customer/bookings';

export const metadata: Metadata = {
  title: 'My Bookings',
  description:
    'View and manage your AeroPass reservations, trip details, and booking status.',
};

/**
 * Local mock account only. Replace this with the authenticated customer ID
 * from your auth/session layer before supporting multiple customer accounts.
 */
const DEMO_CUSTOMER_ID = 'user-006';

export default function CustomerBookingsPage() {
  return <CustomerBookingsModule customerId={DEMO_CUSTOMER_ID} />;
}
