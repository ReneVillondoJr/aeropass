import { AdminFilterBar } from '@/components/filter-bar';
import { AdminFilterSelect } from '@/components/filter-select';

import type { RouteStatusFilter } from '../types/route';

interface RouteFiltersProps {
  search: string;
  status: RouteStatusFilter;
  resultCount: number;

  onSearchChange: (value: string) => void;

  onStatusChange: (value: RouteStatusFilter) => void;

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
    label: 'Inactive',
    value: 'INACTIVE',
  },
];

export function RouteFilters({
  search,
  status,
  resultCount,
  onSearchChange,
  onStatusChange,
  onReset,
}: RouteFiltersProps) {
  const hasFilters = search.length > 0 || status !== 'ALL';

  return (
    <AdminFilterBar
      search={search}
      searchPlaceholder='Search airports, cities, route IDs, flights...'
      resultCount={resultCount}
      resultLabel='route'
      resultLabelPlural='routes'
      hasFilters={hasFilters}
      onSearchChange={onSearchChange}
      onReset={onReset}
      helperText='Select a route to inspect its network and schedules.'
    >
      <AdminFilterSelect
        id='route-status'
        label='Route status'
        value={status}
        options={statusOptions}
        onChange={(value) => onStatusChange(value as RouteStatusFilter)}
        className='w-full sm:w-[175px]'
      />
    </AdminFilterBar>
  );
}
