import { Bell } from 'lucide-react';

import { NotificationEmptyState } from './empty-state';
import { NotificationRow } from './row';

import type { CustomerNotification } from '../types/notification';

interface NotificationListProps {
  notifications: CustomerNotification[];
  selectedId: string | null;
  hasFilters: boolean;
  onSelect: (notification: CustomerNotification) => void;
}

export function NotificationList({
  notifications,
  selectedId,
  hasFilters,
  onSelect,
}: NotificationListProps) {
  return (
    <section className='min-w-0 rounded-2xl border border-border/70 bg-card p-4 shadow-sm sm:p-5'>
      <div className='mb-4 flex items-center justify-between gap-3'>
        <div>
          <h2 className='text-sm font-semibold'>Your notifications</h2>
          <p className='mt-1 text-xs text-muted-foreground'>
            Updates associated with your account.
          </p>
        </div>

        <div className='flex size-9 items-center justify-center rounded-xl bg-muted/70'>
          <Bell className='size-4 text-muted-foreground' />
        </div>
      </div>

      {notifications.length === 0 ?
        <NotificationEmptyState hasFilters={hasFilters} />
      : <div className='max-h-[640px] space-y-3 overflow-y-auto overscroll-contain pr-1'>
          {notifications.map((notification) => (
            <NotificationRow
              key={notification.id}
              notification={notification}
              selected={selectedId === notification.id}
              onSelect={onSelect}
            />
          ))}
        </div>
      }
    </section>
  );
}
