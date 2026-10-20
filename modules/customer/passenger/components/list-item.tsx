import Link from 'next/link';
import {
  Accessibility,
  Armchair,
  ArrowUpRight,
  Mail,
  Phone,
  Plane,
  Ticket,
} from 'lucide-react';

import { CustomerStatusBadge } from '@/components/customer/shared/customer-status-badge';

import type { CustomerPassengerRecord } from '../types/passenger';

interface PassengerListItemProps {
  record: CustomerPassengerRecord;
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

function getPassengerName(record: CustomerPassengerRecord) {
  const { firstName, middleName, lastName } = record.passenger;

  return [firstName, middleName, lastName].filter(Boolean).join(' ');
}

export function PassengerListItem({ record }: PassengerListItemProps) {
  const { passenger, booking, flight, reservation, tickets } = record;

  const checkedIn = tickets.some(
    (ticket) => ticket.checkIn?.status === 'COMPLETED',
  );

  return (
    <Link
      href={`/customer/passengers/${encodeURIComponent(passenger.id)}`}
      className='group block rounded-2xl border border-border/70 bg-card p-4 shadow-sm outline-none transition-all hover:border-[#B8D6E6] hover:shadow-md focus-visible:ring-2 focus-visible:ring-[#5BA9D6] focus-visible:ring-offset-2 sm:p-5'
    >
      <div className='flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between'>
        <div className='flex min-w-0 items-start gap-3'>
          <span className='flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#EEF7FB] text-[#2879A8]'>
            <span className='text-sm font-semibold'>
              {passenger.firstName.charAt(0)}
              {passenger.lastName.charAt(0)}
            </span>
          </span>

          <div className='min-w-0'>
            <div className='flex flex-wrap items-center gap-2'>
              <h3 className='break-words text-sm font-semibold text-foreground'>
                {getPassengerName(record)}
              </h3>

              {passenger.specialAssistance ?
                <span className='inline-flex items-center gap-1 rounded-full border border-amber-200 bg-amber-50 px-2 py-0.5 text-[9px] font-semibold text-amber-800'>
                  <Accessibility className='size-3' aria-hidden='true' />
                  Special assistance
                </span>
              : null}
            </div>

            <p className='mt-1 flex min-w-0 items-center gap-1.5 break-all text-xs text-muted-foreground'>
              <Mail className='size-3 shrink-0' aria-hidden='true' />
              {passenger.email}
            </p>

            <p className='mt-1 flex min-w-0 items-center gap-1.5 text-xs text-muted-foreground'>
              <Phone className='size-3 shrink-0' aria-hidden='true' />
              {passenger.phone}
            </p>
          </div>
        </div>

        <div className='flex flex-wrap gap-2 sm:justify-end'>
          <CustomerStatusBadge status={booking.status} />

          {tickets.length > 0 ?
            <CustomerStatusBadge status={tickets[0].status} />
          : <span className='inline-flex items-center rounded-full border border-border bg-muted/60 px-2.5 py-1 text-[10px] font-semibold text-muted-foreground'>
              No ticket
            </span>
          }

          {checkedIn ?
            <CustomerStatusBadge status='CHECKED_IN' />
          : null}
        </div>
      </div>

      <div className='mt-4 grid gap-3 rounded-xl bg-muted/35 p-3 sm:grid-cols-2 xl:grid-cols-4'>
        <div className='min-w-0'>
          <p className='text-[9px] font-semibold uppercase tracking-[0.1em] text-muted-foreground'>
            Booking reference
          </p>

          <p className='mt-1 break-all font-mono text-xs font-semibold text-foreground'>
            {booking.bookingReference}
          </p>

          <p className='mt-1 text-[10px] text-muted-foreground'>
            {booking.paymentStatus.replaceAll('_', ' ')} ·{' '}
            {booking.paymentMethod.replaceAll('_', ' ')}
          </p>
        </div>

        <div className='min-w-0'>
          <p className='flex items-center gap-1.5 text-[9px] font-semibold uppercase tracking-[0.1em] text-muted-foreground'>
            <Plane className='size-3' aria-hidden='true' />
            Flight & route
          </p>

          <p className='mt-1 text-xs font-semibold text-foreground'>
            {flight.flight.flightNumber} · {flight.origin.code} →{' '}
            {flight.destination.code}
          </p>

          <p className='mt-1 truncate text-[10px] text-muted-foreground'>
            {flight.origin.city} to {flight.destination.city}
          </p>
        </div>

        <div className='min-w-0'>
          <p className='text-[9px] font-semibold uppercase tracking-[0.1em] text-muted-foreground'>
            Departure
          </p>

          <p className='mt-1 text-xs font-medium text-foreground'>
            {formatDateTime(
              flight.flight.departureDate,
              flight.flight.departureTime,
            )}
          </p>

          <p className='mt-1 text-[10px] text-muted-foreground'>
            {flight.flight.terminal} · Gate {flight.flight.gate}
          </p>
        </div>

        <div className='min-w-0'>
          <p className='flex items-center gap-1.5 text-[9px] font-semibold uppercase tracking-[0.1em] text-muted-foreground'>
            <Armchair className='size-3' aria-hidden='true' />
            Seat & ticket
          </p>

          <p className='mt-1 text-xs font-semibold text-foreground'>
            {reservation?.seat?.seatNumber ?? 'Seat not assigned'}
          </p>

          <p className='mt-1 flex items-center gap-1 text-[10px] text-muted-foreground'>
            <Ticket className='size-3' aria-hidden='true' />
            {tickets.length} {tickets.length === 1 ? 'ticket' : 'tickets'}
          </p>
        </div>
      </div>

      <div className='mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-border/60 pt-3'>
        <p className='text-[10px] text-muted-foreground'>
          {passenger.maskedPassportNumber ?
            `Travel document ${passenger.maskedPassportNumber}`
          : 'No travel document recorded'}
          {' · '}
          {passenger.nationality || 'Nationality not recorded'}
        </p>

        <span className='inline-flex items-center gap-1.5 text-xs font-semibold text-[#2879A8] transition-colors group-hover:text-[#102A43]'>
          View passenger details
          <ArrowUpRight className='size-3.5' aria-hidden='true' />
        </span>
      </div>
    </Link>
  );
}
