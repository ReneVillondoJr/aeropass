import type { BoardingStatus } from '@/data/aeropass';

export type BoardingStatusFilter = 'ALL' | BoardingStatus;

export type BoardingCheckInFilter = 'ALL' | 'CHECKED_IN' | 'NOT_CHECKED_IN';

export interface BoardingViewModel {
  id: string;

  status: BoardingStatus;
  gate: string;

  boardedAt: string | null;

  scannedById: string | null;
  scannedByName: string | null;
  scannedByEmail: string | null;

  ticketId: string;
  ticketNumber: string | null;
  ticketStatus: string | null;

  passengerId: string;
  passengerName: string;
  passengerEmail: string | null;
  passengerPhone: string | null;
  passengerNationality: string | null;
  specialAssistance: boolean;

  bookingId: string | null;
  bookingReference: string | null;
  bookingStatus: string | null;

  customerName: string | null;

  flightId: string;
  flightNumber: string | null;

  departureDate: string | null;
  departureTime: string | null;

  arrivalDate: string | null;
  arrivalTime: string | null;

  originCode: string | null;
  originCity: string | null;

  destinationCode: string | null;
  destinationCity: string | null;

  seatNumber: string | null;

  fareClassName: string | null;
  fareClassCode: string | null;

  checkInStatus: string | null;
  checkedInAt: string | null;
  checkInMethod: string | null;

  baggageCount: number;

  paymentStatus: string | null;
  paymentMethod: string | null;
  bookingTotal: number | null;
}

export interface BoardingStats {
  total: number;
  boarded: number;
  notBoarded: number;
  denied: number;
  checkedIn: number;
  flightCount: number;
  gateCount: number;
}

export interface BoardingFilters {
  search: string;
  status: BoardingStatusFilter;
  checkIn: BoardingCheckInFilter;
  flightId: string;
}
