'use client';

import { FareClassDetail } from './components/detail';
import { FareClassFilters } from './components/filters';
import { FareClassHeader } from './components/header';
import { FareClassList } from './components/list';
import { FareClassStats } from './components/stats';
import { useFareClasses } from './hooks/use-fare-classes';

export function FareClasses() {
  const {
    search,
    cabin,
    refundable,
    changeable,
    setSearch,
    setCabin,
    setRefundable,
    setChangeable,
    resetFilters,
    selectFareClass,
    fareClasses,
    selectedFareClass,
    stats,
    resultCount,
  } = useFareClasses();

  return (
    <div className='flex flex-col gap-6'>
      <FareClassHeader stats={stats} />

      <FareClassStats stats={stats} />

      <FareClassFilters
        search={search}
        cabin={cabin}
        refundable={refundable}
        changeable={changeable}
        resultCount={resultCount}
        onSearchChange={setSearch}
        onCabinChange={setCabin}
        onRefundableChange={setRefundable}
        onChangeableChange={setChangeable}
        onReset={resetFilters}
      />

      <div className='grid min-w-0 items-start gap-6 xl:grid-cols-[minmax(0,1fr)_390px]'>
        <FareClassList
          fareClasses={fareClasses}
          selectedFareClassId={selectedFareClass?.fareClass.id ?? null}
          onSelect={selectFareClass}
        />

        <FareClassDetail fareClass={selectedFareClass} />
      </div>
    </div>
  );
}
