/* -------------------------------------------------------------------------- */
/* AEROPASS SCHEMA                                                            */
/* -------------------------------------------------------------------------- */

export type RoleCode =
  | 'SUPER_ADMIN'
  | 'ADMIN'
  | 'FLIGHT_MANAGER'
  | 'CHECK_IN_AGENT'
  | 'GATE_AGENT'
  | 'CUSTOMER';

export type UserStatus = 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';

export type FlightStatus =
  | 'SCHEDULED'
  | 'CHECK_IN_OPEN'
  | 'BOARDING'
  | 'DEPARTED'
  | 'ARRIVED'
  | 'DELAYED'
  | 'CANCELLED';

export type BookingStatus =
  | 'PENDING_PAYMENT'
  | 'CONFIRMED'
  | 'CHECKED_IN'
  | 'COMPLETED'
  | 'CANCELLED'
  | 'REFUND_PENDING'
  | 'REFUNDED';

export type PaymentStatus =
  | 'PENDING'
  | 'PROCESSING'
  | 'PAID'
  | 'FAILED'
  | 'CANCELLED'
  | 'REFUNDED';

export type PaymentMethod =
  | 'GCASH'
  | 'MAYA'
  | 'QRPH'
  | 'CARD'
  | 'BANK_TRANSFER';

export type TicketStatus =
  | 'PENDING'
  | 'VALID'
  | 'USED'
  | 'CANCELLED'
  | 'REFUNDED';

export type CheckInStatus = 'NOT_CHECKED_IN' | 'COMPLETED' | 'CANCELLED';

export type BoardingStatus = 'NOT_BOARDED' | 'BOARDED' | 'DENIED';

export type BaggageStatus =
  | 'PENDING'
  | 'CHECKED'
  | 'IN_TRANSIT'
  | 'RECEIVED'
  | 'LOST';

export type RefundStatus =
  | 'REQUESTED'
  | 'PROCESSING'
  | 'COMPLETED'
  | 'REJECTED';

export type AircraftStatus = 'ACTIVE' | 'MAINTENANCE' | 'INACTIVE';

export type SeatStatus = 'AVAILABLE' | 'BLOCKED' | 'MAINTENANCE';

/* -------------------------------------------------------------------------- */
/* CORE MODELS                                                                */
/* -------------------------------------------------------------------------- */

export interface Role {
  id: string;
  code: RoleCode;
  name: string;
  description: string;
}

export interface Permission {
  id: string;
  code: string;
  name: string;
  description: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: RoleCode;
  status: UserStatus;
  avatar: string | null;
  department?: string;
  employeeId?: string;
  createdAt: string;
  lastLoginAt: string | null;
}

/* -------------------------------------------------------------------------- */
/* AIRPORT                                                                     */
/* -------------------------------------------------------------------------- */

export interface Airport {
  id: string;
  code: string;
  name: string;
  city: string;
  country: string;
  timezone: string;
  terminal: string;
}

/* -------------------------------------------------------------------------- */
/* ROUTE                                                                       */
/* -------------------------------------------------------------------------- */

export type RouteStatus = 'ACTIVE' | 'INACTIVE';

export interface Route {
  id: string;
  originAirportId: string;
  destinationAirportId: string;
  distanceKm: number;
  durationMinutes: number;
  status: RouteStatus;
}

/* -------------------------------------------------------------------------- */
/* AIRCRAFT                                                                    */
/* -------------------------------------------------------------------------- */

export interface Aircraft {
  id: string;
  registrationNumber: string;
  model: string;
  manufacturer: string;
  totalSeats: number;
  status: AircraftStatus;
  yearOfManufacture: number;
}

export interface AircraftSeat {
  id: string;
  aircraftId: string;
  seatNumber: string;
  row: number;
  column: string;
  cabinClass: 'ECONOMY' | 'PREMIUM_ECONOMY' | 'BUSINESS';
  seatType: 'STANDARD' | 'EXTRA_LEGROOM' | 'EXIT_ROW' | 'WINDOW' | 'AISLE';
  status: SeatStatus;
}

/* -------------------------------------------------------------------------- */
/* SCHEDULE                                                                    */
/* -------------------------------------------------------------------------- */

export type ScheduleFrequency = 'DAILY' | 'WEEKDAYS' | 'WEEKENDS';

export interface Schedule {
  id: string;
  flightNumber: string;
  routeId: string;
  aircraftId: string;
  departureTime: string;
  arrivalTime: string;
  frequency: ScheduleFrequency;
  active: boolean;
}

/* -------------------------------------------------------------------------- */
/* FLIGHT                                                                      */
/* -------------------------------------------------------------------------- */

export interface Flight {
  id: string;
  flightNumber: string;
  scheduleId: string;
  routeId: string;
  aircraftId: string;
  departureDate: string;
  departureTime: string;
  arrivalDate: string;
  arrivalTime: string;
  durationMinutes: number;
  gate: string;
  terminal: string;
  status: FlightStatus;
  capacity: number;
  seatsAvailable: number;
  checkedInPassengers: number;
  boardedPassengers: number;
  delayMinutes: number;
}
