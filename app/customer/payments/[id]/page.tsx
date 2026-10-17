import { CustomerPaymentDetailsModule } from '@/modules/customer/payment-details';

interface CustomerPaymentDetailsPageProps {
  params: Promise<{ id: string }>;
}

export default async function CustomerPaymentDetailsPage({
  params,
}: CustomerPaymentDetailsPageProps) {
  const { id } = await params;

  return <CustomerPaymentDetailsModule paymentId={id} />;
}
