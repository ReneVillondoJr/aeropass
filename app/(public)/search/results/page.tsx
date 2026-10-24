import { PublicSearch } from '@/modules/flight-results';
import type { SearchPageProps } from '@/modules/flight-results/types/search';

export default async function SearchResultsPage({
  searchParams,
}: SearchPageProps) {
  const params = await searchParams;

  return (
    <PublicSearch
      initialFrom={params.from ?? ''}
      initialTo={params.to ?? ''}
      initialDepartureDate={params.departureDate ?? ''}
    />
  );
}