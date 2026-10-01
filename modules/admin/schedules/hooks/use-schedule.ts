'use client';

import { useMemo, useState } from 'react';

import {
  aircraft,
  airports,
  flights,
  routes,
  schedules,
} from '@/data/aeropass';

import { scheduleFiltersSchema } from '../schema';

import type {
  ScheduleFilterFrequency,
  ScheduleFilterStatus,
  ScheduleStats,
  ScheduleViewModel,
} from '../types/schedule';

import { scheduleFrequencyMeta } from '../data/schedule';

function buildScheduleViewModels(): ScheduleViewModel[] {
  return schedules.flatMap((schedule) => {
    const route = routes.find((item) => item.id === schedule.routeId);

    const aircraftItem = aircraft.find(
      (item) => item.id === schedule.aircraftId,
    );

    if (!route || !aircraftItem) {
      return [];
    }

    const origin = airports.find((item) => item.id === route.originAirportId);

    const destination = airports.find(
      (item) => item.id === route.destinationAirportId,
    );

    if (!origin || !destination) {
      return [];
    }

    const scheduleFlights = flights
      .filter((flight) => flight.scheduleId === schedule.id)
      .sort((a, b) => {
        const aKey = `${a.departureDate}T${a.departureTime}`;

        const bKey = `${b.departureDate}T${b.departureTime}`;

        return new Date(aKey).getTime() - new Date(bKey).getTime();
      });

    const nextFlight = scheduleFlights.at(-1) ?? null;

    const operatingDays =
      scheduleFrequencyMeta[schedule.frequency].days.slice();

    return [
      {
        schedule,
        route,
        origin,
        destination,
        aircraft: aircraftItem,
        flights: scheduleFlights,
        nextFlight,
        operatingDays,
      },
    ];
  });
}

export function useSchedules() {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<ScheduleFilterStatus>('ALL');
  const [frequency, setFrequency] = useState<ScheduleFilterFrequency>('ALL');

  const [selectedScheduleId, setSelectedScheduleId] = useState<string | null>(
    schedules[0]?.id ?? null,
  );

  const scheduleRows = useMemo(() => buildScheduleViewModels(), []);

  const filteredSchedules = useMemo(() => {
    const parsed = scheduleFiltersSchema.parse({
      search,
      status,
      frequency,
    });

    const normalizedSearch = parsed.search.toLowerCase();

    return scheduleRows.filter((item) => {
      const matchesSearch =
        !normalizedSearch ||
        item.schedule.flightNumber.toLowerCase().includes(normalizedSearch) ||
        item.origin.code.toLowerCase().includes(normalizedSearch) ||
        item.destination.code.toLowerCase().includes(normalizedSearch) ||
        item.origin.city.toLowerCase().includes(normalizedSearch) ||
        item.destination.city.toLowerCase().includes(normalizedSearch) ||
        item.aircraft.model.toLowerCase().includes(normalizedSearch);

      const matchesStatus =
        parsed.status === 'ALL' ||
        (parsed.status === 'ACTIVE' ?
          item.schedule.active
        : !item.schedule.active);

      const matchesFrequency =
        parsed.frequency === 'ALL' ||
        item.schedule.frequency === parsed.frequency;

      return matchesSearch && matchesStatus && matchesFrequency;
    });
  }, [frequency, scheduleRows, search, status]);

  const stats = useMemo<ScheduleStats>(() => {
    const uniqueRoutes = new Set(scheduleRows.map((item) => item.route.id));

    const uniqueAircraft = new Set(
      scheduleRows.map((item) => item.aircraft.id),
    );

    return {
      total: schedules.length,

      active: schedules.filter((item) => item.active).length,

      inactive: schedules.filter((item) => !item.active).length,

      daily: schedules.filter((item) => item.frequency === 'DAILY').length,

      weekdays: schedules.filter((item) => item.frequency === 'WEEKDAYS')
        .length,

      weekends: schedules.filter((item) => item.frequency === 'WEEKENDS')
        .length,

      routes: uniqueRoutes.size,
      aircraft: uniqueAircraft.size,
    };
  }, [scheduleRows]);

  const selectedSchedule =
    filteredSchedules.find((item) => item.schedule.id === selectedScheduleId) ??
    filteredSchedules[0] ??
    null;

  function resetFilters() {
    setSearch('');
    setStatus('ALL');
    setFrequency('ALL');
  }

  function selectSchedule(scheduleId: string) {
    setSelectedScheduleId(scheduleId);
  }

  return {
    search,
    status,
    frequency,

    setSearch,
    setStatus,
    setFrequency,

    resetFilters,
    selectSchedule,

    schedules: filteredSchedules,
    allSchedules: scheduleRows,
    selectedSchedule,
    stats,
  };
}
