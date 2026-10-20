'use client';

import type { CustomerPassengerRecord } from './types/passenger';

import { useCustomerPassengers } from './hooks/use-passenger';
import { PassengersHeader } from './components/header';
import { PassengerStats } from './components/stats';
import { PassengerFilters } from './components/filters';
import { PassengerList } from './components/list';

interface CustomerPassengersModuleProps {
  initialPassengers: CustomerPassengerRecord[];
}

export function CustomerPassengersModule({
  initialPassengers,
}: CustomerPassengersModuleProps) {
  const {
    search,
    setSearch,
    filter,
    setFilter,
    counts,
    stats,
    filteredPassengers,
    hasFilters,
    resetFilters,
  } = useCustomerPassengers(initialPassengers);

  return (
    <section className='space-y-6'>
      <PassengersHeader />

      <PassengerStats stats={stats} />

      <PassengerFilters
        search={search}
        setSearch={setSearch}
        filter={filter}
        setFilter={setFilter}
        counts={counts}
        resultCount={filteredPassengers.length}
        hasFilters={hasFilters}
        onReset={resetFilters}
      />

      <PassengerList
        passengers={filteredPassengers}
        total={initialPassengers.length}
        hasFilters={hasFilters}
        onReset={resetFilters}
      />

      <p className='text-[11px] leading-5 text-muted-foreground'>
        Passenger data is read from booking-linked records. Passport values are
        masked by the server-side repository. This read-only module does not
        edit passenger information.
      </p>
    </section>
  );
}
