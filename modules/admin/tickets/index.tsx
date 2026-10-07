'use client';

import { TicketDetail } from './components/detail';
import { TicketFilters } from './components/filters';
import { TicketHeader } from './components/header';
import { TicketList } from './components/list';
import { TicketStats } from './components/stats';

import { useTickets } from './hooks/use-ticket';

export function Tickets() {
  const {
    filteredTickets,
    selectedTicket,
    selectedTicketId,
    stats,
    filters,
    hasFilters,
    updateSearch,
    updateStatus,
    updateCheckIn,
    updateBoarding,
    resetFilters,
    selectTicket,
  } = useTickets();

  return (
    <div className='flex flex-col gap-6'>
      <TicketHeader stats={stats} />

      <TicketStats stats={stats} />

      <TicketFilters
        search={filters.search}
        status={filters.status}
        checkIn={filters.checkIn}
        boarding={filters.boarding}
        resultCount={filteredTickets.length}
        hasFilters={hasFilters}
        onSearchChange={updateSearch}
        onStatusChange={updateStatus}
        onCheckInChange={updateCheckIn}
        onBoardingChange={updateBoarding}
        onReset={resetFilters}
      />

      <div className='grid min-w-0 items-start gap-6 xl:grid-cols-[minmax(0,1fr)_390px]'>
        <TicketList
          tickets={filteredTickets}
          selectedTicketId={selectedTicketId}
          onSelect={selectTicket}
        />

        <TicketDetail ticket={selectedTicket} />
      </div>
    </div>
  );
}
