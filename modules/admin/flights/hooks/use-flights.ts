'use client';

import { useMemo, useState } from 'react';

import {
  aircraft,
  getBoardingDetailsByFlightId,
  getFlightDetails,
  getOperationsByFlightId,
  getRecentFlights,
  schedules,
} from '@/data/aeropass';

import { createFlightSchema, type CreateFlightSchema } from '../schema';

import type {
  BoardingPassenger,
  FlightListItem,
  FlightOperations,
} from '../types/flights';

function formatTime(value: string) {
  return value;
}

function buildFlightList(): FlightListItem[] {
  return getRecentFlights(8).map((flight) => {
    const details = getFlightDetails(flight.id);
    const operations = getOperationsByFlightId(flight.id);

    const origin = details?.origin;
    const destination = details?.destination;

    return {
      id: flight.id,
      flightNumber: flight.flightNumber,

      originCode: origin?.code ?? '---',
      originCity: origin?.city ?? 'Unknown',

      destinationCode: destination?.code ?? '---',
      destinationCity: destination?.city ?? 'Unknown',

      departureDate: flight.departureDate,
      departureTime: formatTime(flight.departureTime),
      arrivalTime: formatTime(flight.arrivalTime),

      gate: flight.gate,
      terminal: flight.terminal,
      status: flight.status,

      seatsAvailable: flight.seatsAvailable,
      capacity: flight.capacity,

      boardingCount: operations.boardings.filter(
        (item) => item.status === 'BOARDED',
      ).length,

      checkedInCount: operations.checkIns.filter(
        (item) => item.status === 'COMPLETED',
      ).length,
    };
  });
}

function buildOperations(flightId: string): FlightOperations | null {
  const details = getFlightDetails(flightId);
  const operations = getOperationsByFlightId(flightId);
  const boardingDetails = getBoardingDetailsByFlightId(flightId);

  if (!details?.flight || !details.origin || !details.destination) {
    return null;
  }

  const boardingPassengers: BoardingPassenger[] = boardingDetails.map(
    ({ boarding, passenger, ticket, reservation }) => ({
      id: boarding.passengerId,

      name:
        passenger ?
          `${passenger.firstName} ${passenger.lastName}`
        : 'Passenger',

      seat:
        reservation ? (reservation.seatId.split('-').pop() ?? '---') : '---',

      ticketNumber: ticket?.ticketNumber ?? '---',

      status:
        boarding.status === 'BOARDED' ? 'BOARDED'
        : boarding.status === 'DENIED' ? 'DENIED'
        : 'NOT_BOARDED',

      boardedAt: boarding.boardedAt,
    }),
  );

  return {
    flightId,

    flightNumber: details.flight.flightNumber,

    originCode: details.origin.code,
    destinationCode: details.destination.code,

    gate: details.flight.gate,
    terminal: details.flight.terminal,

    boarded: operations.boardings.filter((item) => item.status === 'BOARDED')
      .length,

    total: boardingPassengers.length,

    checkedIn: operations.checkIns.filter((item) => item.status === 'COMPLETED')
      .length,

    boardingPassengers,
  };
}

export function useFlights() {
  const initialFlights = useMemo(() => buildFlightList(), []);

  const [flights, setFlights] = useState<FlightListItem[]>(initialFlights);

  const [selectedFlightId, setSelectedFlightId] = useState(
    initialFlights[0]?.id ?? '',
  );

  const [statusFilter, setStatusFilter] = useState<
    'ALL' | FlightListItem['status']
  >('ALL');

  const [search, setSearch] = useState('');

  const filteredFlights = useMemo(() => {
    const normalized = search.trim().toLowerCase();

    return flights.filter((flight) => {
      const matchesStatus =
        statusFilter === 'ALL' || flight.status === statusFilter;

      const matchesSearch =
        !normalized ||
        [
          flight.flightNumber,
          flight.originCode,
          flight.originCity,
          flight.destinationCode,
          flight.destinationCity,
          flight.gate,
        ]
          .join(' ')
          .toLowerCase()
          .includes(normalized);

      return matchesStatus && matchesSearch;
    });
  }, [flights, search, statusFilter]);

  const selectedFlight =
    flights.find((flight) => flight.id === selectedFlightId) ?? null;

  const operations = useMemo(
    () => (selectedFlight ? buildOperations(selectedFlight.id) : null),
    [selectedFlight],
  );

  function createFlight(values: CreateFlightSchema) {
    const parsed = createFlightSchema.safeParse(values);

    if (!parsed.success) {
      return {
        success: false,
        message: parsed.error.issues[0]?.message ?? 'Invalid flight details.',
      };
    }

    const schedule = schedules.find(
      (item) => item.id === parsed.data.scheduleId,
    );

    if (!schedule) {
      return {
        success: false,
        message: 'Selected schedule could not be found.',
      };
    }

    const capacity =
      aircraft.find((item) => item.id === schedule.aircraftId)?.totalSeats ?? 0;

    const newFlight: FlightListItem = {
      id: `draft-flight-${Date.now()}`,

      flightNumber: schedule.flightNumber,

      originCode: '---',
      originCity: 'New flight',

      destinationCode: '---',
      destinationCity: 'Preview',

      departureDate: parsed.data.departureDate,
      departureTime: schedule.departureTime,
      arrivalTime: schedule.arrivalTime,

      gate: parsed.data.gate,
      terminal: 'Assigned on route',

      status: parsed.data.status,

      seatsAvailable: parsed.data.seatsAvailable,
      capacity,

      boardingCount: 0,
      checkedInCount: 0,
    };

    setFlights((current) => [newFlight, ...current]);
    setSelectedFlightId(newFlight.id);

    return {
      success: true,
      message: 'Flight draft created for this local demo.',
    };
  }

  return {
    flights,
    filteredFlights,
    selectedFlight,
    operations,

    search,
    setSearch,

    statusFilter,
    setStatusFilter,

    selectedFlightId,
    setSelectedFlightId,

    createFlight,
  };
}
