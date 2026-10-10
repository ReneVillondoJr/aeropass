import type { Notification, RoleCode, UserStatus } from '@/data/aeropass';

export type NotificationType = Notification['type'];

export type NotificationReadFilter = 'ALL' | 'READ' | 'UNREAD';

export type NotificationFilterType = 'ALL' | NotificationType;

export interface NotificationViewModel {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  read: boolean;
  createdAt: string;

  userId: string;
  recipientName: string;
  recipientEmail: string;
  recipientRole: RoleCode | null;
  recipientStatus: UserStatus | null;
}

export interface NotificationStats {
  total: number;
  unread: number;
  read: number;
  recipients: number;
  system: number;
}

export interface NotificationFilterOption {
  label: string;
  value: string;
}
