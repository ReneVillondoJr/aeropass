import Link from 'next/link';
import { UsersRound } from 'lucide-react';

import { CustomerPageHeader } from '@/components/customer/shared/customer-page-header';

export function PassengersHeader() {
  return (
    <div className='space-y-5'>
      <CustomerPageHeader
        eyebrow='Customer account'
        title='Passengers'
        description='Review passenger information linked to your AeroPass bookings, including travel documents, seats, tickets, and check-in progress.'
        actions={
          <Link
            href='/customer/bookings'
            className='inline-flex min-h-10 items-center justify-center gap-2 rounded-xl bg-[#102A43] px-4 py-2 text-xs font-semibold text-white outline-none transition hover:bg-[#183F5D] focus-visible:ring-2 focus-visible:ring-[#5BA9D6] focus-visible:ring-offset-2'
          >
            <UsersRound className='size-3.5' aria-hidden='true' />
            View bookings
          </Link>
        }
      />

      <div className='rounded-2xl border border-[#D9EAF3] bg-gradient-to-br from-[#EEF7FB] via-card to-card p-4 sm:p-5'>
        <div className='flex items-start gap-3'>
          <span className='flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#102A43] text-white'>
            <UsersRound className='size-4' aria-hidden='true' />
          </span>

          <div>
            <h2 className='text-sm font-semibold text-[#102A43]'>
              Passenger records from your bookings
            </h2>

            <p className='mt-1 max-w-3xl text-xs leading-5 text-[#34556D]'>
              Passenger information is attached to each reservation in the
              current AeroPass data model. This page shows those booking-linked
              records, not a separate saved-traveler address book.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
