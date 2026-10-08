import type {
  BaggageStatus,
  PaymentMethod,
  PaymentStatus,
  TicketStatus,
} from '@/data/aeropass';

export type BaggageType = 'CABIN' | 'CHECKED';

export type BaggageFilterStatus = 'ALL' | BaggageStatus;
export type BaggageFilterType = 'ALL' | BaggageType;

export interface BaggageViewModel {
  id: string;
  bagTag: string;
  type: BaggageType;
  weightKg: number;
  status: BaggageStatus;
  destination: string;
  checkedAt: string | null;
  receivedAt: string | null;

  bookingId: string;
  bookingReference: string;
  bookingStatus: string;
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethod;
  totalAmount: number;

  passengerId: string;
  passengerName: string;
  passengerEmail: string;
  passengerPhone: string;
  nationality: string;

  flightId: string;
  flightNumber: string;
  departureDate: string;
  departureTime: string;
  arrivalDate: string;
  arrivalTime: string;
  flightStatus: string;

  originCode: string;
  originCity: string;
  destinationCode: string;
  destinationCity: string;
  gate: string;
  terminal: string;

  ticketNumber: string | null;
  ticketStatus: TicketStatus | null;
  seatNumber: string | null;

  checkInStatus: string | null;
  checkInMethod: string | null;
  checkedInAt: string | null;

  boardingStatus: string | null;
  boardedAt: string | null;

  staffId: string | null;
  staffName: string | null;

  aircraftModel: string | null;
  aircraftRegistration: string | null;
}

export interface BaggageStats {
  total: number;
  totalWeightKg: number;
  pending: number;
  checked: number;
  inTransit: number;
  received: number;
  lost: number;
  cabin: number;
  checkedType: number;
}

export interface BaggageFlightOption {
  label: string;
  value: string;
}
