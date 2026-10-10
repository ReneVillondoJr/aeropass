import { BellRing, CheckCheck, Inbox, UsersRound } from 'lucide-react';

import type { NotificationStats } from '../types/notification';

interface NotificationsHeaderProps {
  stats: NotificationStats;
}

export function NotificationsHeader({ stats }: NotificationsHeaderProps) {
  return (
    <section className='overflow-hidden rounded-[1.75rem] bg-[#102A43] text-white shadow-sm'>
      <div className='relative px-6 py-7 sm:px-8'>
        <div className='absolute -right-16 -top-20 size-48 rounded-full bg-[#5BA9D6]/10 blur-3xl' />
        <div className='absolute -bottom-24 left-1/3 size-56 rounded-full bg-white/5 blur-3xl' />

        <div className='relative flex flex-col gap-7'>
          <div className='flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between'>
            <div className='max-w-2xl'>
              <div className='mb-3 flex items-center gap-2 text-[#9FD5EE]'>
                <BellRing className='size-4' />

                <span className='text-[11px] font-semibold uppercase tracking-[0.18em]'>
                  Communication Center
                </span>
              </div>

              <h1 className='text-2xl font-semibold tracking-tight sm:text-3xl'>
                Notifications
              </h1>

              <p className='mt-2 max-w-xl text-sm leading-6 text-white/65'>
                Review booking updates, payment alerts, flight announcements,
                and operational notifications across AeroPass accounts.
              </p>
            </div>

            <div className='flex flex-wrap items-center gap-2 text-xs text-white/60'>
              <div className='flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2'>
                <Inbox className='size-3.5' />
                {stats.total} notifications
              </div>

              <div className='flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2'>
                <BellRing className='size-3.5' />
                {stats.unread} unread
              </div>
            </div>
          </div>

          <div className='grid gap-2 sm:grid-cols-3'>
            <div className='rounded-2xl border border-white/10 bg-white/5 p-4'>
              <div className='flex items-center gap-2 text-xs text-white/50'>
                <Inbox className='size-3.5' />
                Total notifications
              </div>

              <p className='mt-2 text-xl font-semibold'>{stats.total}</p>

              <p className='mt-1 text-[11px] text-white/45'>
                All recorded notification entries
              </p>
            </div>

            <div className='rounded-2xl border border-white/10 bg-white/5 p-4'>
              <div className='flex items-center gap-2 text-xs text-white/50'>
                <BellRing className='size-3.5' />
                Unread
              </div>

              <p className='mt-2 text-xl font-semibold'>{stats.unread}</p>

              <p className='mt-1 text-[11px] text-white/45'>
                Notifications not marked as read
              </p>
            </div>

            <div className='rounded-2xl border border-white/10 bg-white/5 p-4'>
              <div className='flex items-center gap-2 text-xs text-white/50'>
                <UsersRound className='size-3.5' />
                Recipients
              </div>

              <p className='mt-2 text-xl font-semibold'>{stats.recipients}</p>

              <p className='mt-1 text-[11px] text-white/45'>
                Unique accounts represented
              </p>
            </div>
          </div>

          <div className='flex items-center gap-2 border-t border-white/10 pt-4 text-[11px] text-white/50'>
            <CheckCheck className='size-3.5 text-[#9FD5EE]' />
            Notification activity overview
          </div>
        </div>
      </div>
    </section>
  );
}
