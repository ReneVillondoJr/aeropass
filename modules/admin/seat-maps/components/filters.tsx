import { RotateCcw, Search } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import type {
  SeatMapCabinFilter,
  SeatMapStatusFilter,
} from '../types/seat-map';

interface SeatMapFiltersProps {
  search: string;

  status: SeatMapStatusFilter;

  cabin: SeatMapCabinFilter;

  resultCount: number;

  onSearchChange: (value: string) => void;

  onStatusChange: (value: SeatMapStatusFilter) => void;

  onCabinChange: (value: SeatMapCabinFilter) => void;

  onReset: () => void;
}

export function SeatMapFilters({
  search,
  status,
  cabin,
  resultCount,
  onSearchChange,
  onStatusChange,
  onCabinChange,
  onReset,
}: SeatMapFiltersProps) {
  const hasFilters = search.length > 0 || status !== 'ALL' || cabin !== 'ALL';

  return (
    <section className='rounded-2xl border border-border/70 bg-background p-4 shadow-sm sm:p-5'>
      <div className='flex flex-col gap-4 xl:flex-row xl:items-end'>
        <div className='min-w-0 flex-1'>
          <label
            htmlFor='seat-map-search'
            className='mb-2 block text-xs font-medium text-foreground'
          >
            Search seat maps
          </label>

          <div className='relative'>
            <Search className='pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground' />

            <Input
              id='seat-map-search'
              value={search}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder='Search aircraft, model, registration...'
              className='h-10 pl-9'
            />
          </div>
        </div>

        <div className='grid gap-4 sm:grid-cols-2 xl:w-[380px]'>
          <div>
            <label
              htmlFor='seat-map-status'
              className='mb-2 block text-xs font-medium text-foreground'
            >
              Aircraft status
            </label>

            <select
              id='seat-map-status'
              value={status}
              onChange={(event) =>
                onStatusChange(event.target.value as SeatMapStatusFilter)
              }
              className='h-10 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/20'
            >
              <option value='ALL'>All statuses</option>

              <option value='ACTIVE'>Active</option>

              <option value='MAINTENANCE'>Maintenance</option>

              <option value='INACTIVE'>Inactive</option>
            </select>
          </div>

          <div>
            <label
              htmlFor='seat-map-cabin'
              className='mb-2 block text-xs font-medium text-foreground'
            >
              Cabin class
            </label>

            <select
              id='seat-map-cabin'
              value={cabin}
              onChange={(event) =>
                onCabinChange(event.target.value as SeatMapCabinFilter)
              }
              className='h-10 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/20'
            >
              <option value='ALL'>All cabins</option>

              <option value='BUSINESS'>Business</option>

              <option value='PREMIUM_ECONOMY'>Premium Economy</option>

              <option value='ECONOMY'>Economy</option>
            </select>
          </div>
        </div>

        <div className='flex items-center justify-between gap-3'>
          <span className='text-xs text-muted-foreground'>
            {resultCount} {resultCount === 1 ? 'seat map' : 'seat maps'}
          </span>

          <Button
            type='button'
            variant='outline'
            onClick={onReset}
            disabled={!hasFilters}
            className='gap-2'
          >
            <RotateCcw className='size-3.5' />
            Reset
          </Button>
        </div>
      </div>
    </section>
  );
}
