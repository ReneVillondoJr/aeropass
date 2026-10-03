'use client';

import { AirportDetail } from './components/detail';
import { AirportFilters } from './components/filters';
import { AirportHeader } from './components/header';
import { AirportList } from './components/list';
import { AirportStats } from './components/stats';
import { useAirports } from './hooks/use-airports';

export function Airports() {
  const {
    search,
    terminal,

    setSearch,
    setTerminal,

    resetFilters,
    selectAirport,

    airports,
    terminalOptions,
    selectedAirport,
    stats,
  } = useAirports();

  return (
    <div className='space-y-6 '>
      <AirportHeader stats={stats} />

      <AirportStats stats={stats} />

      <AirportFilters
        search={search}
        terminal={terminal}
        terminalOptions={terminalOptions}
        resultCount={airports.length}
        onSearchChange={setSearch}
        onTerminalChange={setTerminal}
        onReset={resetFilters}
      />

      <div className='grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_390px]'>
        <AirportList
          airports={airports}
          selectedAirportId={selectedAirport?.airport.id ?? null}
          onSelect={selectAirport}
        />

        <AirportDetail airport={selectedAirport} />
      </div>
    </div>
  );
}
