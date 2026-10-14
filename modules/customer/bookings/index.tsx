import { AlertCircle } from 'lucide-react';

import { CustomerEmptyState } from '@/components/customer/shared/empty-state';

import { BookingStats } from './components/booking-stats';
import { BookingsExplorer } from './components/bookings-explorer';
import { BookingsHeader } from './components/bookings-header';
import { getCustomerBookingsView } from './data/booking-view';

interface CustomerBookingsModuleProps {
  /** Must be the ID of the currently authenticated CUSTOMER account. */
  customerId: string;
}

export function CustomerBookingsModule({ customerId }: CustomerBookingsModuleProps) {
  const view = getCustomerBookingsView(customerId);

  if (!view.accountAvailable) {
    return (
      <section className="space-y-6">
        <CustomerEmptyState
          title="Customer account unavailable"
          description="We couldn’t load an active AeroPass customer account. Sign in with your customer account and try again."
          icon={AlertCircle}
          actionLabel="Return to sign in"
          actionHref="/login"
        />
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <BookingsHeader customerName={view.customerName.split(' ')[0] ?? view.customerName} />
      <BookingStats stats={view.stats} />
      <BookingsExplorer bookings={view.bookings} />
    </section>
  );
}
