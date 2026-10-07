import type { BoardingStatus, TicketStatus } from '@/data/aeropass';

export type TicketStatusFilter = 'ALL' | TicketStatus;

export type TicketCheckInFilter = 'ALL' | 'CHECKED_IN' | 'NOT_CHECKED_IN';

export type TicketBoardingFilter = 'ALL' | BoardingStatus;

export interface TicketViewModel {
  id: string;

  ticketNumber: string;
  qrToken: string;
  status: TicketStatus;

  issuedAt: string;
  expiresAt: string;

  passengerId: string | null;
  passengerName: string;
  passengerEmail: string | null;
  passengerPhone: string | null;

  bookingId: string | null;
  bookingReference: string | null;
  bookingStatus: string | null;

  flightId: string | null;
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

  boardingStatus: string | null;
  boardedAt: string | null;
  gate: string | null;

  customerName: string | null;

  baggageCount: number;

  paymentStatus: string | null;
  paymentMethod: string | null;
  bookingTotal: number | null;
}

export interface TicketStats {
  total: number;
  valid: number;
  used: number;
  pending: number;
  cancelled: number;
  refunded: number;
  checkedIn: number;
  boarded: number;
}

export interface TicketFilters {
  search: string;
  status: TicketStatusFilter;
  checkIn: TicketCheckInFilter;
  boarding: TicketBoardingFilter;
}
