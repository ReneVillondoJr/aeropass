import Link from 'next/link';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';

import { CustomerPageHeader } from '@/components/customer/shared/customer-page-header';
import { CustomerStatusBadge } from '@/components/customer/shared/customer-status-badge';

import type { CustomerPassengerRecord } from '@/data/aeropass';

import { PassengerOverview } from './components/overview';
import { PassengerTravelRecord } from './components/travel-record';

interface CustomerPassengerDetailsModuleProps {
  record: CustomerPassengerRecord;
}

export function CustomerPassengerDetailsModule({
  record,
}: CustomerPassengerDetailsModuleProps) {
  const passengerName = [
    record.passenger.firstName,
    record.passenger.middleName,
    record.passenger.lastName,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <section className='space-y-6'>
      <Link
        href='/customer/passengers'
        className='inline-flex min-h-9 items-center gap-2 rounded-lg px-2 text-xs font-semibold text-muted-foreground outline-none transition hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-[#5BA9D6]'
      >
        <ArrowLeft className='size-3.5' aria-hidden='true' />
        Back to passengers
      </Link>

      <CustomerPageHeader
        eyebrow={`Passenger record · ${record.passenger.id}`}
        title={passengerName}
        description='Review personal details, travel documents, the associated booking, seat and fare, ticket status, check-in, boarding, and baggage records.'
        actions={
          <div className='flex flex-wrap items-center gap-2'>
            <CustomerStatusBadge status={record.booking.status} />
            <Link
              href={`/customer/bookings/${encodeURIComponent(record.booking.id)}`}
              className='inline-flex min-h-9 items-center justify-center gap-2 rounded-xl bg-[#102A43] px-3.5 py-2 text-xs font-semibold text-white outline-none transition hover:bg-[#183F5D] focus-visible:ring-2 focus-visible:ring-[#5BA9D6] focus-visible:ring-offset-2'
            >
              Open booking
              <ArrowUpRight className='size-3.5' aria-hidden='true' />
            </Link>
          </div>
        }
      />

      <div className='grid min-w-0 gap-6 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]'>
        <div className='min-w-0'>
          <PassengerOverview record={record} />
        </div>

        <div className='min-w-0'>
          <PassengerTravelRecord record={record} />
        </div>
      </div>

      <div className='rounded-2xl border border-[#D9EAF3] bg-[#EEF7FB]/70 p-4 sm:p-5'>
        <h2 className='text-sm font-semibold text-[#102A43]'>
          Need to update passenger information?
        </h2>

        <p className='mt-1 text-xs leading-5 text-[#34556D]'>
          This version is read-only because passenger records are currently tied
          to bookings in the AeroPass mock data. Editing saved passenger
          profiles should be added only after a separate profile-management and
          persistence flow exists.
        </p>
      </div>
    </section>
  );
}
