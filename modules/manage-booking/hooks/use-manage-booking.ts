// cspell:ignore aeropass

'use client';

import { useState } from 'react';

import {
  getBoardingByTicketId,
  getBookingByReference,
  getCheckInByTicketId,
  getFareClassById,
} from '@/data/aeropass';

import { manageBookingSchema, type ManageBookingSchema } from '../schema';

import type { ManageBookingResult } from '../types/manage-booking';

function normalize(value: string) {
  return value.trim().toLowerCase();
}

function formatDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat('en-PH', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}

function formatStatus(value: string) {
  return value
    .toLowerCase()
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export function useManageBooking() {
  const [result, setResult] = useState<ManageBookingResult | null>(null);

  const [error, setError] = useState<string | null>(null);

  const [isSearching, setIsSearching] = useState(false);

  function searchBooking(values: ManageBookingSchema) {
    setError(null);
    setIsSearching(true);

    const parsed = manageBookingSchema.safeParse(values);

    if (!parsed.success) {
      setError(
        parsed.error.issues[0]?.message ?? 'Please check your booking details.',
      );

      setIsSearching(false);
      return;
    }

    const details = getBookingByReference(parsed.data.bookingReference);

    if (!details) {
      setError('We could not find a booking with that reference.');

      setIsSearching(false);
      return;
    }

    const passenger = details.passengers.find(
      (item) => normalize(item.lastName) === normalize(parsed.data.lastName),
    );

    if (!passenger) {
      setError('The passenger last name does not match this booking.');

      setIsSearching(false);
      return;
    }

    const flight = details.flight;

    if (!flight?.flight || !flight.origin || !flight.destination) {
      setError('Flight information is unavailable for this booking.');

      setIsSearching(false);
      return;
    }

    const reservation = details.reservations.find(
      (item) =>
        item.passengerId === passenger.id &&
        item.flightId === flight.flight.id &&
        item.status !== 'CANCELLED',
    );

    const ticket = details.tickets.find(
      (item) =>
        item.passengerId === passenger.id && item.flightId === flight.flight.id,
    );

    const checkIn = ticket ? getCheckInByTicketId(ticket.id) : undefined;

    const boarding = ticket ? getBoardingByTicketId(ticket.id) : undefined;

    const fareClass =
      reservation ? getFareClassById(reservation.fareClassId) : undefined;

    setResult({
      bookingId: details.id,

      bookingReference: details.bookingReference,

      passengerName: `${passenger.firstName} ${passenger.lastName}`,

      flightNumber: flight.flight.flightNumber,

      originCode: flight.origin.code,

      destinationCode: flight.destination.code,

      departureDate: formatDate(flight.flight.departureDate),

      departureTime: flight.flight.departureTime,

      terminal: flight.flight.terminal,

      gate: flight.flight.gate,

      seat: reservation ? (reservation.seatId.split('-').pop() ?? null) : null,

      fareClass: fareClass?.name ?? null,

      bookingStatus: formatStatus(details.status),

      paymentStatus: formatStatus(details.paymentStatus),

      ticketNumber: ticket?.ticketNumber ?? null,

      checkInStatus: formatStatus(checkIn?.status ?? 'NOT_CHECKED_IN'),

      boardingStatus: formatStatus(boarding?.status ?? 'NOT_BOARDED'),
    });

    setIsSearching(false);
  }

  function reset() {
    setResult(null);
    setError(null);
    setIsSearching(false);
  }

  return {
    result,
    error,
    isSearching,
    searchBooking,
    reset,
  };
}
