import { notFound } from 'next/navigation';

import { aeroPassCustomerRepository } from '@/data/aeropass';
import { CustomerPassengerDetailsModule } from '@/modules/customer/passenger-details';

interface CustomerPassengerDetailsPageProps {
  params: Promise<{
    passengerId: string;
  }>;
}

export const dynamic = 'force-dynamic';

// Local demo only.
// Replace this with the authenticated customer's ID.
const DEMO_CUSTOMER_ID = 'user-006';

export default async function CustomerPassengerDetailsPage({
  params,
}: CustomerPassengerDetailsPageProps) {
  const { passengerId } = await params;

  const record = await aeroPassCustomerRepository.passengerDetails(
    DEMO_CUSTOMER_ID,
    passengerId,
  );

  if (!record) {
    notFound();
  }

  return <CustomerPassengerDetailsModule record={record} />;
}
