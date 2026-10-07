'use client';

import { useMemo, useState } from 'react';

import {
  buildTicketStats,
  buildTicketViewModels,
  filterTicketViewModels,
} from '../data/ticket';

import type { TicketFilters } from '../types/ticket';

const initialFilters: TicketFilters = {
  search: '',
  status: 'ALL',
  checkIn: 'ALL',
  boarding: 'ALL',
};

export function useTickets() {
  const [filters, setFilters] = useState<TicketFilters>(initialFilters);

  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);

  const tickets = useMemo(() => buildTicketViewModels(), []);

  const stats = useMemo(() => buildTicketStats(tickets), [tickets]);

  const filteredTickets = useMemo(
    () => filterTicketViewModels(tickets, filters),
    [tickets, filters],
  );

  const selectedTicket =
    filteredTickets.find((item) => item.id === selectedTicketId) ??
    filteredTickets[0] ??
    null;

  const hasFilters =
    filters.search.trim().length > 0 ||
    filters.status !== 'ALL' ||
    filters.checkIn !== 'ALL' ||
    filters.boarding !== 'ALL';

  function updateSearch(value: string) {
    setFilters((current) => ({
      ...current,
      search: value,
    }));
  }

  function updateStatus(value: TicketFilters['status']) {
    setFilters((current) => ({
      ...current,
      status: value,
    }));
  }

  function updateCheckIn(value: TicketFilters['checkIn']) {
    setFilters((current) => ({
      ...current,
      checkIn: value,
    }));
  }

  function updateBoarding(value: TicketFilters['boarding']) {
    setFilters((current) => ({
      ...current,
      boarding: value,
    }));
  }

  function resetFilters() {
    setFilters(initialFilters);
    setSelectedTicketId(null);
  }

  return {
    tickets,
    filteredTickets,
    selectedTicket,

    selectedTicketId: selectedTicket?.id ?? null,

    stats,
    filters,
    hasFilters,

    updateSearch,
    updateStatus,
    updateCheckIn,
    updateBoarding,

    resetFilters,

    selectTicket: setSelectedTicketId,
  };
}
