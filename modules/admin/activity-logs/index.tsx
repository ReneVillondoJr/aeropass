'use client';

import { ActivityLogDetail } from './components/detail';
import { ActivityLogsFilters } from './components/filters';
import { ActivityLogsHeader } from './components/header';
import { ActivityLogsList } from './components/list';
import { ActivityLogsStats } from './components/stats';

import { useActivityLogs } from './hooks/use-activity-log';

export function ActivityLogs() {
  const {
    activityLogs,
    selectedActivityLog,
    selectedId,
    stats,
    actionOptions,
    entityOptions,
    filters,
    hasFilters,
    setSearch,
    setAction,
    setEntity,
    resetFilters,
    selectActivityLog,
  } = useActivityLogs();

  return (
    <div className='flex flex-col gap-6'>
      <ActivityLogsHeader stats={stats} />

      <ActivityLogsStats stats={stats} />

      <ActivityLogsFilters
        search={filters.search}
        action={filters.action}
        entity={filters.entity}
        resultCount={activityLogs.length}
        hasFilters={hasFilters}
        actionOptions={actionOptions}
        entityOptions={entityOptions}
        onSearchChange={setSearch}
        onActionChange={setAction}
        onEntityChange={setEntity}
        onReset={resetFilters}
      />

      <div className='grid min-w-0 items-start gap-6 xl:grid-cols-[minmax(0,1fr)_390px]'>
        <ActivityLogsList
          activityLogs={activityLogs}
          selectedId={selectedId}
          onSelect={selectActivityLog}
        />

        <ActivityLogDetail activity={selectedActivityLog} />
      </div>
    </div>
  );
}
