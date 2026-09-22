'use client';

import { usePathname } from 'next/navigation';

import {
  getAdminBreadcrumb,
  getAdminPageTitle,
  getAdminNavigationItem,
} from '@/lib/admin/navigation';

export function useAdminNavigation() {
  const pathname = usePathname();

  return {
    pathname,
    activeItem: getAdminNavigationItem(pathname),
    pageTitle: getAdminPageTitle(pathname),
    breadcrumb: getAdminBreadcrumb(pathname),
  };
}
