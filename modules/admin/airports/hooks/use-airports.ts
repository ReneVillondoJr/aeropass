'use client';

import { useMemo, useState } from 'react';

import { airports, flights, routes, schedules } from '@/data/aeropass';

import { airportFiltersSchema } from '../schema';

import type {
  AirportFlightView,
  AirportRouteView,
  AirportStats,
  AirportTerminalFilter,
  AirportViewModel,
} from '../types/airports';

function buildAirportViewModels(): AirportViewModel[] {
  return airports.map((airport) => {
    const airportRoutes: AirportRouteView[] = routes
      .filter(
        (route) =>
          route.originAirportId === airport.id ||
          route.destinationAirportId === airport.id,
      )
      .map((route) => {
        const origin = airports.find(
          (item) => item.id === route.originAirportId,
        );

        const destination = airports.find(
          (item) => item.id === route.destinationAirportId,
        );

        if (!origin || !destination) {
          return null;
        }

        const routeSchedules = schedules.filter(
          (schedule) => schedule.routeId === route.id,
        );

        const routeFlights = flights.filter(
          (flight) => flight.routeId === route.id,
        );

        return {
          route,
          origin,
          destination,
          direction:
            route.originAirportId === airport.id ? 'OUTBOUND' : 'INBOUND',
          schedules: routeSchedules,
          flights: routeFlights,
        };
      })
      .filter((item): item is AirportRouteView => Boolean(item));

    const airportFlights = flights.filter((flight) => {
      const route = routes.find((item) => item.id === flight.routeId);

      if (!route) {
        return false;
      }

      return (
        route.originAirportId === airport.id ||
        route.destinationAirportId === airport.id
      );
    });

    const departures: AirportFlightView[] = airportFlights
      .filter((flight) => {
        const route = routes.find((item) => item.id === flight.routeId);

        return route?.originAirportId === airport.id;
      })
      .map((flight) => {
        const route = routes.find((item) => item.id === flight.routeId);

        const counterpart = airports.find(
          (item) => item.id === route?.destinationAirportId,
        );

        if (!counterpart) {
          return null;
        }

        return {
          flight,
          direction: 'DEPARTURE',
          counterpart,
        };
      })
      .filter((item): item is AirportFlightView => Boolean(item));

    const arrivals: AirportFlightView[] = airportFlights
      .filter((flight) => {
        const route = routes.find((item) => item.id === flight.routeId);

        return route?.destinationAirportId === airport.id;
      })
      .map((flight) => {
        const route = routes.find((item) => item.id === flight.routeId);

        const counterpart = airports.find(
          (item) => item.id === route?.originAirportId,
        );

        if (!counterpart) {
          return null;
        }

        return {
          flight,
          direction: 'ARRIVAL',
          counterpart,
        };
      })
      .filter((item): item is AirportFlightView => Boolean(item));

    const airportSchedules = schedules.filter((schedule) =>
      airportRoutes.some((item) => item.route.id === schedule.routeId),
    );

    const uniqueDestinations = Array.from(
      new Map(
        departures.map((item) => [item.counterpart.id, item.counterpart]),
      ).values(),
    );

    const uniqueOrigins = Array.from(
      new Map(
        arrivals.map((item) => [item.counterpart.id, item.counterpart]),
      ).values(),
    );

    return {
      airport,
      routes: airportRoutes,
      departures,
      arrivals,
      schedules: airportSchedules,
      flights: airportFlights,
      uniqueDestinations,
      uniqueOrigins,
    };
  });
}

export function useAirports() {
  const [search, setSearch] = useState('');

  const [terminal, setTerminal] = useState<AirportTerminalFilter>('ALL');

  const [selectedAirportId, setSelectedAirportId] = useState<string | null>(
    airports[0]?.id ?? null,
  );

  const airportRows = useMemo(() => buildAirportViewModels(), []);

  const terminalOptions = useMemo(() => {
    return Array.from(
      new Set(airports.map((airport) => airport.terminal)),
    ).sort();
  }, []);

  const filteredAirports = useMemo(() => {
    const parsed = airportFiltersSchema.parse({
      search,
      terminal,
    });

    const normalizedSearch = parsed.search.toLowerCase();

    return airportRows.filter((item) => {
      const matchesSearch =
        !normalizedSearch ||
        item.airport.code.toLowerCase().includes(normalizedSearch) ||
        item.airport.name.toLowerCase().includes(normalizedSearch) ||
        item.airport.city.toLowerCase().includes(normalizedSearch) ||
        item.airport.country.toLowerCase().includes(normalizedSearch);

      const matchesTerminal =
        parsed.terminal === 'ALL' || item.airport.terminal === parsed.terminal;

      return matchesSearch && matchesTerminal;
    });
  }, [airportRows, search, terminal]);

  const stats = useMemo<AirportStats>(() => {
    const countries = new Set(airports.map((airport) => airport.country));

    const terminals = new Set(airports.map((airport) => airport.terminal));

    const activeRoutes = routes.filter((route) => route.status === 'ACTIVE');

    const connectedSchedules = schedules.filter((schedule) =>
      airportRows.some((item) =>
        item.routes.some((route) => route.route.id === schedule.routeId),
      ),
    );

    return {
      total: airports.length,
      countries: countries.size,
      terminals: terminals.size,
      routes: activeRoutes.length,
      schedules: connectedSchedules.length,
      flightInstances: flights.length,
    };
  }, [airportRows]);

  const selectedAirport =
    filteredAirports.find((item) => item.airport.id === selectedAirportId) ??
    filteredAirports[0] ??
    null;

  function resetFilters() {
    setSearch('');
    setTerminal('ALL');
  }

  function selectAirport(airportId: string) {
    setSelectedAirportId(airportId);
  }

  return {
    search,
    terminal,

    setSearch,
    setTerminal,

    resetFilters,
    selectAirport,

    airports: filteredAirports,
    allAirports: airportRows,

    terminalOptions,
    selectedAirport,

    stats,
  };
}
