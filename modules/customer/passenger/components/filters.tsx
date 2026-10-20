'use client';

import { ListFilter } from 'lucide-react';

import { AdminFilterBar } from '@/components/filter-bar';
import { AdminFilterSelect } from '@/components/filter-select';

import type {
  CustomerPassengerCounts,
  CustomerPassengerFilter,
} from '../types/passenger';

interface PassengerFiltersProps {
  search: string;
  setSearch: (value: string) => void;

  filter: CustomerPassengerFilter;
  setFilter: (value: CustomerPassengerFilter) => void;

  counts: CustomerPassengerCounts;
  resultCount: number;
  hasFilters: boolean;
  onReset: () => void;
}

const filterLabels: Array<{
  value: CustomerPassengerFilter;
  label: string;
}> = [
  { value: 'ALL', label: 'All passengers' },
  { value: 'HAS_TICKET', label: 'Has ticket' },
  { value: 'CHECKED_IN', label: 'Checked in' },
  { value: 'SPECIAL_ASSISTANCE', label: 'Special assistance' },
  { value: 'NO_TICKET', label: 'No ticket' },
];

export function PassengerFilters({
  search,
  setSearch,
  filter,
  setFilter,
  counts,
  resultCount,
  hasFilters,
  onReset,
}: PassengerFiltersProps) {
  const options = filterLabels.map((item) => ({
    value: item.value,
    label: `${item.label} (${counts[item.value]})`,
  }));

  return (
    <AdminFilterBar
      search={search}
      searchPlaceholder='Search passenger, booking, flight, ticket, seat...'
      resultCount={resultCount}
      resultLabel='passenger'
      resultLabelPlural='passengers'
      hasFilters={hasFilters}
      onSearchChange={setSearch}
      onReset={onReset}
      helperText='Search by passenger name, contact details, booking reference, flight, ticket, seat, or bag tag. Passport values are masked.'
    >
      <AdminFilterSelect
        id='customer-passenger-filter'
        label='Passenger filter'
        value={filter}
        options={options}
        onChange={(value: string) =>
          setFilter(value as CustomerPassengerFilter)
        }
        className='w-full sm:w-[210px]'
        icon={
          <ListFilter className='size-3.5 shrink-0 text-muted-foreground' />
        }
      />
    </AdminFilterBar>
  );
}
