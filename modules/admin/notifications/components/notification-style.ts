import {
  Bell,
  CalendarCheck,
  CreditCard,
  Plane,
  Settings2,
  UsersRound,
} from 'lucide-react';

import type { LucideIcon } from 'lucide-react';

import type { NotificationType } from '../types/notification';

export const notificationTypeConfig: Record<
  NotificationType,
  {
    label: string;
    className: string;
    icon: LucideIcon;
  }
> = {
  BOOKING: {
    label: 'Booking',
    className: 'border-blue-200 bg-blue-50 text-blue-700',
    icon: CalendarCheck,
  },
  PAYMENT: {
    label: 'Payment',
    className: 'border-emerald-200 bg-emerald-50 text-emerald-700',
    icon: CreditCard,
  },
  FLIGHT: {
    label: 'Flight',
    className: 'border-violet-200 bg-violet-50 text-violet-700',
    icon: Plane,
  },
  CHECK_IN: {
    label: 'Check-in',
    className: 'border-amber-200 bg-amber-50 text-amber-700',
    icon: UsersRound,
  },
  BOARDING: {
    label: 'Boarding',
    className: 'border-orange-200 bg-orange-50 text-orange-700',
    icon: Bell,
  },
  SYSTEM: {
    label: 'System',
    className: 'border-slate-200 bg-slate-50 text-slate-700',
    icon: Settings2,
  },
};
