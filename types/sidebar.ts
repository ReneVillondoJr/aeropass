import type { LucideIcon } from 'lucide-react';

export type AdminNavigationItem = {
  title: string;
  href: string;
  icon: LucideIcon;
};

export type AdminNavigationGroup = {
  label: string;
  items: AdminNavigationItem[];
};
