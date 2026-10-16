'use client';

import { ListFilter } from 'lucide-react';

import { AdminFilterBar } from '@/components/filter-bar';
import { AdminFilterSelect } from '@/components/filter-select';

import type { CheckInFilter } from '../types/check-in';

interface CheckInFiltersProps {
  query: string;
  onQueryChange: (value: string) => void;
  filter: CheckInFilter;
  onFilterChange: (value: CheckInFilter) => void;
  total: number;
  shown: number;
}

const filterOptions: {
  label: string;
  value: CheckInFilter;
}[] = [
  {
    label: 'All tickets',
    value: 'ALL',
  },
  {
    label: 'Available',
    value: 'AVAILABLE',
  },
  {
    label: 'Checked in',
    value: 'COMPLETED',
  },
  {
    label: 'Not available',
    value: 'NOT_AVAILABLE',
  },
];

export function CheckInFilters({
  query,
  onQueryChange,
  filter,
  onFilterChange,
  total,
  shown,
}: CheckInFiltersProps) {
  const hasFilters = query.trim().length > 0 || filter !== 'ALL';

  return (
    <AdminFilterBar
      search={query}
      searchPlaceholder='Search ticket, booking, passenger or route...'
      resultCount={shown}
      resultLabel='ticket'
      resultLabelPlural='tickets'
      hasFilters={hasFilters}
      onSearchChange={onQueryChange}
      onReset={() => {
        onQueryChange('');
        onFilterChange('ALL');
      }}
      helperText='Search by ticket number, booking reference, passenger, flight, or route.'
    >
      <AdminFilterSelect
        id='customer-check-in-status'
        label='Check-in status'
        value={filter}
        options={filterOptions}
        onChange={(value) => onFilterChange(value as CheckInFilter)}
        className='w-full sm:w-[190px]'
        icon={
          <ListFilter className='size-3.5 shrink-0 text-muted-foreground' />
        }
      />
    </AdminFilterBar>
  );
}
