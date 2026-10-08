import {
  Accessibility,
  CalendarDays,
  CreditCard,
  FileText,
  IdCard,
  Luggage,
  Mail,
  MapPin,
  Phone,
  Plane,
  ScanLine,
  ShieldCheck,
  Star,
  Ticket,
  UserRound,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';

import type { PassengerViewModel } from '../types/passenger';

interface PassengerDetailProps {
  passenger: PassengerViewModel | null;
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
  if (!value) {
    return '—';
  }

  return value;
}

export function PassengerDetail({ passenger }: PassengerDetailProps) {
  if (!passenger) {
    return (
      <section className='xl:sticky xl:top-6'>
        <div className='flex min-h-110 flex-col items-center justify-center rounded-2xl border border-dashed border-border/70 bg-background px-6 text-center shadow-sm'>
          <div className='flex size-12 items-center justify-center rounded-2xl bg-[#E5F5FC] text-[#5BA9D6]'>
            <UserRound className='size-5' />
          </div>

          <h2 className='mt-4 text-sm font-semibold text-foreground'>
            Select a passenger
          </h2>

          <p className='mt-1 max-w-sm text-xs leading-5 text-muted-foreground'>
            Choose a traveler from the roster to inspect profile, booking,
            ticket, and operational details.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className='min-w-0 xl:sticky xl:top-6 '>
      <div className='overflow-hidden rounded-2xl border border-border/70 bg-background shadow-sm '>
        <div className='bg-[#102A43] px-5 py-5 text-white sm:px-6'>
          <div className='flex items-start gap-3'>
            <div className='flex size-11 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-sm font-semibold'>
              {passenger.fullName
                .split(' ')
                .filter(Boolean)
                .slice(0, 2)
                .map((part) => part.charAt(0))
                .join('')
                .toUpperCase()}
            </div>

            <div className='min-w-0 flex-1'>
              <p className='text-[9px] font-medium uppercase tracking-[0.16em] text-white/45'>
                Passenger profile
              </p>

              <h2 className='mt-1 truncate text-lg font-semibold'>
                {passenger.fullName}
              </h2>

              <p className='mt-1 text-[11px] text-white/60'>
                {passenger.bookingReference} ·{' '}
                {passenger.flightNumber ?? 'No flight'}
              </p>
            </div>
          </div>

          <div className='mt-4 flex flex-wrap gap-2'>
            <Badge
              variant='outline'
              className='border-white/15 bg-white/5 text-[9px] text-white'
            >
              {passenger.gender}
            </Badge>

            <Badge
              variant='outline'
              className='border-white/15 bg-white/5 text-[9px] text-white'
            >
              {passenger.nationality}
            </Badge>

            {passenger.specialAssistance ?
              <Badge
                variant='outline'
                className='border-amber-300/20 bg-amber-300/10 text-[9px] text-amber-200'
              >
                <Accessibility className='mr-1 size-3' />
                Assistance required
              </Badge>
            : null}
          </div>
        </div>

        <div className='max-h-150 overflow-y-scroll overscroll-contain scrollbar-subtle'>
          <div className='space-y-5 p-5 sm:p-6'>
            <section>
              <div className='mb-3 flex items-center gap-2'>
                <UserRound className='size-4 text-[#5BA9D6]' />
                <h3 className='text-xs font-semibold uppercase tracking-wide text-foreground'>
                  Personal information
                </h3>
              </div>

              <div className='grid gap-3 sm:grid-cols-2'>
                <div>
                  <p className='text-[10px] text-muted-foreground'>
                    First name
                  </p>
                  <p className='mt-1 text-xs font-medium'>
                    {passenger.firstName}
                  </p>
                </div>

                <div>
                  <p className='text-[10px] text-muted-foreground'>
                    Middle name
                  </p>
                  <p className='mt-1 text-xs font-medium'>
                    {passenger.middleName ?? '—'}
                  </p>
                </div>

                <div>
                  <p className='text-[10px] text-muted-foreground'>Last name</p>
                  <p className='mt-1 text-xs font-medium'>
                    {passenger.lastName}
                  </p>
                </div>

                <div>
                  <p className='text-[10px] text-muted-foreground'>
                    Date of birth
                  </p>
                  <p className='mt-1 flex items-center gap-1.5 text-xs font-medium'>
                    <CalendarDays className='size-3.5 text-muted-foreground' />
                    {formatDate(passenger.dateOfBirth)}
                  </p>
                </div>
              </div>
            </section>

            <section className='border-t border-border/60 pt-5'>
              <div className='mb-3 flex items-center gap-2'>
                <Phone className='size-4 text-[#5BA9D6]' />
                <h3 className='text-xs font-semibold uppercase tracking-wide text-foreground'>
                  Contact
                </h3>
              </div>

              <div className='space-y-3'>
                <div className='flex items-start gap-3'>
                  <Mail className='mt-0.5 size-4 text-muted-foreground' />

                  <div className='min-w-0'>
                    <p className='text-[10px] text-muted-foreground'>Email</p>
                    <p className='mt-0.5 break-all text-xs font-medium'>
                      {passenger.email}
                    </p>
                  </div>
                </div>

                <div className='flex items-start gap-3'>
                  <Phone className='mt-0.5 size-4 text-muted-foreground' />

                  <div>
                    <p className='text-[10px] text-muted-foreground'>Phone</p>
                    <p className='mt-0.5 text-xs font-medium'>
                      {passenger.phone}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className='border-t border-border/60 pt-5'>
              <div className='mb-3 flex items-center gap-2'>
                <IdCard className='size-4 text-[#5BA9D6]' />
                <h3 className='text-xs font-semibold uppercase tracking-wide text-foreground'>
                  Travel documents
                </h3>
              </div>

              <div className='grid gap-3 sm:grid-cols-2'>
                <div className='rounded-xl border border-border/60 bg-muted/20 p-3'>
                  <div className='flex items-center gap-2'>
                    <FileText className='size-3.5 text-muted-foreground' />
                    <p className='text-[10px] text-muted-foreground'>
                      Passport number
                    </p>
                  </div>

                  <p className='mt-2 text-xs font-semibold'>
                    {passenger.passportNumber ?? 'Not provided'}
                  </p>
                </div>

                <div className='rounded-xl border border-border/60 bg-muted/20 p-3'>
                  <div className='flex items-center gap-2'>
                    <CalendarDays className='size-3.5 text-muted-foreground' />
                    <p className='text-[10px] text-muted-foreground'>
                      Passport expiry
                    </p>
                  </div>

                  <p className='mt-2 text-xs font-semibold'>
                    {formatDate(passenger.passportExpiry ?? null)}
                  </p>
                </div>
              </div>
            </section>

            <section className='border-t border-border/60 pt-5'>
              <div className='mb-3 flex items-center gap-2'>
                <Plane className='size-4 text-[#5BA9D6]' />
                <h3 className='text-xs font-semibold uppercase tracking-wide text-foreground'>
                  Flight & booking
                </h3>
              </div>

              <div className='rounded-2xl border border-border/60 bg-muted/20 p-4'>
                <div className='flex items-center justify-between gap-3'>
                  <div>
                    <p className='text-[10px] text-muted-foreground'>
                      Booking reference
                    </p>
                    <p className='mt-1 text-sm font-semibold'>
                      {passenger.bookingReference}
                    </p>
                  </div>

                  <Badge variant='outline' className='text-[9px]'>
                    {formatStatus(
                      passenger.bookingStatus
                        ?.toLowerCase()
                        .split('_')
                        .map(
                          (part) =>
                            part.charAt(0).toUpperCase() + part.slice(1),
                        )
                        .join(' ') ?? null,
                    )}
                  </Badge>
                </div>

                <div className='my-4 border-t border-border/60' />

                <div className='flex items-center justify-center gap-3 text-center'>
                  <div className='min-w-0'>
                    <p className='text-lg font-semibold'>
                      {passenger.originCode ?? '—'}
                    </p>
                    <p className='mt-0.5 truncate text-[10px] text-muted-foreground'>
                      {passenger.originCity ?? 'Origin'}
                    </p>
                  </div>

                  <Plane className='size-4 shrink-0 text-[#5BA9D6]' />

                  <div className='min-w-0'>
                    <p className='text-lg font-semibold'>
                      {passenger.destinationCode ?? '—'}
                    </p>
                    <p className='mt-0.5 truncate text-[10px] text-muted-foreground'>
                      {passenger.destinationCity ?? 'Destination'}
                    </p>
                  </div>
                </div>

                <div className='my-4 border-t border-border/60' />

                <div className='grid gap-3 sm:grid-cols-2'>
                  <div>
                    <p className='text-[10px] text-muted-foreground'>Flight</p>
                    <p className='mt-1 text-xs font-semibold'>
                      {passenger.flightNumber ?? '—'}
                    </p>
                  </div>

                  <div>
                    <p className='text-[10px] text-muted-foreground'>Seat</p>
                    <p className='mt-1 text-xs font-semibold'>
                      {passenger.seatNumber ?? 'Not assigned'}
                    </p>
                  </div>

                  <div>
                    <p className='text-[10px] text-muted-foreground'>
                      Departure
                    </p>
                    <p className='mt-1 text-xs font-medium'>
                      {formatDate(passenger.departureDate)}
                      {passenger.departureTime ?
                        ` · ${passenger.departureTime}`
                      : ''}
                    </p>
                  </div>

                  <div>
                    <p className='text-[10px] text-muted-foreground'>Arrival</p>
                    <p className='mt-1 text-xs font-medium'>
                      {formatDate(passenger.arrivalDate)}
                      {passenger.arrivalTime ?
                        ` · ${passenger.arrivalTime}`
                      : ''}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className='border-t border-border/60 pt-5'>
              <div className='mb-3 flex items-center gap-2'>
                <Ticket className='size-4 text-[#5BA9D6]' />
                <h3 className='text-xs font-semibold uppercase tracking-wide text-foreground'>
                  Ticket & check-in
                </h3>
              </div>

              <div className='grid gap-3 sm:grid-cols-2'>
                <div className='rounded-xl border border-border/60 bg-muted/20 p-3'>
                  <div className='flex items-center gap-2'>
                    <ScanLine className='size-3.5 text-muted-foreground' />
                    <p className='text-[10px] text-muted-foreground'>
                      Ticket number
                    </p>
                  </div>

                  <p className='mt-2 text-xs font-semibold'>
                    {passenger.ticketNumber ?? 'Not issued'}
                  </p>
                </div>

                <div className='rounded-xl border border-border/60 bg-muted/20 p-3'>
                  <div className='flex items-center gap-2'>
                    <ShieldCheck className='size-3.5 text-muted-foreground' />
                    <p className='text-[10px] text-muted-foreground'>
                      Ticket status
                    </p>
                  </div>

                  <p className='mt-2 text-xs font-semibold'>
                    {passenger.ticketStatus ?? '—'}
                  </p>
                </div>

                <div className='rounded-xl border border-border/60 bg-muted/20 p-3'>
                  <div className='flex items-center gap-2'>
                    <ScanLine className='size-3.5 text-muted-foreground' />
                    <p className='text-[10px] text-muted-foreground'>
                      Check-in
                    </p>
                  </div>

                  <p className='mt-2 text-xs font-semibold'>
                    {passenger.checkInStatus ?? 'Not checked in'}
                  </p>
                </div>

                <div className='rounded-xl border border-border/60 bg-muted/20 p-3'>
                  <div className='flex items-center gap-2'>
                    <CalendarDays className='size-3.5 text-muted-foreground' />
                    <p className='text-[10px] text-muted-foreground'>
                      Check-in time
                    </p>
                  </div>

                  <p className='mt-2 text-xs font-semibold'>
                    {formatDateTime(passenger.checkedInAt)}
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

              <div className='rounded-xl border border-border/60 bg-muted/20 p-4'>
                <div className='flex items-center justify-between gap-3'>
                  <div>
                    <p className='text-[10px] text-muted-foreground'>
                      Bags recorded
                    </p>

                    <p className='mt-1 text-lg font-semibold'>
                      {passenger.baggageCount}
                    </p>
                  </div>

                  <Luggage className='size-5 text-[#5BA9D6]' />
                </div>

                {passenger.baggageStatuses.length > 0 ?
                  <div className='mt-3 flex flex-wrap gap-2'>
                    {passenger.baggageStatuses.map((status, index) => (
                      <Badge
                        key={`${status}-${index}`}
                        variant='outline'
                        className='text-[9px]'
                      >
                        Bag {index + 1}: {status}
                      </Badge>
                    ))}
                  </div>
                : <p className='mt-2 text-[10px] text-muted-foreground'>
                    No baggage records associated with this passenger.
                  </p>
                }
              </div>
            </section>

            <section className='border-t border-border/60 pt-5'>
              <div className='grid gap-3 sm:grid-cols-2'>
                <div className='rounded-xl border border-border/60 bg-muted/20 p-3'>
                  <div className='flex items-center gap-2'>
                    <Star className='size-3.5 text-[#C5A46D]' />
                    <p className='text-[10px] text-muted-foreground'>
                      Frequent flyer
                    </p>
                  </div>

                  <p className='mt-2 text-xs font-semibold'>
                    {passenger.frequentFlyerNumber ?? 'Not enrolled'}
                  </p>
                </div>

                <div className='rounded-xl border border-border/60 bg-muted/20 p-3'>
                  <div className='flex items-center gap-2'>
                    <CreditCard className='size-3.5 text-muted-foreground' />
                    <p className='text-[10px] text-muted-foreground'>Payment</p>
                  </div>

                  <p className='mt-2 text-xs font-semibold'>
                    {passenger.paymentMethod ?? '—'}
                  </p>
                </div>
              </div>
            </section>

            {passenger.specialAssistance ?
              <section className='rounded-2xl border border-amber-200 bg-amber-50 p-4'>
                <div className='flex items-start gap-3'>
                  <Accessibility className='mt-0.5 size-4 shrink-0 text-amber-700' />

                  <div>
                    <p className='text-xs font-semibold text-amber-900'>
                      Special assistance required
                    </p>

                    <p className='mt-1 text-[10px] leading-5 text-amber-800/80'>
                      Review the passenger assistance requirement before
                      check-in, gate handling, and boarding.
                    </p>
                  </div>
                </div>
              </section>
            : null}
          </div>
        </div>
      </div>
    </section>
  );
}
