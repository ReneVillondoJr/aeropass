import { CustomerNotificationsModule } from '@/modules/customer/notifications';

const DEMO_CUSTOMER_ID = 'user-006';

export default function CustomerNotificationsPage() {
  return <CustomerNotificationsModule customerId={DEMO_CUSTOMER_ID} />;
}
