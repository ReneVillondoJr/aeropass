import { SearchX, Ticket as TicketIcon } from 'lucide-react';

import { CustomerEmptyState } from '@/components/customer/shared/empty-state';

import type { CustomerTicketItem } from '../types/ticket';
import { TicketListItem } from './ticket-list-item';

interface TicketListProps {
  tickets: CustomerTicketItem[];
  hasFilters: boolean;
  onReset: () => void;
  totalTickets: number;
}

export function TicketList({ tickets, hasFilters, onReset, totalTickets }: TicketListProps) {
  if (totalTickets === 0) {
    return (
      <CustomerEmptyState
        title="No tickets issued yet"
        description="Once a booking is paid and a ticket is issued, it will appear here. You can review your reservations from My Bookings."
        icon={TicketIcon}
        actionLabel="View my bookings"
        actionHref="/customer/bookings"
      />
    );
  }

  if (tickets.length === 0) {
    return (
      <CustomerEmptyState
        title="No tickets match your filters"
        description="Try a different ticket number, booking reference, passenger, route, or ticket status."
        icon={SearchX}
        actionLabel="Clear filters"
        onAction={onReset}
      />
    );
  }

  return (
    <section className="space-y-3" aria-label="Customer tickets">
      <div className="flex items-center justify-between gap-3 px-1">
        <h2 className="text-sm font-semibold text-foreground">Issued tickets</h2>
        <p className="text-xs text-muted-foreground">Showing {tickets.length} of {totalTickets}</p>
      </div>
      <div className="grid gap-4 xl:grid-cols-2">
        {tickets.map((ticket) => <TicketListItem key={ticket.id} ticket={ticket} />)}
      </div>
    </section>
  );
}
