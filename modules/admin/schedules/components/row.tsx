'use client';

import { ArrowRight, CalendarRange, Clock3, Plane } from 'lucide-react';

import type { ScheduleViewModel } from '../types/schedule';

import { scheduleFrequencyMeta } from '../data/schedule';

interface ScheduleRowProps {
  item: ScheduleViewModel;
  selected: boolean;
  onSelect: () => void;
}

function formatDate(value: string | undefined) {
  if (!value) {
    return '—';
  }

  const date = new Date(`${value}T00:00:00`);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat('en-PH', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}

export function ScheduleRow({ item, selected, onSelect }: ScheduleRowProps) {
  const { schedule } = item;

  const frequency = scheduleFrequencyMeta[schedule.frequency];

  return (
    <button
      type='button'
      onClick={onSelect}
      className={[
        'group w-full border-b border-border/70 px-4 py-4 text-left transition-all sm:px-5',
        selected ? 'bg-[#F4F9FC]' : 'hover:bg-muted/20',
      ].join(' ')}
    >
      <div className='grid gap-4 lg:grid-cols-[170px_minmax(260px,1fr)_170px_190px_140px] lg:items-center'>
        {/* Flight */}
        <div className='flex items-center gap-3'>
          <div
            className={[
              'flex size-10 shrink-0 items-center justify-center rounded-xl transition-all',
              selected ?
                'bg-[#102A43] text-white'
              : 'bg-[#EEF7FB] text-[#102A43]',
            ].join(' ')}
          >
            <Plane className='size-4' />
          </div>

          <div>
            <div className='flex items-center gap-2'>
              <p className='text-xs font-semibold'>{schedule.flightNumber}</p>

              <span
                className={[
                  'size-1.5 rounded-full',
                  schedule.active ? 'bg-emerald-500' : 'bg-slate-300',
                ].join(' ')}
              />
            </div>

            <p className='mt-0.5 text-[10px] text-muted-foreground'>
              {schedule.active ? 'Active service' : 'Inactive service'}
            </p>
          </div>
        </div>

        {/* Route */}
        <div>
          <div className='flex items-center gap-2'>
            <div>
              <p className='text-sm font-semibold tracking-tight'>
                {item.origin.code}
              </p>

              <p className='mt-0.5 text-[9px] text-muted-foreground'>
                {item.origin.city}
              </p>
            </div>

            <div className='mx-1 flex flex-1 items-center gap-1'>
              <div className='h-px flex-1 bg-border' />

              <ArrowRight className='size-3 shrink-0 text-[#5BA9D6]' />

              <div className='h-px flex-1 bg-border' />
            </div>

            <div className='text-right'>
              <p className='text-sm font-semibold tracking-tight'>
                {item.destination.code}
              </p>

              <p className='mt-0.5 text-[9px] text-muted-foreground'>
                {item.destination.city}
              </p>
            </div>
          </div>

          <p className='mt-2 text-[9px] text-muted-foreground'>
            {item.route.distanceKm} km
            <span className='mx-1 text-border'>·</span>
            {item.route.durationMinutes} min
          </p>
        </div>

        {/* Time */}
        <div className='flex items-center gap-3'>
          <div>
            <p className='text-[9px] uppercase tracking-[0.14em] text-muted-foreground'>
              Departure
            </p>

            <p className='mt-1 text-sm font-semibold tabular-nums'>
              {schedule.departureTime}
            </p>
          </div>

          <div className='h-8 w-px bg-border' />

          <div>
            <p className='text-[9px] uppercase tracking-[0.14em] text-muted-foreground'>
              Arrival
            </p>

            <p className='mt-1 text-sm font-semibold tabular-nums'>
              {schedule.arrivalTime}
            </p>
          </div>
        </div>

        {/* Aircraft */}
        <div className='flex items-center gap-3'>
          <div className='flex size-9 items-center justify-center rounded-xl bg-muted/70'>
            <Plane className='size-3.5 text-muted-foreground' />
          </div>

          <div>
            <p className='text-xs font-semibold'>{item.aircraft.model}</p>

            <p className='mt-0.5 text-[9px] text-muted-foreground'>
              {item.aircraft.registrationNumber}
              <span className='mx-1'>·</span>
              {item.aircraft.totalSeats} seats
            </p>
          </div>
        </div>

        {/* Frequency */}
        <div className='flex items-center justify-between gap-3 lg:block'>
          <div>
            <span className='inline-flex items-center gap-1.5 rounded-full border border-[#DCE8EF] bg-[#F4F9FC] px-2.5 py-1 text-[9px] font-semibold text-[#102A43]'>
              <CalendarRange className='size-3' />
              {frequency.label}
            </span>

            <p className='mt-2 text-[9px] text-muted-foreground'>
              {frequency.shortLabel}
            </p>
          </div>

          <Clock3
            className={[
              'size-4 transition-transform',
              selected ?
                'translate-x-0 text-[#102A43]'
              : 'text-border group-hover:translate-x-0.5 group-hover:text-[#5BA9D6]',
            ].join(' ')}
          />
        </div>
      </div>

      {item.nextFlight ?
        <div className='mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-border/50 pt-3'>
          <p className='text-[9px] uppercase tracking-[0.13em] text-muted-foreground'>
            Latest scheduled instance
          </p>

          <p className='text-[10px] font-medium text-foreground'>
            {formatDate(item.nextFlight.departureDate)}
          </p>

          <p className='text-[10px] font-medium tabular-nums text-foreground'>
            {item.nextFlight.departureTime}
          </p>

          <span className='text-[9px] text-muted-foreground'>
            Gate {item.nextFlight.gate}
          </span>

          <span className='rounded-full bg-muted px-2 py-0.5 text-[8px] font-semibold uppercase tracking-wide text-muted-foreground'>
            {item.nextFlight.status.replace('_', ' ')}
          </span>
        </div>
      : null}
    </button>
  );
}
