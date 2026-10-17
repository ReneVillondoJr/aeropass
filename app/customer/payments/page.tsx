import { CustomerPaymentsModule } from '@/modules/customer/payments';

const DEMO_CUSTOMER_ID = 'user-006';

export default function CustomerPaymentsPage() {
  return <CustomerPaymentsModule customerId={DEMO_CUSTOMER_ID} />;
}
