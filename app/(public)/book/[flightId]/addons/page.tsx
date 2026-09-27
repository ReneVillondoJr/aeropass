import { Addons } from '@/modules/booking/addons';

export default async function AddonsPage({
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

  return <Addons flightId={flightId} fareId={fare ?? ''} />;
}
