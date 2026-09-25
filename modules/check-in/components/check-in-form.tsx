// cspell:ignore aeropass

'use client';

import type { FormEvent } from 'react';

import { ArrowRight, LoaderCircle, Search } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import type { CheckInSchema } from '@/modules/check-in/schema/check-in';

interface CheckInFormProps {
  error: string | null;
  isChecking: boolean;
  onSubmit: (values: CheckInSchema) => void;
}

export function CheckInForm({ error, isChecking, onSubmit }: CheckInFormProps) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    onSubmit({
      bookingReference: String(formData.get('bookingReference') ?? ''),

      lastName: String(formData.get('lastName') ?? ''),
    });
  }

  return (
    <div>
      <div>
        <p className='text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400'>
          Retrieve reservation
        </p>

        <h2 className='mt-2 text-xl font-semibold tracking-tight text-[#102a43]'>
          Find your booking
        </h2>

        <p className='mt-2 text-sm leading-6 text-slate-500'>
          Enter your booking reference and passenger last name.
        </p>
      </div>

      <form onSubmit={handleSubmit} className='mt-8 space-y-5'>
        <div className='space-y-2'>
          <Label htmlFor='bookingReference'>Booking reference</Label>

          <Input
            id='bookingReference'
            name='bookingReference'
            placeholder='e.g. APX8K2'
            autoComplete='off'
            required
            className='h-11 border-slate-200 bg-white uppercase'
          />

          <p className='text-xs leading-5 text-slate-400'>
            Your booking reference can be found in your reservation
            confirmation.
          </p>
        </div>

        <div className='space-y-2'>
          <Label htmlFor='lastName'>Passenger last name</Label>

          <Input
            id='lastName'
            name='lastName'
            placeholder='Enter passenger last name'
            autoComplete='family-name'
            required
            className='h-11 border-slate-200 bg-white'
          />
        </div>

        {error ?
          <div className='rounded-xl border border-red-200 bg-red-50 px-4 py-3'>
            <p className='text-sm leading-5 text-red-700'>{error}</p>
          </div>
        : null}

        <Button
          type='submit'
          disabled={isChecking}
          className='h-11 w-full bg-[#102a43] text-white hover:bg-[#183b5b]'
        >
          {isChecking ?
            <>
              <LoaderCircle className='size-4 animate-spin' />
              Checking booking...
            </>
          : <>
              <Search className='size-4' />
              Find my booking
              <ArrowRight className='ml-auto size-4' />
            </>
          }
        </Button>
      </form>
    </div>
  );
}
