import { AdminFilterBar } from '@/components/filter-bar';
import { AdminFilterSelect } from '@/components/filter-select';

import type {
  ScheduleFilterFrequency,
  ScheduleFilterStatus,
} from '../types/schedule';

interface ScheduleFiltersProps {
  search: string;
  status: ScheduleFilterStatus;
  frequency: ScheduleFilterFrequency;
  resultCount: number;

  onSearchChange: (value: string) => void;

  onStatusChange: (value: ScheduleFilterStatus) => void;

  onFrequencyChange: (value: ScheduleFilterFrequency) => void;

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

const frequencyOptions = [
  {
    label: 'All frequency',
    value: 'ALL',
  },
  {
    label: 'Daily',
    value: 'DAILY',
  },
  {
    label: 'Weekdays',
    value: 'WEEKDAYS',
  },
  {
    label: 'Weekends',
    value: 'WEEKENDS',
  },
];

export function ScheduleFilters({
  search,
  status,
  frequency,
  resultCount,
  onSearchChange,
  onStatusChange,
  onFrequencyChange,
  onReset,
}: ScheduleFiltersProps) {
  const hasFilters =
    search.length > 0 || status !== 'ALL' || frequency !== 'ALL';

  return (
    <AdminFilterBar
      search={search}
      searchPlaceholder='Search flight, route, city, or aircraft...'
      resultCount={resultCount}
      resultLabel='schedule'
      resultLabelPlural='schedules'
      hasFilters={hasFilters}
      onSearchChange={onSearchChange}
      onReset={onReset}
      helperText='Select a schedule to inspect its operating pattern.'
    >
      <AdminFilterSelect
        id='schedule-status'
        label='Status'
        value={status}
        options={statusOptions}
        onChange={(value) => onStatusChange(value as ScheduleFilterStatus)}
        className='w-full sm:w-[165px]'
      />

      <AdminFilterSelect
        id='schedule-frequency'
        label='Frequency'
        value={frequency}
        options={frequencyOptions}
        onChange={(value) =>
          onFrequencyChange(value as ScheduleFilterFrequency)
        }
        className='w-full sm:w-[170px]'
      />
    </AdminFilterBar>
  );
}
