import type {
  Aircraft,
  Airport,
  Flight,
  Route,
  Schedule,
} from '@/data/aeropass';

export type ScheduleFilterStatus = 'ALL' | 'ACTIVE' | 'INACTIVE';

export type ScheduleFilterFrequency = 'ALL' | Schedule['frequency'];

export interface ScheduleViewModel {
  schedule: Schedule;
  route: Route;
  origin: Airport;
  destination: Airport;
  aircraft: Aircraft;
  flights: Flight[];
  nextFlight: Flight | null;
  operatingDays: string[];
}

export interface ScheduleStats {
  total: number;
  active: number;
  inactive: number;
  daily: number;
  weekdays: number;
  weekends: number;
  routes: number;
  aircraft: number;
}
