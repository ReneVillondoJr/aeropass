'use client';

import { SeatMapDetail } from './components/detail';
import { SeatMapFilters } from './components/filters';
import { SeatMapHeader } from './components/header';
import { SeatMapList } from './components/list';
import { SeatMapStats } from './components/stats';

import { useSeatMaps } from './hooks/use-seat-map';

export function SeatMaps() {
  const {
    search,
    status,
    cabin,

    setSearch,
    setStatus,
    setCabin,

    resetFilters,
    selectAircraft,

    seatMaps,
    selectedSeatMap,
    stats,
    resultCount,
  } = useSeatMaps();

  return (
    <div className='flex flex-col gap-6'>
      <SeatMapHeader stats={stats} />

      <SeatMapStats stats={stats} />

      <SeatMapFilters
        search={search}
        status={status}
        cabin={cabin}
        resultCount={resultCount}
        onSearchChange={setSearch}
        onStatusChange={setStatus}
        onCabinChange={setCabin}
        onReset={resetFilters}
      />

      <div className='grid min-w-0 items-start gap-6 xl:grid-cols-[minmax(0,1fr)_390px]'>
        <SeatMapList
          seatMaps={seatMaps}
          selectedAircraftId={selectedSeatMap?.aircraft.id ?? null}
          onSelect={selectAircraft}
        />

        <SeatMapDetail seatMap={selectedSeatMap} />
      </div>
    </div>
  );
}
