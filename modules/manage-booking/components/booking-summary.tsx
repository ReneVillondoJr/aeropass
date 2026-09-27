'use client';

import Link from 'next/link';

import { ArrowRight, CheckCircle2, Plane } from 'lucide-react';

import { Button } from '@/components/ui/button';

import type { ManageBookingResult } from '../types/manage-booking';

interface BookingSummaryProps {
  booking: ManageBookingResult;
  onReset: () => void;
}

export function BookingSummary({ booking, onReset }: BookingSummaryProps) {
  return (
    <div className='rounded-2xl border border-sky-100 bg-white p-6 sm:p-8'>
      <div className='flex items-center gap-3'>
        <div className='flex size-11 items-center justify-center rounded-full bg-emerald-50 text-emerald-600'>
          <CheckCircle2 className='size-5' />
        </div>

        <div>
          <p className='text-[10px] font-semibold uppercase tracking-[0.18em] text-emerald-600'>
            Booking found
          </p>

          <h2 className='mt-1 text-xl font-semibold tracking-tight text-[#102a43]'>
            {booking.bookingReference}
          </h2>
        </div>
      </div>

      <div className='mt-7 rounded-2xl bg-[#f4f9fc] p-5'>
        <div className='flex items-center gap-3'>
          <Plane className='size-5 text-[#3f88b2]' />

          <div>
            <p className='text-sm font-semibold text-[#102a43]'>
              {booking.flightNumber}
            </p>

            <p className='mt-1 text-xs text-slate-400'>
              {booking.originCode} → {booking.destinationCode}
            </p>
          </div>
        </div>
      </div>

      <div className='mt-5 divide-y divide-slate-100 rounded-2xl border border-sky-100'>
        {[
          ['Passenger', booking.passengerName],
          ['Departure', `${booking.departureDate} · ${booking.departureTime}`],
          ['Terminal', booking.terminal],
          ['Gate', booking.gate],
          ['Seat', booking.seat ?? 'Not assigned'],
          ['Fare', booking.fareClass ?? 'Not available'],
          ['Booking status', booking.bookingStatus],
          ['Payment', booking.paymentStatus],
          ['Ticket', booking.ticketNumber ?? 'Not issued'],
          ['Check-in', booking.checkInStatus],
          ['Boarding', booking.boardingStatus],
        ].map(([label, value]) => (
          <div key={label} className='flex justify-between gap-5 px-5 py-4'>
            <span className='text-sm text-slate-500'>{label}</span>

            <span className='text-right text-sm font-medium text-[#102a43]'>
              {value}
            </span>
          </div>
        ))}
      </div>

      <div className='mt-6 grid gap-3 sm:grid-cols-3'>
        {booking.ticketNumber ?
          <Link href={`/e-ticket/${booking.bookingId}`}>
            <Button variant='outline' className='h-10 w-full border-sky-200'>
              E-ticket
            </Button>
          </Link>
        : null}

        <Link href='/check-in'>
          <Button variant='outline' className='h-10 w-full border-sky-200'>
            Check-in
          </Button>
        </Link>

        <Button
          type='button'
          onClick={onReset}
          className='h-10 gap-2 bg-[#102a43] text-white hover:bg-[#183b5b]'
        >
          Search another
          <ArrowRight className='size-4' />
        </Button>
      </div>
    </div>
  );
}
