'use client';

import { useMemo, useState } from 'react';

import {
  baggage,
  boarding,
  bookings,
  checkIns,
  flights,
  payments,
  refunds,
  getFlightDetails,
} from '@/data/aeropass';

import {
  bookingStatusLabels,
  paymentMethodLabels,
  reportDate,
} from '../data/reports';

import { reportsSchema } from '../schema';

import type { ReportPeriod, ReportsData } from '../types/reports';

function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatDate(value: string) {
  const date = new Date(`${value}T00:00:00+08:00`);

  return new Intl.DateTimeFormat('en-PH', {
    month: 'short',
    day: 'numeric',
  }).format(date);
}

function getPeriodStart(period: ReportPeriod) {
  if (period === 'ALL') {
    return '0000-01-01';
  }

  const date = new Date(`${reportDate}T00:00:00+08:00`);

  const days = period === '7D' ? 6 : 29;

  date.setDate(date.getDate() - days);

  return date.toISOString().slice(0, 10);
}

function isWithinPeriod(value: string, startDate: string) {
  return value >= startDate && value <= reportDate;
}

export function useReports() {
  const [period, setPeriod] = useState<ReportPeriod>('30D');

  const data = useMemo<ReportsData>(() => {
    const parsed = reportsSchema.safeParse({
      period,
    });

    const selectedPeriod = parsed.success ? parsed.data.period : '30D';

    const startDate = getPeriodStart(selectedPeriod);

    const filteredBookings = bookings.filter((booking) =>
      isWithinPeriod(booking.createdAt.slice(0, 10), startDate),
    );

    const filteredPayments = payments.filter((payment) =>
      isWithinPeriod(payment.createdAt.slice(0, 10), startDate),
    );

    const filteredFlights = flights.filter((flight) =>
      isWithinPeriod(flight.departureDate, startDate),
    );

    const filteredCheckIns = checkIns.filter((checkIn) =>
      checkIn.checkedInAt ?
        isWithinPeriod(checkIn.checkedInAt.slice(0, 10), startDate)
      : false,
    );

    const filteredBoarding = boarding.filter((item) =>
      item.boardedAt ?
        isWithinPeriod(item.boardedAt.slice(0, 10), startDate)
      : false,
    );

    const filteredRefunds = refunds.filter((refund) =>
      isWithinPeriod(refund.requestedAt.slice(0, 10), startDate),
    );

    const filteredBaggage = baggage.filter((item) =>
      item.checkedAt ?
        isWithinPeriod(item.checkedAt.slice(0, 10), startDate)
      : false,
    );

    const paidPayments = filteredPayments.filter(
      (payment) => payment.status === 'PAID',
    );

    const completedRefunds = filteredRefunds.filter(
      (refund) => refund.status === 'COMPLETED',
    );

    const grossRevenue = paidPayments.reduce(
      (total, payment) => total + payment.amount,
      0,
    );

    const refundedAmount = completedRefunds.reduce(
      (total, refund) => total + refund.amount,
      0,
    );

    const totalBookingValue = filteredBookings.reduce(
      (total, booking) => total + booking.total,
      0,
    );

    const averageBookingValue =
      filteredBookings.length > 0 ?
        Math.round(totalBookingValue / filteredBookings.length)
      : 0;

    const passengerCount = filteredBookings.reduce(
      (total, booking) => total + booking.passengerCount,
      0,
    );

    const pendingPayments = filteredPayments.filter(
      (payment) => payment.status === 'PENDING',
    );

    const revenueByDate = new Map<string, number>();

    paidPayments.forEach((payment) => {
      const date = payment.createdAt.slice(0, 10);

      revenueByDate.set(date, (revenueByDate.get(date) ?? 0) + payment.amount);
    });

    const revenueTrend = Array.from(revenueByDate.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .slice(-10)
      .map(([date, amount]) => ({
        date,
        label: formatDate(date),
        amount,
      }));

    const bookingStatusCounts = filteredBookings.reduce((map, booking) => {
      map.set(booking.status, (map.get(booking.status) ?? 0) + 1);

      return map;
    }, new Map<string, number>());

    const bookingStatuses = Array.from(bookingStatusCounts.entries())
      .sort(([, a], [, b]) => b - a)
      .map(([status, count]) => ({
        status,
        label: bookingStatusLabels[status] ?? status,
        count,
        percentage:
          filteredBookings.length > 0 ?
            Math.round((count / filteredBookings.length) * 100)
          : 0,
      }));

    const paymentMethodCounts = new Map<
      string,
      {
        count: number;
        amount: number;
      }
    >();

    paidPayments.forEach((payment) => {
      const current = paymentMethodCounts.get(payment.paymentMethod) ?? {
        count: 0,
        amount: 0,
      };

      paymentMethodCounts.set(payment.paymentMethod, {
        count: current.count + 1,
        amount: current.amount + payment.amount,
      });
    });

    const paymentMethods = Array.from(paymentMethodCounts.entries())
      .sort(([, a], [, b]) => b.amount - a.amount)
      .map(([method, value]) => ({
        method: method as 'GCASH' | 'MAYA' | 'QRPH' | 'CARD' | 'BANK_TRANSFER',
        label: paymentMethodLabels[method] ?? method,
        count: value.count,
        amount: value.amount,
        percentage:
          grossRevenue > 0 ?
            Math.round((value.amount / grossRevenue) * 100)
          : 0,
      }));

    const flightRows = filteredFlights
      .map((flight) => {
        const details = getFlightDetails(flight.id);

        if (!details?.origin || !details.destination) {
          return null;
        }

        const occupied = Math.max(flight.capacity - flight.seatsAvailable, 0);

        const loadFactor =
          flight.capacity > 0 ?
            Math.round((occupied / flight.capacity) * 100)
          : 0;

        return {
          id: flight.id,
          flightNumber: flight.flightNumber,
          originCode: details.origin.code,
          destinationCode: details.destination.code,
          departureDate: flight.departureDate,
          departureTime: flight.departureTime,
          status: flight.status,
          capacity: flight.capacity,
          seatsAvailable: flight.seatsAvailable,
          checkedInPassengers: flight.checkedInPassengers,
          boardedPassengers: flight.boardedPassengers,
          loadFactor,
          delayMinutes: flight.delayMinutes,
        };
      })
      .filter((flight): flight is NonNullable<typeof flight> => Boolean(flight))
      .sort((a, b) => b.loadFactor - a.loadFactor)
      .slice(0, 8);

    const totalExpectedPassengers = filteredBookings.reduce(
      (total, booking) => total + booking.passengerCount,
      0,
    );

    const checkInRate =
      totalExpectedPassengers > 0 ?
        Math.round((filteredCheckIns.length / totalExpectedPassengers) * 100)
      : 0;

    const boardingRate =
      filteredCheckIns.length > 0 ?
        Math.round((filteredBoarding.length / filteredCheckIns.length) * 100)
      : 0;

    const exceptions: ReportsData['exceptions'] = [];

    filteredFlights
      .filter(
        (flight) => flight.status === 'DELAYED' || flight.delayMinutes > 0,
      )
      .slice(0, 4)
      .forEach((flight) => {
        exceptions.push({
          id: `delay-${flight.id}`,
          type: 'DELAY',
          title: `${flight.flightNumber} is delayed`,
          description: `${flight.delayMinutes} minute delay at Gate ${flight.gate}.`,
          href: `/admin/flights`,
        });
      });

    pendingPayments.slice(0, 3).forEach((payment) => {
      exceptions.push({
        id: `payment-${payment.id}`,
        type: 'PAYMENT',
        title: 'Payment requires attention',
        description: `${payment.providerReference} is still pending.`,
        href: `/admin/bookings`,
      });
    });

    filteredRefunds
      .filter((refund) => refund.status === 'PROCESSING')
      .slice(0, 3)
      .forEach((refund) => {
        exceptions.push({
          id: `refund-${refund.id}`,
          type: 'REFUND',
          title: 'Refund is processing',
          description: `Refund request for booking ${refund.bookingId} is awaiting completion.`,
          href: `/admin/refunds`,
        });
      });

    filteredBaggage
      .filter(
        (item) => item.status === 'CHECKED' || item.status === 'IN_TRANSIT',
      )
      .slice(0, 2)
      .forEach((item) => {
        exceptions.push({
          id: `bag-${item.id}`,
          type: 'BAGGAGE',
          title: `Baggage ${item.bagTag} in progress`,
          description: `${item.weightKg} kg bag bound for ${item.destination}.`,
          href: `/admin/baggage`,
        });
      });

    return {
      kpis: [
        {
          id: 'revenue',
          label: 'Gross revenue',
          value: formatCurrency(grossRevenue),
          description: 'Paid transactions in period',
          icon: 'revenue',
        },
        {
          id: 'bookings',
          label: 'Bookings',
          value: filteredBookings.length.toLocaleString('en-PH'),
          description: 'Reservations created',
          icon: 'bookings',
        },
        {
          id: 'passengers',
          label: 'Passengers',
          value: passengerCount.toLocaleString('en-PH'),
          description: 'Passengers across bookings',
          icon: 'passengers',
        },
        {
          id: 'flights',
          label: 'Flights',
          value: filteredFlights.length.toLocaleString('en-PH'),
          description: 'Flights in reporting period',
          icon: 'flights',
        },
        {
          id: 'refunds',
          label: 'Refunded',
          value: formatCurrency(refundedAmount),
          description: 'Completed refunds',
          icon: 'refunds',
        },
        {
          id: 'payments',
          label: 'Avg. booking',
          value: formatCurrency(averageBookingValue),
          description: `${pendingPayments.length} pending payment${pendingPayments.length === 1 ? '' : 's'}`,
          icon: 'payments',
        },
      ],

      revenueTrend,
      bookingStatuses,
      paymentMethods,

      flights: flightRows,

      operations: {
        totalCheckIns: filteredCheckIns.length,
        totalBoardings: filteredBoarding.length,
        boardingRate,
        checkInRate,
        checkedBaggage: filteredBaggage.filter(
          (item) =>
            item.status === 'CHECKED' ||
            item.status === 'IN_TRANSIT' ||
            item.status === 'RECEIVED',
        ).length,
        baggageInProgress: filteredBaggage.filter(
          (item) => item.status === 'CHECKED' || item.status === 'IN_TRANSIT',
        ).length,
      },

      exceptions: exceptions.slice(0, 6),
    };
  }, [period]);

  return {
    period,
    setPeriod,
    data,
  };
}
