import { SlidersHorizontal } from 'lucide-react';

import { AdminFilterBar } from '@/components/filter-bar';
import { AdminFilterSelect } from '@/components/filter-select';

import type { FlightListItem } from '../types/flights';

import { FlightCard } from './card';

interface FlightListProps {
  flights: FlightListItem[];

  selectedFlightId: string;

  search: string;

  statusFilter: 'ALL' | FlightListItem['status'];

  onSearchChange: (value: string) => void;

  onStatusChange: (value: 'ALL' | FlightListItem['status']) => void;

  onSelect: (flightId: string) => void;

  onResetFilters: () => void;
}

const statusOptions = [
  {
    label: 'All statuses',
    value: 'ALL',
  },
  {
    label: 'Scheduled',
    value: 'SCHEDULED',
  },
  {
    label: 'Check-in open',
    value: 'CHECK_IN_OPEN',
  },
  {
    label: 'Boarding',
    value: 'BOARDING',
  },
  {
    label: 'Departed',
    value: 'DEPARTED',
  },
  {
    label: 'Arrived',
    value: 'ARRIVED',
  },
  {
    label: 'Delayed',
    value: 'DELAYED',
  },
];

export function FlightList({
  flights,
  selectedFlightId,
  search,
  statusFilter,
  onSearchChange,
  onStatusChange,
  onSelect,
  onResetFilters,
}: FlightListProps) {
  const hasFilters = search.length > 0 || statusFilter !== 'ALL';

  return (
    <div className='min-w-0 space-y-4'>
      {/* Filters */}
      <AdminFilterBar
        search={search}
        searchPlaceholder='Search flight, route, or gate...'
        resultCount={flights.length}
        resultLabel='flight'
        resultLabelPlural='flights'
        hasFilters={hasFilters}
        onSearchChange={onSearchChange}
        onReset={onResetFilters}
        helperText='Select a flight to inspect its operational details.'
      >
        <AdminFilterSelect
          id='flight-status'
          label='Flight status'
          value={statusFilter}
          options={statusOptions}
          onChange={(value) =>
            onStatusChange(value as 'ALL' | FlightListItem['status'])
          }
          className='w-full sm:w-[175px]'
        />
      </AdminFilterBar>

      {/* Flight schedule */}
      <section className='min-w-0 rounded-2xl border border-border bg-card'>
        <div className='border-b border-border p-5'>
          <div className='flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
            <div className='min-w-0'>
              <h2 className='text-sm font-semibold'>Flight schedule</h2>

              <p className='mt-1 text-xs text-muted-foreground'>
                Monitor scheduled and active flights.
              </p>
            </div>

            <div className='flex shrink-0 items-center gap-2 text-xs text-muted-foreground'>
              <SlidersHorizontal className='size-3.5' />
              {flights.length} {flights.length === 1 ? 'flight' : 'flights'}
            </div>
          </div>
        </div>

        <div className='space-y-3 p-4 sm:p-5'>
          {flights.length > 0 ?
            flights.map((flight) => (
              <FlightCard
                key={flight.id}
                flight={flight}
                selected={flight.id === selectedFlightId}
                onSelect={() => onSelect(flight.id)}
              />
            ))
          : <div className='rounded-xl border border-dashed border-border px-6 py-12 text-center'>
              <p className='text-sm font-medium'>No flights found</p>

              <p className='mt-1 text-xs text-muted-foreground'>
                Try another search or status filter.
              </p>
            </div>
          }
        </div>
      </section>
    </div>
  );
}
