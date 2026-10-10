import {
  BellRing,
  CalendarClock,
  CreditCard,
  Settings2,
  ShieldCheck,
  Plane,
} from 'lucide-react';

import type {
  PaymentMethod,
  SettingsSectionConfig,
  SettingsValues,
} from '../types/settings';

export const SETTINGS_SECTIONS: SettingsSectionConfig[] = [
  {
    key: 'general',
    title: 'General',
    description: 'Platform identity and regional preferences.',
    icon: Settings2,
  },
  {
    key: 'flightOperations',
    title: 'Flight operations',
    description: 'Check-in, boarding, and seat assignment defaults.',
    icon: Plane,
  },
  {
    key: 'booking',
    title: 'Booking rules',
    description: 'Reservation references and booking preferences.',
    icon: CalendarClock,
  },
  {
    key: 'notifications',
    title: 'Notifications',
    description: 'Messaging channels and notification categories.',
    icon: BellRing,
  },
  {
    key: 'security',
    title: 'Security',
    description: 'Session, password, and administrator security options.',
    icon: ShieldCheck,
  },
  {
    key: 'payments',
    title: 'Payment methods',
    description: 'Local mock payment options and demo preferences.',
    icon: CreditCard,
  },
];

export const DEFAULT_SETTINGS: SettingsValues = {
  general: {
    platformName: 'AeroPass',
    supportEmail: 'support@aeropass.local',
    timeZone: 'Asia/Manila',
    currency: 'PHP',
    dateFormat: 'DD MMM YYYY',
  },

  flightOperations: {
    checkInOpenHoursBeforeDeparture: 24,
    boardingStartsMinutesBeforeDeparture: 45,
    allowSeatSelection: true,
    automaticSeatAssignment: true,
  },

  booking: {
    referencePrefix: 'AP',
    paymentHoldMinutes: 15,
    allowGuestCheckout: true,
    allowCancellationRequests: true,
  },

  notifications: {
    inAppEnabled: true,
    emailEnabled: true,
    bookingUpdates: true,
    paymentUpdates: true,
    flightUpdates: true,
    checkInReminders: true,
    securityAlerts: true,
  },

  security: {
    sessionTimeoutMinutes: 30,
    maxFailedLoginAttempts: 5,
    minimumPasswordLength: 12,
    requireStrongPasswords: true,
    requireAdminTwoFactor: false,
    alertOnNewAdminLogin: true,
  },

  payments: {
    mode: 'LOCAL_MOCK',
    currency: 'PHP',
    enabledMethods: {
      GCASH: true,
      MAYA: true,
      QRPH: true,
      CARD: true,
      BANK_TRANSFER: true,
    },
    allowPaymentRetry: true,
  },
};

export const PAYMENT_METHOD_LABELS: Record<PaymentMethod, string> = {
  GCASH: 'GCash',
  MAYA: 'Maya',
  QRPH: 'QR Ph',
  CARD: 'Credit or debit card',
  BANK_TRANSFER: 'Bank transfer',
};
