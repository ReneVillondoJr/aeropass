import type { Metadata } from 'next';

import { flights } from '@/data/aeropass';
import { PublicFlight } from '@/modules/flight-details';

interface FlightPageProps {
  params: Promise<{
    id: string;
  }>;
}

export function generateStaticParams() {
  return flights.map((flight) => ({
    id: flight.id,
  }));
}

export async function generateMetadata({
  params,
}: FlightPageProps): Promise<Metadata> {
  const { id } = await params;

  const flight = flights.find((item) => item.id === id);

  return {
    title: flight ? `${flight.flightNumber} | AeroPass` : 'Flight | AeroPass',
    description:
      flight ?
        `View flight details, fares, schedule, and booking options for ${flight.flightNumber}.`
      : 'View AeroPass flight details.',
  };
}

export default async function FlightPage({ params }: FlightPageProps) {
  const { id } = await params;

  return <PublicFlight flightId={id} />;
}
