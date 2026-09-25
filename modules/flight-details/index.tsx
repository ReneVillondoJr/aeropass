'use client';

import Link from 'next/link';

import {
  ArrowLeft,
  ArrowRight,
  LoaderCircle,
  Plane,
  RotateCcw,
  ShieldCheck,
} from 'lucide-react';

import { Button } from '@/components/ui/button';

import { FlightFareOptions } from './components/flight-fare-options';
import { FlightHeader } from './components/flight-header';
import { FlightRoute } from './components/flight-route';
import { FlightSummary } from './components/flight-summary';
import { useFlight } from './hooks/use-flight';

interface PublicFlightProps {
  flightId: string;
}

export function PublicFlight({ flightId }: PublicFlightProps) {
  const {
    flight,
    error,
    isLoading,
    selectedFareId,
    selectedFare,
    setSelectedFare,
    retry,
  } = useFlight(flightId);

  if (isLoading) {
    return (
      <div className='bg-[#f4f9fc]'>
        <div className='mx-auto flex max-w-7xl items-center justify-center px-5 py-24 sm:px-8 lg:px-10'>
          <div className='flex flex-col items-center text-center'>
            <div className='flex size-12 items-center justify-center rounded-2xl bg-white text-[#3f88b2] shadow-sm'>
              <LoaderCircle className='size-5 animate-spin' />
            </div>

            <p className='mt-4 text-sm font-medium text-[#102a43]'>
              Loading flight
            </p>

            <p className='mt-1 text-xs text-slate-400'>
              Retrieving schedule and fare information.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !flight) {
    return (
      <div className='bg-[#f4f9fc]'>
        <div className='mx-auto max-w-2xl px-5 py-20 text-center sm:px-8'>
          <div className='mx-auto flex size-12 items-center justify-center rounded-2xl bg-white text-slate-400 shadow-sm'>
            <Plane className='size-5' />
          </div>

          <p className='mt-5 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400'>
            Flight unavailable
          </p>

          <h1 className='mt-2 text-2xl font-semibold tracking-tight text-[#102a43]'>
            We couldn&apos;t find that flight
          </h1>

          <p className='mt-2 text-sm leading-6 text-slate-500'>
            The flight may have been removed or the link may no longer be valid.
          </p>

          <div className='mt-6 flex justify-center gap-3'>
            <Button type='button' variant='outline' onClick={retry}>
              <RotateCcw className='size-4' />
              Try again
            </Button>

            <Link href='/search'>
              <Button type='button'>
                <ArrowLeft className='size-4' />
                View flights
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const canBook =
    flight.status !== 'CANCELLED' &&
    flight.status !== 'DEPARTED' &&
    flight.status !== 'ARRIVED' &&
    flight.seatsAvailable > 0 &&
    Boolean(selectedFare);

  return (
    <div className='bg-[#f4f9fc]'>
      <FlightHeader flight={flight} />

      <section>
        <div className='mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-10 lg:py-12'>
          <div className='grid gap-6 xl:grid-cols-[minmax(0,1.3fr)_minmax(340px,0.7fr)]'>
            <div className='space-y-6'>
              <FlightRoute flight={flight} />

              <FlightSummary flight={flight} />

              <FlightFareOptions
                fares={flight.fares}
                selectedFareId={selectedFareId}
                onSelect={setSelectedFare}
              />
            </div>

            <aside className='xl:sticky xl:top-24 xl:self-start'>
              <div className='overflow-hidden rounded-2xl border border-[#dce8ef] bg-white shadow-[0_20px_60px_-40px_rgba(16,42,67,0.35)]'>
                <div className='border-b border-sky-100 bg-[#102a43] px-6 py-5 text-white'>
                  <p className='text-[10px] font-semibold uppercase tracking-[0.18em] text-white/50'>
                    Your selection
                  </p>

                  <div className='mt-3 flex items-center justify-between gap-4'>
                    <div>
                      <p className='text-lg font-semibold'>
                        {flight.originCode}
                      </p>

                      <p className='text-xs text-white/50'>
                        {flight.departureTime}
                      </p>
                    </div>

                    <ArrowRight className='size-4 text-[#c5a46d]' />

                    <div className='text-right'>
                      <p className='text-lg font-semibold'>
                        {flight.destinationCode}
                      </p>

                      <p className='text-xs text-white/50'>
                        {flight.arrivalTime}
                      </p>
                    </div>
                  </div>
                </div>

                <div className='p-6'>
                  {selectedFare ?
                    <>
                      <div>
                        <p className='text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400'>
                          Fare
                        </p>

                        <div className='mt-2 flex items-end justify-between gap-4'>
                          <div>
                            <p className='text-base font-semibold text-[#102a43]'>
                              {selectedFare.name}
                            </p>

                            <p className='mt-1 text-xs text-slate-400'>
                              1 passenger · base fare
                            </p>
                          </div>

                          <p className='text-xl font-semibold tracking-tight text-[#102a43]'>
                            ₱{selectedFare.price.toLocaleString('en-PH')}
                          </p>
                        </div>
                      </div>

                      <div className='mt-5 border-t border-slate-100 pt-5'>
                        <div className='flex items-center justify-between text-xs'>
                          <span className='text-slate-500'>Fare</span>

                          <span className='font-medium text-[#102a43]'>
                            ₱{selectedFare.price.toLocaleString('en-PH')}
                          </span>
                        </div>

                        <div className='mt-2 flex items-center justify-between text-xs'>
                          <span className='text-slate-500'>Taxes & fees</span>

                          <span className='text-slate-400'>
                            Calculated next
                          </span>
                        </div>
                      </div>

                      <div className='mt-5 rounded-xl bg-[#f4f9fc] p-4'>
                        <div className='flex items-start gap-3'>
                          <ShieldCheck className='mt-0.5 size-4 shrink-0 text-emerald-500' />

                          <div>
                            <p className='text-xs font-semibold text-[#102a43]'>
                              Secure booking
                            </p>

                            <p className='mt-1 text-[11px] leading-5 text-slate-400'>
                              Your selected fare will be carried into seat
                              selection and checkout.
                            </p>
                          </div>
                        </div>
                      </div>

                      {canBook ?
                        <Link
                          href={`/book/${flight.id}/seats?fare=${encodeURIComponent(selectedFare.id)}`}
                          className='mt-5 block'
                        >
                          <Button className='h-11 w-full gap-2 rounded-xl bg-[#102a43] text-white hover:bg-[#183b5b]'>
                            Continue to booking
                            <ArrowRight className='size-4' />
                          </Button>
                        </Link>
                      : <Button
                          type='button'
                          disabled
                          className='mt-5 h-11 w-full rounded-xl'
                        >
                          Booking unavailable
                        </Button>
                      }

                      <p className='mt-3 text-center text-[10px] leading-4 text-slate-400'>
                        Final price may change with taxes, seats, baggage, and
                        optional services.
                      </p>
                    </>
                  : <div className='py-6 text-center'>
                      <p className='text-sm font-medium text-[#102a43]'>
                        Select a fare
                      </p>

                      <p className='mt-1 text-xs leading-5 text-slate-400'>
                        Choose a fare option to continue.
                      </p>
                    </div>
                  }
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className='border-t border-sky-100 bg-white'>
        <div className='mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-10'>
          <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
            <div>
              <p className='text-sm font-semibold text-[#102a43]'>
                Need help with your trip?
              </p>

              <p className='mt-1 text-xs text-slate-400'>
                Manage a reservation or check in for an upcoming flight.
              </p>
            </div>

            <div className='flex flex-wrap gap-3'>
              <Link href='/manage-booking'>
                <Button
                  variant='outline'
                  className='h-9 rounded-lg border-sky-200'
                >
                  Manage booking
                </Button>
              </Link>

              <Link href='/check-in'>
                <Button
                  variant='outline'
                  className='h-9 rounded-lg border-sky-200'
                >
                  Check-in
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
