'use client';

import {
  Activity,
  Armchair,
  CalendarDays,
  CheckCircle2,
  Clock3,
  MapPin,
  Plane,
  Route,
} from 'lucide-react';

import { scheduleFrequencyMeta, weekDays } from '../data/schedule';

import type { ScheduleViewModel } from '../types/schedule';

interface ScheduleDetailProps {
  schedule: ScheduleViewModel | null;
}

function formatFlightDate(value: string | undefined) {
  if (!value) {
    return '—';
  }

  const date = new Date(`${value}T00:00:00`);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat('en-PH', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}

export function ScheduleDetail({ schedule }: ScheduleDetailProps) {
  if (!schedule) {
    return (
      <section className='flex min-h-[520px] items-center justify-center rounded-[1.5rem] border border-dashed border-border bg-card px-6 text-center'>
        <div>
          <div className='mx-auto flex size-12 items-center justify-center rounded-2xl bg-muted'>
            <CalendarDays className='size-5 text-muted-foreground' />
          </div>

          <p className='mt-4 text-sm font-semibold'>Select a schedule</p>

          <p className='mt-1 max-w-sm text-xs leading-5 text-muted-foreground'>
            Choose a service from the timetable to inspect route, aircraft,
            operating days, and flight instances.
          </p>
        </div>
      </section>
    );
  }

  const {
    schedule: item,
    origin,
    destination,
    route,
    aircraft,
    nextFlight,
    operatingDays,
  } = schedule;

  const frequency = scheduleFrequencyMeta[item.frequency];

  return (
    <section className='overflow-hidden rounded-[1.5rem] border border-border/70 bg-card shadow-sm'>
      {/* Header */}
      <div className='relative overflow-hidden border-b border-border/70 bg-[#102A43] px-5 py-5 text-white sm:px-6'>
        <div className='absolute inset-0 bg-[radial-gradient(circle_at_85%_10%,rgba(91,169,214,0.25),transparent_35%)]' />

        <div className='relative'>
          <div className='flex items-start justify-between gap-4'>
            <div>
              <div className='flex items-center gap-2'>
                <span className='rounded-full bg-white/10 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.14em]'>
                  Schedule detail
                </span>

                <span className='inline-flex items-center gap-1.5 rounded-full bg-emerald-400/15 px-2.5 py-1 text-[9px] font-semibold text-emerald-200'>
                  <span className='size-1.5 rounded-full bg-emerald-400' />
                  {item.active ? 'Active' : 'Inactive'}
                </span>
              </div>

              <h2 className='mt-3 text-2xl font-semibold tracking-tight'>
                {item.flightNumber}
              </h2>

              <p className='mt-1 text-[11px] text-white/55'>
                {aircraft.registrationNumber}
              </p>
            </div>

            <div className='flex size-10 items-center justify-center rounded-xl bg-white/10'>
              <Plane className='size-4' />
            </div>
          </div>

          <div className='mt-6 flex items-center gap-5'>
            <div>
              <p className='text-2xl font-semibold tracking-tight'>
                {origin.code}
              </p>

              <p className='mt-1 text-[9px] text-white/50'>{origin.city}</p>
            </div>

            <div className='flex flex-1 items-center gap-2'>
              <div className='h-px flex-1 bg-white/15' />

              <Plane className='size-4 text-[#5BA9D6]' />

              <div className='h-px flex-1 bg-white/15' />
            </div>

            <div className='text-right'>
              <p className='text-2xl font-semibold tracking-tight'>
                {destination.code}
              </p>

              <p className='mt-1 text-[9px] text-white/50'>
                {destination.city}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main details */}
      <div className='space-y-5 p-5 sm:p-6'>
        {/* Times */}
        <div className='grid grid-cols-2 gap-3'>
          <div className='rounded-2xl border border-border/70 bg-background/60 p-4'>
            <div className='flex items-center gap-2'>
              <Clock3 className='size-3.5 text-muted-foreground' />

              <p className='text-[9px] font-semibold uppercase tracking-[0.14em] text-muted-foreground'>
                Departure
              </p>
            </div>

            <p className='mt-2 text-2xl font-semibold tabular-nums tracking-tight'>
              {item.departureTime}
            </p>

            <p className='mt-1 text-[10px] text-muted-foreground'>
              {origin.code}
            </p>
          </div>

          <div className='rounded-2xl border border-border/70 bg-background/60 p-4'>
            <div className='flex items-center gap-2'>
              <Clock3 className='size-3.5 text-muted-foreground' />

              <p className='text-[9px] font-semibold uppercase tracking-[0.14em] text-muted-foreground'>
                Arrival
              </p>
            </div>

            <p className='mt-2 text-2xl font-semibold tabular-nums tracking-tight'>
              {item.arrivalTime}
            </p>

            <p className='mt-1 text-[10px] text-muted-foreground'>
              {destination.code}
            </p>
          </div>
        </div>

        {/* Route metrics */}
        <div className='grid grid-cols-2 gap-3'>
          <div className='flex items-center gap-3 rounded-2xl border border-border/70 bg-background/60 p-4'>
            <div className='flex size-9 items-center justify-center rounded-xl bg-muted'>
              <Route className='size-4 text-muted-foreground' />
            </div>

            <div>
              <p className='text-[9px] uppercase tracking-[0.14em] text-muted-foreground'>
                Route
              </p>

              <p className='mt-1 text-xs font-semibold'>
                {route.distanceKm} km
              </p>
            </div>
          </div>

          <div className='flex items-center gap-3 rounded-2xl border border-border/70 bg-background/60 p-4'>
            <div className='flex size-9 items-center justify-center rounded-xl bg-muted'>
              <Activity className='size-4 text-muted-foreground' />
            </div>

            <div>
              <p className='text-[9px] uppercase tracking-[0.14em] text-muted-foreground'>
                Duration
              </p>

              <p className='mt-1 text-xs font-semibold'>
                {route.durationMinutes} min
              </p>
            </div>
          </div>
        </div>

        {/* Aircraft */}
        <div className='rounded-2xl border border-border/70 bg-background/60 p-4'>
          <div className='flex items-center gap-3'>
            <div className='flex size-10 items-center justify-center rounded-xl bg-[#EEF7FB] text-[#102A43]'>
              <Plane className='size-4' />
            </div>

            <div className='min-w-0'>
              <p className='text-[9px] font-semibold uppercase tracking-[0.14em] text-muted-foreground'>
                Assigned aircraft
              </p>

              <p className='mt-1 text-sm font-semibold'>{aircraft.model}</p>

              <p className='mt-0.5 text-[10px] text-muted-foreground'>
                {aircraft.registrationNumber}
                <span className='mx-1'>·</span>
                {aircraft.totalSeats} seats
              </p>
            </div>

            <div className='ml-auto flex items-center gap-2 rounded-xl bg-muted/70 px-3 py-2'>
              <Armchair className='size-3.5 text-muted-foreground' />

              <span className='text-[10px] font-semibold'>
                {aircraft.totalSeats}
              </span>
            </div>
          </div>
        </div>

        {/* Operating pattern */}
        <div className='rounded-2xl border border-border/70 bg-background/60 p-4'>
          <div className='flex items-center justify-between gap-4'>
            <div>
              <div className='flex items-center gap-2'>
                <CalendarDays className='size-3.5 text-muted-foreground' />

                <p className='text-xs font-semibold'>Operating pattern</p>
              </div>

              <p className='mt-1 text-[10px] text-muted-foreground'>
                {frequency.label} service
              </p>
            </div>

            <span className='rounded-full bg-[#EEF7FB] px-2.5 py-1 text-[9px] font-semibold text-[#102A43]'>
              {frequency.shortLabel}
            </span>
          </div>

          <div className='mt-4 grid grid-cols-7 gap-1.5'>
            {weekDays.map((day) => {
              const active = operatingDays.includes(day);

              return (
                <div
                  key={day}
                  className={[
                    'flex flex-col items-center rounded-xl border px-1 py-2.5 transition-colors',
                    active ?
                      'border-[#BBDCEB] bg-[#EAF7FC] text-[#102A43]'
                    : 'border-border/50 bg-muted/30 text-muted-foreground/45',
                  ].join(' ')}
                >
                  <span className='text-[8px] font-semibold uppercase'>
                    {day}
                  </span>

                  <span
                    className={[
                      'mt-2 size-1.5 rounded-full',
                      active ? 'bg-[#5BA9D6]' : 'bg-border',
                    ].join(' ')}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Latest flight */}
        <div className='rounded-2xl border border-border/70 bg-[#F8FBFD] p-4'>
          <div className='flex items-center gap-2'>
            <CheckCircle2 className='size-3.5 text-emerald-600' />

            <p className='text-xs font-semibold'>Latest scheduled instance</p>
          </div>

          {nextFlight ?
            <div className='mt-4 grid grid-cols-2 gap-3'>
              <div>
                <p className='text-[9px] uppercase tracking-[0.13em] text-muted-foreground'>
                  Date
                </p>

                <p className='mt-1 text-xs font-semibold'>
                  {formatFlightDate(nextFlight.departureDate)}
                </p>
              </div>

              <div>
                <p className='text-[9px] uppercase tracking-[0.13em] text-muted-foreground'>
                  Gate
                </p>

                <p className='mt-1 text-xs font-semibold'>{nextFlight.gate}</p>
              </div>

              <div>
                <p className='text-[9px] uppercase tracking-[0.13em] text-muted-foreground'>
                  Status
                </p>

                <span className='mt-1 inline-flex rounded-full bg-white px-2.5 py-1 text-[9px] font-semibold text-[#102A43] shadow-sm'>
                  {nextFlight.status.replace('_', ' ')}
                </span>
              </div>

              <div>
                <p className='text-[9px] uppercase tracking-[0.13em] text-muted-foreground'>
                  Terminal
                </p>

                <p className='mt-1 text-xs font-semibold'>
                  {nextFlight.terminal}
                </p>
              </div>
            </div>
          : <p className='mt-3 text-[11px] text-muted-foreground'>
              No flight instance is currently linked to this schedule.
            </p>
          }
        </div>

        {/* Airport */}
        <div className='grid grid-cols-2 gap-3'>
          <div className='flex items-center gap-3 rounded-2xl border border-border/70 bg-background/60 p-4'>
            <MapPin className='size-4 text-muted-foreground' />

            <div className='min-w-0'>
              <p className='text-[9px] uppercase tracking-[0.13em] text-muted-foreground'>
                Origin
              </p>

              <p className='mt-1 truncate text-xs font-semibold'>
                {origin.name}
              </p>
            </div>
          </div>

          <div className='flex items-center gap-3 rounded-2xl border border-border/70 bg-background/60 p-4'>
            <MapPin className='size-4 text-muted-foreground' />

            <div className='min-w-0'>
              <p className='text-[9px] uppercase tracking-[0.13em] text-muted-foreground'>
                Destination
              </p>

              <p className='mt-1 truncate text-xs font-semibold'>
                {destination.name}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
