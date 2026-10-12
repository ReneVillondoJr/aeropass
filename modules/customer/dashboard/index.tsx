'use client';

import { useSyncExternalStore } from 'react';
import { AlertCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';

import { CustomerEmptyState } from '@/components/customer/shared/empty-state';
import { getLocalSession } from '@/modules/auth/services/local-auth';

import { DashboardStats } from './components/dashboard-stats';
import { QuickActions } from './components/quick-actions';
import { RecentBookings } from './components/recent-bookings';
import { RecentNotifications } from './components/recent-notifications';
import { UpcomingTripCard } from './components/upcoming-trip-card';
import { WelcomeHeader } from './components/welcome-header';
import { getCustomerDashboardView } from './data/dashboard-view';

function subscribeToSessionChanges(onChange: () => void) {
  window.addEventListener('storage', onChange);

  return () => window.removeEventListener('storage', onChange);
}

function getCustomerIdSnapshot() {
  const session = getLocalSession();
  return session?.role === 'CUSTOMER' ? session.userId : null;
}

function getServerCustomerIdSnapshot() {
  return null;
}

export function CustomerDashboardModule() {
  const customerId = useSyncExternalStore(
    subscribeToSessionChanges,
    getCustomerIdSnapshot,
    getServerCustomerIdSnapshot,
  );

  if (!customerId) {
    return (
      <section className='space-y-6'>
        <CustomerEmptyState
          title='Customer account unavailable'
          description='We couldn’t load a valid active customer account for this dashboard. Sign in with your customer account and try again.'
          icon={AlertCircle}
          actionLabel='Return to sign in'
          actionHref='/login'
        />
      </section>
    );
  }

  const dashboard = getCustomerDashboardView(customerId);

  if (!dashboard.accountAvailable) {
    return (
      <section className='space-y-6'>
        <CustomerEmptyState
          title='Customer account unavailable'
          description='We couldn’t load a valid active customer account for this dashboard. Sign in with your customer account and try again.'
          icon={AlertCircle}
          actionLabel='Return to sign in'
          actionHref='/login'
        />
      </section>
    );
  }

  return (
    <section className='space-y-6'>
      <WelcomeHeader
        customerName={dashboard.customerName}
        upcomingTripCount={
          dashboard.stats.find((stat) => stat.id === 'upcoming-trips')?.value ??
          0
        }
        unreadNotificationCount={dashboard.unreadNotificationCount}
      />

      <DashboardStats stats={dashboard.stats} />

      {dashboard.pendingPaymentCount > 0 ?
        <section className='flex flex-col gap-3 rounded-2xl border border-amber-200 bg-amber-50/80 p-4 sm:flex-row sm:items-center sm:justify-between sm:px-5'>
          <div className='flex min-w-0 items-start gap-3'>
            <span className='flex size-9 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-800'>
              <AlertCircle className='size-4' aria-hidden='true' />
            </span>
            <div className='min-w-0'>
              <h2 className='text-sm font-semibold text-amber-950'>
                {dashboard.pendingPaymentCount === 1 ?
                  'A payment needs your attention'
                : `${dashboard.pendingPaymentCount} payments need your attention`
                }
              </h2>
              <p className='mt-1 text-xs leading-5 text-amber-900/80'>
                Pending amount:{' '}
                {new Intl.NumberFormat('en-PH', {
                  style: 'currency',
                  currency: 'PHP',
                  maximumFractionDigits: 2,
                }).format(dashboard.pendingPaymentAmount)}
                . Review your booking payment status before your reservation
                expires.
              </p>
            </div>
          </div>
          <Link
            href='/customer/payments'
            className='inline-flex min-h-10 shrink-0 items-center justify-center gap-2 rounded-xl border border-amber-300 bg-white px-3.5 py-2 text-xs font-semibold text-amber-950 outline-none transition hover:bg-amber-100 focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2'
          >
            Review payments{' '}
            <ArrowRight className='size-3.5' aria-hidden='true' />
          </Link>
        </section>
      : null}

      <div className='grid min-w-0 gap-6 xl:grid-cols-[minmax(0,1.18fr)_minmax(320px,0.82fr)]'>
        <div className='min-w-0 space-y-6'>
          <UpcomingTripCard trip={dashboard.upcomingTrip} />
          <RecentBookings bookings={dashboard.recentBookings} />
        </div>

        <div className='min-w-0 space-y-6'>
          <QuickActions pendingPaymentCount={dashboard.pendingPaymentCount} />
          <RecentNotifications
            notifications={dashboard.recentNotifications}
            unreadCount={dashboard.unreadNotificationCount}
          />
        </div>
      </div>
    </section>
  );
}
