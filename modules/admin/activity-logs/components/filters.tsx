'use client';

import { Activity, Boxes } from 'lucide-react';

import { AdminFilterBar } from '@/components/filter-bar';
import { AdminFilterSelect } from '@/components/filter-select';

import type {
  ActivityActionFilter,
  ActivityEntityFilter,
  ActivityFilterOption,
} from '../types/activity-log';

interface ActivityLogsFiltersProps {
  search: string;
  action: ActivityActionFilter;
  entity: ActivityEntityFilter;
  resultCount: number;
  hasFilters: boolean;
  actionOptions: ActivityFilterOption[];
  entityOptions: ActivityFilterOption[];
  onSearchChange: (value: string) => void;
  onActionChange: (value: ActivityActionFilter) => void;
  onEntityChange: (value: ActivityEntityFilter) => void;
  onReset: () => void;
}

export function ActivityLogsFilters({
  search,
  action,
  entity,
  resultCount,
  hasFilters,
  actionOptions,
  entityOptions,
  onSearchChange,
  onActionChange,
  onEntityChange,
  onReset,
}: ActivityLogsFiltersProps) {
  return (
    <AdminFilterBar
      search={search}
      searchPlaceholder='Search actor, action, entity, or description...'
      resultCount={resultCount}
      resultLabel='activity record'
      resultLabelPlural='activity records'
      hasFilters={hasFilters}
      onSearchChange={onSearchChange}
      onReset={onReset}
      helperText='Filter recorded events by action or entity.'
    >
      <AdminFilterSelect
        id='activity-log-action'
        label='Action'
        value={action}
        onChange={onActionChange}
        options={[{ label: 'All actions', value: 'ALL' }, ...actionOptions]}
        className='w-full sm:w-[165px]'
        icon={<Activity className='size-3.5 shrink-0 text-muted-foreground' />}
      />

      <AdminFilterSelect
        id='activity-log-entity'
        label='Entity'
        value={entity}
        onChange={onEntityChange}
        options={[{ label: 'All entities', value: 'ALL' }, ...entityOptions]}
        className='w-full sm:w-[165px]'
        icon={<Boxes className='size-3.5 shrink-0 text-muted-foreground' />}
      />
    </AdminFilterBar>
  );
}
