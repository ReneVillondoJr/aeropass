import { PublicSearch } from '@/modules/flight-results';
import { SearchPageProps } from '@/modules/flight-results/types/search';

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;

  return (
    <PublicSearch
      initialFrom={params.from ?? ''}
      initialTo={params.to ?? ''}
      initialDepartureDate={params.departureDate ?? ''}
    />
  );
}
