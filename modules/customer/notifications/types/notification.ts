export type CustomerNotificationType =
  | 'BOOKING'
  | 'PAYMENT'
  | 'FLIGHT'
  | 'CHECK_IN'
  | 'BOARDING'
  | 'SYSTEM';

export type NotificationCategoryFilter = 'ALL' | CustomerNotificationType;

export type NotificationReadFilter = 'ALL' | 'UNREAD' | 'READ';

export interface CustomerNotification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: CustomerNotificationType;
  read: boolean;
  createdAt: string;
}

export interface NotificationStats {
  total: number;
  unread: number;
  read: number;
  today: number;
}
