import Link from 'next/link';
import {
  ArrowUpRight,
  BaggageClaim,
  CalendarDays,
  Plane,
  UsersRound,
} from 'lucide-react';

import { CustomerStatusBadge } from '@/components/customer/shared/customer-status-badge';

import type { CustomerRefundDetail } from '@/modules/customer/refunds/types/refund';

interface RefundBookingSummaryProps {
  record: CustomerRefundDetail;
}

function formatDateTime(date: string, time: string) {
  const normalizedTime = time.length === 5 ? `${time}:00` : time;
  const value = new Date(`${date}T${normalizedTime}+08:00`);

  if (Number.isNaN(value.getTime())) {
    return 'Schedule unavailable';
  }

  return new Intl.DateTimeFormat('en-PH', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Asia/Manila',
  }).format(value);
}

function formatMoney(amount: number, currency: string) {
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function RefundBookingSummary({ record }: RefundBookingSummaryProps) {
  const { booking, flight, passengers, baggage, tickets } = record;
  const flightRecord = flight?.flight;

  return (
    <section className='overflow-hidden rounded-2xl border border-border/70 bg-card shadow-sm'>
      <div className='flex items-center gap-3 border-b border-border/60 px-4 py-4 sm:px-5'>
        <span className='flex size-9 items-center justify-center rounded-xl bg-[#EEF7FB] text-[#2879A8]'>
          <Plane className='size-4' aria-hidden='true' />
        </span>

        <div className='min-w-0'>
          <h2 className='text-sm font-semibold text-foreground'>
            Associated booking
          </h2>

          <p className='mt-0.5 text-xs text-muted-foreground'>
            {booking.bookingReference}
          </p>
        </div>

        <div className='ml-auto'>
          <CustomerStatusBadge status={booking.status} />
        </div>
      </div>

      <div className='p-4 sm:p-5'>
        {flightRecord && flight?.origin && flight.destination ?
          <div className='rounded-2xl border border-border/70 p-4'>
            <div className='flex items-center justify-between gap-3'>
              <p className='text-xs font-semibold text-muted-foreground'>
                Flight {flightRecord.flightNumber}
              </p>

              <CustomerStatusBadge status={flightRecord.status} />
            </div>

            <div className='mt-5 grid grid-cols-[1fr_auto_1fr] items-center gap-3'>
              <div className='min-w-0'>
                <p className='text-2xl font-semibold tracking-tight text-foreground'>
                  {flight.origin.code}
                </p>

                <p className='mt-1 truncate text-xs text-muted-foreground'>
                  {flight.origin.city}
                </p>

                <p className='mt-2 text-[10px] text-muted-foreground'>
                  {formatDateTime(
                    flightRecord.departureDate,
                    flightRecord.departureTime,
                  )}
                </p>

                <p className='mt-1 text-[10px] text-muted-foreground'>
                  Terminal {flightRecord.terminal}
                </p>
              </div>

              <Plane className='size-5 text-[#5BA9D6]' aria-hidden='true' />

              <div className='min-w-0 text-right'>
                <p className='text-2xl font-semibold tracking-tight text-foreground'>
                  {flight.destination.code}
                </p>

                <p className='mt-1 truncate text-xs text-muted-foreground'>
                  {flight.destination.city}
                </p>

                <p className='mt-2 text-[10px] text-muted-foreground'>
                  {formatDateTime(
                    flightRecord.arrivalDate,
                    flightRecord.arrivalTime,
                  )}
                </p>

                <p className='mt-1 text-[10px] text-muted-foreground'>
                  Gate {flightRecord.gate}
                </p>
              </div>
            </div>

            {flightRecord.delayMinutes > 0 ?
              <p className='mt-4 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs leading-5 text-amber-900'>
                The local flight record shows a delay of{' '}
                {flightRecord.delayMinutes} minutes.
              </p>
            : null}
          </div>
        : <p className='text-xs text-muted-foreground'>
            Flight information is not available for this booking.
          </p>
        }

        <div className='mt-4 grid gap-3 sm:grid-cols-2'>
          <div className='rounded-xl bg-muted/35 p-3'>
            <p className='text-[10px] font-medium uppercase tracking-[0.1em] text-muted-foreground'>
              Original booking total
            </p>

            <p className='mt-2 text-lg font-semibold text-foreground'>
              {formatMoney(booking.total, booking.currency)}
            </p>

            <p className='mt-1 text-[10px] text-muted-foreground'>
              Payment status: {booking.paymentStatus.replaceAll('_', ' ')}
            </p>
          </div>

          <div className='rounded-xl bg-muted/35 p-3'>
            <p className='text-[10px] font-medium uppercase tracking-[0.1em] text-muted-foreground'>
              Payment details
            </p>

            <p className='mt-2 text-xs font-semibold text-foreground'>
              {booking.paymentMethod.replaceAll('_', ' ')}
            </p>

            <p className='mt-1 break-all text-[10px] text-muted-foreground'>
              {record.payment?.providerReference ??
                'Payment reference unavailable'}
            </p>
          </div>
        </div>

        <div className='mt-5'>
          <p className='flex items-center gap-2 text-xs font-semibold text-foreground'>
            <UsersRound
              className='size-4 text-muted-foreground'
              aria-hidden='true'
            />
            Passengers
          </p>

          {passengers.length > 0 ?
            <div className='mt-3 divide-y divide-border/60 rounded-xl border border-border/70 px-3'>
              {passengers.map((passenger) => (
                <div
                  key={passenger.id}
                  className='flex flex-wrap items-center justify-between gap-2 py-3'
                >
                  <div className='min-w-0'>
                    <p className='text-xs font-semibold text-foreground'>
                      {[
                        passenger.firstName,
                        passenger.middleName,
                        passenger.lastName,
                      ]
                        .filter(Boolean)
                        .join(' ')}
                    </p>

                    <p className='mt-1 text-[10px] text-muted-foreground'>
                      {passenger.nationality}
                    </p>
                  </div>

                  {passenger.specialAssistance ?
                    <span className='rounded-full bg-amber-50 px-2.5 py-1 text-[10px] font-semibold text-amber-800'>
                      Special assistance
                    </span>
                  : null}
                </div>
              ))}
            </div>
          : <p className='mt-2 text-xs text-muted-foreground'>
              Passenger records are unavailable.
            </p>
          }
        </div>

        <div className='mt-5 grid gap-3 sm:grid-cols-2'>
          <div className='rounded-xl border border-border/70 p-3'>
            <p className='flex items-center gap-2 text-xs font-semibold text-foreground'>
              <CalendarDays
                className='size-4 text-muted-foreground'
                aria-hidden='true'
              />
              Booking created
            </p>

            <p className='mt-2 text-xs text-muted-foreground'>
              {new Intl.DateTimeFormat('en-PH', {
                dateStyle: 'medium',
                timeStyle: 'short',
                timeZone: 'Asia/Manila',
              }).format(new Date(booking.createdAt))}
            </p>
          </div>

          <div className='rounded-xl border border-border/70 p-3'>
            <p className='flex items-center gap-2 text-xs font-semibold text-foreground'>
              <BaggageClaim
                className='size-4 text-muted-foreground'
                aria-hidden='true'
              />
              Related records
            </p>

            <p className='mt-2 text-xs text-muted-foreground'>
              {tickets.length} ticket(s) · {baggage.length} baggage record(s)
            </p>
          </div>
        </div>

        <div className='mt-5 flex flex-wrap gap-2 border-t border-border/60 pt-4'>
          <Link
            href={`/customer/bookings/${encodeURIComponent(booking.id)}`}
            className='inline-flex min-h-9 items-center justify-center gap-2 rounded-xl bg-[#102A43] px-3.5 py-2 text-xs font-semibold text-white outline-none transition hover:bg-[#183F5D] focus-visible:ring-2 focus-visible:ring-[#5BA9D6] focus-visible:ring-offset-2'
          >
            View booking
            <ArrowUpRight className='size-3.5' aria-hidden='true' />
          </Link>

          <Link
            href='/customer/payments'
            className='inline-flex min-h-9 items-center justify-center gap-2 rounded-xl border border-border bg-background px-3.5 py-2 text-xs font-semibold text-foreground outline-none transition hover:bg-muted focus-visible:ring-2 focus-visible:ring-[#5BA9D6] focus-visible:ring-offset-2'
          >
            Payment history
            <ArrowUpRight className='size-3.5' aria-hidden='true' />
          </Link>
        </div>
      </div>
    </section>
  );
}
