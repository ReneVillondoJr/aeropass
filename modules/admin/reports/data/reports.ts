import {
  Banknote,
  CalendarRange,
  CircleDollarSign,
  Plane,
  RotateCcw,
  TicketCheck,
  Users,
} from 'lucide-react';

export const reportPeriods = [
  {
    value: '7D',
    label: 'Last 7 days',
  },
  {
    value: '30D',
    label: 'Last 30 days',
  },
  {
    value: 'ALL',
    label: 'All time',
  },
] as const;

export const reportKpiIcons = {
  revenue: CircleDollarSign,
  bookings: TicketCheck,
  passengers: Users,
  flights: Plane,
  refunds: RotateCcw,
  payments: Banknote,
} as const;

export const bookingStatusLabels: Record<string, string> = {
  PENDING_PAYMENT: 'Pending payment',
  CONFIRMED: 'Confirmed',
  CHECKED_IN: 'Checked in',
  COMPLETED: 'Completed',
  CANCELLED: 'Cancelled',
  REFUND_PENDING: 'Refund pending',
  REFUNDED: 'Refunded',
};

export const paymentMethodLabels: Record<string, string> = {
  GCASH: 'GCash',
  MAYA: 'Maya',
  QRPH: 'QRPh',
  CARD: 'Card',
  BANK_TRANSFER: 'Bank transfer',
};

export const flightStatusLabels: Record<string, string> = {
  SCHEDULED: 'Scheduled',
  CHECK_IN_OPEN: 'Check-in open',
  BOARDING: 'Boarding',
  DEPARTED: 'Departed',
  ARRIVED: 'Arrived',
  DELAYED: 'Delayed',
  CANCELLED: 'Cancelled',
};

export const exceptionTypeLabels = {
  DELAY: 'Flight delay',
  PAYMENT: 'Payment',
  REFUND: 'Refund',
  BAGGAGE: 'Baggage',
} as const;

export const reportDate = '2026-09-23';

export const reportDateLabel = 'September 23, 2026';

export const reportIcon = CalendarRange;
