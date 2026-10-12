import Link from 'next/link';
import {
  ArrowRight,
  Bell,
  CalendarClock,
  CheckCircle2,
  CreditCard,
  Plane,
  ShieldCheck,
  Ticket,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import type {
  DashboardNotificationType,
  DashboardNotificationView,
} from '../types/customer-dashboard';

interface RecentNotificationsProps {
  notifications: DashboardNotificationView[];
  unreadCount: number;
}

const notificationIcons: Record<DashboardNotificationType, LucideIcon> = {
  BOOKING: CalendarClock,
  PAYMENT: CreditCard,
  FLIGHT: Plane,
  CHECK_IN: CheckCircle2,
  BOARDING: Ticket,
  SYSTEM: ShieldCheck,
};

const notificationIconStyles: Record<DashboardNotificationType, string> = {
  BOOKING: 'bg-[#EEF7FB] text-[#102A43]',
  PAYMENT: 'bg-amber-50 text-amber-700',
  FLIGHT: 'bg-sky-50 text-sky-700',
  CHECK_IN: 'bg-emerald-50 text-emerald-700',
  BOARDING: 'bg-violet-50 text-violet-700',
  SYSTEM: 'bg-muted text-muted-foreground',
};

function formatNotificationDate(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'Date unavailable';

  return new Intl.DateTimeFormat('en-PH', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    timeZone: 'Asia/Manila',
  }).format(date);
}

export function RecentNotifications({ notifications, unreadCount }: RecentNotificationsProps) {
  return (
    <section className="rounded-2xl border border-border/70 bg-card p-4 shadow-sm sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#2879A8]">Stay informed</p>
          <h2 className="mt-1 text-base font-semibold tracking-tight text-foreground">Recent notifications</h2>
          <p className="mt-1 text-xs leading-5 text-muted-foreground">Booking, payment, and flight updates.</p>
        </div>
        {unreadCount > 0 ? (
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[#EEF7FB] px-2.5 py-1 text-[10px] font-semibold text-[#102A43]">
            <span className="size-1.5 rounded-full bg-[#5BA9D6]" aria-hidden="true" />
            {unreadCount} unread
          </span>
        ) : null}
      </div>

      {notifications.length > 0 ? (
        <div className="mt-4 divide-y divide-border/60">
          {notifications.map((notification) => {
            const Icon = notificationIcons[notification.type];

            return (
              <article key={notification.id} className="flex gap-3 py-3 first:pt-0 last:pb-0">
                <span className={`mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-xl ${notificationIconStyles[notification.type]}`}>
                  <Icon className="size-4" aria-hidden="true" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start gap-2">
                    <h3 className="min-w-0 flex-1 text-xs font-semibold leading-5 text-foreground">{notification.title}</h3>
                    {!notification.read ? (
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-[#2879A8]" aria-label="Unread" />
                    ) : null}
                  </div>
                  <p className="mt-1 text-xs leading-5 text-muted-foreground">{notification.message}</p>
                  <p className="mt-2 text-[10px] font-medium text-muted-foreground/80">
                    {formatNotificationDate(notification.createdAt)}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="mt-4 rounded-xl border border-dashed border-border px-4 py-8 text-center">
          <span className="mx-auto flex size-10 items-center justify-center rounded-xl bg-muted text-muted-foreground">
            <Bell className="size-4" aria-hidden="true" />
          </span>
          <p className="mt-3 text-sm font-semibold text-foreground">You’re all caught up</p>
          <p className="mt-1 text-xs leading-5 text-muted-foreground">New booking and travel updates will appear here.</p>
        </div>
      )}

      <div className="mt-4 border-t border-border/60 pt-3">
        <Link
          href="/customer/notifications"
          className="inline-flex min-h-9 items-center gap-1.5 rounded-lg px-2 py-1 text-xs font-semibold text-[#2879A8] outline-none transition hover:bg-[#EEF7FB] focus-visible:ring-2 focus-visible:ring-[#5BA9D6]"
        >
          Open notifications <ArrowRight className="size-3.5" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
