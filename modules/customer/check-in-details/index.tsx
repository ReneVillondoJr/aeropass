import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

import { CustomerEmptyState } from '@/components/customer/shared/empty-state';
import { CustomerPageHeader } from '@/components/customer/shared/customer-page-header';

import { getCustomerCheckInDetailView } from '../check-in/data/check-in-view';
import { CheckInFlightOverview } from './components/check-in-flight-overview';
import { CheckInWorkflow } from './components/check-in-workflow';

interface CustomerCheckInDetailsModuleProps {
  customerId: string;
  bookingId: string;
}

export function CustomerCheckInDetailsModule({ customerId, bookingId }: CustomerCheckInDetailsModuleProps) {
  const detail = getCustomerCheckInDetailView(customerId, bookingId);

  if (!detail) {
    return (
      <CustomerEmptyState
        title="Booking not available"
        description="We could not find this booking under your customer account. Return to online check-in to review your available ticket records."
        actionLabel="Back to check-in"
        actionHref="/customer/check-in"
      />
    );
  }

  return (
    <section className="space-y-6">
      <Link href="/customer/check-in" className="inline-flex items-center gap-2 rounded-lg px-2 py-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5BA9D6]/50">
        <ArrowLeft className="size-3.5" /> Back to online check-in
      </Link>
      <CustomerPageHeader
        eyebrow="Customer portal / Check-in"
        title="Check-in details"
        description={`Review the flight and passenger details for booking ${detail.bookingReference}. Select a seat for each eligible passenger and confirm the information before continuing.`}
      />
      <CheckInFlightOverview detail={detail} />
      <CheckInWorkflow detail={detail} />
    </section>
  );
}
