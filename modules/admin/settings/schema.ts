import { z } from 'zod';

const generalSettingsSchema = z.object({
  platformName: z
    .string()
    .trim()
    .min(2, 'Platform name must contain at least 2 characters.')
    .max(80, 'Platform name cannot exceed 80 characters.'),

  supportEmail: z.string().trim().email('Enter a valid support email address.'),

  timeZone: z.enum(['Asia/Manila', 'UTC']),

  currency: z.literal('PHP'),

  dateFormat: z.enum(['DD MMM YYYY', 'MMM D, YYYY']),
});

const flightOperationsSchema = z.object({
  checkInOpenHoursBeforeDeparture: z
    .number()
    .int()
    .min(1, 'Check-in must open at least 1 hour before departure.')
    .max(72, 'Check-in cannot open more than 72 hours before departure.'),

  boardingStartsMinutesBeforeDeparture: z
    .number()
    .int()
    .min(10, 'Boarding must start at least 10 minutes before departure.')
    .max(180, 'Boarding cannot start more than 180 minutes before departure.'),

  allowSeatSelection: z.boolean(),

  automaticSeatAssignment: z.boolean(),
});

const bookingSettingsSchema = z.object({
  referencePrefix: z
    .string()
    .trim()
    .regex(
      /^[A-Z0-9]{2,6}$/,
      'Use 2–6 uppercase letters or numbers for the booking prefix.',
    ),

  paymentHoldMinutes: z
    .number()
    .int()
    .min(5, 'Payment hold must be at least 5 minutes.')
    .max(120, 'Payment hold cannot exceed 120 minutes.'),

  allowGuestCheckout: z.boolean(),

  allowCancellationRequests: z.boolean(),
});

const notificationSettingsSchema = z.object({
  inAppEnabled: z.boolean(),
  emailEnabled: z.boolean(),
  bookingUpdates: z.boolean(),
  paymentUpdates: z.boolean(),
  flightUpdates: z.boolean(),
  checkInReminders: z.boolean(),
  securityAlerts: z.boolean(),
});

const securitySettingsSchema = z.object({
  sessionTimeoutMinutes: z
    .number()
    .int()
    .min(5, 'Session timeout must be at least 5 minutes.')
    .max(480, 'Session timeout cannot exceed 480 minutes.'),

  maxFailedLoginAttempts: z
    .number()
    .int()
    .min(3, 'Allow at least 3 failed login attempts.')
    .max(10, 'Failed login attempts cannot exceed 10.'),

  minimumPasswordLength: z
    .number()
    .int()
    .min(8, 'Minimum password length must be at least 8.')
    .max(64, 'Minimum password length cannot exceed 64.'),

  requireStrongPasswords: z.boolean(),
  requireAdminTwoFactor: z.boolean(),
  alertOnNewAdminLogin: z.boolean(),
});

const paymentSettingsSchema = z.object({
  mode: z.literal('LOCAL_MOCK'),
  currency: z.literal('PHP'),

  enabledMethods: z.object({
    GCASH: z.boolean(),
    MAYA: z.boolean(),
    QRPH: z.boolean(),
    CARD: z.boolean(),
    BANK_TRANSFER: z.boolean(),
  }),

  allowPaymentRetry: z.boolean(),
});

export const settingsSchema = z.object({
  general: generalSettingsSchema,
  flightOperations: flightOperationsSchema,
  booking: bookingSettingsSchema,
  notifications: notificationSettingsSchema,
  security: securitySettingsSchema,
  payments: paymentSettingsSchema,
});
