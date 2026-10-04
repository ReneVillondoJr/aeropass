import type {
  Aircraft,
  AircraftSeat,
  AircraftStatus,
  Airport,
  Flight,
  Route,
  Schedule,
} from '@/data/aeropass';

export type AircraftStatusFilter = 'ALL' | AircraftStatus;

export type AircraftManufacturerFilter = 'ALL' | string;

export interface AircraftRouteView {
  route: Route;
  origin: Airport;
  destination: Airport;
  schedules: Schedule[];
}

export interface AircraftViewModel {
  aircraft: Aircraft;

  seats: AircraftSeat[];

  schedules: Schedule[];

  activeSchedules: Schedule[];

  flights: Flight[];

  routes: AircraftRouteView[];

  availableSeats: number;

  blockedSeats: number;

  maintenanceSeats: number;

  businessSeats: number;

  economySeats: number;

  loadFactor: number;

  yearsInService: number;
}

export interface AircraftStats {
  total: number;

  active: number;

  maintenance: number;

  inactive: number;

  totalSeats: number;

  schedules: number;

  flightInstances: number;

  manufacturers: number;
}
