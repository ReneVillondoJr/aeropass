import { AdminFilterBar } from '@/components/filter-bar';
import { AdminFilterSelect } from '@/components/filter-select';

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

const statusOptions = [
  {
    label: 'All statuses',
    value: 'ALL',
  },
  {
    label: 'Active',
    value: 'ACTIVE',
  },
  {
    label: 'Maintenance',
    value: 'MAINTENANCE',
  },
  {
    label: 'Inactive',
    value: 'INACTIVE',
  },
];

const cabinOptions = [
  {
    label: 'All cabins',
    value: 'ALL',
  },
  {
    label: 'Business',
    value: 'BUSINESS',
  },
  {
    label: 'Premium Economy',
    value: 'PREMIUM_ECONOMY',
  },
  {
    label: 'Economy',
    value: 'ECONOMY',
  },
];

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
    <AdminFilterBar
      search={search}
      searchPlaceholder='Search aircraft, model, registration...'
      resultCount={resultCount}
      resultLabel='seat map'
      resultLabelPlural='seat maps'
      hasFilters={hasFilters}
      onSearchChange={onSearchChange}
      onReset={onReset}
      helperText='Select a seat map to inspect its cabin configuration.'
    >
      <AdminFilterSelect
        id='seat-map-status'
        label='Aircraft status'
        value={status}
        options={statusOptions}
        onChange={(value) => onStatusChange(value as SeatMapStatusFilter)}
        className='w-full sm:w-[165px]'
      />

      <AdminFilterSelect
        id='seat-map-cabin'
        label='Cabin class'
        value={cabin}
        options={cabinOptions}
        onChange={(value) => onCabinChange(value as SeatMapCabinFilter)}
        className='w-full sm:w-[185px]'
      />
    </AdminFilterBar>
  );
}
