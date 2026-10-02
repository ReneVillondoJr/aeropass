'use client';

import { RouteDetail } from './components/detail';
import { RouteFilters } from './components/filters';
import { RouteHeader } from './components/header';
import { RouteList } from './components/list';
import { RouteMap } from './components/route-map';
import { RouteStats } from './components/stats';

import { useRoutes } from './hooks/use-route';

export function RoutesModule() {
  const {
    search,
    status,
    setSearch,
    setStatus,
    resetFilters,
    routes,
    selectedRoute,
    selectRoute,
    stats,
  } = useRoutes();

  return (
    <div className='space-y-6'>
      <RouteHeader stats={stats} />

      <RouteStats stats={stats} />

      <RouteFilters
        search={search}
        status={status}
        resultCount={routes.length}
        onSearchChange={setSearch}
        onStatusChange={setStatus}
        onReset={resetFilters}
      />

      <RouteList
        routes={routes}
        selectedRouteId={selectedRoute?.route.id ?? null}
        onSelect={selectRoute}
      />

      <div className='grid gap-6 xl:grid-cols-[minmax(0,1.35fr)_minmax(360px,0.65fr)]'>
        <RouteMap route={selectedRoute} />

        <RouteDetail route={selectedRoute} />
      </div>
    </div>
  );
}

export default RoutesModule;
