import { CustomerProfileModule } from '@/modules/customer/profile';

const DEMO_CUSTOMER_ID = 'user-006';

export default function CustomerProfilePage() {
  return <CustomerProfileModule customerId={DEMO_CUSTOMER_ID} />;
}
