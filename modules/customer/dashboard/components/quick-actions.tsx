import Link from 'next/link';
import {
  ArrowUpRight,
  BookOpenCheck,
  CreditCard,
  PlaneTakeoff,
  Search,
  Ticket,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface QuickAction {
  label: string;
  description: string;
  href: string;
  icon: LucideIcon;
  count?: number;
}

interface QuickActionsProps {
  pendingPaymentCount: number;
}

export function QuickActions({ pendingPaymentCount }: QuickActionsProps) {
  const actions: QuickAction[] = [
    {
      label: 'Book a flight',
      description: 'Find your next route',
      href: '/search',
      icon: Search,
    },
    {
      label: 'My bookings',
      description: 'Review your reservations',
      href: '/customer/bookings',
      icon: BookOpenCheck,
    },
    {
      label: 'My tickets',
      description: 'View issued tickets',
      href: '/customer/tickets',
      icon: Ticket,
    },
    {
      label: 'Check-in',
      description: 'Prepare for departure',
      href: '/customer/check-in',
      icon: PlaneTakeoff,
    },
    {
      label: 'Payments',
      description: pendingPaymentCount > 0 ? 'Payment needs attention' : 'Review payment history',
      href: '/customer/payments',
      icon: CreditCard,
      count: pendingPaymentCount,
    },
  ];

  return (
    <section className="rounded-2xl border border-border/70 bg-card p-4 shadow-sm sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#2879A8]">Shortcuts</p>
          <h2 className="mt-1 text-base font-semibold tracking-tight text-foreground">Quick actions</h2>
          <p className="mt-1 text-xs leading-5 text-muted-foreground">Jump straight to what you need.</p>
        </div>
        <span className="flex size-9 items-center justify-center rounded-xl bg-[#EEF7FB] text-[#102A43]">
          <ArrowUpRight className="size-4" aria-hidden="true" />
        </span>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-1">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <Link
              key={action.href}
              href={action.href}
              className="group flex min-w-0 items-center gap-3 rounded-xl border border-border/60 bg-background px-3 py-3 outline-none transition hover:border-[#B8DDEE] hover:bg-[#F7FBFE] focus-visible:ring-2 focus-visible:ring-[#5BA9D6] focus-visible:ring-offset-2"
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-muted text-muted-foreground transition group-hover:bg-[#E5F5FC] group-hover:text-[#102A43]">
                <Icon className="size-4" aria-hidden="true" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <span>{action.label}</span>
                  {action.count && action.count > 0 ? (
                    <span className="inline-flex min-w-5 items-center justify-center rounded-full bg-amber-100 px-1.5 py-0.5 text-[10px] font-bold text-amber-800">
                      {action.count}
                    </span>
                  ) : null}
                </span>
                <span className="mt-0.5 block text-[11px] leading-4 text-muted-foreground">{action.description}</span>
              </span>
              <ArrowUpRight className="size-3.5 shrink-0 text-muted-foreground transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#2879A8]" aria-hidden="true" />
            </Link>
          );
        })}
      </div>
    </section>
  );
}
