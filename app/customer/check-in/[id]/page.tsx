import { CustomerCheckInDetailsModule } from '@/modules/customer/check-in-details';

interface CustomerCheckInDetailsPageProps {
  params: Promise<{ bookingId: string }>;
}

export default async function CustomerCheckInDetailsPage({
  params,
}: CustomerCheckInDetailsPageProps) {
  const { bookingId } = await params;

  return (
    <CustomerCheckInDetailsModule customerId='user-006' bookingId={bookingId} />
  );
}
