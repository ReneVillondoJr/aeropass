import { Ticket } from 'lucide-react';

import type { BookingListItem } from '../types/booking';

import { BookingRow } from './row';

interface BookingListProps {
  bookings: BookingListItem[];

  selectedBookingId: string | null;

  onSelect: (bookingId: string) => void;
}

export function BookingList({
  bookings,
  selectedBookingId,
  onSelect,
}: BookingListProps) {
  return (
    <section className='min-w-0 rounded-2xl border border-border/70 bg-background p-4 shadow-sm sm:p-5'>
      {/* Header */}
      <div className='mb-4 flex min-w-0 flex-col gap-2 sm:flex-row sm:items-center sm:justify-between'>
        <div className='min-w-0'>
          <div className='flex items-center gap-2'>
            <Ticket className='size-4 text-[#5BA9D6]' />

            <h2 className='text-sm font-semibold'>Booking roster</h2>
          </div>

          <p className='mt-1 text-xs leading-5 text-muted-foreground'>
            Customer reservations and travel records.
          </p>
        </div>

        <span className='w-fit shrink-0 rounded-full bg-[#EEF7FB] px-2.5 py-1 text-[10px] font-semibold text-[#102A43]'>
          {bookings.length} {bookings.length === 1 ? 'booking' : 'bookings'}
        </span>
      </div>

      {/* Scrollable booking list */}
      {bookings.length > 0 ?
        <div className='max-h-630 overflow-y-auto overscroll-contain pr-1'>
          <div className='grid min-w-0 gap-3'>
            {bookings.map((item) => (
              <BookingRow
                key={item.booking.id}
                item={item}
                selected={item.booking.id === selectedBookingId}
                onSelect={onSelect}
              />
            ))}
          </div>
        </div>
      : <div className='rounded-2xl border border-dashed border-border p-10 text-center'>
          <div className='mx-auto flex size-11 items-center justify-center rounded-full bg-muted'>
            <Ticket className='size-5 text-muted-foreground' />
          </div>

          <h3 className='mt-4 text-sm font-semibold'>No bookings found</h3>

          <p className='mx-auto mt-1 max-w-sm text-xs leading-5 text-muted-foreground'>
            Try adjusting your search or booking filters.
          </p>
        </div>
      }
    </section>
  );
}
