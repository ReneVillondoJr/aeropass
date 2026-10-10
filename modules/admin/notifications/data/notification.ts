import { getUserById, notifications } from '@/data/aeropass';

import type {
  NotificationFilterOption,
  NotificationStats,
  NotificationViewModel,
} from '../types/notification';

export function buildNotificationViewModels(): NotificationViewModel[] {
  return notifications
    .map((notification) => {
      const recipient = getUserById(notification.userId);

      return {
        id: notification.id,
        title: notification.title,
        message: notification.message,
        type: notification.type,
        read: notification.read,
        createdAt: notification.createdAt,

        userId: notification.userId,
        recipientName: recipient?.name ?? 'Unknown user',
        recipientEmail: recipient?.email ?? '—',
        recipientRole: recipient?.role ?? null,
        recipientStatus: recipient?.status ?? null,
      };
    })
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
}

export function buildNotificationStats(
  items: NotificationViewModel[],
): NotificationStats {
  return {
    total: items.length,
    unread: items.filter((item) => !item.read).length,
    read: items.filter((item) => item.read).length,
    recipients: new Set(items.map((item) => item.userId)).size,
    system: items.filter((item) => item.type === 'SYSTEM').length,
  };
}

export function getNotificationTypeOptions(): NotificationFilterOption[] {
  return [
    { label: 'Booking', value: 'BOOKING' },
    { label: 'Payment', value: 'PAYMENT' },
    { label: 'Flight', value: 'FLIGHT' },
    { label: 'Check-in', value: 'CHECK_IN' },
    { label: 'Boarding', value: 'BOARDING' },
    { label: 'System', value: 'SYSTEM' },
  ];
}
