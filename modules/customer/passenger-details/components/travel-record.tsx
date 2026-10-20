import Link from 'next/link';
import {
  ArrowUpRight,
  Armchair,
  BaggageClaim,
  CheckCircle2,
  CreditCard,
  Plane,
  Ticket,
} from 'lucide-react';

import { CustomerStatusBadge } from '@/components/customer/shared/customer-status-badge';
import type { CustomerPassengerRecord } from '@/data/aeropass';

interface PassengerTravelRecordProps {
  record: CustomerPassengerRecord;
}

function formatDateTime(date?: string | null, time?: string | null) {
  if (!date || !time) return 'Not recorded';

  const normalizedTime = time.length === 5 ? `${time}:00` : time;
  const value = new Date(`${date}T${normalizedTime}+08:00`);

  if (Number.isNaN(value.getTime())) {
    return 'Not recorded';
  }

  return new Intl.DateTimeFormat('en-PH', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Asia/Manila',
  }).format(value);
}

function formatDate(value?: string | null) {
  if (!value) return 'Not recorded';

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return 'Not recorded';
  }

  return new Intl.DateTimeFormat('en-PH', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Asia/Manila',
  }).format(date);
}

function formatMoney(amount: number, currency: string) {
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function PassengerTravelRecord({ record }: PassengerTravelRecordProps) {
  const { booking, flight, reservation, tickets, baggage } = record;

  return (
    <div className='space-y-5'>
      <section className='overflow-hidden rounded-2xl border border-border/70 bg-card shadow-sm'>
        <div className='flex items-center gap-3 border-b border-border/60 px-4 py-4 sm:px-5'>
          <span className='flex size-9 items-center justify-center rounded-xl bg-[#EEF7FB] text-[#2879A8]'>
            <Plane className='size-4' aria-hidden='true' />
          </span>

          <div className='min-w-0'>
            <h2 className='text-sm font-semibold text-foreground'>
              Flight itinerary
            </h2>
            <p className='mt-0.5 text-xs text-muted-foreground'>
              {flight.flight.flightNumber}
            </p>
          </div>

          <div className='ml-auto'>
            <CustomerStatusBadge status={flight.flight.status} />
          </div>
        </div>

        <div className='p-4 sm:p-5'>
          <div className='grid grid-cols-[1fr_auto_1fr] items-center gap-3 rounded-2xl border border-border/70 p-4 sm:p-5'>
            <div className='min-w-0'>
              <p className='text-2xl font-semibold tracking-tight text-foreground'>
                {flight.origin.code}
              </p>
              <p className='mt-1 truncate text-xs text-muted-foreground'>
                {flight.origin.city}
              </p>
              <p className='mt-3 text-[10px] text-muted-foreground'>
                {formatDateTime(
                  flight.flight.departureDate,
                  flight.flight.departureTime,
                )}
              </p>
              <p className='mt-1 text-[10px] text-muted-foreground'>
                {flight.flight.terminal} · Gate {flight.flight.gate}
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
              <p className='mt-3 text-[10px] text-muted-foreground'>
                {formatDateTime(
                  flight.flight.arrivalDate,
                  flight.flight.arrivalTime,
                )}
              </p>
              <p className='mt-1 text-[10px] text-muted-foreground'>
                {flight.destination.terminal}
              </p>
            </div>
          </div>

          {flight.flight.delayMinutes > 0 ?
            <p className='mt-3 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-xs leading-5 text-amber-900'>
              The local flight record includes a delay of{' '}
              {flight.flight.delayMinutes} minutes.
            </p>
          : null}

          <dl className='mt-4 grid gap-3 sm:grid-cols-2'>
            <div className='rounded-xl bg-muted/35 p-3'>
              <dt className='text-[10px] font-medium uppercase tracking-[0.1em] text-muted-foreground'>
                Aircraft
              </dt>
              <dd className='mt-2 text-xs font-semibold text-foreground'>
                {flight.aircraft?.model ?? 'Not assigned'}
              </dd>
              <dd className='mt-1 text-[10px] text-muted-foreground'>
                {flight.aircraft?.manufacturer ?? 'Manufacturer unavailable'} ·{' '}
                {flight.aircraft?.registrationNumber ??
                  'Registration unavailable'}
              </dd>
            </div>

            <div className='rounded-xl bg-muted/35 p-3'>
              <dt className='text-[10px] font-medium uppercase tracking-[0.1em] text-muted-foreground'>
                Booking amount
              </dt>
              <dd className='mt-2 text-lg font-semibold text-foreground'>
                {formatMoney(booking.total, booking.currency)}
              </dd>
              <dd className='mt-1 text-[10px] text-muted-foreground'>
                {booking.paymentStatus.replaceAll('_', ' ')} ·{' '}
                {booking.paymentMethod.replaceAll('_', ' ')}
              </dd>
            </div>
          </dl>

          <div className='mt-4 flex flex-wrap gap-2 border-t border-border/60 pt-4'>
            <Link
              href={`/customer/bookings/${encodeURIComponent(booking.id)}`}
              className='inline-flex min-h-9 items-center justify-center gap-2 rounded-xl bg-[#102A43] px-3.5 py-2 text-xs font-semibold text-white outline-none transition hover:bg-[#183F5D] focus-visible:ring-2 focus-visible:ring-[#5BA9D6] focus-visible:ring-offset-2'
            >
              View booking
              <ArrowUpRight className='size-3.5' aria-hidden='true' />
            </Link>

            <Link
              href={`/customer/check-in/${encodeURIComponent(booking.id)}`}
              className='inline-flex min-h-9 items-center justify-center gap-2 rounded-xl border border-border bg-background px-3.5 py-2 text-xs font-semibold text-foreground outline-none transition hover:bg-muted focus-visible:ring-2 focus-visible:ring-[#5BA9D6] focus-visible:ring-offset-2'
            >
              Check-in
              <ArrowUpRight className='size-3.5' aria-hidden='true' />
            </Link>
          </div>
        </div>
      </section>

      <section className='overflow-hidden rounded-2xl border border-border/70 bg-card shadow-sm'>
        <div className='flex items-center gap-3 border-b border-border/60 px-4 py-4 sm:px-5'>
          <span className='flex size-9 items-center justify-center rounded-xl bg-muted text-muted-foreground'>
            <Armchair className='size-4' aria-hidden='true' />
          </span>

          <div>
            <h2 className='text-sm font-semibold text-foreground'>
              Seat & fare details
            </h2>
            <p className='mt-0.5 text-xs text-muted-foreground'>
              Reservation information
            </p>
          </div>
        </div>

        <div className='p-4 sm:p-5'>
          {reservation ?
            <>
              <div className='grid gap-3 sm:grid-cols-2'>
                <div className='rounded-xl border border-border/70 p-3'>
                  <p className='text-[10px] font-medium uppercase tracking-[0.1em] text-muted-foreground'>
                    Assigned seat
                  </p>
                  <p className='mt-2 text-xl font-semibold text-foreground'>
                    {reservation.seat?.seatNumber ?? 'Not assigned'}
                  </p>
                  <p className='mt-1 text-[10px] text-muted-foreground'>
                    {reservation.seat?.seatType.replaceAll('_', ' ') ??
                      'Seat type unavailable'}
                  </p>
                </div>

                <div className='rounded-xl border border-border/70 p-3'>
                  <p className='text-[10px] font-medium uppercase tracking-[0.1em] text-muted-foreground'>
                    Fare class
                  </p>
                  <p className='mt-2 text-sm font-semibold text-foreground'>
                    {reservation.fareClass?.name ?? 'Not recorded'}
                  </p>
                  <p className='mt-1 text-[10px] text-muted-foreground'>
                    {reservation.fareClass?.cabinClass.replaceAll('_', ' ') ??
                      'Class unavailable'}
                  </p>
                </div>
              </div>

              <dl className='mt-4 divide-y divide-border/60'>
                <div className='flex items-start justify-between gap-4 py-2 text-xs'>
                  <dt className='text-muted-foreground'>Reservation status</dt>
                  <dd className='text-right font-medium text-foreground'>
                    <CustomerStatusBadge status={reservation.status} />
                  </dd>
                </div>

                <div className='flex items-start justify-between gap-4 py-2 text-xs'>
                  <dt className='text-muted-foreground'>Reservation price</dt>
                  <dd className='text-right font-medium text-foreground'>
                    {formatMoney(reservation.price, booking.currency)}
                  </dd>
                </div>

                <div className='flex items-start justify-between gap-4 py-2 text-xs'>
                  <dt className='text-muted-foreground'>Baggage allowance</dt>
                  <dd className='text-right font-medium text-foreground'>
                    {reservation.fareClass?.baggageAllowanceKg ?? 0} kg
                  </dd>
                </div>

                <div className='flex items-start justify-between gap-4 py-2 text-xs'>
                  <dt className='text-muted-foreground'>Refundability</dt>
                  <dd className='text-right font-medium text-foreground'>
                    {reservation.fareClass?.refundable ?
                      'Refundable fare'
                    : 'Non-refundable fare'}
                  </dd>
                </div>

                <div className='flex items-start justify-between gap-4 py-2 text-xs'>
                  <dt className='text-muted-foreground'>Changes</dt>
                  <dd className='text-right font-medium text-foreground'>
                    {reservation.fareClass?.changeable ?
                      `Allowed · fee ${formatMoney(
                        reservation.fareClass.changeFee,
                        booking.currency,
                      )}`
                    : 'Not allowed'}
                  </dd>
                </div>
              </dl>
            </>
          : <p className='text-xs leading-5 text-muted-foreground'>
              No reservation or fare class is linked to this passenger record.
            </p>
          }
        </div>
      </section>

      <section className='overflow-hidden rounded-2xl border border-border/70 bg-card shadow-sm'>
        <div className='flex items-center gap-3 border-b border-border/60 px-4 py-4 sm:px-5'>
          <span className='flex size-9 items-center justify-center rounded-xl bg-[#EEF7FB] text-[#2879A8]'>
            <Ticket className='size-4' aria-hidden='true' />
          </span>
          <div>
            <h2 className='text-sm font-semibold text-foreground'>
              Tickets & travel progress
            </h2>
            <p className='mt-0.5 text-xs text-muted-foreground'>
              {tickets.length} linked{' '}
              {tickets.length === 1 ? 'ticket' : 'tickets'}
            </p>
          </div>
        </div>

        {tickets.length > 0 ?
          <div className='divide-y divide-border/60 px-4 sm:px-5'>
            {tickets.map((ticket) => (
              <article key={ticket.id} className='py-4'>
                <div className='flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between'>
                  <div className='min-w-0'>
                    <p className='break-all font-mono text-xs font-semibold text-foreground'>
                      {ticket.ticketNumber}
                    </p>
                    <p className='mt-1 text-[10px] text-muted-foreground'>
                      Issued {formatDate(ticket.issuedAt)} · Expires{' '}
                      {formatDate(ticket.expiresAt)}
                    </p>
                  </div>

                  <CustomerStatusBadge status={ticket.status} />
                </div>

                <div className='mt-3 grid gap-2 sm:grid-cols-3'>
                  <div className='rounded-lg bg-muted/35 p-2.5'>
                    <p className='text-[9px] font-semibold uppercase tracking-[0.1em] text-muted-foreground'>
                      Check-in
                    </p>
                    <p className='mt-1 text-xs font-medium text-foreground'>
                      {ticket.checkIn?.status.replaceAll('_', ' ') ??
                        'Not recorded'}
                    </p>
                    <p className='mt-1 text-[10px] text-muted-foreground'>
                      {ticket.checkIn?.checkInMethod?.replaceAll('_', ' ') ??
                        'Method not recorded'}
                    </p>
                  </div>

                  <div className='rounded-lg bg-muted/35 p-2.5'>
                    <p className='text-[9px] font-semibold uppercase tracking-[0.1em] text-muted-foreground'>
                      Boarding
                    </p>
                    <p className='mt-1 text-xs font-medium text-foreground'>
                      {ticket.boarding?.status.replaceAll('_', ' ') ??
                        'Not recorded'}
                    </p>
                    <p className='mt-1 text-[10px] text-muted-foreground'>
                      {ticket.boarding?.gate ?
                        `Gate ${ticket.boarding.gate}`
                      : 'Gate not recorded'}
                    </p>
                  </div>

                  <div className='rounded-lg bg-muted/35 p-2.5'>
                    <p className='text-[9px] font-semibold uppercase tracking-[0.1em] text-muted-foreground'>
                      Timestamps
                    </p>
                    <p className='mt-1 text-[10px] text-muted-foreground'>
                      Checked in: {formatDate(ticket.checkIn?.checkedInAt)}
                    </p>
                    <p className='mt-1 text-[10px] text-muted-foreground'>
                      Boarded: {formatDate(ticket.boarding?.boardedAt)}
                    </p>
                  </div>
                </div>

                <div className='mt-3 flex flex-wrap gap-2'>
                  <Link
                    href={`/customer/tickets/${encodeURIComponent(ticket.id)}`}
                    className='inline-flex min-h-8 items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-[11px] font-semibold text-foreground transition hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5BA9D6]'
                  >
                    View ticket
                    <ArrowUpRight className='size-3' aria-hidden='true' />
                  </Link>

                  <Link
                    href={`/customer/check-in/${encodeURIComponent(booking.id)}`}
                    className='inline-flex min-h-8 items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-[11px] font-semibold text-foreground transition hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5BA9D6]'
                  >
                    Check-in details
                    <ArrowUpRight className='size-3' aria-hidden='true' />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        : <p className='px-4 py-5 text-xs leading-5 text-muted-foreground sm:px-5'>
            No ticket records are linked to this passenger yet.
          </p>
        }
      </section>

      <section className='overflow-hidden rounded-2xl border border-border/70 bg-card shadow-sm'>
        <div className='flex items-center gap-3 border-b border-border/60 px-4 py-4 sm:px-5'>
          <span className='flex size-9 items-center justify-center rounded-xl bg-muted text-muted-foreground'>
            <BaggageClaim className='size-4' aria-hidden='true' />
          </span>
          <div>
            <h2 className='text-sm font-semibold text-foreground'>
              Baggage tracking
            </h2>
            <p className='mt-0.5 text-xs text-muted-foreground'>
              {baggage.length} linked baggage{' '}
              {baggage.length === 1 ? 'record' : 'records'}
            </p>
          </div>
        </div>

        {baggage.length > 0 ?
          <div className='divide-y divide-border/60 px-4 sm:px-5'>
            {baggage.map((bag) => (
              <article
                key={bag.id}
                className='flex flex-col gap-3 py-4 sm:flex-row sm:items-start sm:justify-between'
              >
                <div className='min-w-0'>
                  <p className='break-all font-mono text-xs font-semibold text-foreground'>
                    {bag.bagTag}
                  </p>
                  <p className='mt-1 text-[10px] text-muted-foreground'>
                    {bag.type === 'CHECKED' ?
                      'Checked baggage'
                    : 'Cabin baggage'}{' '}
                    · {bag.weightKg} kg · Destination {bag.destination}
                  </p>
                  <p className='mt-2 text-[10px] text-muted-foreground'>
                    Checked: {formatDate(bag.checkedAt)}
                  </p>
                  <p className='mt-1 text-[10px] text-muted-foreground'>
                    Received: {formatDate(bag.receivedAt)}
                  </p>
                </div>

                <CustomerStatusBadge status={bag.status} />
              </article>
            ))}
          </div>
        : <p className='px-4 py-5 text-xs leading-5 text-muted-foreground sm:px-5'>
            No baggage tracking records are linked to this passenger yet. This
            does not necessarily mean baggage is excluded from the fare.
          </p>
        }
      </section>

      <section className='rounded-2xl border border-border/70 bg-card p-4 shadow-sm sm:p-5'>
        <div className='flex items-center gap-2'>
          <CreditCard className='size-4 text-[#2879A8]' aria-hidden='true' />
          <h2 className='text-sm font-semibold text-foreground'>
            Payment summary
          </h2>
        </div>

        <div className='mt-3 grid gap-3 sm:grid-cols-2'>
          <div className='rounded-xl bg-muted/35 p-3'>
            <p className='text-[10px] font-medium uppercase tracking-[0.1em] text-muted-foreground'>
              Payment status
            </p>
            <div className='mt-2'>
              <CustomerStatusBadge status={booking.paymentStatus} />
            </div>
          </div>

          <div className='rounded-xl bg-muted/35 p-3'>
            <p className='text-[10px] font-medium uppercase tracking-[0.1em] text-muted-foreground'>
              Total booking amount
            </p>
            <p className='mt-2 text-lg font-semibold text-foreground'>
              {formatMoney(booking.total, booking.currency)}
            </p>
            <p className='mt-1 text-[10px] text-muted-foreground'>
              Method: {booking.paymentMethod.replaceAll('_', ' ')}
            </p>
          </div>
        </div>

        <div className='mt-4 flex flex-wrap gap-2'>
          <Link
            href='/customer/payments'
            className='inline-flex min-h-9 items-center gap-2 rounded-xl border border-border bg-background px-3.5 py-2 text-xs font-semibold text-foreground outline-none transition hover:bg-muted focus-visible:ring-2 focus-visible:ring-[#5BA9D6] focus-visible:ring-offset-2'
          >
            View payments
            <ArrowUpRight className='size-3.5' aria-hidden='true' />
          </Link>

          {record.tickets.length > 0 ?
            <span className='inline-flex items-center gap-1.5 text-[10px] text-muted-foreground'>
              <CheckCircle2 className='size-3.5' aria-hidden='true' />
              Ticket records are linked to this booking.
            </span>
          : null}
        </div>
      </section>
    </div>
  );
}
