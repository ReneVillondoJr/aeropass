import type { Metadata } from 'next';

import { CustomerTicketDetailsModule } from '@/modules/customer/ticket-details';

export const metadata: Metadata = {
  title: 'Ticket Details',
  description: 'Review your AeroPass ticket, itinerary, and passenger details.',
};

interface CustomerTicketDetailsPageProps {
  params: Promise<{ ticketId: string }>;
}

export default async function CustomerTicketDetailsPage({
  params,
}: CustomerTicketDetailsPageProps) {
  const { ticketId } = await params;

  return (
    <CustomerTicketDetailsModule customerId='user-006' ticketId={ticketId} />
  );
}
