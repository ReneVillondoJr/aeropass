'use client';

import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { usePathname } from 'next/navigation';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

const segmentLabels: Record<string, string> = {
  dashboard: 'Dashboard',
  bookings: 'My Bookings',
  tickets: 'My Tickets',
  'check-in': 'Check-in',
  payments: 'Payments',
  refunds: 'Refunds',
  passengers: 'Passengers',
  notifications: 'Notifications',
  profile: 'My Profile',
  help: 'Help & Support',
  faq: 'FAQs',
  contact: 'Contact Support',
};

const detailLabels: Record<string, string> = {
  bookings: 'Booking details',
  tickets: 'Ticket details',
  payments: 'Payment details',
  refunds: 'Refund details',
  passengers: 'Passenger details',
  'check-in': 'Check-in details',
};

function buildBreadcrumbs(pathname: string): BreadcrumbItem[] {
  const segments = pathname.split('/').filter(Boolean);
  const customerIndex = segments.indexOf('customer');
  const customerSegments = customerIndex >= 0 ? segments.slice(customerIndex + 1) : segments;

  if (customerSegments.length === 0 || customerSegments[0] === 'dashboard') {
    return [{ label: 'Dashboard' }];
  }

  const breadcrumbs: BreadcrumbItem[] = [
    { label: 'Dashboard', href: '/customer/dashboard' },
  ];
  let cumulativePath = '/customer';

  customerSegments.forEach((segment, index) => {
    cumulativePath += `/${segment}`;
    const previousSegment = customerSegments[index - 1];
    const isLikelyId = Boolean(
      previousSegment && previousSegment in detailLabels && !segmentLabels[segment],
    );
    const label = isLikelyId && previousSegment
      ? detailLabels[previousSegment] ?? 'Details'
      : segmentLabels[segment] ?? 'Details';
    const isLast = index === customerSegments.length - 1;

    // IDs should not become part of the visible breadcrumb or the clickable URL label.
    if (isLikelyId) {
      breadcrumbs.push({ label });
      return;
    }

    breadcrumbs.push({ label, href: isLast ? undefined : cumulativePath });
  });

  return breadcrumbs;
}

export function CustomerBreadcrumbs() {
  const pathname = usePathname();
  const items = buildBreadcrumbs(pathname);

  return (
    <nav aria-label="Breadcrumb" className="min-w-0">
      <ol className="flex min-w-0 items-center gap-1.5 text-xs sm:text-sm">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={`${item.label}-${index}`} className="flex min-w-0 items-center gap-1.5">
              {index > 0 ? (
                <ChevronRight className="size-3.5 shrink-0 text-muted-foreground/70" aria-hidden="true" />
              ) : null}
              {item.href ? (
                <Link
                  href={item.href}
                  className="inline-flex min-w-0 items-center gap-1.5 text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:underline"
                >
                  {index === 0 ? <Home className="size-3.5 shrink-0" aria-hidden="true" /> : null}
                  <span className="truncate">{item.label}</span>
                </Link>
              ) : (
                <span
                  aria-current={isLast ? 'page' : undefined}
                  className={[
                    'truncate font-semibold',
                    isLast ? 'text-foreground' : 'text-muted-foreground',
                  ].join(' ')}
                >
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
