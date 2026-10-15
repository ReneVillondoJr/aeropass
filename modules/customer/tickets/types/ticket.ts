import type {
  BookingStatus,
  CheckInStatus,
  FlightStatus,
  PaymentStatus,
  TicketStatus,
} from '@/data/aeropass';

export type CustomerTicketDisplayStatus = TicketStatus | 'EXPIRED';
export type CustomerTicketStatusFilter = 'ALL' | CustomerTicketDisplayStatus;

export interface CustomerTicketItem {
  id: string;
  bookingId: string;
  bookingReference: string;
  ticketNumber: string;
  displayStatus: CustomerTicketDisplayStatus;
  originalStatus: TicketStatus;
  passengerName: string;
  passengerEmail: string;
  passengerId: string;
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
  departureTimestamp: number;
  arrivalTimestamp: number;
  gate: string;
  terminal: string;
  seatNumber: string;
  cabinClass: string;
  issuedAt: string;
  expiresAt: string;
  bookingStatus: BookingStatus;
  paymentStatus: PaymentStatus;
  checkInStatus: CheckInStatus | null;
  checkedInAt: string | null;
  boardingStatus: 'NOT_BOARDED' | 'BOARDED' | 'DENIED' | null;
  boardedAt: string | null;
  qrToken: string;
  totalAmount: number;
  currency: 'PHP';
  isBoardingPassReady: boolean;
  isPastTrip: boolean;
}

export interface CustomerTicketStats {
  total: number;
  valid: number;
  used: number;
  expired: number;
  cancelled: number;
}

export interface CustomerTicketsView {
  accountAvailable: boolean;
  customerName: string;
  tickets: CustomerTicketItem[];
  stats: CustomerTicketStats;
}

export interface CustomerTicketDetailView extends CustomerTicketItem {
  flightDurationMinutes: number;
  paymentMethod: string;
  paymentReference: string | null;
  paidAt: string | null;
  reservationFareName: string;
  reservationPrice: number | null;
}
