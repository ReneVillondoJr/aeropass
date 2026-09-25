'use client';

import { Search, SlidersHorizontal } from 'lucide-react';

import { Input } from '@/components/ui/input';

import { FlightCard } from './flight-card';
import type { FlightListItem } from '../types/flights';

interface FlightListProps {
  flights: FlightListItem[];
  selectedFlightId: string;
  search: string;
  statusFilter: 'ALL' | FlightListItem['status'];
  onSearchChange: (value: string) => void;
  onStatusChange: (value: 'ALL' | FlightListItem['status']) => void;
  onSelect: (flightId: string) => void;
}

export function FlightList({
  flights,
  selectedFlightId,
  search,
  statusFilter,
  onSearchChange,
  onStatusChange,
  onSelect,
}: FlightListProps) {
  return (
    <div className='rounded-2xl border border-border bg-card'>
      <div className='border-b border-border p-5'>
        <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
          <div>
            <h2 className='text-sm font-semibold'>Flight schedule</h2>

            <p className='mt-1 text-xs text-muted-foreground'>
              Monitor scheduled and active flights.
            </p>
          </div>

          <div className='flex items-center gap-2 text-xs text-muted-foreground'>
            <SlidersHorizontal className='size-3.5' />
            {flights.length} flights
          </div>
        </div>

        <div className='mt-5 flex flex-col gap-3 sm:flex-row'>
          <div className='relative flex-1'>
            <Search className='pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground' />

            <Input
              value={search}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder='Search flight, route, or gate...'
              className='pl-9'
            />
          </div>

          <select
            value={statusFilter}
            onChange={(event) =>
              onStatusChange(
                event.target.value as 'ALL' | FlightListItem['status'],
              )
            }
            className='h-9 rounded-md border border-input bg-background px-3 text-sm outline-none focus:border-ring'
          >
            <option value='ALL'>All statuses</option>

            <option value='SCHEDULED'>Scheduled</option>

            <option value='CHECK_IN_OPEN'>Check-in open</option>

            <option value='BOARDING'>Boarding</option>

            <option value='DEPARTED'>Departed</option>

            <option value='ARRIVED'>Arrived</option>

            <option value='DELAYED'>Delayed</option>
          </select>
        </div>
      </div>

      <div className='space-y-3 p-4'>
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
    </div>
  );
}
