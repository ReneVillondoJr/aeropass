import { aeroPassCustomerRepository } from '@/data/aeropass';
import { CustomerRefundsModule } from '@/modules/customer/refunds';

export const dynamic = 'force-dynamic';

// Local demo only. Replace with the authenticated session's customer ID.
const DEMO_CUSTOMER_ID = 'user-006';

export default async function CustomerRefundsPage() {
  const initialRefunds =
    await aeroPassCustomerRepository.refunds(DEMO_CUSTOMER_ID);

  return <CustomerRefundsModule initialRefunds={initialRefunds} />;
}
