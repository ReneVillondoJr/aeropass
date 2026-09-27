import { SeatSelection } from '@/modules/booking/seat-selection';

interface SeatsPageProps {
  params: Promise<{
    flightId: string;
  }>;
  searchParams: Promise<{
    fare?: string;
  }>;
}

export default async function SeatsPage({
  params,
  searchParams,
}: SeatsPageProps) {
  const { flightId } = await params;

  const { fare } = await searchParams;

  return <SeatSelection flightId={flightId} fareId={fare ?? ''} />;
}
