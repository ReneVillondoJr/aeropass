import { Checkout } from '@/modules/booking/checkout';

interface CheckoutPageProps {
  params: Promise<{ flightId: string }>;
  searchParams: Promise<{ fare?: string }>;
}

export default async function CheckoutPage({
  params,
  searchParams,
}: CheckoutPageProps) {
  const { flightId } = await params;
  const { fare } = await searchParams;

  return <Checkout flightId={flightId} fareId={fare ?? ''} />;
}