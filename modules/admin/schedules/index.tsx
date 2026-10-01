'use client';

import { ScheduleDetail } from './components/detail';
import { ScheduleFilters } from './components/filters';
import { ScheduleHeader } from './components/header';
import { ScheduleList } from './components/list';
import { ScheduleStats } from './components/stats';
import { useSchedules } from './hooks/use-schedule';

export function Schedules() {
  const {
    search,
    status,
    frequency,
    setSearch,
    setStatus,
    setFrequency,
    resetFilters,
    schedules,
    selectedSchedule,
    selectSchedule,
    stats,
  } = useSchedules();

  return (
    <div className='flex flex-col gap-6'>
      <ScheduleHeader stats={stats} />

      <ScheduleStats stats={stats} />

      <ScheduleFilters
        search={search}
        status={status}
        frequency={frequency}
        resultCount={schedules.length}
        onSearchChange={setSearch}
        onStatusChange={setStatus}
        onFrequencyChange={setFrequency}
        onReset={resetFilters}
      />

      <div className='grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_390px]'>
        <ScheduleList
          schedules={schedules}
          selectedScheduleId={selectedSchedule?.schedule.id ?? null}
          onSelect={selectSchedule}
        />

        <ScheduleDetail schedule={selectedSchedule} />
      </div>
    </div>
  );
}
