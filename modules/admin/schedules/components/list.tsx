'use client';

import { CalendarX2, Rows3 } from 'lucide-react';

import type { ScheduleViewModel } from '../types/schedule';

import { ScheduleRow } from './row';

interface ScheduleListProps {
  schedules: ScheduleViewModel[];
  selectedScheduleId: string | null;
  onSelect: (scheduleId: string) => void;
}

export function ScheduleList({
  schedules,
  selectedScheduleId,
  onSelect,
}: ScheduleListProps) {
  return (
    <section className='overflow-hidden rounded-[1.5rem] border border-border/70 bg-card shadow-sm'>
      <div className='flex items-center justify-between gap-4 border-b border-border/70 px-5 py-4'>
        <div className='flex items-center gap-3'>
          <div className='flex size-8 items-center justify-center rounded-xl bg-[#EEF7FB] text-[#102A43]'>
            <Rows3 className='size-3.5' />
          </div>

          <div>
            <h2 className='text-sm font-semibold'>Operating timetable</h2>

            <p className='mt-0.5 text-[10px] text-muted-foreground'>
              Recurring flight services and assignments
            </p>
          </div>
        </div>

        <span className='rounded-full bg-muted px-2.5 py-1 text-[9px] font-semibold text-muted-foreground'>
          {schedules.length} schedules
        </span>
      </div>

      {schedules.length > 0 ?
        <div>
          {schedules.map((item) => (
            <ScheduleRow
              key={item.schedule.id}
              item={item}
              selected={selectedScheduleId === item.schedule.id}
              onSelect={() => onSelect(item.schedule.id)}
            />
          ))}
        </div>
      : <div className='flex min-h-[320px] flex-col items-center justify-center px-6 text-center'>
          <div className='flex size-12 items-center justify-center rounded-2xl bg-muted'>
            <CalendarX2 className='size-5 text-muted-foreground' />
          </div>

          <p className='mt-4 text-sm font-semibold'>No schedules found</p>

          <p className='mt-1 max-w-sm text-xs leading-5 text-muted-foreground'>
            Try changing the search term or clearing the current schedule
            filters.
          </p>
        </div>
      }
    </section>
  );
}
