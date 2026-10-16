import { CustomerBookingsModule } from '@/modules/customer/bookings';

const DEMO_CUSTOMER_ID = 'user-006';

export default function CustomerBookingsPage() {
  return <CustomerBookingsModule customerId={DEMO_CUSTOMER_ID} />;
}
