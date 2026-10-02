import { ListFilter, RotateCcw, Search } from 'lucide-react';

import type { RouteStatusFilter } from '../types/route';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface RouteFiltersProps {
  search: string;
  status: RouteStatusFilter;
  resultCount: number;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: RouteStatusFilter) => void;
  onReset: () => void;
}

function isRouteStatusFilter(value: string | null): value is RouteStatusFilter {
  return value === 'ALL' || value === 'ACTIVE' || value === 'INACTIVE';
}

export function RouteFilters({
  search,
  status,
  resultCount,
  onSearchChange,
  onStatusChange,
  onReset,
}: RouteFiltersProps) {
  return (
    <section className='rounded-xl border border-border bg-card p-4'>
      <div className='flex flex-col gap-4'>
        <div className='flex flex-col gap-3 lg:flex-row lg:items-center'>
          <div className='relative min-w-0 flex-1'>
            <Search className='pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground' />

            <Input
              value={search}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder='Search airports, cities, route IDs, flights...'
              className='pl-9'
              aria-label='Search airline routes'
            />
          </div>

          <div className='flex flex-col gap-3 sm:flex-row'>
            <Select
              value={status}
              onValueChange={(value) => {
                if (isRouteStatusFilter(value)) {
                  onStatusChange(value);
                }
              }}
            >
              <SelectTrigger className='w-full sm:w-[170px]'>
                <ListFilter className='size-4 text-muted-foreground' />
                <SelectValue placeholder='Route status' />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value='ALL'>All statuses</SelectItem>

                <SelectItem value='ACTIVE'>Active</SelectItem>

                <SelectItem value='INACTIVE'>Inactive</SelectItem>
              </SelectContent>
            </Select>

            <Button type='button' variant='outline' onClick={onReset}>
              <RotateCcw className='size-4' />
              Reset
            </Button>
          </div>
        </div>

        <div className='flex items-center justify-between border-t border-border pt-3'>
          <p className='text-sm text-muted-foreground'>
            Showing{' '}
            <span className='font-medium text-foreground'>{resultCount}</span>{' '}
            {resultCount === 1 ? 'route' : 'routes'}
          </p>
        </div>
      </div>
    </section>
  );
}
