'use client';

import { useCallback, useMemo, useState } from 'react';

import { getFlightDetails } from '@/data/aeropass';

import { fareSelectionSchema, flightIdSchema } from '../schema';

import type { FareSelectionSchema } from '../schema';

import type {
  FlightPageState,
  PublicFareOption,
  PublicFlightData,
} from '../types/flight';

function formatDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat('en-PH', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}

function mapFlight(flightId: string): PublicFlightData | null {
  const parsedId = flightIdSchema.safeParse({
    id: flightId,
  });

  if (!parsedId.success) {
    return null;
  }

  const details = getFlightDetails(parsedId.data.id);

  if (!details?.flight || !details.origin || !details.destination) {
    return null;
  }

  const fares = details.fares
    .filter((fare) => Boolean(fare.fareClass))
    .map(
      (fare): PublicFareOption => ({
        id: fare.id,
        code: fare.fareClass?.code ?? '',
        name: fare.fareClass?.name ?? '',
        description: fare.fareClass?.description ?? '',
        price: fare.price,
        baggageAllowanceKg: fare.fareClass?.baggageAllowanceKg ?? 0,
        refundable: fare.fareClass?.refundable ?? false,
        changeable: fare.fareClass?.changeable ?? false,
        changeFee: fare.fareClass?.changeFee ?? 0,
        seatsAvailable: fare.seatsAvailable,
      }),
    );

  return {
    id: details.flight.id,
    flightNumber: details.flight.flightNumber,
    status: details.flight.status,
    departureDate: details.flight.departureDate,
    departureTime: details.flight.departureTime,
    arrivalDate: details.flight.arrivalDate,
    arrivalTime: details.flight.arrivalTime,
    durationMinutes: details.flight.durationMinutes,
    gate: details.flight.gate,
    terminal: details.flight.terminal,
    capacity: details.flight.capacity,
    seatsAvailable: details.flight.seatsAvailable,
    originCode: details.origin.code,
    originCity: details.origin.city,
    originAirport: details.origin.name,
    destinationCode: details.destination.code,
    destinationCity: details.destination.city,
    destinationAirport: details.destination.name,
    aircraftModel: details.aircraft?.model ?? 'Aircraft unavailable',
    aircraftManufacturer: details.aircraft?.manufacturer ?? '',
    fares,
  };
}

export function useFlight(flightId: string): FlightPageState & {
  selectedFare: PublicFareOption | null;
  setSelectedFare: (values: FareSelectionSchema) => void;
  retry: () => void;
} {
  const [selectedFareId, setSelectedFareId] = useState<string | null>(null);
  const [retryKey, setRetryKey] = useState(0);

  const flight = useMemo(() => mapFlight(flightId), [flightId, retryKey]);

  const error = flight ? null : 'We could not find this flight.';

  const isLoading = false;

  const effectiveSelectedFareId = useMemo(() => {
    if (!flight) {
      return null;
    }

    const selectedFareExists = flight.fares.some(
      (fare) => fare.id === selectedFareId,
    );

    if (selectedFareExists) {
      return selectedFareId;
    }

    return flight.fares[0]?.id ?? null;
  }, [flight, selectedFareId]);

  const selectedFare = useMemo(
    () =>
      flight?.fares.find((fare) => fare.id === effectiveSelectedFareId) ?? null,
    [flight, effectiveSelectedFareId],
  );

  const setSelectedFare = useCallback(
    (values: FareSelectionSchema) => {
      const parsed = fareSelectionSchema.safeParse(values);

      if (!parsed.success) {
        return;
      }

      if (!flight?.fares.some((fare) => fare.id === parsed.data.fareId)) {
        return;
      }

      setSelectedFareId(parsed.data.fareId);
    },
    [flight],
  );

  const retry = useCallback(() => {
    setRetryKey((current) => current + 1);
  }, []);

  return {
    flight,
    error,
    isLoading,
    selectedFareId: effectiveSelectedFareId,
    selectedFare,
    setSelectedFare,
    retry,
  };
}

export { formatDate };
