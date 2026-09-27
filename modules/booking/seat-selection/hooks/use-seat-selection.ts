'use client';

import { useMemo } from 'react';

import { aircraftSeats, getFlightDetails, reservations } from '@/data/aeropass';

import { seatSelectionSchema, type SeatSelectionSchema } from '../schema';

import type { SeatOption } from '../types/seat-selection';

import { useBookingSession } from '@/modules/bookings/hooks/use-booking-session';

export function useSeatSelection(flightId: string) {
  const { session, setSeatId } = useBookingSession();

  const flightDetails = getFlightDetails(flightId);

  const reservedSeatIds = useMemo(
    () =>
      new Set(
        reservations
          .filter(
            (reservation) =>
              reservation.flightId === flightId &&
              reservation.status !== 'CANCELLED',
          )
          .map((reservation) => reservation.seatId),
      ),
    [flightId],
  );

  const seats = useMemo<SeatOption[]>(() => {
    if (!flightDetails?.aircraft) {
      return [];
    }

    return aircraftSeats
      .filter((seat) => seat.aircraftId === flightDetails.aircraft?.id)
      .map((seat) => ({
        id: seat.id,
        seatNumber: seat.seatNumber,
        row: seat.row,
        column: seat.column,
        cabinClass: seat.cabinClass,
        seatType: seat.seatType,
        available: seat.status === 'AVAILABLE' && !reservedSeatIds.has(seat.id),
        selected: seat.id === session.seatId,
      }));
  }, [flightDetails, reservedSeatIds, session.seatId]);

  const selectedSeat = seats.find((seat) => seat.selected) ?? null;

  function selectSeat(values: SeatSelectionSchema) {
    const parsed = seatSelectionSchema.safeParse(values);

    if (!parsed.success) {
      return {
        success: false,
        message: parsed.error.issues[0]?.message ?? 'Please select a seat.',
      };
    }

    const seat = seats.find((item) => item.id === parsed.data.seatId);

    if (!seat?.available) {
      return {
        success: false,
        message: 'That seat is no longer available.',
      };
    }

    setSeatId(parsed.data.seatId);

    return {
      success: true,
      message: '',
    };
  }

  return {
    seats,
    selectedSeat,
    selectSeat,
  };
}
