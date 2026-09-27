'use client';

import { BookingLookup } from './components/booking-lookup';
import { BookingSummary } from './components/booking-summary';
import { useManageBooking } from './hooks/use-manage-booking';

export function ManageBooking() {
  const { result, error, isSearching, searchBooking, reset } =
    useManageBooking();

  return (
    <div className='bg-[#f4f9fc]'>
      <section className='border-b border-sky-100 bg-white'>
        <div className='mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10 lg:py-14'>
          <p className='text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400'>
            Manage booking
          </p>

          <h1 className='mt-2 text-3xl font-semibold tracking-tight text-[#102a43] sm:text-4xl'>
            Manage your journey.
          </h1>

          <p className='mt-3 max-w-xl text-sm leading-6 text-slate-500'>
            Retrieve your reservation to review your flight, passenger, seat,
            ticket, payment, and travel status.
          </p>
        </div>
      </section>

      <section>
        <div className='mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10 lg:py-14'>
          <div className='mx-auto max-w-2xl'>
            {result ?
              <BookingSummary booking={result} onReset={reset} />
            : <BookingLookup
                error={error}
                isSearching={isSearching}
                onSubmit={searchBooking}
              />
            }
          </div>
        </div>
      </section>
    </div>
  );
}
