// app/(public)/book/[flightId]/payment/page.tsx

import { Payment } from '@/modules/booking/payment';

export default async function PaymentPage({
  params,
  searchParams,
}: {
  params: Promise<{
    flightId: string;
  }>;
  searchParams: Promise<{
    fare?: string;
  }>;
}) {
  const { flightId } = await params;

  const { fare } = await searchParams;

  return <Payment flightId={flightId} fareId={fare ?? ''} />;
}
