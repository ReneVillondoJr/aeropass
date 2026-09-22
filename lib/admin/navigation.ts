import type { AdminNavigationItem } from '@/types/sidebar';

import { adminNavigationGroups } from '@/components/admin/layout/config/side-nav';

export function isAdminRouteActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function getAdminNavigationItem(
  pathname: string,
): AdminNavigationItem | undefined {
  return adminNavigationGroups
    .flatMap((group) => group.items)
    .find((item) => isAdminRouteActive(pathname, item.href));
}

export function getAdminPageTitle(pathname: string) {
  return getAdminNavigationItem(pathname)?.title ?? 'Dashboard';
}

export function getAdminBreadcrumb(pathname: string) {
  const item = getAdminNavigationItem(pathname);

  if (!item) {
    return null;
  }

  return {
    title: item.title,
    href: item.href,
  };
}
