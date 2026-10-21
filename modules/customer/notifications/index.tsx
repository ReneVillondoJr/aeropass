'use client';

import { useMemo, useState } from 'react';

import {
  filterCustomerNotifications,
  getCustomerNotifications,
  getNotificationStats,
} from './data/notification';

import { NotificationDetail } from './components/detail';
import { NotificationFilters } from './components/filters';
import { NotificationHeader } from './components/header';
import { NotificationList } from './components/list';

import type {
  CustomerNotification,
  NotificationCategoryFilter,
  NotificationReadFilter,
} from './types/notification';

interface CustomerNotificationsModuleProps {
  customerId: string;
}

export function CustomerNotificationsModule({
  customerId,
}: CustomerNotificationsModuleProps) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<NotificationCategoryFilter>('ALL');
  const [readFilter, setReadFilter] = useState<NotificationReadFilter>('ALL');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const customerNotifications = useMemo(
    () => getCustomerNotifications(customerId),
    [customerId],
  );

  const stats = useMemo(
    () => getNotificationStats(customerNotifications),
    [customerNotifications],
  );

  const filteredNotifications = useMemo(
    () =>
      filterCustomerNotifications(
        customerNotifications,
        search,
        category,
        readFilter,
      ),
    [customerNotifications, search, category, readFilter],
  );

  const selectedNotification = useMemo<CustomerNotification | null>(
    () =>
      filteredNotifications.find(
        (notification) => notification.id === selectedId,
      ) ??
      filteredNotifications[0] ??
      null,
    [filteredNotifications, selectedId],
  );

  const hasFilters =
    search.trim().length > 0 || category !== 'ALL' || readFilter !== 'ALL';

  function handleReset() {
    setSearch('');
    setCategory('ALL');
    setReadFilter('ALL');
  }

  return (
    <div className='space-y-6'>
      <NotificationHeader stats={stats} />

      <NotificationFilters
        search={search}
        category={category}
        readFilter={readFilter}
        resultCount={filteredNotifications.length}
        hasFilters={hasFilters}
        onSearchChange={setSearch}
        onCategoryChange={setCategory}
        onReadFilterChange={setReadFilter}
        onReset={handleReset}
      />

      <div className='grid min-w-0 gap-5 xl:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)]'>
        <NotificationList
          notifications={filteredNotifications}
          selectedId={selectedNotification?.id ?? null}
          hasFilters={hasFilters}
          onSelect={(notification) => setSelectedId(notification.id)}
        />

        <NotificationDetail notification={selectedNotification} />
      </div>
    </div>
  );
}
