import type { CheckInStatus, FlightStatus, PaymentStatus, TicketStatus } from '@/data/aeropass';

export type CustomerCheckInStatus = 'AVAILABLE' | 'COMPLETED' | 'NOT_OPEN' | 'EXPIRED' | 'CANCELLED' | 'NOT_ELIGIBLE';
export type CheckInFilter = 'ALL' | 'AVAILABLE' | 'COMPLETED' | 'NOT_AVAILABLE';

export interface CheckInSeatOption {
  id: string;
  seatNumber: string;
  row: number;
  column: string;
  cabinClass: string;
  seatType: string;
  isCurrentSeat: boolean;
}

export interface CustomerCheckInItem {
  ticketId: string;
  bookingId: string;
  bookingReference: string;
  ticketNumber: string;
  ticketStatus: TicketStatus;
  bookingStatus: string;
  paymentStatus: PaymentStatus;
  flightId: string;
  flightNumber: string;
  flightStatus: FlightStatus;
  passengerId: string;
  passengerName: string;
  passengerEmail: string;
  originCode: string;
  originCity: string;
  destinationCode: string;
  destinationCity: string;
  departureAt: string;
  departureTimestamp: number;
  arrivalAt: string;
  gate: string;
  terminal: string;
  currentSeatId: string;
  currentSeatNumber: string;
  checkInRecordStatus: CheckInStatus | null;
  checkedInAt: string | null;
  checkInMethod: 'WEB' | 'COUNTER' | 'MOBILE' | null;
  displayStatus: CustomerCheckInStatus;
  canCheckIn: boolean;
  unavailableReason: string | null;
}

export interface CustomerCheckInStats {
  totalTickets: number;
  available: number;
  completed: number;
  notAvailable: number;
}

export interface CustomerCheckInView {
  accountAvailable: boolean;
  customerName: string;
  items: CustomerCheckInItem[];
  stats: CustomerCheckInStats;
}

export interface CustomerCheckInPassengerDetail extends CustomerCheckInItem {
  seatOptions: CheckInSeatOption[];
  dateOfBirth: string;
  nationality: string;
  passportNumber: string | null;
  specialAssistance: boolean;
}

export interface CustomerCheckInDetailView {
  accountAvailable: boolean;
  customerName: string;
  bookingId: string;
  bookingReference: string;
  bookingStatus: string;
  paymentStatus: PaymentStatus;
  currency: 'PHP';
  totalAmount: number;
  passengerCount: number;
  flightId: string;
  flightNumber: string;
  flightStatus: FlightStatus;
  originCode: string;
  originCity: string;
  originAirportName: string;
  destinationCode: string;
  destinationCity: string;
  destinationAirportName: string;
  departureAt: string;
  arrivalAt: string;
  gate: string;
  terminal: string;
  passengers: CustomerCheckInPassengerDetail[];
  canCheckIn: boolean;
  unavailableReason: string | null;
}
