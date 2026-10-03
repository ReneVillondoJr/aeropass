'use client';

import { Filter, Search, X } from 'lucide-react';

import { Input } from '@/components/ui/input';

interface AirportFiltersProps {
  search: string;
  terminal: string;
  terminalOptions: string[];
  resultCount: number;
  onSearchChange: (value: string) => void;
  onTerminalChange: (value: string) => void;
  onReset: () => void;
}

export function AirportFilters({
  search,
  terminal,
  terminalOptions,
  resultCount,
  onSearchChange,
  onTerminalChange,
  onReset,
}: AirportFiltersProps) {
  const hasFilters = Boolean(search) || terminal !== 'ALL';

  return (
    <section className='rounded-[1.5rem] border border-border/70 bg-card px-4 py-4 shadow-sm sm:px-5'>
      <div className='flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between'>
        <div className='relative min-w-0 flex-1 xl:max-w-xl'>
          <Search className='pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground' />

          <Input
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder='Search airport, code, city, or country...'
            className='h-10 border-border/70 bg-background pl-9 text-xs shadow-none focus-visible:ring-[#5BA9D6]/30'
          />
        </div>

        <div className='flex flex-wrap items-center gap-2'>
          <div className='flex items-center gap-2 rounded-xl border border-border/70 bg-background px-3 py-1.5'>
            <Filter className='size-3.5 text-muted-foreground' />

            <select
              value={terminal}
              onChange={(event) => onTerminalChange(event.target.value)}
              className='h-7 border-0 bg-transparent pr-8 text-[10px] font-medium text-foreground outline-none'
              aria-label='Filter by terminal'
            >
              <option value='ALL'>All terminals</option>

              {terminalOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          {hasFilters ?
            <button
              type='button'
              onClick={onReset}
              className='inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-[10px] font-semibold text-muted-foreground transition-colors hover:bg-muted hover:text-foreground'
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
          airport
          {resultCount === 1 ? '' : 's'}
        </p>

        <p className='hidden text-[10px] text-muted-foreground sm:block'>
          Select an airport to inspect its network
        </p>
      </div>
    </section>
  );
}
