import { CustomerCheckInDetailsModule } from '@/modules/customer/check-in-details';

interface CustomerCheckInDetailsPageProps {
  params: Promise<{ id: string }>;
}

export default async function CustomerCheckInDetailsPage({
  params,
}: CustomerCheckInDetailsPageProps) {
  const { id } = await params;

  return <CustomerCheckInDetailsModule bookingId={id} />;
}
