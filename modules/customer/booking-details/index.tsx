import Link from 'next/link';
import { AlertCircle, ArrowLeft, ArrowUpRight, Ticket } from 'lucide-react';

import { CustomerEmptyState } from '@/components/customer/shared/empty-state';
import { CustomerPageHeader } from '@/components/customer/shared/customer-page-header';
import { CustomerStatusBadge } from '@/components/customer/shared/customer-status-badge';
import { BookingItinerary } from './components/booking-itinerary';
import { BookingPassengers } from './components/booking-passengers';
import { BookingPaymentSummary } from './components/booking-payment-summary';
import { getCustomerBookingDetailView } from '@/modules/customer/bookings/data/booking-view';

interface CustomerBookingDetailsModuleProps {
  customerId: string;
  bookingId: string;
}

export function CustomerBookingDetailsModule({
  customerId,
  bookingId,
}: CustomerBookingDetailsModuleProps) {
  const booking = getCustomerBookingDetailView(customerId, bookingId);

  if (!booking) {
    return (
      <section className="space-y-6">
        <CustomerEmptyState
          title="Booking not found"
          description="We couldn’t find that booking in your customer account. Check your booking list or sign in with the account used to make the reservation."
          icon={AlertCircle}
          actionLabel="Return to my bookings"
          actionHref="/customer/bookings"
        />
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <div>
        <Link href="/customer/bookings" className="inline-flex min-h-9 items-center gap-2 rounded-lg px-2 text-xs font-semibold text-muted-foreground outline-none transition hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-[#5BA9D6]">
          <ArrowLeft className="size-3.5" aria-hidden="true" />
          Back to my bookings
        </Link>
      </div>

      <CustomerPageHeader
        eyebrow={`Reservation ${booking.bookingReference}`}
        title="Booking details"
        description="Review your itinerary, passengers, ticket records, and payment summary for this reservation."
        actions={<CustomerStatusBadge status={booking.status} className="px-3 py-1.5 text-xs" />}
      />

      <div className="flex flex-wrap gap-2">
        <Link href="/customer/tickets" className="inline-flex min-h-9 items-center gap-2 rounded-xl bg-[#102A43] px-3.5 py-2 text-xs font-semibold text-white outline-none transition hover:bg-[#183F5D] focus-visible:ring-2 focus-visible:ring-[#5BA9D6] focus-visible:ring-offset-2">
          <Ticket className="size-3.5" aria-hidden="true" />
          My tickets
          <ArrowUpRight className="size-3.5" aria-hidden="true" />
        </Link>
        {booking.needsAttention ? (
          <Link href="/customer/payments" className="inline-flex min-h-9 items-center gap-2 rounded-xl border border-border bg-card px-3.5 py-2 text-xs font-semibold text-foreground outline-none transition hover:bg-muted focus-visible:ring-2 focus-visible:ring-[#5BA9D6] focus-visible:ring-offset-2">
            Review payment <ArrowUpRight className="size-3.5" aria-hidden="true" />
          </Link>
        ) : null}
      </div>

      <div className="grid min-w-0 gap-6 xl:grid-cols-[minmax(0,1.15fr)_minmax(330px,0.85fr)]">
        <div className="min-w-0 space-y-6">
          <BookingItinerary booking={booking} />
          <BookingPassengers
            passengers={booking.passengers}
            reservations={booking.reservations}
            tickets={booking.tickets}
          />
        </div>
        <div className="min-w-0">
          <BookingPaymentSummary booking={booking} />
        </div>
      </div>
    </section>
  );
}
