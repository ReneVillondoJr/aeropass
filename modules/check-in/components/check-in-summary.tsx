// cspell:ignore aeropass

'use client';

import Link from 'next/link';

import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Plane,
  RotateCcw,
} from 'lucide-react';

import type { CheckInResult } from '../types/check-in';

interface CheckInSummaryProps {
  result: CheckInResult;
  onReset: () => void;
}

export function CheckInSummary({ result, onReset }: CheckInSummaryProps) {
  const alreadyCheckedIn = result.checkInStatus === 'Completed';

  return (
    <div>
      <div
        className={`flex size-12 items-center justify-center rounded-full ${
          alreadyCheckedIn ?
            'bg-sky-50 text-[#3f88b2]'
          : 'bg-emerald-50 text-emerald-600'
        }`}
      >
        <CheckCircle2 className='size-6' />
      </div>

      <p
        className={`mt-6 text-[10px] font-semibold uppercase tracking-[0.18em] ${
          alreadyCheckedIn ? 'text-[#3f7194]' : 'text-emerald-600'
        }`}
      >
        {alreadyCheckedIn ? 'Already checked in' : 'Booking found'}
      </p>

      <h2 className='mt-2 text-2xl font-semibold tracking-tight text-[#102a43]'>
        {alreadyCheckedIn ?
          'Your check-in is complete'
        : 'Your reservation is ready'}
      </h2>

      <p className='mt-2 text-sm leading-6 text-slate-500'>
        {alreadyCheckedIn ?
          'This passenger has already completed check-in for this reservation.'
        : 'We found the reservation associated with the passenger information you provided.'
        }
      </p>

      <div className='mt-7 rounded-2xl border border-sky-100 bg-[#f8fbfd] p-5'>
        <div className='flex items-center justify-between gap-4'>
          <div>
            <p className='text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400'>
              Flight
            </p>

            <p className='mt-1 text-base font-semibold text-[#102a43]'>
              {result.flightNumber}
            </p>
          </div>

          <div className='flex size-10 items-center justify-center rounded-xl bg-white text-[#3f88b2] shadow-sm'>
            <Plane className='size-4' />
          </div>
        </div>

        <div className='mt-6 flex items-center gap-3'>
          <div className='min-w-0 text-right'>
            <p className='text-lg font-semibold text-[#102a43]'>
              {result.originCode}
            </p>

            <p className='mt-0.5 truncate text-xs text-slate-400'>
              {result.originCity}
            </p>
          </div>

          <div className='flex flex-1 items-center gap-2'>
            <div className='h-px flex-1 bg-slate-200' />

            <Plane className='size-3.5 shrink-0 text-[#c5a46d]' />

            <div className='h-px flex-1 bg-slate-200' />
          </div>

          <div className='min-w-0'>
            <p className='text-lg font-semibold text-[#102a43]'>
              {result.destinationCode}
            </p>

            <p className='mt-0.5 truncate text-xs text-slate-400'>
              {result.destinationCity}
            </p>
          </div>
        </div>
      </div>

      <div className='mt-5 divide-y divide-slate-100 rounded-2xl border border-sky-100 bg-white'>
        <div className='flex items-center justify-between gap-5 px-5 py-4'>
          <span className='text-sm text-slate-500'>Passenger</span>

          <span className='text-right text-sm font-medium text-[#102a43]'>
            {result.passengerName}
          </span>
        </div>

        <div className='flex items-center justify-between gap-5 px-5 py-4'>
          <span className='text-sm text-slate-500'>Booking reference</span>

          <span className='font-mono text-xs font-semibold tracking-wide text-[#102a43]'>
            {result.bookingReference}
          </span>
        </div>

        <div className='flex items-center justify-between gap-5 px-5 py-4'>
          <span className='text-sm text-slate-500'>Departure</span>

          <span className='text-right text-sm font-medium text-[#102a43]'>
            {result.departureDate}
          </span>
        </div>

        <div className='flex items-center justify-between gap-5 px-5 py-4'>
          <span className='text-sm text-slate-500'>Departure time</span>

          <span className='text-right text-sm font-medium text-[#102a43]'>
            {result.departureTime}
          </span>
        </div>

        <div className='flex items-center justify-between gap-5 px-5 py-4'>
          <span className='text-sm text-slate-500'>Terminal</span>

          <span className='text-right text-sm font-medium text-[#102a43]'>
            {result.terminal}
          </span>
        </div>

        <div className='flex items-center justify-between gap-5 px-5 py-4'>
          <span className='text-sm text-slate-500'>Gate</span>

          <span className='text-right text-sm font-medium text-[#102a43]'>
            {result.gate}
          </span>
        </div>
      </div>

      <div className='mt-6 rounded-xl border border-[#dce8ef] bg-[#f4f9fc] px-4 py-3'>
        <p className='text-xs leading-5 text-slate-500'>
          {alreadyCheckedIn ?
            'Your check-in is already complete. Continue to your boarding pass.'
          : 'Your reservation has been verified. Continue to complete the check-in process.'
          }
        </p>
      </div>

      <div className='mt-6 flex flex-col gap-3 sm:flex-row'>
        <Link
          href={`/boarding-pass/${result.bookingId}`}
          className='inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-lg bg-[#102a43] px-4 text-sm font-medium text-white transition-colors hover:bg-[#183b5b]'
        >
          {alreadyCheckedIn ?
            'View boarding pass'
          : 'Continue to boarding pass'}

          <ArrowRight className='size-4' />
        </Link>

        <button
          type='button'
          onClick={onReset}
          className='inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-[#102a43]'
        >
          <RotateCcw className='size-4' />
          Check another booking
        </button>
      </div>

      <Link
        href='/'
        className='mt-5 inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 transition-colors hover:text-[#102a43]'
      >
        <ArrowLeft className='size-3.5' />
        Return to AeroPass
      </Link>
    </div>
  );
}
