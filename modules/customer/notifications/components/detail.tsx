import {
  BellRing,
  CalendarDays,
  CheckCircle2,
  CircleDot,
  Clock3,
} from 'lucide-react';

import {
  formatNotificationDate,
  getNotificationCategoryLabel,
} from '../data/notification';

import { NotificationIcon } from './icon';

import type { CustomerNotification } from '../types/notification';

interface NotificationDetailProps {
  notification: CustomerNotification | null;
}

export function NotificationDetail({ notification }: NotificationDetailProps) {
  if (!notification) {
    return (
      <aside className='flex min-h-[320px] flex-col items-center justify-center rounded-2xl border border-border/70 bg-card p-6 text-center shadow-sm xl:sticky xl:top-6'>
        <div className='flex size-14 items-center justify-center rounded-2xl bg-[#EEF7FB] text-[#102A43]'>
          <BellRing className='size-6' />
        </div>

        <h2 className='mt-4 text-sm font-semibold'>Notification details</h2>

        <p className='mt-2 max-w-xs text-xs leading-5 text-muted-foreground'>
          Select a notification to view its complete message and details.
        </p>
      </aside>
    );
  }

  return (
    <aside className='min-w-0 rounded-2xl border border-border/70 bg-card p-5 shadow-sm xl:sticky xl:top-6 xl:max-h-[760px] xl:overflow-y-auto'>
      <div className='flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#2879A8]'>
        <CircleDot className='size-3.5' />
        Notification details
      </div>

      <div className='mt-5 flex items-start gap-3'>
        <NotificationIcon type={notification.type} className='size-12' />

        <div className='min-w-0 flex-1'>
          <h2 className='text-base font-semibold leading-6'>
            {notification.title}
          </h2>

          <p className='mt-1 text-xs text-muted-foreground'>
            {getNotificationCategoryLabel(notification.type)}
          </p>
        </div>
      </div>

      <div className='mt-5 rounded-xl border border-border/70 bg-muted/20 p-4'>
        <p className='whitespace-pre-wrap text-sm leading-7 text-foreground'>
          {notification.message}
        </p>
      </div>

      <div className='mt-5 space-y-4'>
        <DetailItem
          icon={CalendarDays}
          label='Received'
          value={formatNotificationDate(notification.createdAt)}
        />

        <DetailItem
          icon={BellRing}
          label='Category'
          value={getNotificationCategoryLabel(notification.type)}
        />

        <DetailItem
          icon={Clock3}
          label='Status'
          value={notification.read ? 'Read' : 'Unread'}
        />
      </div>

      <div className='mt-5 flex items-start gap-2 rounded-xl bg-[#EEF7FB] p-3 text-[#102A43]'>
        <CheckCircle2 className='mt-0.5 size-4 shrink-0' />

        <p className='text-xs leading-5'>
          This notification is linked to your customer account.
        </p>
      </div>
    </aside>
  );
}

function DetailItem({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof CalendarDays;
  label: string;
  value: string;
}) {
  return (
    <div className='flex items-start gap-3'>
      <div className='flex size-9 shrink-0 items-center justify-center rounded-xl bg-muted/70'>
        <Icon className='size-4 text-muted-foreground' />
      </div>

      <div className='min-w-0 flex-1'>
        <p className='text-[10px] font-medium uppercase tracking-[0.12em] text-muted-foreground'>
          {label}
        </p>

        <p className='mt-1 break-words text-xs font-semibold text-foreground'>
          {value}
        </p>
      </div>
    </div>
  );
}
