import type { Airport, Flight, Route, Schedule } from '@/data/aeropass';

export type AirportTerminalFilter = 'ALL' | string;

export interface AirportRouteView {
  route: Route;
  origin: Airport;
  destination: Airport;
  direction: 'OUTBOUND' | 'INBOUND';
  schedules: Schedule[];
  flights: Flight[];
}

export interface AirportFlightView {
  flight: Flight;
  direction: 'DEPARTURE' | 'ARRIVAL';
  counterpart: Airport;
}

export interface AirportViewModel {
  airport: Airport;
  routes: AirportRouteView[];
  departures: AirportFlightView[];
  arrivals: AirportFlightView[];
  schedules: Schedule[];
  flights: Flight[];
  uniqueDestinations: Airport[];
  uniqueOrigins: Airport[];
}

export interface AirportStats {
  total: number;
  countries: number;
  terminals: number;
  routes: number;
  schedules: number;
  flightInstances: number;
}
