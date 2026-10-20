import { aeroPassCustomerRepository } from '@/data/aeropass';
import { CustomerPassengersModule } from '@/modules/customer/passenger';

export const dynamic = 'force-dynamic';

// Local demo only.
// Replace this with the authenticated customer's ID.
const DEMO_CUSTOMER_ID = 'user-006';

export default async function CustomerPassengersPage() {
  const initialPassengers =
    await aeroPassCustomerRepository.passengers(DEMO_CUSTOMER_ID);

  return <CustomerPassengersModule initialPassengers={initialPassengers} />;
}
