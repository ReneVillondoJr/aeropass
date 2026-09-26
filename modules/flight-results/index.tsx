'use client';

import Link from 'next/link';

import { CheckCircle2, ShieldCheck } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { FlightResults } from './components/flight-results';

import { FlightSearchForm } from './components/flight-search-form';

import { useFlightSearch } from './hooks/use-flight-search';

interface PublicSearchProps {
  initialFrom?: string;
  initialTo?: string;
  initialDepartureDate?: string;
}

export function PublicSearch({
  initialFrom = '',
  initialTo = '',
  initialDepartureDate = '',
}: PublicSearchProps) {
  const {
    results,
    hasSearched,
    isSearching,
    error,
    from,
    to,
    departureDate,
    airportOptions,
    setFrom,
    setTo,
    setDepartureDate,
    runSearch,
    clearSearch,
  } = useFlightSearch({
    initialFrom,
    initialTo,
    initialDepartureDate,
  });

  return (
    <div className='bg-[#f4f9fc]'>
      <section className='border-b border-sky-100 bg-white'>
        <div className='mx-auto max-w-7xl px-5 py-9 sm:px-8 lg:px-10 lg:py-12'>
          <div className='mt-7 max-w-2xl'>
            <p className='text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400'>
              Explore flights
            </p>

            <h1 className='mt-2 text-3xl font-semibold tracking-tight text-[#102a43] sm:text-4xl'>
              Find your next journey.
            </h1>

            <p className='mt-3 text-sm leading-6 text-slate-500'>
              Search available AeroPass flights, compare fares, and view
              complete flight details before booking.
            </p>
          </div>

          <div className='mt-8'>
            <FlightSearchForm
              airports={airportOptions}
              from={from}
              to={to}
              departureDate={departureDate}
              isSearching={isSearching}
              onFromChange={setFrom}
              onToChange={setTo}
              onDepartureDateChange={setDepartureDate}
              onSubmit={() => runSearch()}
              onClear={clearSearch}
            />
          </div>

          {error ?
            <div className='mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3'>
              <p className='text-sm text-red-700'>{error}</p>
            </div>
          : null}
        </div>
      </section>

      <section>
        <div className='mx-auto max-w-7xl px-5 py-9 sm:px-8 lg:px-10 lg:py-12'>
          <div className='grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px]'>
            <FlightResults results={results} hasSearched={hasSearched} />

            <aside className='space-y-4'>
              <div className='rounded-2xl border border-sky-100 bg-[#102a43] p-5 text-white'>
                <div className='flex size-9 items-center justify-center rounded-xl bg-white/10'>
                  <ShieldCheck className='size-4 text-[#c5a46d]' />
                </div>

                <h2 className='mt-4 text-sm font-semibold'>
                  Plan with confidence
                </h2>

                <p className='mt-2 text-xs leading-5 text-slate-300'>
                  Review your flight, aircraft, fare, and seat availability
                  before continuing to booking.
                </p>
              </div>

              <div className='rounded-2xl border border-sky-100 bg-white p-5'>
                <div className='flex items-center gap-2'>
                  <CheckCircle2 className='size-4 text-emerald-500' />

                  <p className='text-sm font-semibold text-[#102a43]'>
                    Simple booking flow
                  </p>
                </div>

                <div className='mt-4 space-y-3'>
                  <div className='flex gap-3'>
                    <span className='flex size-5 shrink-0 items-center justify-center rounded-full bg-[#f4f9fc] text-[10px] font-semibold text-[#3f7194]'>
                      1
                    </span>

                    <p className='text-xs leading-5 text-slate-500'>
                      Search for a route
                    </p>
                  </div>

                  <div className='flex gap-3'>
                    <span className='flex size-5 shrink-0 items-center justify-center rounded-full bg-[#f4f9fc] text-[10px] font-semibold text-[#3f7194]'>
                      2
                    </span>

                    <p className='text-xs leading-5 text-slate-500'>
                      Review flight details
                    </p>
                  </div>

                  <div className='flex gap-3'>
                    <span className='flex size-5 shrink-0 items-center justify-center rounded-full bg-[#f4f9fc] text-[10px] font-semibold text-[#3f7194]'>
                      3
                    </span>

                    <p className='text-xs leading-5 text-slate-500'>
                      Select a fare and book
                    </p>
                  </div>
                </div>
              </div>

              <div className='rounded-2xl border border-sky-100 bg-white p-5'>
                <p className='text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400'>
                  Need an existing booking?
                </p>

                <p className='mt-2 text-xs leading-5 text-slate-500'>
                  Retrieve a reservation or continue to online check-in.
                </p>

                <div className='mt-4 flex flex-col gap-2'>
                  <Link href='/manage-booking'>
                    <Button
                      variant='outline'
                      className='h-9 w-full rounded-lg border-sky-200 text-xs'
                    >
                      Manage booking
                    </Button>
                  </Link>

                  <Link href='/check-in'>
                    <Button
                      variant='outline'
                      className='h-9 w-full rounded-lg border-sky-200 text-xs'
                    >
                      Check-in
                    </Button>
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
