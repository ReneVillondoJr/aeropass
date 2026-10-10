'use client';

import { NotificationDetail } from './components/detail';
import { NotificationsFilters } from './components/filters';
import { NotificationsHeader } from './components/header';
import { NotificationsList } from './components/list';
import { NotificationsStats } from './components/stats';
import { useNotifications } from './hooks/use-notification';

export function Notifications() {
  const {
    notifications,
    selectedNotification,
    selectedId,
    stats,
    typeOptions,
    filters,
    hasFilters,
    setSearch,
    setType,
    setReadStatus,
    resetFilters,
    selectNotification,
  } = useNotifications();

  return (
    <div className='flex flex-col gap-6'>
      <NotificationsHeader stats={stats} />

      <NotificationsStats stats={stats} />

      <NotificationsFilters
        search={filters.search}
        type={filters.type}
        readStatus={filters.readStatus}
        resultCount={notifications.length}
        hasFilters={hasFilters}
        typeOptions={typeOptions}
        onSearchChange={setSearch}
        onTypeChange={setType}
        onReadStatusChange={setReadStatus}
        onReset={resetFilters}
      />

      <div className='grid min-w-0 items-start gap-6 xl:grid-cols-[minmax(0,1fr)_390px]'>
        <NotificationsList
          notifications={notifications}
          selectedId={selectedId}
          onSelect={selectNotification}
        />

        <NotificationDetail notification={selectedNotification} />
      </div>
    </div>
  );
}
