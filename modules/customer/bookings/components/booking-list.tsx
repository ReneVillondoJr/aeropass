import { BookOpenCheck, SearchX } from 'lucide-react';

import { CustomerEmptyState } from '@/components/customer/shared/empty-state';

import type { CustomerBookingItem } from '../types/booking';
import { BookingListItem } from './booking-list-item';

interface BookingListProps {
  bookings: CustomerBookingItem[];
  hasFilters: boolean;
  onReset: () => void;
}

export function BookingList({ bookings, hasFilters, onReset }: BookingListProps) {
  if (bookings.length === 0) {
    return (
      <CustomerEmptyState
        title={hasFilters ? 'No bookings match your filters' : 'Your bookings will appear here'}
        description={hasFilters
          ? 'Try another search term or clear the filters to see all your reservations.'
          : 'Search for a flight and complete a reservation to start building your AeroPass trip history.'}
        icon={hasFilters ? SearchX : BookOpenCheck}
        actionLabel={hasFilters ? 'Clear filters' : 'Search flights'}
        actionHref={hasFilters ? undefined : '/search'}
        onAction={hasFilters ? onReset : undefined}
      />
    );
  }

  return (
    <section className="space-y-5" aria-label="Your bookings">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-sm font-semibold text-foreground">Your reservations</h2>
        <p className="text-xs text-muted-foreground">
          Showing <span className="font-semibold text-foreground">{bookings.length}</span> {bookings.length === 1 ? 'booking' : 'bookings'}
        </p>
      </div>
      <div className="space-y-5">
        {bookings.map((booking) => (
          <BookingListItem key={booking.id} booking={booking} />
        ))}
      </div>
    </section>
  );
}
