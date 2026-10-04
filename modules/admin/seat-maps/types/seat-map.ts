import type { Aircraft, AircraftSeat, AircraftStatus } from '@/data/aeropass';

export type SeatMapStatusFilter = 'ALL' | AircraftStatus;

export type SeatMapCabinFilter = 'ALL' | AircraftSeat['cabinClass'];

export type SeatMapSeatStatus = AircraftSeat['status'];

export interface SeatMapRow {
  row: number;
  seats: AircraftSeat[];
}

export interface SeatMapViewModel {
  aircraft: Aircraft;

  seats: AircraftSeat[];

  rows: SeatMapRow[];

  totalSeats: number;

  availableSeats: number;

  blockedSeats: number;

  maintenanceSeats: number;

  businessSeats: number;

  premiumEconomySeats: number;

  economySeats: number;

  standardSeats: number;

  extraLegroomSeats: number;

  exitRowSeats: number;

  windowSeats: number;

  aisleSeats: number;
}

export interface SeatMapStats {
  aircraftCount: number;

  totalSeats: number;

  availableSeats: number;

  blockedSeats: number;

  maintenanceSeats: number;

  businessSeats: number;

  premiumEconomySeats: number;

  economySeats: number;

  activeAircraft: number;

  maintenanceAircraft: number;
}
