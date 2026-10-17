import { CustomerBookingDetailsModule } from '@/modules/customer/booking-details';

interface CustomerBookingDetailsPageProps {
  params: Promise<{ id: string }>;
}

export default async function CustomerBookingDetailsPage({
  params,
}: CustomerBookingDetailsPageProps) {
  const { id } = await params;

  return (
    <CustomerBookingDetailsModule bookingId={id} />
  );
}
