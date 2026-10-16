import { ClipboardCheck, Plane } from 'lucide-react';

import { CustomerEmptyState } from '@/components/customer/shared/empty-state';

import { CheckInListItem } from './check-in-list-item';
import type { CustomerCheckInItem } from '../types/check-in';

interface CheckInListProps {
  items: CustomerCheckInItem[];
  accountAvailable: boolean;
  filterIsActive: boolean;
  onResetFilters: () => void;
}

export function CheckInList({ items, accountAvailable, filterIsActive, onResetFilters }: CheckInListProps) {
  if (!accountAvailable) {
    return <CustomerEmptyState title="Customer account unavailable" description="Sign in with an active AeroPass customer account to view your check-in information." icon={ClipboardCheck} actionLabel="View profile" actionHref="/customer/profile" />;
  }

  if (items.length === 0) {
    return (
      <CustomerEmptyState
        title={filterIsActive ? 'No matching check-in records' : 'No eligible check-in records yet'}
        description={filterIsActive ? 'Try another search term or reset the filters to see all ticket records.' : 'Eligible, issued tickets will appear here when online check-in opens. You can still review your previous check-in records from this page.'}
        icon={Plane}
        actionLabel={filterIsActive ? 'Reset filters' : 'Browse my bookings'}
        actionHref={filterIsActive ? undefined : '/customer/bookings'}
        onAction={filterIsActive ? onResetFilters : undefined}
      />
    );
  }

  return (
    <div className="space-y-3">
      {items.map((item) => <CheckInListItem key={item.ticketId} item={item} />)}
    </div>
  );
}
