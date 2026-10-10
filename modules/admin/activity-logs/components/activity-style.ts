import {
  Activity,
  Banknote,
  CalendarClock,
  CheckCircle2,
  ClipboardCheck,
  FilePlus2,
  LogIn,
  LogOut,
  Luggage,
  Plane,
  RefreshCw,
  ShieldCheck,
  Ticket,
  UserRound,
} from 'lucide-react';

import { createElement } from 'react';

import type { LucideIcon } from 'lucide-react';

function getActivityIconComponent(action: string): LucideIcon {
  switch (action) {
    case 'LOGIN':
      return LogIn;

    case 'LOGOUT':
      return LogOut;

    case 'CREATE':
      return FilePlus2;

    case 'UPDATE':
      return RefreshCw;

    case 'DELETE':
      return ClipboardCheck;

    case 'PAYMENT':
      return Banknote;

    case 'CHECK_IN':
      return CheckCircle2;

    case 'BOARD':
    case 'BOARDING':
      return Ticket;

    case 'BAGGAGE':
      return Luggage;

    case 'REFUND_REQUEST':
      return RefreshCw;

    case 'FLIGHT':
    case 'SCHEDULE':
      return Plane;

    case 'USER':
      return UserRound;

    case 'SETTINGS':
      return ShieldCheck;

    case 'REMINDER':
      return CalendarClock;

    default:
      return Activity;
  }
}

export function formatActivityLabel(value: string) {
  return value
    .split('_')
    .filter(Boolean)
    .map((part) => part.charAt(0) + part.slice(1).toLowerCase())
    .join(' ');
}

export function getActivityIcon(action: string, className: string) {
  return createElement(getActivityIconComponent(action), { className });
}

export function getActivityActionClass(action: string) {
  switch (action) {
    case 'LOGIN':
    case 'LOGOUT':
      return 'border-violet-200 bg-violet-50 text-violet-700';

    case 'CREATE':
      return 'border-emerald-200 bg-emerald-50 text-emerald-700';

    case 'UPDATE':
      return 'border-blue-200 bg-blue-50 text-blue-700';

    case 'DELETE':
      return 'border-rose-200 bg-rose-50 text-rose-700';

    case 'PAYMENT':
      return 'border-emerald-200 bg-emerald-50 text-emerald-700';

    case 'CHECK_IN':
    case 'BOARD':
    case 'BOARDING':
      return 'border-amber-200 bg-amber-50 text-amber-700';

    case 'REFUND_REQUEST':
      return 'border-orange-200 bg-orange-50 text-orange-700';

    default:
      return 'border-slate-200 bg-slate-50 text-slate-700';
  }
}
