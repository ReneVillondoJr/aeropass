import Link from 'next/link';
import { Plus } from 'lucide-react';

import { CustomerPageHeader } from '@/components/customer/shared/customer-page-header';

export function BookingsHeader({ customerName }: { customerName: string }) {
  return (
    <CustomerPageHeader
      eyebrow="Your travel workspace"
      title="My bookings"
      description={`Welcome back, ${customerName}. Review your reservations, check payment status, and open any trip for its full itinerary.`}
      actions={
        <Link
          href="/search"
          className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl bg-[#102A43] px-4 py-2 text-xs font-semibold text-white outline-none transition hover:bg-[#183F5D] focus-visible:ring-2 focus-visible:ring-[#5BA9D6] focus-visible:ring-offset-2"
        >
          <Plus className="size-4" aria-hidden="true" />
          Book a flight
        </Link>
      }
    />
  );
}
