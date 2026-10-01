'use client';

import { Filter, Search, X } from 'lucide-react';

import { Input } from '@/components/ui/input';

import type {
  ScheduleFilterFrequency,
  ScheduleFilterStatus,
} from '../types/schedule';

interface ScheduleFiltersProps {
  search: string;
  status: ScheduleFilterStatus;
  frequency: ScheduleFilterFrequency;
  resultCount: number;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: ScheduleFilterStatus) => void;
  onFrequencyChange: (value: ScheduleFilterFrequency) => void;
  onReset: () => void;
}

const statusOptions: Array<{
  label: string;
  value: ScheduleFilterStatus;
}> = [
  {
    label: 'All',
    value: 'ALL',
  },
  {
    label: 'Active',
    value: 'ACTIVE',
  },
  {
    label: 'Inactive',
    value: 'INACTIVE',
  },
];

const frequencyOptions: Array<{
  label: string;
  value: ScheduleFilterFrequency;
}> = [
  {
    label: 'All frequency',
    value: 'ALL',
  },
  {
    label: 'Daily',
    value: 'DAILY',
  },
  {
    label: 'Weekdays',
    value: 'WEEKDAYS',
  },
  {
    label: 'Weekends',
    value: 'WEEKENDS',
  },
];

export function ScheduleFilters({
  search,
  status,
  frequency,
  resultCount,
  onSearchChange,
  onStatusChange,
  onFrequencyChange,
  onReset,
}: ScheduleFiltersProps) {
  const hasFilters = search || status !== 'ALL' || frequency !== 'ALL';

  return (
    <section className='rounded-[1.5rem] border border-border/70 bg-card px-4 py-4 shadow-sm sm:px-5'>
      <div className='flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between'>
        <div className='relative min-w-0 flex-1 xl:max-w-xl'>
          <Search className='pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground' />

          <Input
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder='Search flight, route, city, or aircraft...'
            className='h-10 border-border/70 bg-background pl-9 text-xs shadow-none focus-visible:ring-[#5BA9D6]/30'
          />
        </div>

        <div className='flex flex-wrap items-center gap-2'>
          <div className='flex items-center gap-1 rounded-xl bg-muted/50 p-1'>
            {statusOptions.map((option) => {
              const active = status === option.value;

              return (
                <button
                  key={option.value}
                  type='button'
                  onClick={() => onStatusChange(option.value)}
                  className={[
                    'rounded-lg px-3 py-1.5 text-[10px] font-semibold transition-all',
                    active ?
                      'bg-white text-[#102A43] shadow-sm'
                    : 'text-muted-foreground hover:text-foreground',
                  ].join(' ')}
                >
                  {option.label}
                </button>
              );
            })}
          </div>

          <div className='flex items-center gap-1 rounded-xl border border-border/70 bg-background p-1'>
            <div className='flex items-center gap-1.5 px-2'>
              <Filter className='size-3 text-muted-foreground' />
            </div>

            {frequencyOptions.map((option) => {
              const active = frequency === option.value;

              return (
                <button
                  key={option.value}
                  type='button'
                  onClick={() => onFrequencyChange(option.value)}
                  className={[
                    'rounded-lg px-2.5 py-1.5 text-[10px] font-medium transition-all',
                    active ?
                      'bg-[#102A43] text-white'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                  ].join(' ')}
                >
                  {option.label}
                </button>
              );
            })}
          </div>

          {hasFilters ?
            <button
              type='button'
              onClick={onReset}
              className='flex items-center gap-1.5 rounded-xl px-2.5 py-2 text-[10px] font-semibold text-muted-foreground transition-colors hover:bg-muted hover:text-foreground'
            >
              <X className='size-3' />
              Clear
            </button>
          : null}
        </div>
      </div>

      <div className='mt-3 flex items-center justify-between border-t border-border/60 pt-3'>
        <p className='text-[10px] text-muted-foreground'>
          Showing{' '}
          <span className='font-semibold text-foreground'>{resultCount}</span>{' '}
          schedule{resultCount === 1 ? '' : 's'}
        </p>

        <p className='hidden text-[10px] text-muted-foreground sm:block'>
          Select a schedule to inspect its operating pattern
        </p>
      </div>
    </section>
  );
}
