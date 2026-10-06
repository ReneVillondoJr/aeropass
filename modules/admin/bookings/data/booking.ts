import type {
  BookingStatus,
  PaymentMethod,
  PaymentStatus,
} from '@/data/aeropass';

export const bookingStatusMeta = {
  PENDING_PAYMENT: {
    label: 'Pending payment',
    className: 'bg-amber-50 text-amber-700',
  },

  CONFIRMED: {
    label: 'Confirmed',
    className: 'bg-emerald-50 text-emerald-700',
  },

  CHECKED_IN: {
    label: 'Checked in',
    className: 'bg-[#EEF7FB] text-[#102A43]',
  },

  COMPLETED: {
    label: 'Completed',
    className: 'bg-slate-100 text-slate-700',
  },

  CANCELLED: {
    label: 'Cancelled',
    className: 'bg-red-50 text-red-700',
  },

  REFUND_PENDING: {
    label: 'Refund pending',
    className: 'bg-orange-50 text-orange-700',
  },

  REFUNDED: {
    label: 'Refunded',
    className: 'bg-violet-50 text-violet-700',
  },
} satisfies Record<
  BookingStatus,
  {
    label: string;
    className: string;
  }
>;

export const paymentStatusMeta = {
  PENDING: {
    label: 'Pending',
    className: 'bg-amber-50 text-amber-700',
  },

  PROCESSING: {
    label: 'Processing',
    className: 'bg-[#EEF7FB] text-[#102A43]',
  },

  PAID: {
    label: 'Paid',
    className: 'bg-emerald-50 text-emerald-700',
  },

  FAILED: {
    label: 'Failed',
    className: 'bg-red-50 text-red-700',
  },

  CANCELLED: {
    label: 'Cancelled',
    className: 'bg-slate-100 text-slate-600',
  },

  REFUNDED: {
    label: 'Refunded',
    className: 'bg-violet-50 text-violet-700',
  },
} satisfies Record<
  PaymentStatus,
  {
    label: string;
    className: string;
  }
>;

export const paymentMethodMeta = {
  GCASH: {
    label: 'GCash',
  },

  MAYA: {
    label: 'Maya',
  },

  QRPH: {
    label: 'QR Ph',
  },

  CARD: {
    label: 'Card',
  },

  BANK_TRANSFER: {
    label: 'Bank transfer',
  },
} satisfies Record<
  PaymentMethod,
  {
    label: string;
  }
>;

export function formatPhp(amount: number) {
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat('en-PH', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}

export function formatDateTime(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat('en-PH', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(date);
}
