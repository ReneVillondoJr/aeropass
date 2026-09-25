// cspell:ignore aeropass

'use client';

import { useState } from 'react';

import { getBookingByReference, getCheckInByTicketId } from '@/data/aeropass';

import { checkInSchema } from '@/modules/check-in/schema/check-in';
import type { CheckInSchema } from '@/modules/check-in/schema/check-in';
import type { CheckInResult, CheckInState } from '../types/check-in';

function formatStatus(value: string) {
  return value
    .toLowerCase()
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}
export function normalize(value: string): string {
  return value.trim().toLowerCase();
}

export function formatDate(value: string | Date): string {
  const date = value instanceof Date ? value : new Date(value);

  if (Number.isNaN(date.getTime())) {
    return '';
  }

  return new Intl.DateTimeFormat('en-PH', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}

export function useCheckIn(): CheckInState & {
  submitCheckIn: (values: CheckInSchema) => void;
  resetCheckIn: () => void;
} {
  const [result, setResult] = useState<CheckInResult | null>(null);

  const [error, setError] = useState<string | null>(null);

  const [isChecking, setIsChecking] = useState(false);

  function submitCheckIn(values: CheckInSchema) {
    setIsChecking(true);
    setError(null);

    const parsed = checkInSchema.safeParse(values);

    if (!parsed.success) {
      setError(
        parsed.error.issues[0]?.message ?? 'Please enter your booking details.',
      );

      setIsChecking(false);
      return;
    }

    const booking = getBookingByReference(parsed.data.bookingReference);

    if (!booking) {
      setError('We could not find a booking with that reference.');

      setIsChecking(false);
      return;
    }

    if (booking.paymentStatus !== 'PAID') {
      setError(
        'This booking is not eligible for online check-in because payment has not been completed.',
      );

      setIsChecking(false);
      return;
    }

    const passenger = booking.passengers.find(
      (item) => normalize(item.lastName) === normalize(parsed.data.lastName),
    );

    if (!passenger) {
      setError('The passenger last name does not match this booking.');

      setIsChecking(false);
      return;
    }

    const flight = booking.flight;

    if (!flight) {
      setError(
        'We could not retrieve the flight associated with this booking.',
      );

      setIsChecking(false);
      return;
    }

    const origin = flight.origin;

    const destination = flight.destination;

    if (!origin || !destination) {
      setError('Airport information for this flight is unavailable.');

      setIsChecking(false);
      return;
    }

    const ticket = booking.tickets.find(
      (item) =>
        item.passengerId === passenger.id && item.flightId === flight.flight.id,
    );

    const existingCheckIn =
      ticket ? getCheckInByTicketId(ticket.id) : undefined;

    const checkInStatus = existingCheckIn?.status ?? 'NOT_CHECKED_IN';

    setResult({
      bookingId: booking.id,
      bookingReference: booking.bookingReference,
      passengerName: `${passenger.firstName} ${passenger.lastName}`,
      flightNumber: flight.flight.flightNumber,
      originCode: origin.code,
      originCity: origin.city,
      destinationCode: destination.code,
      destinationCity: destination.city,
      departureDate: formatDate(flight.flight.departureDate),
      departureTime: flight.flight.departureTime,
      terminal: flight.flight.terminal,
      gate: flight.flight.gate,
      bookingStatus: formatStatus(booking.status),
      checkInStatus: formatStatus(checkInStatus),
    });

    setIsChecking(false);
  }

  function resetCheckIn() {
    setResult(null);
    setError(null);
    setIsChecking(false);
  }

  return {
    result,
    error,
    isChecking,
    submitCheckIn,
    resetCheckIn,
  };
}
