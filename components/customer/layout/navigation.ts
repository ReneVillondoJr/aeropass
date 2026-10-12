import type { LucideIcon } from 'lucide-react';
import {
  Bell,
  CalendarDays,
  CircleHelp,
  CreditCard,
  LayoutDashboard,
  PlaneTakeoff,
  RotateCcw,
  Search,
  Ticket,
  UserRound,
  UsersRound,
} from 'lucide-react';

export type CustomerNavigationGroup = 'Overview' | 'Travel' | 'Account';

export interface CustomerNavigationItem {
  title: string;
  href: string;
  icon: LucideIcon;
  group: CustomerNavigationGroup;
  exact?: boolean;
}

export const customerNavigation: CustomerNavigationItem[] = [
  {
    title: 'Dashboard',
    href: '/customer/dashboard',
    icon: LayoutDashboard,
    group: 'Overview',
  },
  {
    title: 'Book a Flight',
    href: '/',
    icon: Search,
    group: 'Travel',
    exact: true,
  },
  {
    title: 'My Bookings',
    href: '/customer/bookings',
    icon: CalendarDays,
    group: 'Travel',
  },
  {
    title: 'My Tickets',
    href: '/customer/tickets',
    icon: Ticket,
    group: 'Travel',
  },
  {
    title: 'Check-in',
    href: '/customer/check-in',
    icon: PlaneTakeoff,
    group: 'Travel',
  },
  {
    title: 'Payments',
    href: '/customer/payments',
    icon: CreditCard,
    group: 'Travel',
  },
  {
    title: 'Refunds',
    href: '/customer/refunds',
    icon: RotateCcw,
    group: 'Travel',
  },
  {
    title: 'Passengers',
    href: '/customer/passengers',
    icon: UsersRound,
    group: 'Account',
  },
  {
    title: 'Notifications',
    href: '/customer/notifications',
    icon: Bell,
    group: 'Account',
  },
  {
    title: 'My Profile',
    href: '/customer/profile',
    icon: UserRound,
    group: 'Account',
  },
  {
    title: 'Help & Support',
    href: '/customer/help',
    icon: CircleHelp,
    group: 'Account',
  },
];

export function isCustomerNavigationItemActive(
  pathname: string,
  item: CustomerNavigationItem,
): boolean {
  if (item.exact) {
    return pathname === item.href;
  }

  return pathname === item.href || pathname.startsWith(`${item.href}/`);
}
