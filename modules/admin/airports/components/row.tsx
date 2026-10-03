'use client';

import {
  ArrowRight,
  CalendarDays,
  ChevronRight,
  MapPin,
  Plane,
} from 'lucide-react';

import type { AirportViewModel } from '../types/airports';

interface AirportRowProps {
  item: AirportViewModel;
  selected: boolean;
  onSelect: () => void;
}

export function AirportRow({ item, selected, onSelect }: AirportRowProps) {
  const { airport } = item;

  return (
    <button
      type='button'
      onClick={onSelect}
      className={[
        'group w-full border-b border-border/70 px-4 py-4 text-left transition-all sm:px-5',
        selected ? 'bg-[#F3F8FB]' : 'hover:bg-muted/20',
      ].join(' ')}
    >
      <div className='grid gap-4 lg:grid-cols-[145px_minmax(220px,1.3fr)_170px_180px_150px_36px] lg:items-center'>
        {/* Code */}
        <div className='flex items-center gap-3'>
          <div
            className={[
              'flex size-11 shrink-0 items-center justify-center rounded-2xl text-xs font-bold tracking-[0.08em] transition-all',
              selected ?
                'bg-[#102A43] text-white shadow-md shadow-[#102A43]/10'
              : 'bg-[#EEF7FB] text-[#102A43]',
            ].join(' ')}
          >
            {airport.code}
          </div>

          <div className='min-w-0'>
            <p className='truncate text-xs font-semibold'>{airport.city}</p>

            <p className='mt-0.5 truncate text-[9px] text-muted-foreground'>
              {airport.country}
            </p>
          </div>
        </div>

        {/* Airport */}
        <div className='min-w-0'>
          <p className='truncate text-xs font-semibold'>{airport.name}</p>

          <div className='mt-1 flex items-center gap-1.5'>
            <MapPin className='size-3 text-muted-foreground' />

            <p className='truncate text-[9px] text-muted-foreground'>
              {airport.terminal}
            </p>
          </div>
        </div>

        {/* Network */}
        <div>
          <p className='text-[9px] uppercase tracking-[0.13em] text-muted-foreground'>
            Network
          </p>

          <div className='mt-1 flex items-center gap-2'>
            <span className='text-sm font-semibold'>
              {item.uniqueDestinations.length}
            </span>

            <span className='text-[9px] text-muted-foreground'>
              destinations
            </span>
          </div>
        </div>

        {/* Flights */}
        <div className='flex items-center gap-5'>
          <div>
            <p className='text-[9px] uppercase tracking-[0.13em] text-muted-foreground'>
              Departures
            </p>

            <p className='mt-1 text-sm font-semibold tabular-nums'>
              {item.departures.length}
            </p>
          </div>

          <div className='h-8 w-px bg-border' />

          <div>
            <p className='text-[9px] uppercase tracking-[0.13em] text-muted-foreground'>
              Arrivals
            </p>

            <p className='mt-1 text-sm font-semibold tabular-nums'>
              {item.arrivals.length}
            </p>
          </div>
        </div>

        {/* Schedules */}
        <div>
          <div className='flex items-center gap-2'>
            <CalendarDays className='size-3.5 text-muted-foreground' />

            <span className='text-xs font-semibold'>
              {item.schedules.length}
            </span>

            <span className='text-[9px] text-muted-foreground'>schedules</span>
          </div>

          <div className='mt-2 flex items-center gap-1'>
            <span className='size-1.5 rounded-full bg-emerald-500' />

            <span className='text-[9px] text-muted-foreground'>Connected</span>
          </div>
        </div>

        {/* Arrow */}
        <div className='hidden justify-end lg:flex'>
          <ChevronRight
            className={[
              'size-4 transition-all',
              selected ? 'text-[#102A43]' : (
                'text-border group-hover:translate-x-0.5 group-hover:text-[#5BA9D6]'
              ),
            ].join(' ')}
          />
        </div>
      </div>

      {/* Network strip */}
      <div className='mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 border-t border-border/50 pt-3'>
        <Plane className='size-3 text-[#5BA9D6]' />

        <span className='text-[9px] font-semibold uppercase tracking-[0.12em] text-muted-foreground'>
          Connected to
        </span>

        <div className='flex flex-wrap items-center gap-1.5'>
          {[
            ...item.uniqueDestinations,
            ...item.uniqueOrigins.filter(
              (origin) =>
                !item.uniqueDestinations.some(
                  (destination) => destination.id === origin.id,
                ),
            ),
          ]
            .slice(0, 5)
            .map((airportItem) => (
              <span
                key={airportItem.id}
                className='rounded-full border border-border/70 bg-background px-2 py-0.5 text-[8px] font-semibold text-muted-foreground'
              >
                {airportItem.code}
              </span>
            ))}

          {item.uniqueDestinations.length + item.uniqueOrigins.length > 5 ?
            <span className='text-[8px] text-muted-foreground'>+more</span>
          : null}
        </div>

        <ArrowRight className='ml-auto size-3 text-border' />
      </div>
    </button>
  );
}
