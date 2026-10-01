import { CalendarDays, PlaneTakeoff } from 'lucide-react';

import type { ScheduleStats } from '../types/schedule';

interface ScheduleHeaderProps {
  stats: ScheduleStats;
}

export function ScheduleHeader({ stats }: ScheduleHeaderProps) {
  return (
    <div className='relative overflow-hidden rounded-[1.75rem] border border-border/70 bg-card shadow-[0_18px_50px_rgba(15,23,42,0.05)]'>
      <div className='absolute inset-0 bg-[radial-gradient(circle_at_90%_10%,rgba(91,169,214,0.14),transparent_30%),radial-gradient(circle_at_15%_120%,rgba(16,42,67,0.05),transparent_28%)]' />

      <div className='relative px-5 py-6 sm:px-7 sm:py-7'>
        <div className='flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between'>
          <div className='flex min-w-0 items-start gap-4'>
            <div className='flex size-12 shrink-0 items-center justify-center rounded-2xl bg-[#102A43] text-white shadow-lg shadow-[#102A43]/15'>
              <CalendarDays className='size-5' />
            </div>

            <div>
              <div className='flex flex-wrap items-center gap-2'>
                <p className='text-[10px] font-semibold uppercase tracking-[0.18em] text-[#5BA9D6]'>
                  Flight operations
                </p>

                <span className='rounded-full bg-emerald-50 px-2.5 py-1 text-[9px] font-semibold text-emerald-700'>
                  Timetable active
                </span>
              </div>

              <h1 className='mt-1 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl'>
                Schedule control
              </h1>

              <p className='mt-2 max-w-2xl text-xs leading-5 text-muted-foreground sm:text-sm'>
                Manage recurring flight services, operating times, aircraft
                assignments, and route cadence from one operations view.
              </p>
            </div>
          </div>

          <div className='grid grid-cols-2 gap-3 sm:grid-cols-4'>
            <div className='rounded-2xl border border-border/70 bg-background/70 px-4 py-3 backdrop-blur-sm'>
              <p className='text-[9px] font-semibold uppercase tracking-[0.14em] text-muted-foreground'>
                Schedules
              </p>

              <p className='mt-1 text-xl font-semibold tracking-tight'>
                {stats.total}
              </p>
            </div>

            <div className='rounded-2xl border border-border/70 bg-background/70 px-4 py-3 backdrop-blur-sm'>
              <p className='text-[9px] font-semibold uppercase tracking-[0.14em] text-muted-foreground'>
                Active
              </p>

              <p className='mt-1 text-xl font-semibold tracking-tight text-emerald-600'>
                {stats.active}
              </p>
            </div>

            <div className='rounded-2xl border border-border/70 bg-background/70 px-4 py-3 backdrop-blur-sm'>
              <p className='text-[9px] font-semibold uppercase tracking-[0.14em] text-muted-foreground'>
                Routes
              </p>

              <p className='mt-1 text-xl font-semibold tracking-tight'>
                {stats.routes}
              </p>
            </div>

            <div className='rounded-2xl border border-border/70 bg-background/70 px-4 py-3 backdrop-blur-sm'>
              <p className='text-[9px] font-semibold uppercase tracking-[0.14em] text-muted-foreground'>
                Aircraft
              </p>

              <p className='mt-1 text-xl font-semibold tracking-tight'>
                {stats.aircraft}
              </p>
            </div>
          </div>
        </div>

        <div className='mt-6 flex flex-wrap items-center gap-2 border-t border-border/60 pt-5'>
          <div className='flex items-center gap-2 rounded-xl bg-[#EEF7FB] px-3 py-2 text-[#102A43]'>
            <PlaneTakeoff className='size-3.5' />

            <span className='text-[10px] font-semibold'>
              {stats.daily} daily services
            </span>
          </div>

          <div className='rounded-xl border border-border/70 bg-background/65 px-3 py-2'>
            <span className='text-[10px] font-medium text-muted-foreground'>
              {stats.weekdays} weekday schedules
            </span>
          </div>

          <div className='rounded-xl border border-border/70 bg-background/65 px-3 py-2'>
            <span className='text-[10px] font-medium text-muted-foreground'>
              {stats.weekends} weekend schedules
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
