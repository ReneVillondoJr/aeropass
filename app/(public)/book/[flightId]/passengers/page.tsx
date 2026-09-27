import { PassengerDetails } from '@/modules/booking/passenger-details';

export default async function PassengersPage({
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

  return <PassengerDetails flightId={flightId} fareId={fare ?? ''} />;
}
