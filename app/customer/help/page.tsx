import { CustomerHelpSupportModule } from '@/modules/customer/help-support';

const DEMO_CUSTOMER_ID = 'user-006';

export default function CustomerHelpSupportPage() {
  return <CustomerHelpSupportModule customerId={DEMO_CUSTOMER_ID} />;
}
