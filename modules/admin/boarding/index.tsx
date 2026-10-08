'use client';

import { BoardingDetail } from './components/detail';
import { BoardingFilters } from './components/filters';
import { BoardingHeader } from './components/header';
import { BoardingList } from './components/list';
import { BoardingStats } from './components/stats';

import { useBoarding } from './hooks/use-boarding';

export function Boarding() {
  const {
    filteredBoarding,
    selectedBoarding,
    selectedBoardingId,

    stats,
    flightOptions,
    filters,
    hasFilters,

    updateSearch,
    updateStatus,
    updateCheckIn,
    updateFlight,

    resetFilters,
    selectBoarding,
  } = useBoarding();

  return (
    <div className='flex flex-col gap-6'>
      <BoardingHeader stats={stats} />

      <BoardingStats stats={stats} />

      <BoardingFilters
        search={filters.search}
        status={filters.status}
        checkIn={filters.checkIn}
        flightId={filters.flightId}
        flightOptions={flightOptions}
        resultCount={filteredBoarding.length}
        hasFilters={hasFilters}
        onSearchChange={updateSearch}
        onStatusChange={updateStatus}
        onCheckInChange={updateCheckIn}
        onFlightChange={updateFlight}
        onReset={resetFilters}
      />

      <div className='grid min-w-0 items-start gap-6 xl:grid-cols-[minmax(0,1fr)_390px]'>
        <BoardingList
          boarding={filteredBoarding}
          selectedBoardingId={selectedBoardingId}
          onSelect={selectBoarding}
        />

        <BoardingDetail boarding={selectedBoarding} />
      </div>
    </div>
  );
}
