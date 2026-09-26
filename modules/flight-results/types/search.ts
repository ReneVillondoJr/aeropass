import type { FlightStatus } from '@/data/aeropass';

export interface SearchAirport {
  id: string;
  code: string;
  city: string;
  name: string;
}

export interface FlightSearchResult {
  id: string;
  flightNumber: string;
  status: FlightStatus;
  originCode: string;
  originCity: string;
  destinationCode: string;
  destinationCity: string;
  departureDate: string;
  departureTime: string;
  arrivalTime: string;
  durationMinutes: number;
  terminal: string;
  gate: string;
  seatsAvailable: number;
  startingFare: number | null;
}

export interface SearchState {
  results: FlightSearchResult[];
  isSearching: boolean;
  hasSearched: boolean;
  error: string | null;
}
export interface SearchPageProps {
  searchParams: Promise<{
    from?: string;
    to?: string;
    departureDate?: string;
  }>;
}
