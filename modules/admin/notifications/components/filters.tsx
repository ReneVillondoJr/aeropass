'use client';

import { Bell, ListFilter, Mail } from 'lucide-react';

import { AdminFilterBar } from '@/components/filter-bar';
import { AdminFilterSelect } from '@/components/filter-select';

import type {
  NotificationFilterOption,
  NotificationFilterType,
  NotificationReadFilter,
} from '../types/notification';

interface NotificationsFiltersProps {
  search: string;
  type: NotificationFilterType;
  readStatus: NotificationReadFilter;
  resultCount: number;
  hasFilters: boolean;
  typeOptions: NotificationFilterOption[];
  onSearchChange: (value: string) => void;
  onTypeChange: (value: NotificationFilterType) => void;
  onReadStatusChange: (value: NotificationReadFilter) => void;
  onReset: () => void;
}

export function NotificationsFilters({
  search,
  type,
  readStatus,
  resultCount,
  hasFilters,
  typeOptions,
  onSearchChange,
  onTypeChange,
  onReadStatusChange,
  onReset,
}: NotificationsFiltersProps) {
  return (
    <AdminFilterBar
      search={search}
      searchPlaceholder='Search title, message, recipient, or notification ID...'
      resultCount={resultCount}
      resultLabel='notification'
      resultLabelPlural='notifications'
      hasFilters={hasFilters}
      onSearchChange={onSearchChange}
      onReset={onReset}
      helperText='Filter by category and read status.'
    >
      <AdminFilterSelect
        id='notifications-type'
        label='Category'
        value={type}
        onChange={(value) => onTypeChange(value as NotificationFilterType)}
        options={[{ label: 'All categories', value: 'ALL' }, ...typeOptions]}
        className='w-full sm:w-[165px]'
        icon={<Bell className='size-3.5 shrink-0 text-muted-foreground' />}
      />

      <AdminFilterSelect
        id='notifications-read-status'
        label='Read status'
        value={readStatus}
        onChange={(value) =>
          onReadStatusChange(value as NotificationReadFilter)
        }
        options={[
          { label: 'All statuses', value: 'ALL' },
          { label: 'Unread', value: 'UNREAD' },
          { label: 'Read', value: 'READ' },
        ]}
        className='w-full sm:w-[150px]'
        icon={<Mail className='size-3.5 shrink-0 text-muted-foreground' />}
      />

      <div className='hidden items-center gap-2 rounded-xl border border-border/70 bg-background px-3 text-[10px] text-muted-foreground lg:flex'>
        <ListFilter className='size-3.5' />
        Notification inbox
      </div>
    </AdminFilterBar>
  );
}
