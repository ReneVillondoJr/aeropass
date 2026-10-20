import {
  Accessibility,
  CalendarDays,
  IdCard,
  Mail,
  Phone,
  UserRound,
} from 'lucide-react';

import type { CustomerPassengerRecord } from '@/data/aeropass';

interface PassengerOverviewProps {
  record: CustomerPassengerRecord;
}

function formatDate(value?: string | null) {
  if (!value) return 'Not recorded';

  const date = new Date(`${value.slice(0, 10)}T12:00:00+08:00`);

  if (Number.isNaN(date.getTime())) {
    return 'Not recorded';
  }

  return new Intl.DateTimeFormat('en-PH', {
    dateStyle: 'medium',
    timeZone: 'Asia/Manila',
  }).format(date);
}

function DetailValue({ label, value }: { label: string; value: string }) {
  return (
    <div className='min-w-0'>
      <dt className='text-[9px] font-semibold uppercase tracking-[0.1em] text-muted-foreground'>
        {label}
      </dt>
      <dd className='mt-1 break-words text-xs font-medium text-foreground'>
        {value}
      </dd>
    </div>
  );
}

export function PassengerOverview({ record }: PassengerOverviewProps) {
  const { passenger, booking } = record;

  const name = [passenger.firstName, passenger.middleName, passenger.lastName]
    .filter(Boolean)
    .join(' ');

  return (
    <section className='overflow-hidden rounded-2xl border border-border/70 bg-card shadow-sm'>
      <div className='border-b border-border/60 px-4 py-5 sm:px-5'>
        <div className='flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between'>
          <div className='flex min-w-0 items-start gap-3'>
            <span className='flex size-12 shrink-0 items-center justify-center rounded-2xl bg-[#EEF7FB] text-[#2879A8]'>
              <UserRound className='size-5' aria-hidden='true' />
            </span>

            <div className='min-w-0'>
              <p className='text-[10px] font-semibold uppercase tracking-[0.14em] text-[#2879A8]'>
                Passenger record
              </p>

              <h2 className='mt-1 break-words text-lg font-semibold tracking-tight text-foreground'>
                {name}
              </h2>

              <p className='mt-1 break-all font-mono text-[11px] text-muted-foreground'>
                {passenger.id}
              </p>
            </div>
          </div>

          {passenger.specialAssistance ?
            <span className='inline-flex items-center gap-1.5 self-start rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5 text-[10px] font-semibold text-amber-800'>
              <Accessibility className='size-3.5' aria-hidden='true' />
              Special assistance recorded
            </span>
          : null}
        </div>
      </div>

      <div className='p-4 sm:p-5'>
        <div className='grid gap-3 sm:grid-cols-2'>
          <div className='rounded-xl border border-border/70 p-3'>
            <p className='flex items-center gap-2 text-xs font-semibold text-foreground'>
              <Mail
                className='size-3.5 text-muted-foreground'
                aria-hidden='true'
              />
              Email address
            </p>

            <p className='mt-2 break-all text-xs text-muted-foreground'>
              {passenger.email || 'Not provided'}
            </p>
          </div>

          <div className='rounded-xl border border-border/70 p-3'>
            <p className='flex items-center gap-2 text-xs font-semibold text-foreground'>
              <Phone
                className='size-3.5 text-muted-foreground'
                aria-hidden='true'
              />
              Phone number
            </p>

            <p className='mt-2 text-xs text-muted-foreground'>
              {passenger.phone || 'Not provided'}
            </p>
          </div>
        </div>

        <div className='mt-5 flex items-center gap-2 border-b border-border/60 pb-3'>
          <IdCard className='size-4 text-[#2879A8]' aria-hidden='true' />

          <h3 className='text-xs font-semibold text-foreground'>
            Personal and travel document details
          </h3>
        </div>

        <dl className='mt-4 grid gap-x-4 gap-y-4 sm:grid-cols-2 lg:grid-cols-3'>
          <DetailValue label='First name' value={passenger.firstName} />

          <DetailValue
            label='Middle name'
            value={passenger.middleName ?? 'Not provided'}
          />

          <DetailValue label='Last name' value={passenger.lastName} />

          <DetailValue
            label='Date of birth'
            value={formatDate(passenger.dateOfBirth)}
          />

          <DetailValue
            label='Gender'
            value={passenger.gender
              .toLowerCase()
              .replace(/^\w/, (char) => char.toUpperCase())}
          />

          <DetailValue
            label='Nationality'
            value={passenger.nationality || 'Not provided'}
          />

          <DetailValue
            label='Passport / travel document'
            value={passenger.maskedPassportNumber ?? 'Not recorded'}
          />

          <DetailValue
            label='Document expiry'
            value={formatDate(passenger.passportExpiry)}
          />

          <DetailValue
            label='Frequent flyer number'
            value={passenger.frequentFlyerNumber ?? 'Not linked'}
          />
        </dl>

        <div className='mt-5 rounded-xl bg-muted/35 p-3'>
          <p className='flex items-center gap-2 text-xs font-semibold text-foreground'>
            <CalendarDays
              className='size-4 text-muted-foreground'
              aria-hidden='true'
            />
            Linked booking
          </p>

          <div className='mt-2 flex flex-wrap items-center justify-between gap-2'>
            <div>
              <p className='font-mono text-xs font-semibold text-foreground'>
                {booking.bookingReference}
              </p>

              <p className='mt-1 text-[10px] text-muted-foreground'>
                Created {formatDate(booking.createdAt)}
              </p>
            </div>

            <span className='rounded-full border border-border bg-background px-2.5 py-1 text-[10px] font-semibold text-muted-foreground'>
              {booking.status.replaceAll('_', ' ')}
            </span>
          </div>
        </div>

        <p className='mt-4 text-[10px] leading-5 text-muted-foreground'>
          For privacy, the repository provides only a masked travel-document
          number. This screen displays the passenger information associated with
          this booking; it does not edit or maintain a separate saved-passenger
          profile.
        </p>
      </div>
    </section>
  );
}
