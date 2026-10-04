'use client';

import { AircraftDetail } from './components/detail';
import { AircraftFilters } from './components/filters';
import { AircraftHeader } from './components/header';
import { AircraftList } from './components/list';
import { AircraftStats } from './components/stats';

import { useAircraft } from './hooks/use-aircraft';

export function Aircraft() {
  const {
    search,
    status,
    manufacturer,

    setSearch,
    setStatus,
    setManufacturer,

    resetFilters,
    selectAircraft,

    aircraft,
    manufacturerOptions,

    selectedAircraft,
    stats,
    resultCount,
  } = useAircraft();

  return (
    <div className='flex flex-col gap-6'>
      <AircraftHeader stats={stats} />

      <AircraftStats stats={stats} />

      <AircraftFilters
        search={search}
        status={status}
        manufacturer={manufacturer}
        manufacturerOptions={manufacturerOptions}
        resultCount={resultCount}
        onSearchChange={setSearch}
        onStatusChange={setStatus}
        onManufacturerChange={setManufacturer}
        onReset={resetFilters}
      />

      <div className='grid min-w-0 items-start gap-6 xl:grid-cols-[minmax(0,1fr)_390px]'>
        <AircraftList
          aircraft={aircraft}
          selectedAircraftId={selectedAircraft?.aircraft.id ?? null}
          onSelect={selectAircraft}
        />

        <AircraftDetail aircraft={selectedAircraft} />
      </div>
    </div>
  );
}
