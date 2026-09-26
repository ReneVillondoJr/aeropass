'use client';

import { useMemo, useState } from 'react';

import {
  airports,
  flightFares,
  getAirportById,
  getFlightDetails,
  searchFlights,
} from '@/data/aeropass';

import { flightSearchSchema, type FlightSearchSchema } from '../schema';

import type {
  FlightSearchResult,
  SearchAirport,
  SearchState,
} from '../types/search';

function formatAirportList(): SearchAirport[] {
  return airports.map((airport) => ({
    id: airport.id,
    code: airport.code,
    city: airport.city,
    name: airport.name,
  }));
}

function getStartingFare(flightId: string) {
  const fares = flightFares.filter((fare) => fare.flightId === flightId);

  if (fares.length === 0) {
    return null;
  }

  return Math.min(...fares.map((fare) => fare.price));
}

function mapFlightResult(flightId: string): FlightSearchResult | null {
  const details = getFlightDetails(flightId);

  if (!details?.flight || !details.origin || !details.destination) {
    return null;
  }

  return {
    id: details.flight.id,
    flightNumber: details.flight.flightNumber,
    status: details.flight.status,
    originCode: details.origin.code,
    originCity: details.origin.city,
    destinationCode: details.destination.code,
    destinationCity: details.destination.city,
    departureDate: details.flight.departureDate,
    departureTime: details.flight.departureTime,
    arrivalTime: details.flight.arrivalTime,
    durationMinutes: details.flight.durationMinutes,
    terminal: details.flight.terminal,
    gate: details.flight.gate,
    seatsAvailable: details.flight.seatsAvailable,
    startingFare: getStartingFare(details.flight.id),
  };
}

export function useFlightSearch({
  initialFrom = '',
  initialTo = '',
  initialDepartureDate = '',
}: {
  initialFrom?: string;
  initialTo?: string;
  initialDepartureDate?: string;
}) {
  const airportOptions = useMemo(() => formatAirportList(), []);

  const [from, setFrom] = useState(initialFrom);

  const [to, setTo] = useState(initialTo);

  const [departureDate, setDepartureDate] = useState(initialDepartureDate);

  const [state, setState] = useState<SearchState>(() => ({
    results: [],
    isSearching: false,
    hasSearched: false,
    error: null,
  }));

  function runSearch(values?: FlightSearchSchema) {
    const input = values ?? {
      from,
      to,
      departureDate,
    };

    const parsed = flightSearchSchema.safeParse(input);

    if (!parsed.success) {
      setState({
        results: [],
        isSearching: false,
        hasSearched: true,
        error:
          parsed.error.issues[0]?.message ??
          'Please check your search details.',
      });

      return;
    }

    const nextFrom = parsed.data.from ?? '';

    const nextTo = parsed.data.to ?? '';

    const nextDepartureDate = parsed.data.departureDate ?? '';

    setFrom(nextFrom);
    setTo(nextTo);
    setDepartureDate(nextDepartureDate);

    setState({
      results: [],
      isSearching: true,
      hasSearched: true,
      error: null,
    });

    const flights = searchFlights({
      from: nextFrom || undefined,
      to: nextTo || undefined,
      departureDate: nextDepartureDate || undefined,
    });

    const results = flights
      .map((flight) => mapFlightResult(flight.id))
      .filter((flight): flight is FlightSearchResult => Boolean(flight));

    setState({
      results,
      isSearching: false,
      hasSearched: true,
      error: null,
    });
  }

  function clearSearch() {
    setFrom('');
    setTo('');
    setDepartureDate('');

    setState({
      results: [],
      isSearching: false,
      hasSearched: false,
      error: null,
    });
  }

  function getAirport(airportId: string) {
    return getAirportById(airportId);
  }

  return {
    ...state,

    from,
    to,
    departureDate,

    airportOptions,

    setFrom,
    setTo,
    setDepartureDate,

    runSearch,
    clearSearch,
    getAirport,
  };
}
