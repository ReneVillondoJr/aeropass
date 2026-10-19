import { notFound } from 'next/navigation';

import { aeroPassCustomerRepository } from '@/data/aeropass';
import { CustomerRefundDetailsModule } from '@/modules/customer/refund-details';

interface CustomerRefundDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export const dynamic = 'force-dynamic';

// Local demo only. Replace with the authenticated session's customer ID.
const DEMO_CUSTOMER_ID = 'user-006';

export default async function CustomerRefundDetailsPage({
  params,
}: CustomerRefundDetailsPageProps) {
  const { id } = await params;

  const refund = await aeroPassCustomerRepository.refundDetails(
    DEMO_CUSTOMER_ID,
    id,
  );

  if (!refund) {
    notFound();
  }

  return <CustomerRefundDetailsModule refund={refund} />;
}
