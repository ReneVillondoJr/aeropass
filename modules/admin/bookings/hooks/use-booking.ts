'use client';

import { useMemo, useState } from 'react';

import {
  bookings,
  getBookingDetails,
  getFareClassById,
  getUserById,
} from '@/data/aeropass';

import { bookingFilterSchema } from '../schema';

import type {
  BookingListItem,
  BookingPaymentMethodFilter,
  BookingPaymentStatusFilter,
  BookingStats,
  BookingStatusFilter,
} from '../types/booking';

export function useBookings() {
  const [search, setSearch] = useState('');

  const [status, setStatus] = useState<BookingStatusFilter>('ALL');

  const [paymentStatus, setPaymentStatus] =
    useState<BookingPaymentStatusFilter>('ALL');

  const [paymentMethod, setPaymentMethod] =
    useState<BookingPaymentMethodFilter>('ALL');

  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(
    null,
  );

  const allBookings = useMemo<BookingListItem[]>(() => {
    return bookings
      .map((booking) => {
        const details = getBookingDetails(booking.id);

        if (!details) {
          return null;
        }

        const customer = getUserById(booking.customerId);

        const primaryPassenger = details.passengers[0];

        const flight = details.flight;

        const firstReservation = details.reservations[0];

        const fareClass =
          firstReservation ?
            getFareClassById(firstReservation.fareClassId)
          : undefined;

        return {
          booking,

          customerName: customer?.name ?? 'Unknown customer',

          customerEmail: customer?.email ?? '—',

          primaryPassengerName:
            primaryPassenger ?
              [
                primaryPassenger.firstName,
                primaryPassenger.middleName,
                primaryPassenger.lastName,
              ]
                .filter(Boolean)
                .join(' ')
            : 'No passenger',

          flight:
            flight ?
              {
                flight: flight.flight,

                flightNumber: flight.flight.flightNumber,

                originCode: flight.origin?.code ?? '---',

                originCity: flight.origin?.city ?? 'Unknown',

                destinationCode: flight.destination?.code ?? '---',

                destinationCity: flight.destination?.city ?? 'Unknown',
              }
            : null,

          fareClassCode: fareClass?.code ?? null,

          fareClassName: fareClass?.name ?? null,

          totalPassengers: details.passengers.length,

          totalReservations: details.reservations.length,

          totalTickets: details.tickets.length,
        };
      })
      .filter((item): item is BookingListItem => item !== null);
  }, []);

  const filteredBookings = useMemo(() => {
    const parsed = bookingFilterSchema.safeParse({
      search,
      status,
      paymentStatus,
      paymentMethod,
    });

    if (!parsed.success) {
      return allBookings;
    }

    const normalizedSearch = parsed.data.search.toLowerCase();

    return allBookings.filter((item) => {
      const booking = item.booking;

      const flight = item.flight;

      const matchesSearch =
        normalizedSearch.length === 0 ||
        [
          booking.bookingReference,
          booking.id,
          booking.status,
          booking.paymentStatus,
          booking.paymentMethod,
          item.customerName,
          item.customerEmail,
          item.primaryPassengerName,
          flight?.flightNumber,
          flight?.originCode,
          flight?.originCity,
          flight?.destinationCode,
          flight?.destinationCity,
          item.fareClassCode,
          item.fareClassName,
        ]
          .filter(Boolean)
          .join(' ')
          .toLowerCase()
          .includes(normalizedSearch);

      const matchesStatus = status === 'ALL' || booking.status === status;

      const matchesPaymentStatus =
        paymentStatus === 'ALL' || booking.paymentStatus === paymentStatus;

      const matchesPaymentMethod =
        paymentMethod === 'ALL' || booking.paymentMethod === paymentMethod;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesPaymentStatus &&
        matchesPaymentMethod
      );
    });
  }, [allBookings, paymentMethod, paymentStatus, search, status]);

  const selectedBooking = useMemo(() => {
    if (selectedBookingId) {
      const existing = filteredBookings.find(
        (item) => item.booking.id === selectedBookingId,
      );

      if (existing) {
        return existing;
      }
    }

    return filteredBookings[0] ?? null;
  }, [filteredBookings, selectedBookingId]);

  const selectedBookingDetails = useMemo(() => {
    if (!selectedBooking) {
      return null;
    }

    const details = getBookingDetails(selectedBooking.booking.id);

    if (!details) {
      return null;
    }

    const customer = getUserById(selectedBooking.booking.customerId);

    return {
      booking: selectedBooking.booking,

      customerName: customer?.name ?? 'Unknown customer',

      customerEmail: customer?.email ?? '—',

      customerPhone: customer?.phone ?? '—',

      passengers: details.passengers,

      reservations: details.reservations,

      tickets: details.tickets,

      payment: details.payment,

      refund: details.refund,

      flight:
        details.flight ?
          {
            flight: details.flight.flight,

            flightNumber: details.flight.flight.flightNumber,

            originCode: details.flight.origin?.code ?? '---',

            originCity: details.flight.origin?.city ?? 'Unknown',

            destinationCode: details.flight.destination?.code ?? '---',

            destinationCity: details.flight.destination?.city ?? 'Unknown',
          }
        : null,
    };
  }, [selectedBooking]);

  const stats = useMemo<BookingStats>(() => {
    return {
      totalBookings: bookings.length,

      confirmedBookings: bookings.filter(
        (booking) =>
          booking.status === 'CONFIRMED' || booking.status === 'CHECKED_IN',
      ).length,

      pendingPayment: bookings.filter(
        (booking) => booking.status === 'PENDING_PAYMENT',
      ).length,

      checkedInBookings: bookings.filter(
        (booking) => booking.status === 'CHECKED_IN',
      ).length,

      cancelledBookings: bookings.filter(
        (booking) => booking.status === 'CANCELLED',
      ).length,

      refundPending: bookings.filter(
        (booking) => booking.status === 'REFUND_PENDING',
      ).length,

      totalValue: bookings.reduce((total, booking) => total + booking.total, 0),

      paidValue: bookings
        .filter((booking) => booking.paymentStatus === 'PAID')
        .reduce((total, booking) => total + booking.total, 0),

      totalPassengers: bookings.reduce(
        (total, booking) => total + booking.passengerCount,
        0,
      ),
    };
  }, []);

  function resetFilters() {
    setSearch('');
    setStatus('ALL');
    setPaymentStatus('ALL');
    setPaymentMethod('ALL');
  }

  function selectBooking(bookingId: string) {
    setSelectedBookingId(bookingId);
  }

  return {
    search,
    status,
    paymentStatus,
    paymentMethod,

    setSearch,
    setStatus,
    setPaymentStatus,
    setPaymentMethod,

    resetFilters,
    selectBooking,

    bookings: filteredBookings,

    allBookings,

    selectedBooking,

    selectedBookingDetails,

    stats,

    resultCount: filteredBookings.length,
  };
}
