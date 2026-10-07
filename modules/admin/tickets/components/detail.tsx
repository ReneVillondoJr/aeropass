import {
  CalendarDays,
  CreditCard,
  FileText,
  Luggage,
  Mail,
  MapPin,
  Plane,
  QrCode,
  ScanLine,
  ShieldCheck,
  TicketCheck,
  UserRound,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';

import type { TicketViewModel } from '../types/ticket';

interface TicketDetailProps {
  ticket: TicketViewModel | null;
}

function formatDate(value: string | null) {
  if (!value) {
    return '—';
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat('en-PH', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}

function formatDateTime(value: string | null) {
  if (!value) {
    return '—';
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat('en-PH', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(date);
}

function formatStatus(value: string | null) {
  return value ?? '—';
}

function getStatusClasses(status: TicketViewModel['status']) {
  switch (status) {
    case 'VALID':
      return 'border-emerald-200 bg-emerald-50 text-emerald-700';

    case 'USED':
      return 'border-sky-200 bg-sky-50 text-sky-700';

    case 'PENDING':
      return 'border-amber-200 bg-amber-50 text-amber-700';

    case 'CANCELLED':
      return 'border-rose-200 bg-rose-50 text-rose-700';

    case 'REFUNDED':
      return 'border-violet-200 bg-violet-50 text-violet-700';

    default:
      return 'border-border/70 bg-muted/40 text-muted-foreground';
  }
}

export function TicketDetail({ ticket }: TicketDetailProps) {
  if (!ticket) {
    return (
      <section className='xl:sticky xl:top-6'>
        <div className='flex min-h-[520px] flex-col items-center justify-center rounded-2xl border border-dashed border-border/70 bg-background px-6 text-center shadow-sm'>
          <div className='flex size-12 items-center justify-center rounded-2xl bg-[#E5F5FC] text-[#5BA9D6]'>
            <TicketCheck className='size-5' />
          </div>

          <h2 className='mt-4 text-sm font-semibold text-foreground'>
            Select a ticket
          </h2>

          <p className='mt-1 max-w-sm text-xs leading-5 text-muted-foreground'>
            Choose a ticket from the roster to inspect passenger, flight, QR,
            check-in, and boarding details.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className='min-w-0 xl:sticky xl:top-6'>
      <div className='overflow-hidden rounded-2xl border border-border/70 bg-background shadow-sm'>
        <div className='bg-[#102A43] px-5 py-5 text-white sm:px-6'>
          <div className='flex items-start gap-3'>
            <div className='flex size-11 shrink-0 items-center justify-center rounded-2xl bg-white/10'>
              <QrCode className='size-5' />
            </div>

            <div className='min-w-0 flex-1'>
              <p className='text-[9px] font-medium uppercase tracking-[0.16em] text-white/45'>
                Ticket details
              </p>

              <h2 className='mt-1 truncate text-lg font-semibold'>
                {ticket.ticketNumber}
              </h2>

              <p className='mt-1 truncate text-[11px] text-white/60'>
                {ticket.passengerName}
              </p>
            </div>

            <Badge
              variant='outline'
              className={`shrink-0 text-[9px] ${getStatusClasses(
                ticket.status,
              )}`}
            >
              {ticket.status}
            </Badge>
          </div>

          <div className='mt-4 flex flex-wrap gap-2'>
            <Badge
              variant='outline'
              className='border-white/15 bg-white/5 text-[9px] text-white'
            >
              {ticket.flightNumber ?? 'No flight'}
            </Badge>

            <Badge
              variant='outline'
              className='border-white/15 bg-white/5 text-[9px] text-white'
            >
              Seat {ticket.seatNumber ?? 'Unassigned'}
            </Badge>

            {ticket.bookingReference ?
              <Badge
                variant='outline'
                className='border-white/15 bg-white/5 text-[9px] text-white'
              >
                {ticket.bookingReference}
              </Badge>
            : null}
          </div>
        </div>

        <div className='max-h-151.5 overflow-y-auto overscroll-contain'>
          <div className='space-y-5 p-5 sm:p-6'>
            <section>
              <div className='mb-3 flex items-center gap-2'>
                <UserRound className='size-4 text-[#5BA9D6]' />

                <h3 className='text-xs font-semibold uppercase tracking-wide text-foreground'>
                  Passenger
                </h3>
              </div>

              <div className='rounded-2xl border border-border/60 bg-muted/20 p-4'>
                <p className='text-sm font-semibold'>{ticket.passengerName}</p>

                <div className='mt-3 space-y-3'>
                  <div className='flex items-start gap-3'>
                    <Mail className='mt-0.5 size-4 text-muted-foreground' />

                    <div className='min-w-0'>
                      <p className='text-[10px] text-muted-foreground'>Email</p>

                      <p className='mt-0.5 break-all text-xs font-medium'>
                        {ticket.passengerEmail ?? '—'}
                      </p>
                    </div>
                  </div>

                  <div className='flex items-start gap-3'>
                    <UserRound className='mt-0.5 size-4 text-muted-foreground' />

                    <div>
                      <p className='text-[10px] text-muted-foreground'>Phone</p>

                      <p className='mt-0.5 text-xs font-medium'>
                        {ticket.passengerPhone ?? '—'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className='border-t border-border/60 pt-5'>
              <div className='mb-3 flex items-center gap-2'>
                <Plane className='size-4 text-[#5BA9D6]' />

                <h3 className='text-xs font-semibold uppercase tracking-wide text-foreground'>
                  Flight
                </h3>
              </div>

              <div className='rounded-2xl border border-border/60 bg-muted/20 p-4'>
                <div className='flex items-center justify-center gap-3 text-center'>
                  <div className='min-w-0'>
                    <p className='text-lg font-semibold'>
                      {ticket.originCode ?? '—'}
                    </p>

                    <p className='mt-0.5 truncate text-[10px] text-muted-foreground'>
                      {ticket.originCity ?? 'Origin'}
                    </p>
                  </div>

                  <Plane className='size-4 shrink-0 text-[#5BA9D6]' />

                  <div className='min-w-0'>
                    <p className='text-lg font-semibold'>
                      {ticket.destinationCode ?? '—'}
                    </p>

                    <p className='mt-0.5 truncate text-[10px] text-muted-foreground'>
                      {ticket.destinationCity ?? 'Destination'}
                    </p>
                  </div>
                </div>

                <div className='my-4 border-t border-border/60' />

                <div className='grid gap-3 sm:grid-cols-2'>
                  <div>
                    <p className='text-[10px] text-muted-foreground'>Flight</p>

                    <p className='mt-1 text-xs font-semibold'>
                      {ticket.flightNumber ?? '—'}
                    </p>
                  </div>

                  <div>
                    <p className='text-[10px] text-muted-foreground'>Seat</p>

                    <p className='mt-1 text-xs font-semibold'>
                      {ticket.seatNumber ?? 'Not assigned'}
                    </p>
                  </div>

                  <div>
                    <p className='text-[10px] text-muted-foreground'>Fare</p>

                    <p className='mt-1 text-xs font-semibold'>
                      {ticket.fareClassName ?? '—'}
                    </p>
                  </div>

                  <div>
                    <p className='text-[10px] text-muted-foreground'>Gate</p>

                    <p className='mt-1 flex items-center gap-1.5 text-xs font-semibold'>
                      <MapPin className='size-3.5 text-muted-foreground' />
                      {ticket.gate ?? '—'}
                    </p>
                  </div>

                  <div>
                    <p className='text-[10px] text-muted-foreground'>
                      Departure
                    </p>

                    <p className='mt-1 text-xs font-medium'>
                      {formatDate(ticket.departureDate)}

                      {ticket.departureTime ? ` · ${ticket.departureTime}` : ''}
                    </p>
                  </div>

                  <div>
                    <p className='text-[10px] text-muted-foreground'>Arrival</p>

                    <p className='mt-1 text-xs font-medium'>
                      {formatDate(ticket.arrivalDate)}

                      {ticket.arrivalTime ? ` · ${ticket.arrivalTime}` : ''}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className='border-t border-border/60 pt-5'>
              <div className='mb-3 flex items-center gap-2'>
                <QrCode className='size-4 text-[#5BA9D6]' />

                <h3 className='text-xs font-semibold uppercase tracking-wide text-foreground'>
                  Ticket credential
                </h3>
              </div>

              <div className='space-y-3'>
                <div className='rounded-xl border border-border/60 bg-muted/20 p-3'>
                  <p className='text-[10px] text-muted-foreground'>
                    Ticket number
                  </p>

                  <p className='mt-1 text-sm font-semibold'>
                    {ticket.ticketNumber}
                  </p>
                </div>

                <div className='rounded-xl border border-border/60 bg-muted/20 p-3'>
                  <p className='text-[10px] text-muted-foreground'>QR token</p>

                  <p className='mt-2 break-all font-mono text-[10px] leading-5 text-foreground'>
                    {ticket.qrToken}
                  </p>
                </div>

                <div className='grid gap-3 sm:grid-cols-2'>
                  <div className='rounded-xl border border-border/60 bg-muted/20 p-3'>
                    <div className='flex items-center gap-2'>
                      <CalendarDays className='size-3.5 text-muted-foreground' />

                      <p className='text-[10px] text-muted-foreground'>
                        Issued
                      </p>
                    </div>

                    <p className='mt-2 text-xs font-semibold'>
                      {formatDateTime(ticket.issuedAt)}
                    </p>
                  </div>

                  <div className='rounded-xl border border-border/60 bg-muted/20 p-3'>
                    <div className='flex items-center gap-2'>
                      <CalendarDays className='size-3.5 text-muted-foreground' />

                      <p className='text-[10px] text-muted-foreground'>
                        Expires
                      </p>
                    </div>

                    <p className='mt-2 text-xs font-semibold'>
                      {formatDateTime(ticket.expiresAt)}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className='border-t border-border/60 pt-5'>
              <div className='mb-3 flex items-center gap-2'>
                <ScanLine className='size-4 text-[#5BA9D6]' />

                <h3 className='text-xs font-semibold uppercase tracking-wide text-foreground'>
                  Check-in & boarding
                </h3>
              </div>

              <div className='grid gap-3 sm:grid-cols-2'>
                <div className='rounded-xl border border-border/60 bg-muted/20 p-3'>
                  <div className='flex items-center gap-2'>
                    <ScanLine className='size-3.5 text-muted-foreground' />

                    <p className='text-[10px] text-muted-foreground'>
                      Check-in
                    </p>
                  </div>

                  <p className='mt-2 text-xs font-semibold'>
                    {formatStatus(ticket.checkInStatus)}
                  </p>

                  <p className='mt-1 text-[10px] text-muted-foreground'>
                    {ticket.checkInMethod ?? 'No check-in method'}
                  </p>
                </div>

                <div className='rounded-xl border border-border/60 bg-muted/20 p-3'>
                  <div className='flex items-center gap-2'>
                    <ShieldCheck className='size-3.5 text-muted-foreground' />

                    <p className='text-[10px] text-muted-foreground'>
                      Boarding
                    </p>
                  </div>

                  <p className='mt-2 text-xs font-semibold'>
                    {formatStatus(ticket.boardingStatus)}
                  </p>

                  <p className='mt-1 text-[10px] text-muted-foreground'>
                    {formatDateTime(ticket.boardedAt)}
                  </p>
                </div>
              </div>
            </section>

            <section className='border-t border-border/60 pt-5'>
              <div className='mb-3 flex items-center gap-2'>
                <Luggage className='size-4 text-[#5BA9D6]' />

                <h3 className='text-xs font-semibold uppercase tracking-wide text-foreground'>
                  Baggage
                </h3>
              </div>

              <div className='flex items-center justify-between rounded-xl border border-border/60 bg-muted/20 p-4'>
                <div>
                  <p className='text-[10px] text-muted-foreground'>
                    Bags associated
                  </p>

                  <p className='mt-1 text-lg font-semibold'>
                    {ticket.baggageCount}
                  </p>
                </div>

                <Luggage className='size-5 text-[#5BA9D6]' />
              </div>
            </section>

            <section className='border-t border-border/60 pt-5'>
              <div className='mb-3 flex items-center gap-2'>
                <CreditCard className='size-4 text-[#5BA9D6]' />

                <h3 className='text-xs font-semibold uppercase tracking-wide text-foreground'>
                  Booking & payment
                </h3>
              </div>

              <div className='grid gap-3 sm:grid-cols-2'>
                <div className='rounded-xl border border-border/60 bg-muted/20 p-3'>
                  <p className='text-[10px] text-muted-foreground'>Booking</p>

                  <p className='mt-1 text-xs font-semibold'>
                    {ticket.bookingReference ?? '—'}
                  </p>
                </div>

                <div className='rounded-xl border border-border/60 bg-muted/20 p-3'>
                  <p className='text-[10px] text-muted-foreground'>
                    Booking status
                  </p>

                  <p className='mt-1 text-xs font-semibold'>
                    {ticket.bookingStatus ?? '—'}
                  </p>
                </div>

                <div className='rounded-xl border border-border/60 bg-muted/20 p-3'>
                  <p className='text-[10px] text-muted-foreground'>
                    Payment status
                  </p>

                  <p className='mt-1 text-xs font-semibold'>
                    {ticket.paymentStatus ?? '—'}
                  </p>
                </div>

                <div className='rounded-xl border border-border/60 bg-muted/20 p-3'>
                  <p className='text-[10px] text-muted-foreground'>
                    Payment method
                  </p>

                  <p className='mt-1 text-xs font-semibold'>
                    {ticket.paymentMethod ?? '—'}
                  </p>
                </div>

                <div className='rounded-xl border border-border/60 bg-muted/20 p-3 sm:col-span-2'>
                  <div className='flex items-center gap-2'>
                    <CreditCard className='size-3.5 text-muted-foreground' />

                    <p className='text-[10px] text-muted-foreground'>
                      Booking total
                    </p>
                  </div>

                  <p className='mt-2 text-base font-semibold'>
                    {ticket.bookingTotal !== null ?
                      new Intl.NumberFormat('en-PH', {
                        style: 'currency',
                        currency: 'PHP',
                      }).format(ticket.bookingTotal)
                    : '—'}
                  </p>
                </div>
              </div>
            </section>

            <section className='border-t border-border/60 pt-5'>
              <div className='flex items-start gap-3 rounded-2xl border border-sky-200 bg-sky-50 p-4'>
                <FileText className='mt-0.5 size-4 shrink-0 text-sky-700' />

                <div>
                  <p className='text-xs font-semibold text-sky-900'>
                    Ticket record
                  </p>

                  <p className='mt-1 text-[10px] leading-5 text-sky-800/80'>
                    This ticket is linked to the passenger, booking, flight,
                    seat, check-in, and boarding records in the AeroPass system.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </section>
  );
}
