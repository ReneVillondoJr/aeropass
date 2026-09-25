// cspell:ignore aeropass

'use client';

import Link from 'next/link';

import {
  ArrowLeft,
  CheckCircle2,
  LockKeyhole,
  PlaneTakeoff,
  ShieldCheck,
} from 'lucide-react';

import { CheckInForm } from './components/check-in-form';
import { CheckInSummary } from './components/check-in-summary';
import { useCheckIn } from './hooks/use-check-in';

export function CheckIn() {
  const { result, error, isChecking, submitCheckIn, resetCheckIn } =
    useCheckIn();

  return (
    <div className='bg-[#f4f9fc]'>
      <section className='border-b border-sky-100 bg-white'>
        <div className='mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10 lg:py-14'>
          <div className='flex items-center gap-2 text-xs font-medium text-slate-400'>
            <Link
              href='/'
              className='inline-flex items-center gap-1.5 transition-colors hover:text-[#102a43]'
            >
              <ArrowLeft className='size-3.5' />
              AeroPass
            </Link>

            <span>/</span>

            <span className='text-[#3f7194]'>Check-in</span>
          </div>

          <div className='mt-8 max-w-2xl'>
            <div className='flex size-11 items-center justify-center rounded-xl bg-[#e5f5fc] text-[#3f88b2]'>
              <PlaneTakeoff className='size-5' />
            </div>

            <p className='mt-5 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400'>
              Online check-in
            </p>

            <h1 className='mt-2 text-3xl font-semibold tracking-tight text-[#102a43] sm:text-4xl'>
              Check in for your flight
            </h1>

            <p className='mt-3 max-w-xl text-sm leading-6 text-slate-500'>
              Enter your booking reference and passenger last name to retrieve
              your reservation.
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className='mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10 lg:py-14'>
          <div className='grid gap-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(420px,1.15fr)] lg:items-start'>
            <div className='rounded-2xl border border-sky-100 bg-white p-6 shadow-[0_20px_60px_-40px_rgba(16,42,67,0.35)] sm:p-8'>
              {result ?
                <CheckInSummary result={result} onReset={resetCheckIn} />
              : <CheckInForm
                  error={error}
                  isChecking={isChecking}
                  onSubmit={submitCheckIn}
                />
              }
            </div>

            <div className='space-y-4'>
              <div className='rounded-2xl border border-sky-100 bg-[#102a43] p-6 text-white sm:p-8'>
                <div className='flex size-10 items-center justify-center rounded-xl bg-white/10'>
                  <ShieldCheck className='size-5 text-[#c5a46d]' />
                </div>

                <h2 className='mt-5 text-lg font-semibold'>
                  A simpler departure
                </h2>

                <p className='mt-2 text-sm leading-6 text-slate-300'>
                  Prepare for your journey online and keep your travel
                  information ready before arriving at the airport.
                </p>

                <div className='mt-6 space-y-3 border-t border-white/10 pt-5'>
                  <div className='flex items-center gap-3'>
                    <CheckCircle2 className='size-4 text-[#c5a46d]' />

                    <span className='text-sm text-slate-200'>
                      Retrieve your booking
                    </span>
                  </div>

                  <div className='flex items-center gap-3'>
                    <CheckCircle2 className='size-4 text-[#c5a46d]' />

                    <span className='text-sm text-slate-200'>
                      Verify passenger details
                    </span>
                  </div>

                  <div className='flex items-center gap-3'>
                    <CheckCircle2 className='size-4 text-[#c5a46d]' />

                    <span className='text-sm text-slate-200'>
                      Access boarding information
                    </span>
                  </div>
                </div>
              </div>

              <div className='rounded-2xl border border-sky-100 bg-white p-5'>
                <div className='flex gap-3'>
                  <div className='flex size-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500'>
                    <LockKeyhole className='size-4' />
                  </div>

                  <div>
                    <p className='text-sm font-semibold text-[#102a43]'>
                      Your details stay protected
                    </p>

                    <p className='mt-1 text-xs leading-5 text-slate-500'>
                      Use the booking reference and passenger information
                      associated with your reservation.
                    </p>
                  </div>
                </div>
              </div>

              <div className='rounded-2xl border border-sky-100 bg-[#eef7fb] p-5'>
                <p className='text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400'>
                  Need your booking?
                </p>

                <p className='mt-2 text-sm leading-6 text-slate-600'>
                  Your booking reference is included in your AeroPass
                  reservation confirmation.
                </p>

                <Link
                  href='/manage-booking'
                  className='mt-4 inline-flex text-sm font-medium text-[#3f7194] transition-colors hover:text-[#102a43]'
                >
                  Manage booking
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
