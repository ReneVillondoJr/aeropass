import Link from 'next/link';
import { ArrowRight, BookOpenCheck } from 'lucide-react';

import { BookingCard } from '@/components/customer/shared/booking-card';
import { CustomerEmptyState } from '@/components/customer/shared/empty-state';
import type { BookingCardData } from '@/components/customer/shared/booking-card';

interface RecentBookingsProps {
  bookings: BookingCardData[];
}

export function RecentBookings({ bookings }: RecentBookingsProps) {
  return (
    <section className="space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#2879A8]">Booking history</p>
          <h2 className="mt-1 text-base font-semibold tracking-tight text-foreground">Recent bookings</h2>
          <p className="mt-1 text-xs text-muted-foreground">Your latest reservations and their current status.</p>
        </div>
        <Link
          href="/customer/bookings"
          className="inline-flex min-h-9 items-center gap-1.5 rounded-lg px-2 py-1 text-xs font-semibold text-[#2879A8] outline-none transition hover:bg-[#EEF7FB] focus-visible:ring-2 focus-visible:ring-[#5BA9D6]"
        >
          View all <ArrowRight className="size-3.5" aria-hidden="true" />
        </Link>
      </div>

      {bookings.length > 0 ? (
        <div className="space-y-3">
          {bookings.map((booking) => (
            <BookingCard
              key={booking.id}
              booking={booking}
              href={`/customer/bookings/${booking.id}`}
            />
          ))}
        </div>
      ) : (
        <CustomerEmptyState
          title="Your bookings will appear here"
          description="Search for a flight and complete a reservation to start building your trip history."
          icon={BookOpenCheck}
          actionLabel="Search flights"
          actionHref="/search"
        />
      )}
    </section>
  );
}
