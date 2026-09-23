'use client';

import type { FormEvent } from 'react';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import {
  ArrowRight,
  CalendarDays,
  MapPin,
  PlaneTakeoff,
  Users,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const airports = [
  {
    code: 'MNL',
    city: 'Manila',
  },
  {
    code: 'CEB',
    city: 'Cebu',
  },
  {
    code: 'DVO',
    city: 'Davao',
  },
  {
    code: 'MPH',
    city: 'Caticlan',
  },
  {
    code: 'ZAM',
    city: 'Zamboanga',
  },
  {
    code: 'ILO',
    city: 'Iloilo',
  },
];

type TripType = 'ROUND_TRIP' | 'ONE_WAY';

export function FlightSearch() {
  const router = useRouter();

  const [tripType, setTripType] = useState<TripType>('ROUND_TRIP');

  const [from, setFrom] = useState('MNL');
  const [to, setTo] = useState('CEB');

  const [departure, setDeparture] = useState('');

  const [returnDate, setReturnDate] = useState('');

  const [passengers, setPassengers] = useState('1');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const params = new URLSearchParams({
      from,
      to,
      departure,
      passengers,
      trip: tripType,
    });

    if (tripType === 'ROUND_TRIP' && returnDate) {
      params.set('return', returnDate);
    }

    router.push(`/search?${params.toString()}`);
  }

  function swapAirports() {
    setFrom(to);
    setTo(from);
  }

  return (
    <div className='overflow-hidden rounded-[24px] border border-sky-100 bg-white shadow-[0_30px_80px_-40px_rgba(16,42,67,0.32)]'>
      <div className='border-b border-sky-100 bg-gradient-to-r from-[#f5fbff] via-white to-[#fffdf8] px-5 py-4 sm:px-6'>
        <div className='flex flex-wrap items-center justify-between gap-3'>
          <div className='flex items-center gap-1 rounded-lg bg-sky-50 p-1'>
            <button
              type='button'
              onClick={() => setTripType('ROUND_TRIP')}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                tripType === 'ROUND_TRIP' ?
                  'bg-white text-[#102a43] shadow-sm'
                : 'text-slate-500 hover:text-[#102a43]'
              }`}
            >
              Round trip
            </button>

            <button
              type='button'
              onClick={() => setTripType('ONE_WAY')}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                tripType === 'ONE_WAY' ?
                  'bg-white text-[#102a43] shadow-sm'
                : 'text-slate-500 hover:text-[#102a43]'
              }`}
            >
              One way
            </button>
          </div>

          <span className='text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400'>
            Search flights
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className='p-5 sm:p-6'>
        <div className='grid gap-4 lg:grid-cols-[1fr_44px_1fr]'>
          <div className='space-y-2'>
            <Label
              htmlFor='flight-from'
              className='text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400'
            >
              From
            </Label>

            <div className='relative'>
              <PlaneTakeoff className='pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-sky-500' />

              <select
                id='flight-from'
                value={from}
                onChange={(event) => setFrom(event.target.value)}
                className='h-12 w-full appearance-none rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-sm font-medium text-[#102a43] outline-none transition-colors focus:border-sky-300 focus:ring-2 focus:ring-sky-100'
              >
                {airports.map((airport) => (
                  <option key={airport.code} value={airport.code}>
                    {airport.code} — {airport.city}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className='flex items-end justify-center'>
            <Button
              type='button'
              variant='outline'
              size='icon'
              onClick={swapAirports}
              className='size-10 rounded-xl border-sky-200 text-slate-500 hover:bg-sky-50 hover:text-[#102a43]'
              aria-label='Swap departure and destination'
            >
              <ArrowRight className='size-4 rotate-90' />
            </Button>
          </div>

          <div className='space-y-2'>
            <Label
              htmlFor='flight-to'
              className='text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400'
            >
              To
            </Label>

            <div className='relative'>
              <MapPin className='pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#c5a46d]' />

              <select
                id='flight-to'
                value={to}
                onChange={(event) => setTo(event.target.value)}
                className='h-12 w-full appearance-none rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-sm font-medium text-[#102a43] outline-none transition-colors focus:border-sky-300 focus:ring-2 focus:ring-sky-100'
              >
                {airports.map((airport) => (
                  <option key={airport.code} value={airport.code}>
                    {airport.code} — {airport.city}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className='mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
          <div className='space-y-2'>
            <Label
              htmlFor='flight-departure'
              className='text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400'
            >
              Departure
            </Label>

            <div className='relative'>
              <CalendarDays className='pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400' />

              <Input
                id='flight-departure'
                type='date'
                value={departure}
                onChange={(event) => setDeparture(event.target.value)}
                required
                className='h-12 rounded-xl border-slate-200 pl-10 shadow-none focus-visible:border-sky-300 focus-visible:ring-sky-100'
              />
            </div>
          </div>

          {tripType === 'ROUND_TRIP' ?
            <div className='space-y-2'>
              <Label
                htmlFor='flight-return'
                className='text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400'
              >
                Return
              </Label>

              <div className='relative'>
                <CalendarDays className='pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400' />

                <Input
                  id='flight-return'
                  type='date'
                  value={returnDate}
                  onChange={(event) => setReturnDate(event.target.value)}
                  required
                  className='h-12 rounded-xl border-slate-200 pl-10 shadow-none focus-visible:border-sky-300 focus-visible:ring-sky-100'
                />
              </div>
            </div>
          : null}

          <div className='space-y-2'>
            <Label
              htmlFor='flight-passengers'
              className='text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400'
            >
              Passengers
            </Label>

            <div className='relative'>
              <Users className='pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400' />

              <select
                id='flight-passengers'
                value={passengers}
                onChange={(event) => setPassengers(event.target.value)}
                className='h-12 w-full appearance-none rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-sm font-medium text-[#102a43] outline-none focus:border-sky-300 focus:ring-2 focus:ring-sky-100'
              >
                <option value='1'>1 Passenger</option>

                <option value='2'>2 Passengers</option>

                <option value='3'>3 Passengers</option>

                <option value='4'>4 Passengers</option>

                <option value='5'>5 Passengers</option>

                <option value='6'>6 Passengers</option>
              </select>
            </div>
          </div>
        </div>

        <div className='mt-6 flex flex-col items-center justify-between gap-4 border-t border-slate-100 pt-5 sm:flex-row'>
          <p className='text-xs leading-5 text-slate-400'>
            Compare available flights and fares before choosing your journey.
          </p>

          <Button
            type='submit'
            className='h-11 w-full gap-2 rounded-xl bg-[#102a43] px-6 text-white shadow-[0_12px_25px_-14px_rgba(16,42,67,0.65)] hover:bg-[#183b5b] sm:w-auto'
          >
            Search flights
            <ArrowRight className='size-4' />
          </Button>
        </div>
      </form>
    </div>
  );
}
