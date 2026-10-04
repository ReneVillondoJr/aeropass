'use client';

import { useMemo, useState } from 'react';

import { aircraft, getAircraftSeats } from '@/data/aeropass';

import { seatMapFilterSchema } from '../schema';

import type {
  SeatMapCabinFilter,
  SeatMapStats,
  SeatMapStatusFilter,
  SeatMapViewModel,
} from '../types/seat-map';

export function useSeatMaps() {
  const [search, setSearch] = useState('');

  const [status, setStatus] = useState<SeatMapStatusFilter>('ALL');

  const [cabin, setCabin] = useState<SeatMapCabinFilter>('ALL');

  const [selectedAircraftId, setSelectedAircraftId] = useState<string | null>(
    null,
  );

  const allSeatMaps = useMemo<SeatMapViewModel[]>(() => {
    return aircraft.map((aircraftItem) => {
      /*
       * Use the aircraft configuration as the
       * single seat-map source.
       *
       * The A220 mock data intentionally has
       * generated positions beyond its declared
       * 140-seat capacity, so keep the visible map
       * aligned with aircraft.totalSeats.
       */
      const seats = getAircraftSeats(aircraftItem.id).slice(
        0,
        aircraftItem.totalSeats,
      );

      const groupedRows = new Map<number, typeof seats>();

      for (const seat of seats) {
        const existing = groupedRows.get(seat.row) ?? [];

        existing.push(seat);

        groupedRows.set(seat.row, existing);
      }

      const rows = Array.from(groupedRows.entries())
        .sort(([rowA], [rowB]) => rowA - rowB)
        .map(([row, rowSeats]) => ({
          row,
          seats: rowSeats.sort((seatA, seatB) =>
            seatA.column.localeCompare(seatB.column),
          ),
        }));

      return {
        aircraft: aircraftItem,

        seats,

        rows,

        totalSeats: seats.length,

        availableSeats: seats.filter((seat) => seat.status === 'AVAILABLE')
          .length,

        blockedSeats: seats.filter((seat) => seat.status === 'BLOCKED').length,

        maintenanceSeats: seats.filter((seat) => seat.status === 'MAINTENANCE')
          .length,

        businessSeats: seats.filter((seat) => seat.cabinClass === 'BUSINESS')
          .length,

        premiumEconomySeats: seats.filter(
          (seat) => seat.cabinClass === 'PREMIUM_ECONOMY',
        ).length,

        economySeats: seats.filter((seat) => seat.cabinClass === 'ECONOMY')
          .length,

        standardSeats: seats.filter((seat) => seat.seatType === 'STANDARD')
          .length,

        extraLegroomSeats: seats.filter(
          (seat) => seat.seatType === 'EXTRA_LEGROOM',
        ).length,

        exitRowSeats: seats.filter((seat) => seat.seatType === 'EXIT_ROW')
          .length,

        windowSeats: seats.filter((seat) => seat.seatType === 'WINDOW').length,

        aisleSeats: seats.filter((seat) => seat.seatType === 'AISLE').length,
      };
    });
  }, []);

  const filteredSeatMaps = useMemo(() => {
    const parsed = seatMapFilterSchema.safeParse({
      search,
      status,
      cabin,
    });

    if (!parsed.success) {
      return allSeatMaps;
    }

    const normalizedSearch = parsed.data.search.toLowerCase();

    return allSeatMaps.filter((item) => {
      const matchesSearch =
        normalizedSearch.length === 0 ||
        [
          item.aircraft.model,
          item.aircraft.manufacturer,
          item.aircraft.registrationNumber,
          item.aircraft.id,
        ]
          .join(' ')
          .toLowerCase()
          .includes(normalizedSearch);

      const matchesStatus = status === 'ALL' || item.aircraft.status === status;

      const matchesCabin =
        cabin === 'ALL' || item.seats.some((seat) => seat.cabinClass === cabin);

      return matchesSearch && matchesStatus && matchesCabin;
    });
  }, [allSeatMaps, cabin, search, status]);

  const selectedSeatMap = useMemo(() => {
    if (selectedAircraftId) {
      const selected = filteredSeatMaps.find(
        (item) => item.aircraft.id === selectedAircraftId,
      );

      if (selected) {
        return selected;
      }
    }

    return filteredSeatMaps[0] ?? null;
  }, [filteredSeatMaps, selectedAircraftId]);

  const stats = useMemo<SeatMapStats>(() => {
    return {
      aircraftCount: allSeatMaps.length,

      totalSeats: allSeatMaps.reduce(
        (total, item) => total + item.totalSeats,
        0,
      ),

      availableSeats: allSeatMaps.reduce(
        (total, item) => total + item.availableSeats,
        0,
      ),

      blockedSeats: allSeatMaps.reduce(
        (total, item) => total + item.blockedSeats,
        0,
      ),

      maintenanceSeats: allSeatMaps.reduce(
        (total, item) => total + item.maintenanceSeats,
        0,
      ),

      businessSeats: allSeatMaps.reduce(
        (total, item) => total + item.businessSeats,
        0,
      ),

      premiumEconomySeats: allSeatMaps.reduce(
        (total, item) => total + item.premiumEconomySeats,
        0,
      ),

      economySeats: allSeatMaps.reduce(
        (total, item) => total + item.economySeats,
        0,
      ),

      activeAircraft: allSeatMaps.filter(
        (item) => item.aircraft.status === 'ACTIVE',
      ).length,

      maintenanceAircraft: allSeatMaps.filter(
        (item) => item.aircraft.status === 'MAINTENANCE',
      ).length,
    };
  }, [allSeatMaps]);

  function resetFilters() {
    setSearch('');
    setStatus('ALL');
    setCabin('ALL');
  }

  function selectAircraft(aircraftId: string) {
    setSelectedAircraftId(aircraftId);
  }

  return {
    search,
    status,
    cabin,

    setSearch,
    setStatus,
    setCabin,

    resetFilters,
    selectAircraft,

    seatMaps: filteredSeatMaps,
    allSeatMaps,

    selectedSeatMap,

    stats,

    resultCount: filteredSeatMaps.length,
  };
}
