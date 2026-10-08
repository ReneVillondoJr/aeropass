'use client';

import { Luggage, Plane } from 'lucide-react';

import { AdminFilterBar } from '@/components/filter-bar';

import { AdminFilterSelect } from '@/components/filter-select';

import type {
  BaggageFilterStatus,
  BaggageFilterType,
  BaggageFlightOption,
} from '../types/baggage';

interface BaggageFiltersProps {
  search: string;
  status: BaggageFilterStatus;
  type: BaggageFilterType;
  flightId: string;
  resultCount: number;
  hasFilters: boolean;
  flightOptions: BaggageFlightOption[];
  onSearchChange: (value: string) => void;
  onStatusChange: (value: BaggageFilterStatus) => void;
  onTypeChange: (value: BaggageFilterType) => void;
  onFlightChange: (value: string) => void;
  onReset: () => void;
}

export function BaggageFilters({
  search,
  status,
  type,
  flightId,
  resultCount,
  hasFilters,
  flightOptions,
  onSearchChange,
  onStatusChange,
  onTypeChange,
  onFlightChange,
  onReset,
}: BaggageFiltersProps) {
  return (
    <AdminFilterBar
      search={search}
      searchPlaceholder='Search bag tag, passenger, booking, or flight...'
      resultCount={resultCount}
      resultLabel='baggage record'
      resultLabelPlural='baggage records'
      hasFilters={hasFilters}
      onSearchChange={onSearchChange}
      onReset={onReset}
      helperText='Filter baggage by status, type, or flight.'
    >
      <AdminFilterSelect
        id='baggage-status'
        label='Status'
        value={status}
        onChange={(value) => onStatusChange(value as BaggageFilterStatus)}
        options={[
          { label: 'All statuses', value: 'ALL' },
          { label: 'Pending', value: 'PENDING' },
          { label: 'Checked', value: 'CHECKED' },
          { label: 'In transit', value: 'IN_TRANSIT' },
          { label: 'Received', value: 'RECEIVED' },
          { label: 'Lost', value: 'LOST' },
        ]}
        className='w-full sm:w-[150px]'
        icon={<Luggage className='size-3.5 shrink-0 text-muted-foreground' />}
      />

      <AdminFilterSelect
        id='baggage-type'
        label='Type'
        value={type}
        onChange={(value) => onTypeChange(value as BaggageFilterType)}
        options={[
          { label: 'All types', value: 'ALL' },
          { label: 'Cabin', value: 'CABIN' },
          { label: 'Checked', value: 'CHECKED' },
        ]}
        className='w-full sm:w-[140px]'
        icon={<Luggage className='size-3.5 shrink-0 text-muted-foreground' />}
      />

      <AdminFilterSelect
        id='baggage-flight'
        label='Flight'
        value={flightId}
        onChange={onFlightChange}
        options={[{ label: 'All flights', value: 'ALL' }, ...flightOptions]}
        className='w-full sm:w-[220px]'
        icon={<Plane className='size-3.5 shrink-0 text-muted-foreground' />}
      />
    </AdminFilterBar>
  );
}
