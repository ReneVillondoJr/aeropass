'use client';

import { useMemo, useState } from 'react';

import { getCustomerTicketsView } from '../data/ticket-view';
import type {
  CustomerTicketDisplayStatus,
  CustomerTicketStatusFilter,
} from '../types/ticket';

export function useCustomerTickets(customerId: string) {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<CustomerTicketStatusFilter>('ALL');
  const view = useMemo(() => getCustomerTicketsView(customerId), [customerId]);

  const counts: Record<CustomerTicketStatusFilter, number> = {
    ALL: view.tickets.length,
    PENDING: view.tickets.filter((ticket) => ticket.displayStatus === 'PENDING').length,
    VALID: view.stats.valid,
    USED: view.stats.used,
    EXPIRED: view.stats.expired,
    CANCELLED: view.stats.cancelled,
    REFUNDED: view.tickets.filter((ticket) => ticket.displayStatus === 'REFUNDED').length,
  };

  const query = search.trim().toLowerCase();
  const filteredTickets = view.tickets.filter((ticket) => {
    const matchesSearch = !query || [
      ticket.ticketNumber,
      ticket.bookingReference,
      ticket.passengerName,
      ticket.flightNumber,
      ticket.originCode,
      ticket.originCity,
      ticket.destinationCode,
      ticket.destinationCity,
      ticket.seatNumber,
    ].some((value) => value.toLowerCase().includes(query));

    const matchesStatus = status === 'ALL' || ticket.displayStatus === (status as CustomerTicketDisplayStatus);
    return matchesSearch && matchesStatus;
  });

  const hasFilters = Boolean(search.trim()) || status !== 'ALL';

  function resetFilters() {
    setSearch('');
    setStatus('ALL');
  }

  return {
    view,
    search,
    setSearch,
    status,
    setStatus,
    counts,
    filteredTickets,
    hasFilters,
    resetFilters,
  };
}
