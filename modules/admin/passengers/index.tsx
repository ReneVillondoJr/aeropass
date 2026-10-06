'use client';

import { PassengerDetail } from './components/detail';
import { PassengerFilters } from './components/filters';
import { PassengerHeader } from './components/header';
import { PassengerList } from './components/list';
import { PassengerStats } from './components/stats';

import { usePassengers } from './hooks/use-passenger';

export function Passengers() {
  const {
    filteredPassengers,
    selectedPassenger,
    selectedPassengerId,
    stats,
    filters,
    hasFilters,
    updateSearch,
    updateGender,
    updateBookingStatus,
    updateAssistance,
    resetFilters,
    selectPassenger,
  } = usePassengers();

  return (
    <div className='flex flex-col gap-6'>
      <PassengerHeader stats={stats} />

      <PassengerStats stats={stats} />

      <PassengerFilters
        search={filters.search}
        gender={filters.gender}
        bookingStatus={filters.bookingStatus}
        assistance={filters.assistance}
        resultCount={filteredPassengers.length}
        hasFilters={hasFilters}
        onSearchChange={updateSearch}
        onGenderChange={updateGender}
        onBookingStatusChange={updateBookingStatus}
        onAssistanceChange={updateAssistance}
        onReset={resetFilters}
      />

      <div className='grid min-w-0 items-start gap-6 xl:grid-cols-[minmax(0,1fr)_390px]'>
        <PassengerList
          passengers={filteredPassengers}
          selectedPassengerId={selectedPassengerId}
          onSelect={selectPassenger}
        />

        <PassengerDetail passenger={selectedPassenger} />
      </div>
    </div>
  );
}
