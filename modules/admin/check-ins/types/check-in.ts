import type { CheckInStatus } from '@/data/aeropass';

export type CheckInStatusFilter = 'ALL' | CheckInStatus;

export type CheckInMethodFilter = 'ALL' | 'WEB' | 'COUNTER' | 'MOBILE';

export type CheckInBoardingFilter =
  | 'ALL'
  | 'BOARDED'
  | 'NOT_BOARDED'
  | 'DENIED';

export interface CheckInViewModel {
  id: string;

  status: CheckInStatus;
  checkInMethod: 'WEB' | 'COUNTER' | 'MOBILE' | null;

  checkedInAt: string | null;

  staffId: string | null;
  staffName: string | null;

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

  boardingStatus: string | null;
  boardedAt: string | null;
  gate: string | null;

  baggageCount: number;

  paymentStatus: string | null;
  paymentMethod: string | null;
  bookingTotal: number | null;
}

export interface CheckInStats {
  total: number;
  completed: number;
  cancelled: number;
  web: number;
  mobile: number;
  counter: number;
  boarded: number;
}

export interface CheckInFilters {
  search: string;
  status: CheckInStatusFilter;
  method: CheckInMethodFilter;
  boarding: CheckInBoardingFilter;
}
