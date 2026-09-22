import {
  Airplay,
  Armchair,
  BarChart3,
  Bell,
  Building2,
  CalendarDays,
  ClipboardCheck,
  CreditCard,
  HelpCircle,
  History,
  KeyRound,
  LayoutDashboard,
  Plane,
  ReceiptText,
  Route,
  ScanLine,
  Settings,
  ShieldCheck,
  Ticket,
  UserRound,
  Users,
  WalletCards,
  Wrench,
} from 'lucide-react';

import type { AdminNavigationGroup } from '@/types/sidebar';

export const adminNavigationGroups: AdminNavigationGroup[] = [
  {
    label: 'Overview',
    items: [
      {
        title: 'Dashboard',
        href: '/admin/dashboard',
        icon: LayoutDashboard,
      },
      {
        title: 'Reports',
        href: '/admin/reports',
        icon: BarChart3,
      },
    ],
  },
  {
    label: 'Flight Operations',
    items: [
      {
        title: 'Flights',
        href: '/admin/flights',
        icon: Plane,
      },
      {
        title: 'Schedules',
        href: '/admin/schedules',
        icon: CalendarDays,
      },
      {
        title: 'Routes',
        href: '/admin/routes',
        icon: Route,
      },
      {
        title: 'Airports',
        href: '/admin/airports',
        icon: Building2,
      },
      {
        title: 'Aircraft',
        href: '/admin/aircraft',
        icon: Airplay,
      },
      {
        title: 'Seat Maps',
        href: '/admin/seat-maps',
        icon: Armchair,
      },
      {
        title: 'Fare Classes',
        href: '/admin/fare-classes',
        icon: WalletCards,
      },
    ],
  },
  {
    label: 'Reservations',
    items: [
      {
        title: 'Bookings',
        href: '/admin/bookings',
        icon: ClipboardCheck,
      },
      {
        title: 'Passengers',
        href: '/admin/passengers',
        icon: Users,
      },
      {
        title: 'Tickets',
        href: '/admin/tickets',
        icon: Ticket,
      },
    ],
  },
  {
    label: 'Payments',
    items: [
      {
        title: 'Payments',
        href: '/admin/payments',
        icon: CreditCard,
      },
      {
        title: 'Refunds',
        href: '/admin/refunds',
        icon: ReceiptText,
      },
    ],
  },
  {
    label: 'Airport Services',
    items: [
      {
        title: 'Check-ins',
        href: '/admin/check-ins',
        icon: ScanLine,
      },
      {
        title: 'Boarding',
        href: '/admin/boarding',
        icon: ShieldCheck,
      },
      {
        title: 'Baggage',
        href: '/admin/baggage',
        icon: Wrench,
      },
    ],
  },
  {
    label: 'Management',
    items: [
      {
        title: 'Users',
        href: '/admin/users',
        icon: UserRound,
      },
      {
        title: 'Roles & Permissions',
        href: '/admin/roles-permissions',
        icon: KeyRound,
      },
      {
        title: 'Notifications',
        href: '/admin/notifications',
        icon: Bell,
      },
      {
        title: 'Activity Logs',
        href: '/admin/activity-logs',
        icon: History,
      },
      {
        title: 'Settings',
        href: '/admin/settings',
        icon: Settings,
      },
    ],
  },
];

export const adminSupportNavigation = {
  title: 'Help & Support',
  href: '/admin/help',
  icon: HelpCircle,
};
