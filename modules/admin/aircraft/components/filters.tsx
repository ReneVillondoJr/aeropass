import { RotateCcw, Search } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import type { AircraftStatusFilter } from '../types/aircraft';

interface AircraftFiltersProps {
  search: string;

  status: AircraftStatusFilter;

  manufacturer: string;

  manufacturerOptions: string[];

  resultCount: number;

  onSearchChange: (value: string) => void;

  onStatusChange: (value: AircraftStatusFilter) => void;

  onManufacturerChange: (value: string) => void;

  onReset: () => void;
}

export function AircraftFilters({
  search,
  status,
  manufacturer,
  manufacturerOptions,
  resultCount,
  onSearchChange,
  onStatusChange,
  onManufacturerChange,
  onReset,
}: AircraftFiltersProps) {
  const hasFilters =
    search.length > 0 || status !== 'ALL' || manufacturer !== 'ALL';

  return (
    <section className='rounded-2xl border border-border/70 bg-background p-4 shadow-sm sm:p-5'>
      <div className='flex flex-col gap-4 xl:flex-row xl:items-end'>
        <div className='min-w-0 flex-1'>
          <label
            htmlFor='aircraft-search'
            className='mb-2 block text-xs font-medium text-foreground'
          >
            Search fleet
          </label>

          <div className='relative'>
            <Search className='pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground' />

            <Input
              id='aircraft-search'
              value={search}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder='Search model, registration, flight, route...'
              className='h-10 pl-9'
            />
          </div>
        </div>

        <div className='grid gap-4 sm:grid-cols-2 xl:w-[360px]'>
          <div>
            <label
              htmlFor='aircraft-status'
              className='mb-2 block text-xs font-medium text-foreground'
            >
              Status
            </label>

            <select
              id='aircraft-status'
              value={status}
              onChange={(event) =>
                onStatusChange(event.target.value as AircraftStatusFilter)
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
              htmlFor='aircraft-manufacturer'
              className='mb-2 block text-xs font-medium text-foreground'
            >
              Manufacturer
            </label>

            <select
              id='aircraft-manufacturer'
              value={manufacturer}
              onChange={(event) => onManufacturerChange(event.target.value)}
              className='h-10 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/20'
            >
              <option value='ALL'>All manufacturers</option>

              {manufacturerOptions.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className='flex items-center justify-between gap-3 xl:pb-0.5'>
          <span className='text-xs text-muted-foreground'>
            {resultCount} {resultCount === 1 ? 'aircraft' : 'aircraft'}
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
