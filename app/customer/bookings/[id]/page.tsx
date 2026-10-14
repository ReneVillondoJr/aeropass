import type { Metadata } from 'next';

import { CustomerBookingDetailsModule } from '@/modules/customer/booking-details';

export const metadata: Metadata = {
  title: 'Booking Details',
  description:
    'Review your AeroPass itinerary, passenger details, fare breakdown, and payment status.',
};

/** Replace this local mock ID with the authenticated customer's ID. */
const DEMO_CUSTOMER_ID = 'user-006';

interface CustomerBookingDetailsPageProps {
  params: Promise<{ bookingId: string }>;
}

export default async function CustomerBookingDetailsPage({
  params,
}: CustomerBookingDetailsPageProps) {
  const { bookingId } = await params;

  return (
    <CustomerBookingDetailsModule
      customerId={DEMO_CUSTOMER_ID}
      bookingId={bookingId}
    />
  );
}
