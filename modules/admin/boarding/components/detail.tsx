import {
  Accessibility,
  CalendarDays,
  CreditCard,
  FileText,
  Luggage,
  Mail,
  Plane,
  ScanLine,
  ShieldCheck,
  TicketCheck,
  UserRound,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';

import type { BoardingViewModel } from '../types/boarding';

interface BoardingDetailProps {
  boarding: BoardingViewModel | null;
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

function formatCurrency(amount: number | null) {
  if (amount === null) {
    return '—';
  }

  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    maximumFractionDigits: 2,
  }).format(amount);
}

function getStatusClasses(status: BoardingViewModel['status']) {
  switch (status) {
    case 'BOARDED':
      return 'border-emerald-200 bg-emerald-50 text-emerald-700';

    case 'NOT_BOARDED':
      return 'border-amber-200 bg-amber-50 text-amber-700';

    case 'DENIED':
      return 'border-rose-200 bg-rose-50 text-rose-700';

    default:
      return 'border-border/70 bg-muted/40 text-muted-foreground';
  }
}

export function BoardingDetail({ boarding }: BoardingDetailProps) {
  if (!boarding) {
    return (
      <section className='xl:sticky xl:top-6'>
        <div className='flex min-h-[520px] flex-col items-center justify-center rounded-2xl border border-dashed border-border/70 bg-background px-6 text-center shadow-sm'>
          <div className='flex size-12 items-center justify-center rounded-2xl bg-[#E5F5FC] text-[#5BA9D6]'>
            <Plane className='size-5' />
          </div>

          <h2 className='mt-4 text-sm font-semibold text-foreground'>
            Select a boarding record
          </h2>

          <p className='mt-1 max-w-sm text-xs leading-5 text-muted-foreground'>
            Choose a passenger from the boarding roster to inspect gate, scan,
            ticket, check-in, and flight details.
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
              <Plane className='size-5' />
            </div>

            <div className='min-w-0 flex-1'>
              <p className='text-[9px] font-medium uppercase tracking-[0.16em] text-white/45'>
                Boarding details
              </p>

              <h2 className='mt-1 truncate text-lg font-semibold'>
                {boarding.passengerName}
              </h2>

              <p className='mt-1 truncate text-[11px] text-white/60'>
                {boarding.flightNumber ?? 'No flight'}
                {' · Gate '}
                {boarding.gate}
              </p>
            </div>

            <Badge
              variant='outline'
              className={`shrink-0 text-[9px] ${getStatusClasses(
                boarding.status,
              )}`}
            >
              {boarding.status
                .toLowerCase()
                .split('_')
                .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
                .join(' ')}
            </Badge>
          </div>

          <div className='mt-4 flex flex-wrap gap-2'>
            <Badge
              variant='outline'
              className='border-white/15 bg-white/5 text-[9px] text-white'
            >
              Gate {boarding.gate}
            </Badge>

            <Badge
              variant='outline'
              className='border-white/15 bg-white/5 text-[9px] text-white'
            >
              Seat {boarding.seatNumber ?? 'Unassigned'}
            </Badge>

            {boarding.bookingReference ?
              <Badge
                variant='outline'
                className='border-white/15 bg-white/5 text-[9px] text-white'
              >
                {boarding.bookingReference}
              </Badge>
            : null}
          </div>
        </div>

        <div className='max-h-150 overflow-y-scroll overscroll-contain scrollbar-subtle'>
          <div className='space-y-5 p-5 sm:p-6'>
            <section>
              <div className='mb-3 flex items-center gap-2'>
                <ShieldCheck className='size-4 text-[#5BA9D6]' />

                <h3 className='text-xs font-semibold uppercase tracking-wide text-foreground'>
                  Boarding operation
                </h3>
              </div>

              <div className='rounded-2xl border border-border/60 bg-muted/20 p-4'>
                <div className='flex items-start justify-between gap-3'>
                  <div>
                    <p className='text-[10px] text-muted-foreground'>
                      Boarding status
                    </p>

                    <p className='mt-1 text-lg font-semibold'>
                      {boarding.status
                        .toLowerCase()
                        .split('_')
                        .map(
                          (part) =>
                            part.charAt(0).toUpperCase() + part.slice(1),
                        )
                        .join(' ')}
                    </p>
                  </div>

                  <Badge
                    variant='outline'
                    className={`text-[9px] ${getStatusClasses(
                      boarding.status,
                    )}`}
                  >
                    {boarding.status}
                  </Badge>
                </div>

                <div className='my-4 border-t border-border/60' />

                <div className='grid gap-3 sm:grid-cols-2'>
                  <div>
                    <p className='text-[10px] text-muted-foreground'>Gate</p>

                    <p className='mt-1 text-xs font-semibold'>
                      {boarding.gate}
                    </p>
                  </div>

                  <div>
                    <p className='text-[10px] text-muted-foreground'>
                      Boarded at
                    </p>

                    <p className='mt-1 text-xs font-semibold'>
                      {formatDateTime(boarding.boardedAt)}
                    </p>
                  </div>

                  <div>
                    <p className='text-[10px] text-muted-foreground'>
                      Scanned by
                    </p>

                    <p className='mt-1 text-xs font-semibold'>
                      {boarding.scannedByName ?? 'Not scanned'}
                    </p>
                  </div>

                  <div>
                    <p className='text-[10px] text-muted-foreground'>
                      Staff email
                    </p>

                    <p className='mt-1 break-all text-xs font-medium'>
                      {boarding.scannedByEmail ?? '—'}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className='border-t border-border/60 pt-5'>
              <div className='mb-3 flex items-center gap-2'>
                <UserRound className='size-4 text-[#5BA9D6]' />

                <h3 className='text-xs font-semibold uppercase tracking-wide text-foreground'>
                  Passenger
                </h3>
              </div>

              <div className='rounded-2xl border border-border/60 bg-muted/20 p-4'>
                <div className='flex items-start justify-between gap-3'>
                  <div className='min-w-0'>
                    <p className='truncate text-sm font-semibold'>
                      {boarding.passengerName}
                    </p>

                    <p className='mt-1 text-[10px] text-muted-foreground'>
                      {boarding.passengerNationality ??
                        'Nationality unavailable'}
                    </p>
                  </div>

                  {boarding.specialAssistance ?
                    <Badge
                      variant='outline'
                      className='shrink-0 border-amber-200 bg-amber-50 text-[9px] text-amber-700'
                    >
                      <Accessibility className='mr-1 size-3' />
                      Assistance
                    </Badge>
                  : null}
                </div>

                {boarding.passengerEmail ?
                  <div className='mt-4 flex items-start gap-3'>
                    <Mail className='mt-0.5 size-4 text-muted-foreground' />

                    <div className='min-w-0'>
                      <p className='text-[10px] text-muted-foreground'>Email</p>

                      <p className='mt-0.5 break-all text-xs font-medium'>
                        {boarding.passengerEmail}
                      </p>
                    </div>
                  </div>
                : null}

                {boarding.passengerPhone ?
                  <div className='mt-4 flex items-start gap-3'>
                    <UserRound className='mt-0.5 size-4 text-muted-foreground' />

                    <div>
                      <p className='text-[10px] text-muted-foreground'>Phone</p>

                      <p className='mt-0.5 text-xs font-medium'>
                        {boarding.passengerPhone}
                      </p>
                    </div>
                  </div>
                : null}
              </div>
            </section>

            <section className='border-t border-border/60 pt-5'>
              <div className='mb-3 flex items-center gap-2'>
                <Plane className='size-4 text-[#5BA9D6]' />

                <h3 className='text-xs font-semibold uppercase tracking-wide text-foreground'>
                  Flight & seat
                </h3>
              </div>

              <div className='rounded-2xl border border-border/60 bg-muted/20 p-4'>
                <div className='flex items-center justify-center gap-3 text-center'>
                  <div className='min-w-0'>
                    <p className='text-lg font-semibold'>
                      {boarding.originCode ?? '—'}
                    </p>

                    <p className='mt-0.5 truncate text-[10px] text-muted-foreground'>
                      {boarding.originCity ?? 'Origin'}
                    </p>
                  </div>

                  <Plane className='size-4 shrink-0 text-[#5BA9D6]' />

                  <div className='min-w-0'>
                    <p className='text-lg font-semibold'>
                      {boarding.destinationCode ?? '—'}
                    </p>

                    <p className='mt-0.5 truncate text-[10px] text-muted-foreground'>
                      {boarding.destinationCity ?? 'Destination'}
                    </p>
                  </div>
                </div>

                <div className='my-4 border-t border-border/60' />

                <div className='grid gap-3 sm:grid-cols-2'>
                  <div>
                    <p className='text-[10px] text-muted-foreground'>Flight</p>

                    <p className='mt-1 text-xs font-semibold'>
                      {boarding.flightNumber ?? '—'}
                    </p>
                  </div>

                  <div>
                    <p className='text-[10px] text-muted-foreground'>Gate</p>

                    <p className='mt-1 text-xs font-semibold'>
                      {boarding.gate}
                    </p>
                  </div>

                  <div>
                    <p className='text-[10px] text-muted-foreground'>Seat</p>

                    <p className='mt-1 text-xs font-semibold'>
                      {boarding.seatNumber ?? 'Not assigned'}
                    </p>
                  </div>

                  <div>
                    <p className='text-[10px] text-muted-foreground'>
                      Fare class
                    </p>

                    <p className='mt-1 text-xs font-semibold'>
                      {boarding.fareClassName ?? '—'}
                    </p>
                  </div>

                  <div>
                    <p className='text-[10px] text-muted-foreground'>
                      Departure
                    </p>

                    <p className='mt-1 text-xs font-medium'>
                      {formatDate(boarding.departureDate)}

                      {boarding.departureTime ?
                        ` · ${boarding.departureTime}`
                      : ''}
                    </p>
                  </div>

                  <div>
                    <p className='text-[10px] text-muted-foreground'>Arrival</p>

                    <p className='mt-1 text-xs font-medium'>
                      {formatDate(boarding.arrivalDate)}

                      {boarding.arrivalTime ? ` · ${boarding.arrivalTime}` : ''}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className='border-t border-border/60 pt-5'>
              <div className='mb-3 flex items-center gap-2'>
                <ScanLine className='size-4 text-[#5BA9D6]' />

                <h3 className='text-xs font-semibold uppercase tracking-wide text-foreground'>
                  Check-in readiness
                </h3>
              </div>

              <div className='grid gap-3 sm:grid-cols-2'>
                <div className='rounded-xl border border-border/60 bg-muted/20 p-3'>
                  <p className='text-[10px] text-muted-foreground'>
                    Check-in status
                  </p>

                  <p className='mt-1 text-xs font-semibold'>
                    {boarding.checkInStatus ?? 'Not checked in'}
                  </p>
                </div>

                <div className='rounded-xl border border-border/60 bg-muted/20 p-3'>
                  <p className='text-[10px] text-muted-foreground'>
                    Check-in method
                  </p>

                  <p className='mt-1 text-xs font-semibold'>
                    {boarding.checkInMethod ?? '—'}
                  </p>
                </div>

                <div className='rounded-xl border border-border/60 bg-muted/20 p-3'>
                  <p className='text-[10px] text-muted-foreground'>
                    Checked in at
                  </p>

                  <p className='mt-1 text-xs font-semibold'>
                    {formatDateTime(boarding.checkedInAt)}
                  </p>
                </div>
              </div>
            </section>

            <section className='border-t border-border/60 pt-5'>
              <div className='mb-3 flex items-center gap-2'>
                <TicketCheck className='size-4 text-[#5BA9D6]' />

                <h3 className='text-xs font-semibold uppercase tracking-wide text-foreground'>
                  Ticket
                </h3>
              </div>

              <div className='grid gap-3 sm:grid-cols-2'>
                <div className='rounded-xl border border-border/60 bg-muted/20 p-3'>
                  <p className='text-[10px] text-muted-foreground'>
                    Ticket number
                  </p>

                  <p className='mt-1 text-xs font-semibold'>
                    {boarding.ticketNumber ?? '—'}
                  </p>
                </div>

                <div className='rounded-xl border border-border/60 bg-muted/20 p-3'>
                  <p className='text-[10px] text-muted-foreground'>
                    Ticket status
                  </p>

                  <p className='mt-1 text-xs font-semibold'>
                    {boarding.ticketStatus ?? '—'}
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
                    {boarding.baggageCount}
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
                    {boarding.bookingReference ?? '—'}
                  </p>
                </div>

                <div className='rounded-xl border border-border/60 bg-muted/20 p-3'>
                  <p className='text-[10px] text-muted-foreground'>
                    Booking status
                  </p>

                  <p className='mt-1 text-xs font-semibold'>
                    {boarding.bookingStatus ?? '—'}
                  </p>
                </div>

                <div className='rounded-xl border border-border/60 bg-muted/20 p-3'>
                  <p className='text-[10px] text-muted-foreground'>
                    Payment status
                  </p>

                  <p className='mt-1 text-xs font-semibold'>
                    {boarding.paymentStatus ?? '—'}
                  </p>
                </div>

                <div className='rounded-xl border border-border/60 bg-muted/20 p-3'>
                  <p className='text-[10px] text-muted-foreground'>
                    Payment method
                  </p>

                  <p className='mt-1 text-xs font-semibold'>
                    {boarding.paymentMethod ?? '—'}
                  </p>
                </div>

                <div className='rounded-xl border border-border/60 bg-muted/20 p-3 sm:col-span-2'>
                  <p className='text-[10px] text-muted-foreground'>
                    Booking total
                  </p>

                  <p className='mt-1 text-base font-semibold'>
                    {formatCurrency(boarding.bookingTotal)}
                  </p>
                </div>
              </div>
            </section>

            {boarding.specialAssistance ?
              <section className='rounded-2xl border border-amber-200 bg-amber-50 p-4'>
                <div className='flex items-start gap-3'>
                  <Accessibility className='mt-0.5 size-4 shrink-0 text-amber-700' />

                  <div>
                    <p className='text-xs font-semibold text-amber-900'>
                      Special assistance required
                    </p>

                    <p className='mt-1 text-[10px] leading-5 text-amber-800/80'>
                      Review this passenger assistance requirement before gate
                      handling and boarding.
                    </p>
                  </div>
                </div>
              </section>
            : null}

            <section className='rounded-2xl border border-sky-200 bg-sky-50 p-4'>
              <div className='flex items-start gap-3'>
                <FileText className='mt-0.5 size-4 shrink-0 text-sky-700' />

                <div>
                  <p className='text-xs font-semibold text-sky-900'>
                    Boarding record
                  </p>

                  <p className='mt-1 text-[10px] leading-5 text-sky-800/80'>
                    This operational record is linked to the passenger, ticket,
                    booking, flight, seat, check-in, and boarding staff records.
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
