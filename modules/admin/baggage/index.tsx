'use client';

import { BaggageDetail } from './components/detail';
import { BaggageFilters } from './components/filters';
import { BaggageHeader } from './components/header';
import { BaggageList } from './components/list';
import { BaggageStats } from './components/stats';
import { useBaggage } from './hooks/use-baggage';

export function Baggage() {
  const {
    baggage,
    selectedBaggage,
    selectedId,
    stats,
    flightOptions,
    filters,
    hasFilters,
    setSearch,
    setStatus,
    setType,
    setFlightId,
    resetFilters,
    selectBaggage,
  } = useBaggage();

  return (
    <div className='flex flex-col gap-6'>
      <BaggageHeader stats={stats} />

      <BaggageStats stats={stats} />

      <BaggageFilters
        search={filters.search}
        status={filters.status}
        type={filters.type}
        flightId={filters.flightId}
        resultCount={baggage.length}
        hasFilters={hasFilters}
        flightOptions={flightOptions}
        onSearchChange={setSearch}
        onStatusChange={setStatus}
        onTypeChange={setType}
        onFlightChange={setFlightId}
        onReset={resetFilters}
      />

      <div className='grid min-w-0 items-start gap-6 xl:grid-cols-[minmax(0,1fr)_390px]'>
        <BaggageList
          baggage={baggage}
          selectedId={selectedId}
          onSelect={selectBaggage}
        />

        <BaggageDetail baggage={selectedBaggage} />
      </div>
    </div>
  );
}
