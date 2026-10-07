'use client';

import { CheckInDetail } from './components/detail';
import { CheckInFilters } from './components/filters';
import { CheckInHeader } from './components/header';
import { CheckInList } from './components/list';
import { CheckInStats } from './components/stats';

import { useCheckIns } from './hooks/use-check-in';

export function CheckIns() {
  const {
    filteredCheckIns,
    selectedCheckIn,
    selectedCheckInId,
    stats,
    filters,
    hasFilters,
    updateSearch,
    updateStatus,
    updateMethod,
    updateBoarding,
    resetFilters,
    selectCheckIn,
  } = useCheckIns();

  return (
    <div className='flex flex-col gap-6'>
      <CheckInHeader stats={stats} />

      <CheckInStats stats={stats} />

      <CheckInFilters
        search={filters.search}
        status={filters.status}
        method={filters.method}
        boarding={filters.boarding}
        resultCount={filteredCheckIns.length}
        hasFilters={hasFilters}
        onSearchChange={updateSearch}
        onStatusChange={updateStatus}
        onMethodChange={updateMethod}
        onBoardingChange={updateBoarding}
        onReset={resetFilters}
      />

      <div className='grid min-w-0 items-start gap-6 xl:grid-cols-[minmax(0,1fr)_390px]'>
        <CheckInList
          checkIns={filteredCheckIns}
          selectedCheckInId={selectedCheckInId}
          onSelect={selectCheckIn}
        />

        <CheckInDetail checkIn={selectedCheckIn} />
      </div>
    </div>
  );
}
