import type { FlightStatus } from '@/data/aeropass';

export interface FlightListItem {
  id: string;
  flightNumber: string;
  originCode: string;
  originCity: string;
  destinationCode: string;
  destinationCity: string;
  departureDate: string;
  departureTime: string;
  arrivalTime: string;
  gate: string;
  terminal: string;
  status: FlightStatus;
  seatsAvailable: number;
  capacity: number;
  boardingCount: number;
  checkedInCount: number;
}

export interface CreateFlightValues {
  scheduleId: string;
  departureDate: string;
  gate: string;
  status: FlightStatus;
  seatsAvailable: number;
}

export interface BoardingPassenger {
  id: string;
  name: string;
  seat: string;
  ticketNumber: string;
  status: 'BOARDED' | 'NOT_BOARDED' | 'DENIED';
  boardedAt: string | null;
}

export interface FlightOperations {
  flightId: string;
  flightNumber: string;
  originCode: string;
  destinationCode: string;
  gate: string;
  terminal: string;
  boarded: number;
  total: number;
  checkedIn: number;
  boardingPassengers: BoardingPassenger[];
}
