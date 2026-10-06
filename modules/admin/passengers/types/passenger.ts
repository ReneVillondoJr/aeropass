import type { BookingStatus } from '@/data/aeropass';

export type PassengerGender = 'MALE' | 'FEMALE' | 'OTHER';

export type PassengerGenderFilter = 'ALL' | PassengerGender;

export type PassengerBookingStatusFilter = 'ALL' | BookingStatus;

export type PassengerAssistanceFilter = 'ALL' | 'YES' | 'NO';

export interface PassengerViewModel {
  id: string;
  fullName: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: PassengerGender;
  nationality: string;
  passportNumber?: string;
  passportExpiry?: string;
  specialAssistance: boolean;
  frequentFlyerNumber?: string;

  bookingId: string;
  bookingReference: string;
  bookingStatus: BookingStatus | null;
  customerName: string | null;

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

  ticketNumber: string | null;
  ticketStatus: string | null;

  checkInStatus: string | null;
  checkedInAt: string | null;
  checkInMethod: string | null;

  baggageCount: number;
  baggageStatuses: string[];

  totalBookingAmount: number | null;
  paymentStatus: string | null;
  paymentMethod: string | null;
}

export interface PassengerStats {
  total: number;
  male: number;
  female: number;
  specialAssistance: number;
  frequentFlyers: number;
  passportComplete: number;
}

export interface PassengerFilters {
  search: string;
  gender: PassengerGenderFilter;
  bookingStatus: PassengerBookingStatusFilter;
  assistance: PassengerAssistanceFilter;
}
