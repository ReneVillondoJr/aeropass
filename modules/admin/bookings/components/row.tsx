import {
  BadgeCheck,
  ChevronRight,
  CircleDollarSign,
  CreditCard,
  Plane,
  Users,
} from 'lucide-react';

import {
  bookingStatusMeta,
  formatDate,
  formatPhp,
  paymentMethodMeta,
  paymentStatusMeta,
} from '../data/booking';

import type { BookingListItem } from '../types/booking';

interface BookingRowProps {
  item: BookingListItem;

  selected: boolean;

  onSelect: (bookingId: string) => void;
}

export function BookingRow({ item, selected, onSelect }: BookingRowProps) {
  const booking = item.booking;

  const bookingStatus = bookingStatusMeta[booking.status];

  const paymentStatus = paymentStatusMeta[booking.paymentStatus];

  return (
    <button
      type='button'
      onClick={() => onSelect(booking.id)}
      className={[
        'w-full min-w-0 rounded-2xl border p-5 text-left transition-all',
        'focus:outline-none focus:ring-2 focus:ring-[#5BA9D6]/30',
        selected ?
          'border-[#5BA9D6]/60 bg-[#EEF7FB] shadow-sm'
        : 'border-border/70 bg-background hover:border-border hover:bg-muted/20',
      ].join(' ')}
    >
      <div className='flex min-w-0 flex-col gap-5'>
        {/* Header */}
        <div className='flex min-w-0 items-start justify-between gap-4'>
          <div className='flex min-w-0 items-start gap-3'>
            <div className='flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#102A43] text-white'>
              <CircleDollarSign className='size-5' />
            </div>

            <div className='min-w-0'>
              <div className='flex min-w-0 flex-wrap items-center gap-2'>
                <h3 className='truncate text-base font-semibold tracking-tight'>
                  {booking.bookingReference}
                </h3>

                <span
                  className={[
                    'shrink-0 rounded-full px-2.5 py-1 text-[10px] font-semibold',
                    bookingStatus.className,
                  ].join(' ')}
                >
                  {bookingStatus.label}
                </span>
              </div>

              <p className='mt-1 break-words text-xs text-muted-foreground'>
                {item.customerName}
                {' · '}
                {item.customerEmail}
              </p>
            </div>
          </div>

          <ChevronRight
            className={[
              'mt-1 size-4 shrink-0',
              selected ? 'text-[#102A43]' : 'text-muted-foreground',
            ].join(' ')}
          />
        </div>

        {/* Flight */}
        <div className='min-w-0 rounded-xl border border-border/60 bg-muted/10 p-3.5'>
          {item.flight ?
            <div className='flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center'>
              <div className='min-w-0 shrink-0'>
                <div className='flex items-center gap-2'>
                  <Plane className='size-3.5 text-[#5BA9D6]' />

                  <span className='text-sm font-semibold tabular-nums'>
                    {item.flight.flightNumber}
                  </span>
                </div>

                <p className='mt-1 text-xs text-muted-foreground'>
                  {formatDate(item.flight.flight.departureDate)}
                </p>
              </div>

              <div className='flex min-w-0 flex-1 items-center gap-2'>
                <div className='min-w-0'>
                  <p className='text-sm font-semibold'>
                    {item.flight.originCode}
                  </p>

                  <p className='truncate text-[10px] text-muted-foreground'>
                    {item.flight.originCity}
                  </p>
                </div>

                <div className='flex min-w-[55px] flex-1 items-center gap-1'>
                  <div className='h-px flex-1 bg-border' />

                  <Plane className='size-3 shrink-0 text-[#5BA9D6]' />

                  <div className='h-px flex-1 bg-border' />
                </div>

                <div className='min-w-0 text-right'>
                  <p className='text-sm font-semibold'>
                    {item.flight.destinationCode}
                  </p>

                  <p className='truncate text-[10px] text-muted-foreground'>
                    {item.flight.destinationCity}
                  </p>
                </div>
              </div>
            </div>
          : <p className='text-xs text-muted-foreground'>
              Flight details unavailable.
            </p>
          }
        </div>

        {/* Metrics */}
        <div className='grid gap-3 sm:grid-cols-2 xl:grid-cols-4'>
          <Metric
            icon={<Users className='size-3.5' />}
            label='Passengers'
            value={item.totalPassengers}
          />

          <Metric
            icon={<BadgeCheck className='size-3.5' />}
            label='Reservations'
            value={item.totalReservations}
          />

          <Metric
            icon={<CreditCard className='size-3.5' />}
            label='Payment'
            value={paymentStatus.label}
          />

          <Metric
            icon={<CircleDollarSign className='size-3.5' />}
            label='Total'
            value={formatPhp(booking.total)}
          />
        </div>

        {/* Footer */}
        <div className='flex min-w-0 flex-col gap-3 border-t border-border/60 pt-4 sm:flex-row sm:items-center sm:justify-between'>
          <div className='flex min-w-0 flex-wrap items-center gap-2'>
            <span className='rounded-full border border-border/70 bg-background px-2.5 py-1 text-[10px] font-medium'>
              {item.fareClassName ?? 'Fare unavailable'}
            </span>

            <span className='rounded-full border border-border/70 bg-background px-2.5 py-1 text-[10px] font-medium'>
              {paymentMethodMeta[booking.paymentMethod].label}
            </span>
          </div>

          <p className='shrink-0 text-xs text-muted-foreground'>
            Booked{' '}
            <span className='font-medium text-foreground'>
              {formatDate(booking.createdAt)}
            </span>
          </p>
        </div>
      </div>
    </button>
  );
}

function Metric({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}) {
  return (
    <div className='min-w-0 rounded-xl border border-border/60 bg-background/70 p-3'>
      <div className='flex min-w-0 items-center gap-1.5 text-muted-foreground'>
        {icon}

        <span className='truncate text-[10px] font-medium uppercase tracking-[0.06em]'>
          {label}
        </span>
      </div>

      <p className='mt-1.5 truncate text-sm font-semibold tabular-nums'>
        {value}
      </p>
    </div>
  );
}
