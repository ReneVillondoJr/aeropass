'use client';

import { Bell, ListFilter, Search } from 'lucide-react';

import { AdminFilterBar } from '@/components/filter-bar';
import { AdminFilterSelect } from '@/components/filter-select';

import type {
  NotificationCategoryFilter,
  NotificationReadFilter,
} from '../types/notification';

interface NotificationFiltersProps {
  search: string;
  category: NotificationCategoryFilter;
  readFilter: NotificationReadFilter;
  resultCount: number;
  hasFilters: boolean;
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: NotificationCategoryFilter) => void;
  onReadFilterChange: (value: NotificationReadFilter) => void;
  onReset: () => void;
}

const categoryOptions = [
  { label: 'All categories', value: 'ALL' },
  { label: 'Bookings', value: 'BOOKING' },
  { label: 'Payments', value: 'PAYMENT' },
  { label: 'Flight updates', value: 'FLIGHT' },
  { label: 'Check-in', value: 'CHECK_IN' },
  { label: 'Boarding', value: 'BOARDING' },
  { label: 'System', value: 'SYSTEM' },
];

const readOptions = [
  { label: 'All notifications', value: 'ALL' },
  { label: 'Unread only', value: 'UNREAD' },
  { label: 'Read only', value: 'READ' },
];

export function NotificationFilters({
  search,
  category,
  readFilter,
  resultCount,
  hasFilters,
  onSearchChange,
  onCategoryChange,
  onReadFilterChange,
  onReset,
}: NotificationFiltersProps) {
  return (
    <AdminFilterBar
      search={search}
      searchPlaceholder='Search notifications...'
      resultCount={resultCount}
      resultLabel='notification'
      resultLabelPlural='notifications'
      hasFilters={hasFilters}
      onSearchChange={onSearchChange}
      onReset={onReset}
      helperText='Search notification titles and messages, or filter by category and read status.'
    >
      <AdminFilterSelect
        id='customer-notification-category'
        label='Category'
        value={category}
        options={categoryOptions}
        onChange={(value) =>
          onCategoryChange(value as NotificationCategoryFilter)
        }
        className='w-full sm:w-[180px]'
        icon={
          <ListFilter className='size-3.5 shrink-0 text-muted-foreground' />
        }
      />

      <AdminFilterSelect
        id='customer-notification-read-status'
        label='Read status'
        value={readFilter}
        options={readOptions}
        onChange={(value) =>
          onReadFilterChange(value as NotificationReadFilter)
        }
        className='w-full sm:w-[180px]'
        icon={<Bell className='size-3.5 shrink-0 text-muted-foreground' />}
      />
    </AdminFilterBar>
  );
}
