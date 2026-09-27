import type { ReactNode } from 'react';

import { BookingProvider } from '@/modules/bookings/components/booking-provider';

interface BookingLayoutProps {
  children: ReactNode;
  params: Promise<{
    flightId: string;
  }>;
}

export default async function BookingLayout({
  children,
  params,
}: BookingLayoutProps) {
  const { flightId } = await params;

  return <BookingProvider flightId={flightId}>{children}</BookingProvider>;
}
