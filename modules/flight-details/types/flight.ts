import type { FlightStatus } from '@/data/aeropass';

export interface PublicFareOption {
  id: string;
  code: string;
  name: string;
  description: string;
  price: number;
  baggageAllowanceKg: number;
  refundable: boolean;
  changeable: boolean;
  changeFee: number;
  seatsAvailable: number;
}

export interface PublicFlightData {
  id: string;
  flightNumber: string;
  status: FlightStatus;
  departureDate: string;
  departureTime: string;
  arrivalDate: string;
  arrivalTime: string;
  durationMinutes: number;
  gate: string;
  terminal: string;
  capacity: number;
  seatsAvailable: number;
  originCode: string;
  originCity: string;
  originAirport: string;
  destinationCode: string;
  destinationCity: string;
  destinationAirport: string;
  aircraftModel: string;
  aircraftManufacturer: string;
  fares: PublicFareOption[];
}

export type FlightPageState = {
  flight: PublicFlightData | null;
  error: string | null;
  isLoading: boolean;
  selectedFareId: string | null;
};
