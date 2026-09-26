'use client';

import type { FormEvent } from 'react';

import {
  ArrowRight,
  CalendarDays,
  MapPin,
  Plane,
  RotateCcw,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import type { SearchAirport } from '../types/search';

interface FlightSearchFormProps {
  airports: SearchAirport[];
  from: string;
  to: string;
  departureDate: string;
  isSearching: boolean;
  onFromChange: (value: string) => void;
  onToChange: (value: string) => void;
  onDepartureDateChange: (value: string) => void;
  onSubmit: () => void;
  onClear: () => void;
}

export function FlightSearchForm({
  airports,
  from,
  to,
  departureDate,
  isSearching,
  onFromChange,
  onToChange,
  onDepartureDateChange,
  onSubmit,
  onClear,
}: FlightSearchFormProps) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='rounded-2xl border border-sky-100 bg-white p-5 shadow-[0_18px_50px_-35px_rgba(16,42,67,0.35)] sm:p-6'
    >
      <div className='flex items-center gap-2'>
        <div className='flex size-9 items-center justify-center rounded-xl bg-[#e5f5fc] text-[#3f88b2]'>
          <Plane className='size-4' />
        </div>

        <div>
          <p className='text-sm font-semibold text-[#102a43]'>Search flights</p>

          <p className='text-xs text-slate-400'>
            Explore available AeroPass routes.
          </p>
        </div>
      </div>

      <div className='mt-6 grid gap-4 lg:grid-cols-[1fr_1fr_0.85fr_auto] lg:items-end'>
        <div className='space-y-2'>
          <Label htmlFor='from'>From</Label>

          <div className='relative'>
            <MapPin className='pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400' />

            <select
              id='from'
              value={from}
              onChange={(event) => onFromChange(event.target.value)}
              className='flex h-11 w-full appearance-none rounded-lg border border-slate-200 bg-white pl-9 pr-3 text-sm text-[#102a43] outline-none transition-colors focus:border-[#5ba9d6] focus:ring-2 focus:ring-[#5ba9d6]/10'
            >
              <option value=''>Any origin</option>

              {airports.map((airport) => (
                <option key={airport.id} value={airport.code}>
                  {airport.city} ({airport.code})
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className='space-y-2'>
          <Label htmlFor='to'>To</Label>

          <div className='relative'>
            <MapPin className='pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400' />

            <select
              id='to'
              value={to}
              onChange={(event) => onToChange(event.target.value)}
              className='flex h-11 w-full appearance-none rounded-lg border border-slate-200 bg-white pl-9 pr-3 text-sm text-[#102a43] outline-none transition-colors focus:border-[#5ba9d6] focus:ring-2 focus:ring-[#5ba9d6]/10'
            >
              <option value=''>Any destination</option>

              {airports.map((airport) => (
                <option key={airport.id} value={airport.code}>
                  {airport.city} ({airport.code})
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className='space-y-2'>
          <Label htmlFor='departureDate'>Departure</Label>

          <div className='relative'>
            <CalendarDays className='pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400' />

            <Input
              id='departureDate'
              type='date'
              value={departureDate}
              onChange={(event) => onDepartureDateChange(event.target.value)}
              className='h-11 border-slate-200 pl-9'
            />
          </div>
        </div>

        <Button
          type='submit'
          disabled={isSearching}
          className='h-11 rounded-lg bg-[#102a43] px-5 text-white hover:bg-[#183b5b]'
        >
          {isSearching ?
            'Searching...'
          : <>
              Search
              <ArrowRight className='size-4' />
            </>
          }
        </Button>
      </div>

      <button
        type='button'
        onClick={onClear}
        className='mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 transition-colors hover:text-[#102a43]'
      >
        <RotateCcw className='size-3.5' />
        Clear search
      </button>
    </form>
  );
}
