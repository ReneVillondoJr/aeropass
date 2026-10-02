import type { Airport, Flight, Route, Schedule } from '@/data/aeropass';

export type RouteStatusFilter = Route['status'] | 'ALL';

export interface RouteDetails {
  route: Route;
  origin: Airport | undefined;
  destination: Airport | undefined;
  schedules: Schedule[];
  flights: Flight[];
}

export interface RouteStatsData {
  total: number;
  active: number;
  inactive: number;
  schedules: number;
  flights: number;
  totalDistanceKm: number;
}
