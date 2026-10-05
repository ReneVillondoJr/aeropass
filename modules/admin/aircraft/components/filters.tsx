import { AdminFilterBar } from '@/components/filter-bar';
import { AdminFilterSelect } from '@/components/filter-select';

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

  const manufacturerOptionsWithAll = [
    {
      label: 'All manufacturers',
      value: 'ALL',
    },
    ...manufacturerOptions.map((item) => ({
      label: item,
      value: item,
    })),
  ];

  return (
    <AdminFilterBar
      search={search}
      searchPlaceholder='Search model, registration, flight, route...'
      resultCount={resultCount}
      resultLabel='aircraft'
      resultLabelPlural='aircraft'
      hasFilters={hasFilters}
      onSearchChange={onSearchChange}
      onReset={onReset}
      helperText='Select an aircraft to inspect its operational profile.'
    >
      <AdminFilterSelect
        id='aircraft-status'
        label='Status'
        value={status}
        options={statusOptions}
        onChange={(value) => onStatusChange(value as AircraftStatusFilter)}
        className='w-full sm:w-[165px]'
      />

      <AdminFilterSelect
        id='aircraft-manufacturer'
        label='Manufacturer'
        value={manufacturer}
        options={manufacturerOptionsWithAll}
        onChange={onManufacturerChange}
        className='w-full sm:w-[185px]'
      />
    </AdminFilterBar>
  );
}
