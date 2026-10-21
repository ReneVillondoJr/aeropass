import { ArrowUpRight, Clock3 } from 'lucide-react';

import {
  formatNotificationDate,
  getNotificationCategoryLabel,
} from '../data/notification';

import { NotificationIcon } from './icon';

import type { CustomerNotification } from '../types/notification';

interface NotificationRowProps {
  notification: CustomerNotification;
  selected: boolean;
  onSelect: (notification: CustomerNotification) => void;
}

export function NotificationRow({
  notification,
  selected,
  onSelect,
}: NotificationRowProps) {
  return (
    <button
      type='button'
      onClick={() => onSelect(notification)}
      aria-pressed={selected}
      className={[
        'group flex w-full items-start gap-3 rounded-2xl border p-4 text-left transition sm:gap-4',
        selected ?
          'border-[#5BA9D6] bg-[#EEF7FB]/70 shadow-sm'
        : 'border-border/70 bg-card hover:border-[#5BA9D6]/60 hover:bg-muted/30',
        !notification.read ? 'bg-sky-50/30' : '',
      ].join(' ')}
    >
      <NotificationIcon type={notification.type} />

      <div className='min-w-0 flex-1'>
        <div className='flex flex-wrap items-center gap-2'>
          <h3 className='text-sm font-semibold text-foreground'>
            {notification.title}
          </h3>

          {!notification.read && (
            <span
              className='size-2 rounded-full bg-[#2879A8]'
              aria-label='Unread'
            />
          )}
        </div>

        <p className='mt-1 line-clamp-2 text-xs leading-5 text-muted-foreground'>
          {notification.message}
        </p>

        <div className='mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] text-muted-foreground'>
          <span className='font-medium'>
            {getNotificationCategoryLabel(notification.type)}
          </span>

          <span className='inline-flex items-center gap-1'>
            <Clock3 className='size-3' />
            {formatNotificationDate(notification.createdAt)}
          </span>
        </div>
      </div>

      <ArrowUpRight className='mt-1 size-4 shrink-0 text-muted-foreground transition group-hover:text-[#2879A8]' />
    </button>
  );
}
