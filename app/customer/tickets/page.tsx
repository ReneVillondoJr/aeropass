import type { Metadata } from 'next';

import { CustomerTicketsModule } from '@/modules/customer/tickets';

export const metadata: Metadata = {
  title: 'My Tickets',
  description:
    'View your AeroPass flight tickets, ticket status, and boarding-pass availability.',
};

export default function CustomerTicketsPage() {
  return <CustomerTicketsModule />;
}
