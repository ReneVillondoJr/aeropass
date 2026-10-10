import { Inbox } from 'lucide-react';

import type { NotificationViewModel } from '../types/notification';

import { NotificationRow } from './row';

interface NotificationsListProps {
  notifications: NotificationViewModel[];
  selectedId: string | null;
  onSelect: (notification: NotificationViewModel) => void;
}

export function NotificationsList({
  notifications,
  selectedId,
  onSelect,
}: NotificationsListProps) {
  return (
    <section className='min-w-0 rounded-[1.5rem] border border-border/70 bg-card p-4 shadow-sm sm:p-5'>
      <div className='mb-4 flex items-center justify-between gap-4'>
        <div>
          <h2 className='text-sm font-semibold tracking-tight'>
            Notification inbox
          </h2>

          <p className='mt-1 text-xs text-muted-foreground'>
            Review message content, recipients, and delivery-related status.
          </p>
        </div>

        <div className='flex size-9 shrink-0 items-center justify-center rounded-xl bg-muted/50'>
          <Inbox className='size-4 text-muted-foreground' />
        </div>
      </div>

      {notifications.length > 0 ?
        <div className='max-h-[640px] overflow-y-auto overscroll-contain pr-1'>
          <div className='grid min-w-0 gap-3'>
            {notifications.map((notification) => (
              <NotificationRow
                key={notification.id}
                notification={notification}
                selected={notification.id === selectedId}
                onClick={() => onSelect(notification)}
              />
            ))}
          </div>
        </div>
      : <div className='flex min-h-64 flex-col items-center justify-center rounded-2xl border border-dashed border-border/70 bg-muted/20 px-6 text-center'>
          <div className='flex size-11 items-center justify-center rounded-xl bg-background'>
            <Inbox className='size-5 text-muted-foreground' />
          </div>

          <h3 className='mt-4 text-sm font-semibold'>No notifications found</h3>

          <p className='mt-1 max-w-sm text-xs leading-5 text-muted-foreground'>
            Try another search term or remove one of the active filters.
          </p>
        </div>
      }
    </section>
  );
}
