'use client';

import { useMemo, useState } from 'react';

import { fareClasses, flightFares, getFlightDetails } from '@/data/aeropass';

import { fareClassFilterSchema } from '../schema';

import type {
  FareCabinFilter,
  FareChangeFilter,
  FareClassStats,
  FareClassViewModel,
  FareRefundFilter,
} from '../types/fare-class';

export function useFareClasses() {
  const [search, setSearch] = useState('');

  const [cabin, setCabin] = useState<FareCabinFilter>('ALL');

  const [refundable, setRefundable] = useState<FareRefundFilter>('ALL');

  const [changeable, setChangeable] = useState<FareChangeFilter>('ALL');

  const [selectedFareClassId, setSelectedFareClassId] = useState<string | null>(
    null,
  );

  const allFareClasses = useMemo<FareClassViewModel[]>(() => {
    return fareClasses.map((fareClass) => {
      const fares = flightFares.filter(
        (fare) => fare.fareClassId === fareClass.id,
      );

      const flightFaresView = fares
        .map((fare) => {
          const details = getFlightDetails(fare.flightId);

          if (!details) {
            return null;
          }

          return {
            fare,

            flightId: details.flight.id,

            flightNumber: details.flight.flightNumber,

            departureDate: details.flight.departureDate,

            departureTime: details.flight.departureTime,

            arrivalTime: details.flight.arrivalTime,

            originCode: details.origin?.code ?? '---',

            destinationCode: details.destination?.code ?? '---',

            seatsAvailable: fare.seatsAvailable,
          };
        })
        .filter((item): item is NonNullable<typeof item> => item !== null);

      const prices = fares.map((fare) => fare.price);

      const averagePrice =
        prices.length > 0 ?
          Math.round(
            prices.reduce((total, price) => total + price, 0) / prices.length,
          )
        : 0;

      return {
        fareClass,

        flightFares: flightFaresView,

        totalFlightFares: fares.length,

        averagePrice,

        minimumPrice: prices.length > 0 ? Math.min(...prices) : 0,

        maximumPrice: prices.length > 0 ? Math.max(...prices) : 0,

        totalSeatsAvailable: fares.reduce(
          (total, fare) => total + fare.seatsAvailable,
          0,
        ),

        refundable: fareClass.refundable,

        changeable: fareClass.changeable,
      };
    });
  }, []);

  const filteredFareClasses = useMemo(() => {
    const parsed = fareClassFilterSchema.safeParse({
      search,
      cabin,
      refundable,
      changeable,
    });

    if (!parsed.success) {
      return allFareClasses;
    }

    const normalizedSearch = parsed.data.search.toLowerCase();

    return allFareClasses.filter((item) => {
      const fare = item.fareClass;

      const matchesSearch =
        normalizedSearch.length === 0 ||
        [
          fare.code,
          fare.name,
          fare.description,
          fare.cabinClass,
          String(fare.baggageAllowanceKg),
          String(fare.changeFee),
        ]
          .join(' ')
          .toLowerCase()
          .includes(normalizedSearch);

      const matchesCabin = cabin === 'ALL' || fare.cabinClass === cabin;

      const matchesRefundable =
        refundable === 'ALL' ||
        (refundable === 'REFUNDABLE' && fare.refundable) ||
        (refundable === 'NON_REFUNDABLE' && !fare.refundable);

      const matchesChangeable =
        changeable === 'ALL' ||
        (changeable === 'CHANGEABLE' && fare.changeable) ||
        (changeable === 'NON_CHANGEABLE' && !fare.changeable);

      return (
        matchesSearch && matchesCabin && matchesRefundable && matchesChangeable
      );
    });
  }, [allFareClasses, cabin, changeable, refundable, search]);

  const selectedFareClass = useMemo(() => {
    if (selectedFareClassId) {
      const selected = filteredFareClasses.find(
        (item) => item.fareClass.id === selectedFareClassId,
      );

      if (selected) {
        return selected;
      }
    }

    return filteredFareClasses[0] ?? null;
  }, [filteredFareClasses, selectedFareClassId]);

  const stats = useMemo<FareClassStats>(() => {
    const allFares = flightFares;

    const prices = allFares.map((fare) => fare.price);

    return {
      totalClasses: fareClasses.length,

      totalFlightFares: allFares.length,

      refundableClasses: fareClasses.filter((fareClass) => fareClass.refundable)
        .length,

      changeableClasses: fareClasses.filter((fareClass) => fareClass.changeable)
        .length,

      totalSeatsAvailable: allFares.reduce(
        (total, fare) => total + fare.seatsAvailable,
        0,
      ),

      averageFare:
        prices.length > 0 ?
          Math.round(
            prices.reduce((total, price) => total + price, 0) / prices.length,
          )
        : 0,

      lowestFare: prices.length > 0 ? Math.min(...prices) : 0,

      highestFare: prices.length > 0 ? Math.max(...prices) : 0,
    };
  }, []);

  function resetFilters() {
    setSearch('');
    setCabin('ALL');
    setRefundable('ALL');
    setChangeable('ALL');
  }

  function selectFareClass(fareClassId: string) {
    setSelectedFareClassId(fareClassId);
  }

  return {
    search,
    cabin,
    refundable,
    changeable,

    setSearch,
    setCabin,
    setRefundable,
    setChangeable,

    resetFilters,
    selectFareClass,

    fareClasses: filteredFareClasses,

    allFareClasses,

    selectedFareClass,

    stats,

    resultCount: filteredFareClasses.length,
  };
}
