'use client';

import { useMemo, useState } from 'react';

import { flights, getAirportById, routes, schedules } from '@/data/aeropass';

import type { RouteDetails, RouteStatusFilter } from '../types/route';

export function useRoutes() {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<RouteStatusFilter>('ALL');

  const [selectedRouteId, setSelectedRouteId] = useState<string | null>(
    routes[0]?.id ?? null,
  );

  const routeRows = useMemo<RouteDetails[]>(
    () =>
      routes.map((route) => ({
        route,

        origin: getAirportById(route.originAirportId),

        destination: getAirportById(route.destinationAirportId),

        schedules: schedules.filter(
          (schedule) => schedule.routeId === route.id,
        ),

        flights: flights.filter((flight) => flight.routeId === route.id),
      })),
    [],
  );

  const filteredRoutes = useMemo(() => {
    const query = search.trim().toLowerCase();

    return routeRows.filter((item) => {
      const { route, origin, destination } = item;

      const matchesSearch =
        !query ||
        route.id.toLowerCase().includes(query) ||
        origin?.code.toLowerCase().includes(query) ||
        origin?.name.toLowerCase().includes(query) ||
        origin?.city.toLowerCase().includes(query) ||
        destination?.code.toLowerCase().includes(query) ||
        destination?.name.toLowerCase().includes(query) ||
        destination?.city.toLowerCase().includes(query) ||
        item.schedules.some((schedule) =>
          schedule.flightNumber.toLowerCase().includes(query),
        ) ||
        item.flights.some((flight) =>
          flight.flightNumber.toLowerCase().includes(query),
        );

      const matchesStatus = status === 'ALL' || route.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [routeRows, search, status]);

  const selectedRoute = useMemo(
    () =>
      filteredRoutes.find((item) => item.route.id === selectedRouteId) ??
      filteredRoutes[0] ??
      null,
    [filteredRoutes, selectedRouteId],
  );

  const stats = useMemo(
    () => ({
      total: routes.length,

      active: routes.filter((route) => route.status === 'ACTIVE').length,

      inactive: routes.filter((route) => route.status === 'INACTIVE').length,

      schedules: schedules.length,

      flights: flights.length,

      totalDistanceKm: routes.reduce(
        (total, route) => total + route.distanceKm,
        0,
      ),
    }),
    [],
  );

  function selectRoute(route: RouteDetails) {
    setSelectedRouteId(route.route.id);
  }

  function resetFilters() {
    setSearch('');
    setStatus('ALL');
  }

  return {
    search,
    status,

    setSearch,
    setStatus,

    resetFilters,

    routes: filteredRoutes,
    selectedRoute,

    selectRoute,

    stats,
  };
}
