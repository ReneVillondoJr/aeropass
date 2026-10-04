'use client';

import { useMemo, useState } from 'react';

import {
  aircraft,
  flights,
  getAirportById,
  getAircraftSeats,
  getRouteById,
  schedules,
} from '@/data/aeropass';

import { aircraftFilterSchema } from '../schema';

import type {
  AircraftStatusFilter,
  AircraftStats,
  AircraftViewModel,
} from '../types/aircraft';

const REFERENCE_YEAR = 2026;

export function useAircraft() {
  const [search, setSearch] = useState('');

  const [status, setStatus] = useState<AircraftStatusFilter>('ALL');

  const [manufacturer, setManufacturer] = useState<string>('ALL');

  const [selectedAircraftId, setSelectedAircraftId] = useState<string | null>(
    null,
  );

  const allAircraft = useMemo<AircraftViewModel[]>(() => {
    return aircraft.map((aircraftItem) => {
      const seatRecords = getAircraftSeats(aircraftItem.id).slice(
        0,
        aircraftItem.totalSeats,
      );

      const aircraftSchedules = schedules.filter(
        (schedule) => schedule.aircraftId === aircraftItem.id,
      );

      const activeSchedules = aircraftSchedules.filter(
        (schedule) => schedule.active,
      );

      const aircraftFlights = flights.filter(
        (flight) => flight.aircraftId === aircraftItem.id,
      );

      const routeIds = Array.from(
        new Set(aircraftSchedules.map((schedule) => schedule.routeId)),
      );

      const routeViews = routeIds
        .map((routeId) => {
          const route = getRouteById(routeId);

          if (!route) {
            return null;
          }

          const origin = getAirportById(route.originAirportId);

          const destination = getAirportById(route.destinationAirportId);

          if (!origin || !destination) {
            return null;
          }

          return {
            route,
            origin,
            destination,
            schedules: aircraftSchedules.filter(
              (schedule) => schedule.routeId === route.id,
            ),
          };
        })
        .filter((route): route is NonNullable<typeof route> => route !== null);

      const occupiedCapacity = aircraftFlights.reduce(
        (total, flight) =>
          total + Math.max(0, flight.capacity - flight.seatsAvailable),
        0,
      );

      const configuredCapacity = aircraftFlights.reduce(
        (total, flight) => total + flight.capacity,
        0,
      );

      const loadFactor =
        configuredCapacity > 0 ?
          Math.round((occupiedCapacity / configuredCapacity) * 100)
        : 0;

      return {
        aircraft: aircraftItem,

        seats: seatRecords,

        schedules: aircraftSchedules,

        activeSchedules,

        flights: aircraftFlights,

        routes: routeViews,

        availableSeats: seatRecords.filter(
          (seat) => seat.status === 'AVAILABLE',
        ).length,

        blockedSeats: seatRecords.filter((seat) => seat.status === 'BLOCKED')
          .length,

        maintenanceSeats: seatRecords.filter(
          (seat) => seat.status === 'MAINTENANCE',
        ).length,

        businessSeats: seatRecords.filter(
          (seat) => seat.cabinClass === 'BUSINESS',
        ).length,

        economySeats: seatRecords.filter(
          (seat) => seat.cabinClass === 'ECONOMY',
        ).length,

        loadFactor,

        yearsInService: Math.max(
          0,
          REFERENCE_YEAR - aircraftItem.yearOfManufacture,
        ),
      };
    });
  }, []);

  const manufacturers = useMemo(() => {
    return Array.from(
      new Set(aircraft.map((item) => item.manufacturer)),
    ).sort();
  }, []);

  const filteredAircraft = useMemo(() => {
    const parsed = aircraftFilterSchema.safeParse({
      search,
      status,
      manufacturer,
    });

    if (!parsed.success) {
      return allAircraft;
    }

    const normalizedSearch = parsed.data.search.toLowerCase();

    return allAircraft.filter((item) => {
      const aircraftItem = item.aircraft;

      const matchesSearch =
        normalizedSearch.length === 0 ||
        [
          aircraftItem.registrationNumber,
          aircraftItem.model,
          aircraftItem.manufacturer,
          aircraftItem.id,
          ...item.schedules.map((schedule) => schedule.flightNumber),
          ...item.routes.flatMap((route) => [
            route.origin.code,
            route.destination.code,
            route.origin.city,
            route.destination.city,
          ]),
        ]
          .join(' ')
          .toLowerCase()
          .includes(normalizedSearch);

      const matchesStatus = status === 'ALL' || aircraftItem.status === status;

      const matchesManufacturer =
        manufacturer === 'ALL' || aircraftItem.manufacturer === manufacturer;

      return matchesSearch && matchesStatus && matchesManufacturer;
    });
  }, [allAircraft, manufacturer, search, status]);

  const selectedAircraft = useMemo(() => {
    if (selectedAircraftId) {
      const selected = filteredAircraft.find(
        (item) => item.aircraft.id === selectedAircraftId,
      );

      if (selected) {
        return selected;
      }
    }

    return filteredAircraft[0] ?? null;
  }, [filteredAircraft, selectedAircraftId]);

  const stats = useMemo<AircraftStats>(() => {
    return {
      total: aircraft.length,

      active: aircraft.filter((item) => item.status === 'ACTIVE').length,

      maintenance: aircraft.filter((item) => item.status === 'MAINTENANCE')
        .length,

      inactive: aircraft.filter((item) => item.status === 'INACTIVE').length,

      totalSeats: aircraft.reduce((total, item) => total + item.totalSeats, 0),

      schedules: schedules.filter((schedule) => schedule.active).length,

      flightInstances: flights.length,

      manufacturers: new Set(aircraft.map((item) => item.manufacturer)).size,
    };
  }, []);

  function resetFilters() {
    setSearch('');
    setStatus('ALL');
    setManufacturer('ALL');
  }

  function selectAircraft(aircraftId: string) {
    setSelectedAircraftId(aircraftId);
  }

  return {
    search,
    status,
    manufacturer,

    setSearch,
    setStatus,
    setManufacturer,

    resetFilters,
    selectAircraft,

    aircraft: filteredAircraft,
    allAircraft,

    manufacturerOptions: manufacturers,

    selectedAircraft,

    stats,

    resultCount: filteredAircraft.length,
  };
}
