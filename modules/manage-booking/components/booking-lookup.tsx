'use client';

import type { FormEvent } from 'react';

import { ArrowRight, LoaderCircle, Search } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface BookingLookupProps {
  error: string | null;
  isSearching: boolean;
  onSubmit: (values: { bookingReference: string; lastName: string }) => void;
}

export function BookingLookup({
  error,
  isSearching,
  onSubmit,
}: BookingLookupProps) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    onSubmit({
      bookingReference: String(data.get('bookingReference') ?? ''),

      lastName: String(data.get('lastName') ?? ''),
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='rounded-2xl border border-sky-100 bg-white p-6 shadow-[0_20px_60px_-40px_rgba(16,42,67,0.35)] sm:p-8'
    >
      <div>
        <p className='text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400'>
          Manage reservation
        </p>

        <h2 className='mt-2 text-xl font-semibold tracking-tight text-[#102a43]'>
          Find your booking
        </h2>

        <p className='mt-2 text-sm leading-6 text-slate-500'>
          Enter the booking reference and passenger last name to retrieve your
          reservation.
        </p>
      </div>

      <div className='mt-7 space-y-5'>
        <div className='space-y-2'>
          <Label htmlFor='bookingReference'>Booking reference</Label>

          <Input
            id='bookingReference'
            name='bookingReference'
            placeholder='e.g. APX8K2'
            className='h-11 uppercase'
            required
          />
        </div>

        <div className='space-y-2'>
          <Label htmlFor='lastName'>Passenger last name</Label>

          <Input
            id='lastName'
            name='lastName'
            placeholder='Enter passenger last name'
            className='h-11'
            required
          />
        </div>

        {error ?
          <div className='rounded-xl border border-red-200 bg-red-50 px-4 py-3'>
            <p className='text-sm text-red-700'>{error}</p>
          </div>
        : null}

        <Button
          type='submit'
          disabled={isSearching}
          className='h-11 w-full gap-2 bg-[#102a43] text-white hover:bg-[#183b5b]'
        >
          {isSearching ?
            <>
              <LoaderCircle className='size-4 animate-spin' />
              Finding booking...
            </>
          : <>
              <Search className='size-4' />
              Find my booking
              <ArrowRight className='ml-auto size-4' />
            </>
          }
        </Button>
      </div>
    </form>
  );
}
