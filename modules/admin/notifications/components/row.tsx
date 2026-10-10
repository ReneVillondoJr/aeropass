import { ArrowRight, Mail, MailOpen, UserRound } from 'lucide-react';

import { Badge } from '@/components/ui/badge';

import { notificationTypeConfig } from './notification-style';

import type { NotificationViewModel } from '../types/notification';

interface NotificationRowProps {
  notification: NotificationViewModel;
  selected: boolean;
  onClick: () => void;
}

function formatDateTime(value: string) {
  return new Intl.DateTimeFormat('en-PH', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(value));
}

export function NotificationRow({
  notification,
  selected,
  onClick,
}: NotificationRowProps) {
  const config = notificationTypeConfig[notification.type];
  const TypeIcon = config.icon;

  return (
    <button
      type='button'
      onClick={onClick}
      aria-pressed={selected}
      className={[
        'group w-full rounded-2xl border p-4 text-left transition',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5BA9D6]/40',
        selected ? 'border-[#5BA9D6]/50 bg-[#E5F5FC]/70 shadow-sm'
        : notification.read ?
          'border-border/70 bg-card hover:border-border hover:bg-muted/20'
        : 'border-[#5BA9D6]/30 bg-[#F4FAFD] hover:border-[#5BA9D6]/50',
      ].join(' ')}
    >
      <div className='flex min-w-0 items-start gap-3'>
        <div
          className={[
            'relative flex size-10 shrink-0 items-center justify-center rounded-xl border',
            selected ?
              'border-[#5BA9D6]/30 bg-white text-[#102A43]'
            : 'border-border/70 bg-background text-muted-foreground',
          ].join(' ')}
        >
          <TypeIcon className='size-4' />

          {!notification.read ?
            <span className='absolute -right-1 -top-1 size-2.5 rounded-full border-2 border-background bg-[#5BA9D6]' />
          : null}
        </div>

        <div className='min-w-0 flex-1'>
          <div className='flex flex-wrap items-start justify-between gap-2'>
            <div className='min-w-0 flex-1'>
              <div className='flex flex-wrap items-center gap-2'>
                <p className='truncate text-sm font-semibold tracking-tight'>
                  {notification.title}
                </p>

                {!notification.read ?
                  <Badge
                    variant='outline'
                    className='border-[#5BA9D6]/40 bg-[#E5F5FC] text-[9px] text-[#102A43]'
                  >
                    Unread
                  </Badge>
                : null}
              </div>

              <p className='mt-1 line-clamp-2 text-xs leading-5 text-muted-foreground'>
                {notification.message}
              </p>
            </div>

            <Badge
              variant='outline'
              className={`shrink-0 text-[10px] ${config.className}`}
            >
              {config.label}
            </Badge>
          </div>

          <div className='mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-border/60 pt-3'>
            <div className='flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1 text-[10px] text-muted-foreground'>
              <span className='inline-flex items-center gap-1.5'>
                <UserRound className='size-3' />
                <span className='max-w-[180px] truncate'>
                  {notification.recipientName}
                </span>
              </span>

              <span className='inline-flex items-center gap-1.5'>
                {notification.read ?
                  <MailOpen className='size-3' />
                : <Mail className='size-3' />}

                {notification.read ? 'Read' : 'Unread'}
              </span>
            </div>

            <div className='flex shrink-0 items-center gap-2 text-[10px] text-muted-foreground'>
              <span>{formatDateTime(notification.createdAt)}</span>

              <ArrowRight className='size-3.5 transition-transform group-hover:translate-x-0.5' />
            </div>
          </div>
        </div>
      </div>
    </button>
  );
}
