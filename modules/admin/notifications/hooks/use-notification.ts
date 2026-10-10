'use client';

import { useMemo, useState } from 'react';

import {
  buildNotificationStats,
  buildNotificationViewModels,
  getNotificationTypeOptions,
} from '../data/notification';

import { notificationFilterSchema } from '../schema';

import type {
  NotificationFilterType,
  NotificationReadFilter,
  NotificationViewModel,
} from '../types/notification';

export function useNotifications() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const [filters, setFilters] = useState({
    search: '',
    type: 'ALL' as NotificationFilterType,
    readStatus: 'ALL' as NotificationReadFilter,
  });

  const allNotifications = useMemo(() => buildNotificationViewModels(), []);

  const stats = useMemo(
    () => buildNotificationStats(allNotifications),
    [allNotifications],
  );

  const typeOptions = useMemo(() => getNotificationTypeOptions(), []);

  const filteredNotifications = useMemo(() => {
    const parsed = notificationFilterSchema.safeParse(filters);

    if (!parsed.success) {
      return allNotifications;
    }

    const values = parsed.data;
    const search = values.search.trim().toLowerCase();

    return allNotifications.filter((item) => {
      const matchesSearch =
        !search ||
        [
          item.title,
          item.message,
          item.type,
          item.recipientName,
          item.recipientEmail,
          item.recipientRole ?? '',
          item.id,
        ]
          .join(' ')
          .toLowerCase()
          .includes(search);

      const matchesType = values.type === 'ALL' || item.type === values.type;

      const matchesReadStatus =
        values.readStatus === 'ALL' ||
        (values.readStatus === 'READ' && item.read) ||
        (values.readStatus === 'UNREAD' && !item.read);

      return matchesSearch && matchesType && matchesReadStatus;
    });
  }, [allNotifications, filters]);

  const selectedNotification =
    filteredNotifications.find((item) => item.id === selectedId) ?? null;

  const hasFilters =
    filters.search.trim().length > 0 ||
    filters.type !== 'ALL' ||
    filters.readStatus !== 'ALL';

  function setSearch(search: string) {
    setFilters((current) => ({
      ...current,
      search,
    }));
  }

  function setType(type: NotificationFilterType) {
    setFilters((current) => ({
      ...current,
      type,
    }));
  }

  function setReadStatus(readStatus: NotificationReadFilter) {
    setFilters((current) => ({
      ...current,
      readStatus,
    }));
  }

  function resetFilters() {
    setFilters({
      search: '',
      type: 'ALL',
      readStatus: 'ALL',
    });
  }

  function selectNotification(notification: NotificationViewModel) {
    setSelectedId(notification.id);
  }

  return {
    notifications: filteredNotifications,
    allNotifications,
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
  };
}
