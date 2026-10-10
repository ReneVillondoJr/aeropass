import type { LucideIcon } from 'lucide-react';

export const PAYMENT_METHODS = [
  'GCASH',
  'MAYA',
  'QRPH',
  'CARD',
  'BANK_TRANSFER',
] as const;

export type PaymentMethod = (typeof PAYMENT_METHODS)[number];

export interface GeneralSettings {
  platformName: string;
  supportEmail: string;
  timeZone: 'Asia/Manila' | 'UTC';
  currency: 'PHP';
  dateFormat: 'DD MMM YYYY' | 'MMM D, YYYY';
}

export interface FlightOperationsSettings {
  checkInOpenHoursBeforeDeparture: number;
  boardingStartsMinutesBeforeDeparture: number;
  allowSeatSelection: boolean;
  automaticSeatAssignment: boolean;
}

export interface BookingSettings {
  referencePrefix: string;
  paymentHoldMinutes: number;
  allowGuestCheckout: boolean;
  allowCancellationRequests: boolean;
}

export interface NotificationSettings {
  inAppEnabled: boolean;
  emailEnabled: boolean;
  bookingUpdates: boolean;
  paymentUpdates: boolean;
  flightUpdates: boolean;
  checkInReminders: boolean;
  securityAlerts: boolean;
}

export interface SecuritySettings {
  sessionTimeoutMinutes: number;
  maxFailedLoginAttempts: number;
  minimumPasswordLength: number;
  requireStrongPasswords: boolean;
  requireAdminTwoFactor: boolean;
  alertOnNewAdminLogin: boolean;
}

export interface PaymentSettings {
  mode: 'LOCAL_MOCK';
  currency: 'PHP';
  enabledMethods: Record<PaymentMethod, boolean>;
  allowPaymentRetry: boolean;
}

export interface SettingsValues {
  general: GeneralSettings;
  flightOperations: FlightOperationsSettings;
  booking: BookingSettings;
  notifications: NotificationSettings;
  security: SecuritySettings;
  payments: PaymentSettings;
}

export type SettingsSectionKey = keyof SettingsValues;

export interface SettingsSectionConfig {
  key: SettingsSectionKey;
  title: string;
  description: string;
  icon: LucideIcon;
}

export type SettingsSaveState = 'idle' | 'saved' | 'error';

export type UpdateSetting = <
  K extends SettingsSectionKey,
  F extends keyof SettingsValues[K],
>(
  section: K,
  field: F,
  value: SettingsValues[K][F],
) => void;
