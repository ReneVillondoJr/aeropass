import {
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  CheckCircle2,
  ClipboardCheck,
  CreditCard,
  Luggage,
  Mail,
  MapPin,
  PackageCheck,
  Plane,
  QrCode,
  Scale,
  ShieldCheck,
  Ticket,
  UserRound,
  Weight,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';

import type { BaggageViewModel } from '../types/baggage';

interface BaggageDetailProps {
  baggage: BaggageViewModel | null;
}

const statusConfig = {
  PENDING: {
    label: 'Pending',
    className: 'border-slate-200 bg-slate-50 text-slate-700',
  },
  CHECKED: {
    label: 'Checked',
    className: 'border-blue-200 bg-blue-50 text-blue-700',
  },
  IN_TRANSIT: {
    label: 'In Transit',
    className: 'border-violet-200 bg-violet-50 text-violet-700',
  },
  RECEIVED: {
    label: 'Received',
    className: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  },
  LOST: {
    label: 'Lost',
    className: 'border-rose-200 bg-rose-50 text-rose-700',
  },
} as const;

function formatDate(value: string | null) {
  if (!value) {
    return '—';
  }

  return new Intl.DateTimeFormat('en-PH', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(value));
}

function formatDateTime(value: string | null) {
  if (!value) {
    return '—';
  }

  return new Intl.DateTimeFormat('en-PH', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(value));
}

function DetailItem({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon?: typeof UserRound;
}) {
  return (
    <div className='min-w-0'>
      <p className='text-[10px] font-medium uppercase tracking-[0.12em] text-muted-foreground'>
        {label}
      </p>

      <div className='mt-1 flex min-w-0 items-center gap-2'>
        {Icon ?
          <Icon className='size-3.5 shrink-0 text-muted-foreground' />
        : null}

        <p className='truncate text-xs font-medium'>{value}</p>
      </div>
    </div>
  );
}

function TimelineItem({
  icon: Icon,
  title,
  description,
}: {
  icon: typeof Weight;
  title: string;
  description: string;
}) {
  return (
    <div className='flex gap-3 rounded-2xl border border-border/60 bg-muted/15 p-4'>
      <div className='flex size-9 shrink-0 items-center justify-center rounded-xl bg-background'>
        <Icon className='size-4 text-muted-foreground' />
      </div>

      <div className='min-w-0'>
        <p className='text-xs font-semibold'>{title}</p>

        <p className='mt-1 text-[11px] leading-5 text-muted-foreground'>
          {description}
        </p>
      </div>
    </div>
  );
}

export function BaggageDetail({ baggage }: BaggageDetailProps) {
  if (!baggage) {
    return (
      <section className='rounded-[1.5rem] border border-border/70 bg-card shadow-sm xl:sticky xl:top-6'>
        <div className='flex min-h-[420px] flex-col items-center justify-center px-6 py-10 text-center'>
          <div className='flex size-12 items-center justify-center rounded-2xl bg-muted/50'>
            <Luggage className='size-6 text-muted-foreground' />
          </div>

          <h2 className='mt-4 text-sm font-semibold'>Select baggage</h2>

          <p className='mt-1 max-w-xs text-xs leading-5 text-muted-foreground'>
            Select a baggage record from the roster to inspect its passenger,
            flight, ticket, and handling information.
          </p>
        </div>
      </section>
    );
  }

  const status = statusConfig[baggage.status];

  return (
    <section className='flex max-h-[760px] flex-col overflow-hidden rounded-[1.5rem] border border-border/70 bg-card shadow-sm xl:sticky xl:top-6'>
      {/* Fixed baggage summary */}
      <div className='shrink-0 border-b border-border/70 bg-muted/20 px-5 py-5 sm:px-6'>
        <div className='flex items-start justify-between gap-4'>
          <div className='flex min-w-0 items-center gap-3'>
            <div className='flex size-12 shrink-0 items-center justify-center rounded-2xl bg-[#E5F5FC] text-[#102A43]'>
              <Luggage className='size-6' />
            </div>

            <div className='min-w-0'>
              <p className='text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground'>
                Baggage record
              </p>

              <h2 className='mt-1 truncate text-lg font-semibold tracking-tight'>
                {baggage.bagTag}
              </h2>
            </div>
          </div>

          <Badge
            variant='outline'
            className={['shrink-0 text-[10px]', status.className].join(' ')}
          >
            {status.label}
          </Badge>
        </div>

        <div className='mt-5 grid grid-cols-2 gap-3'>
          <div className='rounded-xl border border-border/60 bg-background/80 p-3'>
            <div className='flex items-center gap-2 text-[10px] uppercase tracking-[0.12em] text-muted-foreground'>
              <Scale className='size-3.5' />
              Weight
            </div>

            <p className='mt-2 text-lg font-semibold'>{baggage.weightKg} kg</p>
          </div>

          <div className='rounded-xl border border-border/60 bg-background/80 p-3'>
            <div className='flex items-center gap-2 text-[10px] uppercase tracking-[0.12em] text-muted-foreground'>
              <Luggage className='size-3.5' />
              Type
            </div>

            <p className='mt-2 text-lg font-semibold'>
              {baggage.type === 'CHECKED' ? 'Checked' : 'Cabin'}
            </p>
          </div>
        </div>
      </div>

      {/* Scrollable detail area */}
      <div className='min-h-0 overflow-y-auto overscroll-contain scrollbar-subtle'>
        <div className='grid gap-7 px-5 py-6 sm:px-6'>
          {/* Passenger */}
          <section>
            <div className='mb-4 flex items-center gap-2'>
              <UserRound className='size-4 text-muted-foreground' />
              <h3 className='text-sm font-semibold'>Passenger</h3>
            </div>

            <div className='grid gap-4 sm:grid-cols-2'>
              <DetailItem
                label='Passenger'
                value={baggage.passengerName}
                icon={UserRound}
              />

              <DetailItem
                label='Nationality'
                value={baggage.nationality}
                icon={MapPin}
              />

              <DetailItem
                label='Email'
                value={baggage.passengerEmail}
                icon={Mail}
              />

              <DetailItem label='Phone' value={baggage.passengerPhone} />
            </div>
          </section>

          {/* Flight operation */}
          <section className='border-t border-border/60 pt-7'>
            <div className='mb-4 flex items-center gap-2'>
              <Plane className='size-4 text-muted-foreground' />
              <h3 className='text-sm font-semibold'>Flight operation</h3>
            </div>

            <div className='rounded-2xl border border-border/60 bg-muted/15 p-4'>
              <div className='flex items-center justify-between gap-4'>
                <div className='min-w-0'>
                  <p className='text-sm font-semibold'>
                    {baggage.flightNumber}
                  </p>

                  <p className='mt-1 text-[11px] text-muted-foreground'>
                    {baggage.flightStatus}
                  </p>
                </div>

                <Badge
                  variant='outline'
                  className='shrink-0 border-border/60 bg-background text-[10px]'
                >
                  {baggage.gate !== '—' ? `Gate ${baggage.gate}` : 'Gate —'}
                </Badge>
              </div>

              <div className='mt-5 grid grid-cols-[1fr_auto_1fr] items-center gap-3'>
                <div className='min-w-0'>
                  <p className='text-xl font-semibold'>{baggage.originCode}</p>

                  <p className='mt-1 truncate text-[10px] text-muted-foreground'>
                    {baggage.originCity}
                  </p>
                </div>

                <ArrowRight className='size-4 text-muted-foreground' />

                <div className='min-w-0 text-right'>
                  <p className='text-xl font-semibold'>
                    {baggage.destinationCode}
                  </p>

                  <p className='mt-1 truncate text-[10px] text-muted-foreground'>
                    {baggage.destinationCity}
                  </p>
                </div>
              </div>

              <div className='mt-5 grid gap-4 border-t border-border/60 pt-4 sm:grid-cols-2'>
                <DetailItem
                  label='Departure'
                  value={`${formatDate(baggage.departureDate)} • ${baggage.departureTime}`}
                  icon={CalendarDays}
                />

                <DetailItem
                  label='Arrival'
                  value={`${formatDate(baggage.arrivalDate)} • ${baggage.arrivalTime}`}
                  icon={CalendarDays}
                />

                <DetailItem label='Terminal' value={baggage.terminal} />

                <DetailItem
                  label='Aircraft'
                  value={
                    baggage.aircraftModel ?
                      `${baggage.aircraftModel} • ${baggage.aircraftRegistration ?? '—'}`
                    : '—'
                  }
                />
              </div>
            </div>
          </section>

          {/* Ticket & seat */}
          <section className='border-t border-border/60 pt-7'>
            <div className='mb-4 flex items-center justify-between gap-4'>
              <div className='flex items-center gap-2'>
                <QrCode className='size-4 text-muted-foreground' />

                <div>
                  <h3 className='text-sm font-semibold'>Ticket & seat</h3>

                  <p className='mt-1 text-[10px] text-muted-foreground'>
                    Passenger travel and reservation details.
                  </p>
                </div>
              </div>

              <Badge
                variant='outline'
                className='shrink-0 border-border/60 text-[10px]'
              >
                {baggage.ticketNumber ?? 'No ticket'}
              </Badge>
            </div>

            <div className='grid gap-4 sm:grid-cols-2'>
              <DetailItem
                label='Ticket'
                value={baggage.ticketNumber ?? '—'}
                icon={Ticket}
              />

              <DetailItem
                label='Ticket status'
                value={baggage.ticketStatus ?? '—'}
                icon={BadgeCheck}
              />

              <DetailItem
                label='Seat'
                value={baggage.seatNumber ?? '—'}
                icon={Luggage}
              />

              <DetailItem label='Booking' value={baggage.bookingReference} />
            </div>
          </section>

          {/* Handling timeline */}
          <section className='border-t border-border/60 pt-7'>
            <div className='mb-4 flex items-center gap-2'>
              <ClipboardCheck className='size-4 text-muted-foreground' />
              <h3 className='text-sm font-semibold'>Handling timeline</h3>
            </div>

            <div className='grid gap-3'>
              <TimelineItem
                icon={Weight}
                title='Baggage registered'
                description={
                  baggage.checkedAt ?
                    formatDateTime(baggage.checkedAt)
                  : 'No check-in timestamp recorded'
                }
              />

              <TimelineItem
                icon={ClipboardCheck}
                title='Check-in'
                description={`${baggage.checkInStatus ?? 'Not recorded'}${
                  baggage.checkInMethod ? ` • ${baggage.checkInMethod}` : ''
                }`}
              />

              <TimelineItem
                icon={Plane}
                title='Boarding'
                description={`${baggage.boardingStatus ?? 'Not recorded'}${
                  baggage.boardedAt ?
                    ` • ${formatDateTime(baggage.boardedAt)}`
                  : ''
                }`}
              />

              <TimelineItem
                icon={PackageCheck}
                title='Destination receipt'
                description={
                  baggage.receivedAt ?
                    formatDateTime(baggage.receivedAt)
                  : 'Not yet received'
                }
              />
            </div>
          </section>

          {/* Operations */}
          <section className='border-t border-border/60 pt-7'>
            <div className='mb-4 flex items-center gap-2'>
              <ShieldCheck className='size-4 text-muted-foreground' />
              <h3 className='text-sm font-semibold'>Operations</h3>
            </div>

            <div className='grid gap-4 sm:grid-cols-2'>
              <DetailItem
                label='Handled by'
                value={baggage.staffName ?? 'No staff assigned'}
                icon={UserRound}
              />

              <DetailItem
                label='Destination'
                value={baggage.destination}
                icon={MapPin}
              />

              <DetailItem
                label='Booking status'
                value={baggage.bookingStatus}
              />

              <DetailItem
                label='Payment status'
                value={baggage.paymentStatus}
                icon={CreditCard}
              />
            </div>
          </section>

          {/* Baggage status note */}
          <div
            className={[
              'rounded-2xl border p-4',
              baggage.status === 'LOST' ? 'border-rose-200 bg-rose-50'
              : baggage.status === 'RECEIVED' ?
                'border-emerald-200 bg-emerald-50'
              : 'border-[#5BA9D6]/20 bg-[#E5F5FC]/60',
            ].join(' ')}
          >
            <div className='flex items-start gap-3'>
              <CheckCircle2 className='mt-0.5 size-4 shrink-0' />

              <div>
                <p className='text-xs font-semibold'>
                  Baggage status: {status.label}
                </p>

                <p className='mt-1 text-[11px] leading-5 text-muted-foreground'>
                  {baggage.status === 'LOST' ?
                    'This baggage record requires operational attention and follow-up.'
                  : baggage.status === 'RECEIVED' ?
                    'The baggage has been recorded as received at the destination.'
                  : 'The baggage remains in the operational handling flow.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
