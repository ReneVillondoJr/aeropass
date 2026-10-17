import { CustomerPaymentDetailsModule } from '@/modules/customer/payment-details';

interface CustomerPaymentDetailsPageProps {
  params: Promise<{ paymentId: string }>;
}

const DEMO_CUSTOMER_ID = 'user-006';

export default async function CustomerPaymentDetailsPage({
  params,
}: CustomerPaymentDetailsPageProps) {
  const { paymentId } = await params;

  return (
    <CustomerPaymentDetailsModule
      customerId={DEMO_CUSTOMER_ID}
      paymentId={paymentId}
    />
  );
}
