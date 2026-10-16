import { CustomerBookingDetailsModule } from '@/modules/customer/booking-details';

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
