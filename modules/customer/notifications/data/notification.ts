import { notifications } from '@/data/aeropass';

import type {
  CustomerNotification,
  CustomerNotificationType,
  NotificationCategoryFilter,
  NotificationReadFilter,
  NotificationStats,
} from '../types/notification';

export function getCustomerNotifications(
  customerId: string,
): CustomerNotification[] {
  return notifications
    .filter((notification) => notification.userId === customerId)
    .map((notification) => ({
      id: notification.id,
      userId: notification.userId,
      title: notification.title,
      message: notification.message,
      type: notification.type as CustomerNotificationType,
      read: notification.read,
      createdAt: notification.createdAt,
    }))
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
}

export function filterCustomerNotifications(
  items: CustomerNotification[],
  search: string,
  category: NotificationCategoryFilter,
  readFilter: NotificationReadFilter,
): CustomerNotification[] {
  const normalizedSearch = search.trim().toLowerCase();

  return items.filter((notification) => {
    const matchesSearch =
      !normalizedSearch ||
      notification.title.toLowerCase().includes(normalizedSearch) ||
      notification.message.toLowerCase().includes(normalizedSearch) ||
      notification.type.toLowerCase().includes(normalizedSearch);

    const matchesCategory =
      category === 'ALL' || notification.type === category;

    const matchesReadStatus =
      readFilter === 'ALL' ||
      (readFilter === 'UNREAD' && !notification.read) ||
      (readFilter === 'READ' && notification.read);

    return matchesSearch && matchesCategory && matchesReadStatus;
  });
}

export function getNotificationStats(
  items: CustomerNotification[],
): NotificationStats {
  const today = new Date();

  const todayCount = items.filter((notification) => {
    const createdAt = new Date(notification.createdAt);

    return (
      createdAt.getFullYear() === today.getFullYear() &&
      createdAt.getMonth() === today.getMonth() &&
      createdAt.getDate() === today.getDate()
    );
  }).length;

  const unread = items.filter((notification) => !notification.read).length;

  return {
    total: items.length,
    unread,
    read: items.length - unread,
    today: todayCount,
  };
}

export function formatNotificationDate(value: string): string {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return 'Date unavailable';
  }

  return new Intl.DateTimeFormat('en-PH', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(date);
}

export function getNotificationCategoryLabel(
  type: CustomerNotificationType,
): string {
  const labels: Record<CustomerNotificationType, string> = {
    BOOKING: 'Bookings',
    PAYMENT: 'Payments',
    FLIGHT: 'Flight updates',
    CHECK_IN: 'Check-in',
    BOARDING: 'Boarding',
    SYSTEM: 'System',
  };

  return labels[type];
}
