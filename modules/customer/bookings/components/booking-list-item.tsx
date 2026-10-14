import { CalendarClock, CreditCard, Ticket } from 'lucide-react';

import { BookingCard } from '@/components/customer/shared/booking-card';
import { CustomerStatusBadge } from '@/components/customer/shared/customer-status-badge';

import type { CustomerBookingItem } from '../types/booking';

interface BookingListItemProps {
  booking: CustomerBookingItem;
}

function formatDate(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'Date unavailable';

  return new Intl.DateTimeFormat('en-PH', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'Asia/Manila',
  }).format(date);
}

export function BookingListItem({ booking }: BookingListItemProps) {
  return (
    <div className="space-y-2.5">
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 px-1">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[11px] text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <CalendarClock className="size-3.5" aria-hidden="true" />
            Booked {formatDate(booking.createdAt)}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Ticket className="size-3.5" aria-hidden="true" />
            {booking.ticketCount} {booking.ticketCount === 1 ? 'issued ticket' : 'issued tickets'}
          </span>
        </div>
        <span className="inline-flex items-center gap-1.5 text-[11px] text-muted-foreground">
          <CreditCard className="size-3.5" aria-hidden="true" />
          Payment <CustomerStatusBadge status={booking.paymentStatus} />
        </span>
      </div>
      <BookingCard
        booking={booking}
        href={`/customer/bookings/${booking.id}`}
      />
    </div>
  );
}
