'use client';

import { useMemo } from 'react';

import {
  activityLogs,
  getDashboardStats,
  getFlightDetails,
  getRecentFlights,
  getRevenueStats,
  getUserById,
} from '@/data/aeropass';

import { dashboardSchema } from '../schema';

import { DASHBOARD_DATE, entityLabels } from '../data/dashboard';

import type { DashboardData } from '../types/dashboard';

function formatDate(value: string) {
  const date = new Date(`${value}T00:00:00+08:00`);

  return new Intl.DateTimeFormat('en-PH', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}

function formatTime(value: string) {
  const [hours, minutes] = value.split(':');

  const date = new Date();

  date.setHours(Number(hours), Number(minutes), 0, 0);

  return new Intl.DateTimeFormat('en-PH', {
    hour: 'numeric',
    minute: '2-digit',
  }).format(date);
}

export function useDashboard(): {
  data: DashboardData;
  operationsDate: string;
  formattedOperationsDate: string;
} {
  return useMemo(() => {
    const parsed = dashboardSchema.safeParse({
      date: DASHBOARD_DATE,
    });

    const date = parsed.success ? parsed.data.date : DASHBOARD_DATE;

    const stats = getDashboardStats(date);

    const revenue = getRevenueStats();

    const flights = getRecentFlights(8)
      .map((flight) => {
        const details = getFlightDetails(flight.id);

        if (!details || !details.origin || !details.destination) {
          return null;
        }

        return {
          id: flight.id,
          flightNumber: flight.flightNumber,
          originCode: details.origin.code,
          destinationCode: details.destination.code,
          departureTime: formatTime(flight.departureTime),
          departureDate: formatDate(flight.departureDate),
          gate: flight.gate,
          terminal: flight.terminal,
          status: flight.status,
          capacity: flight.capacity,
          checkedInPassengers: flight.checkedInPassengers,
          boardedPassengers: flight.boardedPassengers,
          seatsAvailable: flight.seatsAvailable,
          delayMinutes: flight.delayMinutes,
        };
      })
      .filter((flight): flight is NonNullable<typeof flight> =>
        Boolean(flight),
      );

    const activities = activityLogs.slice(0, 8).map((activity) => {
      const user = getUserById(activity.userId);

      return {
        id: activity.id,
        action: activity.action,
        entity: entityLabels[activity.entity] ?? activity.entity,
        description: activity.description,
        userName: user?.name ?? 'AeroPass User',
        createdAt: activity.createdAt,
      };
    });

    return {
      data: {
        stats,
        revenue,
        flights,
        activities,
      },
      operationsDate: date,
      formattedOperationsDate: formatDate(date),
    };
  }, []);
}
