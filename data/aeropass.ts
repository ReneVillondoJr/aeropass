/*
|--------------------------------------------------------------------------
| AeroPass Local Mock Database
|--------------------------------------------------------------------------
| Development only.
|
| No Prisma
| No PostgreSQL
| No external API
| No real payment gateway
|
| This file is the single source of truth for the local AeroPass system.
|
| IMPORTANT:
| - Store canonical records only once.
| - Related records use IDs.
| - Shared read/lookup functions live in this file.
| - Public, customer, staff, and admin modules read the same records.
| - Do not create duplicate business data in module-specific data files.
|--------------------------------------------------------------------------
*/

/* -------------------------------------------------------------------------- */
/* TYPES                                                                      */
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

export interface Airport {
  id: string;
  code: string;
  name: string;
  city: string;
  country: string;
  timezone: string;
  terminal: string;
}

export interface Route {
  id: string;
  originAirportId: string;
  destinationAirportId: string;
  distanceKm: number;
  durationMinutes: number;
  status: 'ACTIVE' | 'INACTIVE';
}

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

export interface Schedule {
  id: string;
  flightNumber: string;
  routeId: string;
  aircraftId: string;
  departureTime: string;
  arrivalTime: string;
  frequency: 'DAILY' | 'WEEKDAYS' | 'WEEKENDS';
  active: boolean;
}

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

export interface FareClass {
  id: string;
  code: string;
  name: string;
  description: string;
  baggageAllowanceKg: number;
  cabinClass: 'ECONOMY' | 'PREMIUM_ECONOMY' | 'BUSINESS';
  refundable: boolean;
  changeable: boolean;
  changeFee: number;
}

export interface FlightFare {
  id: string;
  flightId: string;
  fareClassId: string;
  price: number;
  taxesIncluded: boolean;
  seatsAvailable: number;
}

export interface Passenger {
  id: string;
  bookingId: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: 'MALE' | 'FEMALE' | 'OTHER';
  nationality: string;
  passportNumber?: string;
  passportExpiry?: string;
  specialAssistance: boolean;
  frequentFlyerNumber?: string;
}

export interface Booking {
  id: string;
  bookingReference: string;
  customerId: string;
  flightId: string;
  status: BookingStatus;
  passengerCount: number;
  subtotal: number;
  taxes: number;
  fees: number;
  baggageFees: number;
  seatFees: number;
  discount: number;
  total: number;
  currency: 'PHP';
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethod;
  createdAt: string;
  expiresAt: string | null;
}

export interface Reservation {
  id: string;
  bookingId: string;
  passengerId: string;
  flightId: string;
  seatId: string;
  fareClassId: string;
  status: 'HELD' | 'CONFIRMED' | 'CANCELLED';
  price: number;
  createdAt: string;
}

export interface PaymentAttempt {
  id: string;
  bookingId: string;
  provider: 'LOCAL_MOCK';
  reference: string;
  method: PaymentMethod;
  amount: number;
  status: PaymentStatus;
  attemptedAt: string;
}

export interface Payment {
  id: string;
  bookingId: string;
  provider: 'LOCAL_MOCK';
  providerReference: string;
  paymentMethod: PaymentMethod;
  amount: number;
  currency: 'PHP';
  status: PaymentStatus;
  paidAt: string | null;
  createdAt: string;
}

export interface Refund {
  id: string;
  bookingId: string;
  paymentId: string;
  amount: number;
  reason: string;
  status: RefundStatus;
  requestedBy: string;
  requestedAt: string;
  processedAt: string | null;
}

export interface Ticket {
  id: string;
  bookingId: string;
  passengerId: string;
  flightId: string;
  seatId: string;
  ticketNumber: string;
  qrToken: string;
  status: TicketStatus;
  issuedAt: string;
  expiresAt: string;
}

export interface CheckIn {
  id: string;
  ticketId: string;
  bookingId: string;
  passengerId: string;
  flightId: string;
  staffId: string | null;
  seatId: string;
  status: CheckInStatus;
  checkedInAt: string | null;
  checkInMethod: 'WEB' | 'COUNTER' | 'MOBILE' | null;
}

export interface Boarding {
  id: string;
  ticketId: string;
  passengerId: string;
  flightId: string;
  gate: string;
  status: BoardingStatus;
  boardedAt: string | null;
  scannedBy: string | null;
}

export interface Baggage {
  id: string;
  bookingId: string;
  passengerId: string;
  bagTag: string;
  type: 'CABIN' | 'CHECKED';
  weightKg: number;
  status: BaggageStatus;
  destination: string;
  checkedAt: string | null;
  receivedAt: string | null;
}

export interface Coupon {
  id: string;
  code: string;
  description: string;
  type: 'PERCENTAGE' | 'FIXED';
  value: number;
  minimumSpend: number;
  usageLimit: number;
  usedCount: number;
  active: boolean;
  expiresAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'BOOKING' | 'PAYMENT' | 'FLIGHT' | 'CHECK_IN' | 'BOARDING' | 'SYSTEM';
  read: boolean;
  createdAt: string;
}

export interface ActivityLog {
  id: string;
  userId: string;
  action: string;
  entity: string;
  entityId?: string;
  description: string;
  createdAt: string;
}

export interface AirportStaffAssignment {
  id: string;
  userId: string;
  airportId: string;
  position: 'CHECK_IN_AGENT' | 'GATE_AGENT' | 'SUPERVISOR';
  active: boolean;
}

/* -------------------------------------------------------------------------- */
/* ROLES                                                                      */
/* -------------------------------------------------------------------------- */

export const roles: Role[] = [
  {
    id: 'role-super-admin',
    code: 'SUPER_ADMIN',
    name: 'Super Administrator',
    description: 'Full platform access',
  },
  {
    id: 'role-admin',
    code: 'ADMIN',
    name: 'Administrator',
    description: 'Manage airline operations and platform data',
  },
  {
    id: 'role-flight-manager',
    code: 'FLIGHT_MANAGER',
    name: 'Flight Manager',
    description: 'Manage flights, schedules, aircraft, and routes',
  },
  {
    id: 'role-check-in',
    code: 'CHECK_IN_AGENT',
    name: 'Check-in Agent',
    description: 'Passenger check-in and baggage operations',
  },
  {
    id: 'role-gate',
    code: 'GATE_AGENT',
    name: 'Gate Agent',
    description: 'Boarding and gate operations',
  },
  {
    id: 'role-customer',
    code: 'CUSTOMER',
    name: 'Customer',
    description: 'Passenger booking and travel account',
  },
];

/* -------------------------------------------------------------------------- */
/* PERMISSIONS                                                                */
/* -------------------------------------------------------------------------- */

const permissionDefinitions = [
  ['dashboard.view', 'View dashboard'],
  ['flights.view', 'View flights'],
  ['flights.manage', 'Manage flights'],
  ['schedules.view', 'View schedules'],
  ['schedules.manage', 'Manage schedules'],
  ['routes.view', 'View routes'],
  ['routes.manage', 'Manage routes'],
  ['airports.view', 'View airports'],
  ['airports.manage', 'Manage airports'],
  ['aircraft.view', 'View aircraft'],
  ['aircraft.manage', 'Manage aircraft'],
  ['seat_maps.view', 'View seat maps'],
  ['seat_maps.manage', 'Manage seat maps'],
  ['fare_classes.view', 'View fare classes'],
  ['fare_classes.manage', 'Manage fare classes'],
  ['bookings.view', 'View bookings'],
  ['bookings.manage', 'Manage bookings'],
  ['passengers.view', 'View passengers'],
  ['passengers.manage', 'Manage passengers'],
  ['tickets.view', 'View tickets'],
  ['tickets.manage', 'Manage tickets'],
  ['payments.view', 'View payments'],
  ['payments.manage', 'Manage payments'],
  ['refunds.view', 'View refunds'],
  ['refunds.manage', 'Manage refunds'],
  ['check_ins.view', 'View check-ins'],
  ['check_ins.manage', 'Manage check-ins'],
  ['boarding.view', 'View boarding'],
  ['boarding.manage', 'Manage boarding'],
  ['baggage.view', 'View baggage'],
  ['baggage.manage', 'Manage baggage'],
  ['reports.view', 'View reports'],
  ['users.view', 'View users'],
  ['users.manage', 'Manage users'],
  ['roles.manage', 'Manage roles and permissions'],
  ['notifications.view', 'View notifications'],
  ['notifications.manage', 'Manage notifications'],
  ['activity_logs.view', 'View activity logs'],
  ['settings.manage', 'Manage settings'],
] as const;

export const permissions: Permission[] = permissionDefinitions.map(
  ([code, name]) => ({
    id: `permission-${code.replace(/\./g, '-')}`,
    code,
    name,
    description: name,
  }),
);

/* -------------------------------------------------------------------------- */
/* USERS                                                                      */
/* -------------------------------------------------------------------------- */

export const users: User[] = [
  {
    id: 'user-001',
    name: 'Maria vlad',
    email: 'superadmin@aeropass.local',
    phone: '+639171000001',
    role: 'SUPER_ADMIN',
    status: 'ACTIVE',
    avatar: null,
    department: 'Administration',
    employeeId: 'AP-0001',
    createdAt: '2026-01-05T09:00:00+08:00',
    lastLoginAt: '2026-09-22T07:42:00+08:00',
  },
  {
    id: 'user-002',
    name: 'Maria Santos',
    email: 'admin@aeropass.local',
    phone: '+639171000002',
    role: 'ADMIN',
    status: 'ACTIVE',
    avatar: null,
    department: 'Administration',
    employeeId: 'AP-0002',
    createdAt: '2026-01-08T09:00:00+08:00',
    lastLoginAt: '2026-09-22T07:30:00+08:00',
  },
  {
    id: 'user-003',
    name: 'Daniel Cruz',
    email: 'flightmanager@aeropass.local',
    phone: '+639171000003',
    role: 'FLIGHT_MANAGER',
    status: 'ACTIVE',
    avatar: null,
    department: 'Flight Operations',
    employeeId: 'AP-0003',
    createdAt: '2026-01-11T09:00:00+08:00',
    lastLoginAt: '2026-09-22T07:20:00+08:00',
  },
  {
    id: 'user-004',
    name: 'Angela Reyes',
    email: 'checkin@aeropass.local',
    phone: '+639171000004',
    role: 'CHECK_IN_AGENT',
    status: 'ACTIVE',
    avatar: null,
    department: 'Passenger Services',
    employeeId: 'AP-0004',
    createdAt: '2026-02-01T09:00:00+08:00',
    lastLoginAt: '2026-09-22T06:50:00+08:00',
  },
  {
    id: 'user-005',
    name: 'Carlo Garcia',
    email: 'gate@aeropass.local',
    phone: '+639171000005',
    role: 'GATE_AGENT',
    status: 'ACTIVE',
    avatar: null,
    department: 'Airport Operations',
    employeeId: 'AP-0005',
    createdAt: '2026-02-05T09:00:00+08:00',
    lastLoginAt: '2026-09-22T06:42:00+08:00',
  },
  {
    id: 'user-006',
    name: 'Juan Dela Cruz',
    email: 'juan@aeropass.local',
    phone: '+639171100001',
    role: 'CUSTOMER',
    status: 'ACTIVE',
    avatar: null,
    createdAt: '2026-08-01T10:00:00+08:00',
    lastLoginAt: '2026-09-21T19:20:00+08:00',
  },
  {
    id: 'user-007',
    name: 'Maria Lopez',
    email: 'maria@aeropass.local',
    phone: '+639171100002',
    role: 'CUSTOMER',
    status: 'ACTIVE',
    avatar: null,
    createdAt: '2026-08-04T10:00:00+08:00',
    lastLoginAt: '2026-09-21T18:15:00+08:00',
  },
  {
    id: 'user-008',
    name: 'Jose Ramos',
    email: 'jose@aeropass.local',
    phone: '+639171100003',
    role: 'CUSTOMER',
    status: 'ACTIVE',
    avatar: null,
    createdAt: '2026-08-07T10:00:00+08:00',
    lastLoginAt: '2026-09-20T17:10:00+08:00',
  },
  {
    id: 'user-009',
    name: 'Ana Torres',
    email: 'ana@aeropass.local',
    phone: '+639171100004',
    role: 'CUSTOMER',
    status: 'ACTIVE',
    avatar: null,
    createdAt: '2026-08-08T10:00:00+08:00',
    lastLoginAt: '2026-09-19T15:30:00+08:00',
  },
  {
    id: 'user-010',
    name: 'Miguel Santos',
    email: 'miguel@aeropass.local',
    phone: '+639171100005',
    role: 'CUSTOMER',
    status: 'ACTIVE',
    avatar: null,
    createdAt: '2026-08-10T10:00:00+08:00',
    lastLoginAt: '2026-09-18T13:15:00+08:00',
  },
  {
    id: 'user-011',
    name: 'Sofia Garcia',
    email: 'sofia@aeropass.local',
    phone: '+639171100006',
    role: 'CUSTOMER',
    status: 'ACTIVE',
    avatar: null,
    createdAt: '2026-08-15T10:00:00+08:00',
    lastLoginAt: '2026-09-18T09:10:00+08:00',
  },
  {
    id: 'user-012',
    name: 'Paolo Mendoza',
    email: 'paolo@aeropass.local',
    phone: '+639171100007',
    role: 'CUSTOMER',
    status: 'ACTIVE',
    avatar: null,
    createdAt: '2026-08-18T10:00:00+08:00',
    lastLoginAt: '2026-09-17T16:20:00+08:00',
  },
];

/* -------------------------------------------------------------------------- */
/* LOCAL DEMO LOGIN                                                           */
/* -------------------------------------------------------------------------- */

export const demoCredentials = {
  password: 'Password123!',

  accounts: {
    superAdmin: 'superadmin@aeropass.local',

    admin: 'admin@aeropass.local',

    flightManager: 'flightmanager@aeropass.local',

    checkInAgent: 'checkin@aeropass.local',

    gateAgent: 'gate@aeropass.local',

    customer: 'juan@aeropass.local',
  },
};

/* -------------------------------------------------------------------------- */
/* AIRPORTS                                                                   */
/* -------------------------------------------------------------------------- */

export const airports: Airport[] = [
  {
    id: 'airport-mnl',
    code: 'MNL',
    name: 'Ninoy Aquino International Airport',
    city: 'Manila',
    country: 'Philippines',
    timezone: 'Asia/Manila',
    terminal: 'Terminal 2',
  },
  {
    id: 'airport-ceb',
    code: 'CEB',
    name: 'Mactan-Cebu International Airport',
    city: 'Cebu',
    country: 'Philippines',
    timezone: 'Asia/Manila',
    terminal: 'Terminal 1',
  },
  {
    id: 'airport-cgy',
    code: 'CGY',
    name: 'Laguindingan Airport',
    city: 'Cagayan de Oro',
    country: 'Philippines',
    timezone: 'Asia/Manila',
    terminal: 'Main Terminal',
  },
  {
    id: 'airport-dvo',
    code: 'DVO',
    name: 'Francisco Bangoy International Airport',
    city: 'Davao',
    country: 'Philippines',
    timezone: 'Asia/Manila',
    terminal: 'Main Terminal',
  },
  {
    id: 'airport-crk',
    code: 'CRK',
    name: 'Clark International Airport',
    city: 'Clark',
    country: 'Philippines',
    timezone: 'Asia/Manila',
    terminal: 'Terminal 1',
  },
  {
    id: 'airport-pps',
    code: 'PPS',
    name: 'Puerto Princesa International Airport',
    city: 'Puerto Princesa',
    country: 'Philippines',
    timezone: 'Asia/Manila',
    terminal: 'Main Terminal',
  },
  {
    id: 'airport-ilo',
    code: 'ILO',
    name: 'Iloilo International Airport',
    city: 'Iloilo',
    country: 'Philippines',
    timezone: 'Asia/Manila',
    terminal: 'Main Terminal',
  },
  {
    id: 'airport-tag',
    code: 'TAG',
    name: 'Bohol-Panglao International Airport',
    city: 'Panglao',
    country: 'Philippines',
    timezone: 'Asia/Manila',
    terminal: 'Main Terminal',
  },
];

/* -------------------------------------------------------------------------- */
/* ROUTES                                                                     */
/* -------------------------------------------------------------------------- */

export const routes: Route[] = [
  {
    id: 'route-mnl-cgy',
    originAirportId: 'airport-mnl',
    destinationAirportId: 'airport-cgy',
    distanceKm: 785,
    durationMinutes: 105,
    status: 'ACTIVE',
  },
  {
    id: 'route-cgy-mnl',
    originAirportId: 'airport-cgy',
    destinationAirportId: 'airport-mnl',
    distanceKm: 785,
    durationMinutes: 100,
    status: 'ACTIVE',
  },
  {
    id: 'route-mnl-ceb',
    originAirportId: 'airport-mnl',
    destinationAirportId: 'airport-ceb',
    distanceKm: 570,
    durationMinutes: 85,
    status: 'ACTIVE',
  },
  {
    id: 'route-ceb-mnl',
    originAirportId: 'airport-ceb',
    destinationAirportId: 'airport-mnl',
    distanceKm: 570,
    durationMinutes: 90,
    status: 'ACTIVE',
  },
  {
    id: 'route-mnl-dvo',
    originAirportId: 'airport-mnl',
    destinationAirportId: 'airport-dvo',
    distanceKm: 975,
    durationMinutes: 120,
    status: 'ACTIVE',
  },
  {
    id: 'route-dvo-mnl',
    originAirportId: 'airport-dvo',
    destinationAirportId: 'airport-mnl',
    distanceKm: 975,
    durationMinutes: 120,
    status: 'ACTIVE',
  },
  {
    id: 'route-ceb-cgy',
    originAirportId: 'airport-ceb',
    destinationAirportId: 'airport-cgy',
    distanceKm: 430,
    durationMinutes: 70,
    status: 'ACTIVE',
  },
  {
    id: 'route-cgy-ceb',
    originAirportId: 'airport-cgy',
    destinationAirportId: 'airport-ceb',
    distanceKm: 430,
    durationMinutes: 75,
    status: 'ACTIVE',
  },
  {
    id: 'route-mnl-pps',
    originAirportId: 'airport-mnl',
    destinationAirportId: 'airport-pps',
    distanceKm: 590,
    durationMinutes: 80,
    status: 'ACTIVE',
  },
  {
    id: 'route-mnl-ilo',
    originAirportId: 'airport-mnl',
    destinationAirportId: 'airport-ilo',
    distanceKm: 440,
    durationMinutes: 75,
    status: 'ACTIVE',
  },
  {
    id: 'route-mnl-tag',
    originAirportId: 'airport-mnl',
    destinationAirportId: 'airport-tag',
    distanceKm: 630,
    durationMinutes: 90,
    status: 'ACTIVE',
  },
  {
    id: 'route-ceb-dvo',
    originAirportId: 'airport-ceb',
    destinationAirportId: 'airport-dvo',
    distanceKm: 390,
    durationMinutes: 75,
    status: 'ACTIVE',
  },
];

/* -------------------------------------------------------------------------- */
/* AIRCRAFT                                                                   */
/* -------------------------------------------------------------------------- */

export const aircraft: Aircraft[] = [
  {
    id: 'aircraft-a320-001',
    registrationNumber: 'AP-A32001',
    model: 'A320-200',
    manufacturer: 'Airbus',
    totalSeats: 180,
    status: 'ACTIVE',
    yearOfManufacture: 2021,
  },
  {
    id: 'aircraft-a321-001',
    registrationNumber: 'AP-A32101',
    model: 'A321neo',
    manufacturer: 'Airbus',
    totalSeats: 216,
    status: 'ACTIVE',
    yearOfManufacture: 2023,
  },
  {
    id: 'aircraft-a220-001',
    registrationNumber: 'AP-A22001',
    model: 'A220-300',
    manufacturer: 'Airbus',
    totalSeats: 140,
    status: 'ACTIVE',
    yearOfManufacture: 2024,
  },
  {
    id: 'aircraft-atr-001',
    registrationNumber: 'AP-ATR01',
    model: 'ATR 72-600',
    manufacturer: 'ATR',
    totalSeats: 72,
    status: 'ACTIVE',
    yearOfManufacture: 2020,
  },
  {
    id: 'aircraft-a320-002',
    registrationNumber: 'AP-A32002',
    model: 'A320-200',
    manufacturer: 'Airbus',
    totalSeats: 180,
    status: 'MAINTENANCE',
    yearOfManufacture: 2018,
  },
];

/* -------------------------------------------------------------------------- */
/* AIRCRAFT SEATS                                                             */
/* -------------------------------------------------------------------------- */

function generateSeats(
  aircraftId: string,
  rows: number,
  columns: string[],
  premiumRows: number[] = [],
): AircraftSeat[] {
  const result: AircraftSeat[] = [];

  for (let row = 1; row <= rows; row += 1) {
    for (const column of columns) {
      const seatNumber = `${row}${column}`;

      const cabinClass = premiumRows.includes(row) ? 'BUSINESS' : 'ECONOMY';

      let seatType: AircraftSeat['seatType'] = 'STANDARD';

      if (column === 'A' || column === 'F') {
        seatType = 'WINDOW';
      }

      if (column === 'C' || column === 'D') {
        seatType = 'AISLE';
      }

      if (row === 12 || row === 13) {
        seatType = 'EXIT_ROW';
      }

      if (row <= 3 && cabinClass === 'BUSINESS') {
        seatType = 'EXTRA_LEGROOM';
      }

      result.push({
        id: `seat-${aircraftId}-${seatNumber}`,
        aircraftId,
        seatNumber,
        row,
        column,
        cabinClass,
        seatType,
        status:
          seatNumber === '29A' || seatNumber === '29B' ?
            'BLOCKED'
          : 'AVAILABLE',
      });
    }
  }

  return result;
}

export const aircraftSeats: AircraftSeat[] = [
  ...generateSeats(
    'aircraft-a320-001',
    30,
    ['A', 'B', 'C', 'D', 'E', 'F'],
    [1, 2, 3],
  ),

  ...generateSeats(
    'aircraft-a321-001',
    36,
    ['A', 'B', 'C', 'D', 'E', 'F'],
    [1, 2, 3, 4],
  ),

  ...generateSeats(
    'aircraft-a220-001',
    24,
    ['A', 'B', 'C', 'D', 'E', 'F'],
    [1, 2, 3],
  ),

  ...generateSeats('aircraft-atr-001', 12, ['A', 'B', 'C', 'D', 'E', 'F']),

  ...generateSeats(
    'aircraft-a320-002',
    30,
    ['A', 'B', 'C', 'D', 'E', 'F'],
    [1, 2, 3],
  ),
];

/* -------------------------------------------------------------------------- */
/* SCHEDULES                                                                  */
/* -------------------------------------------------------------------------- */

export const schedules: Schedule[] = [
  {
    id: 'schedule-001',
    flightNumber: 'AP204',
    routeId: 'route-mnl-cgy',
    aircraftId: 'aircraft-a320-001',
    departureTime: '08:30',
    arrivalTime: '10:15',
    frequency: 'DAILY',
    active: true,
  },
  {
    id: 'schedule-002',
    flightNumber: 'AP205',
    routeId: 'route-cgy-mnl',
    aircraftId: 'aircraft-a320-001',
    departureTime: '11:15',
    arrivalTime: '12:55',
    frequency: 'DAILY',
    active: true,
  },
  {
    id: 'schedule-003',
    flightNumber: 'AP301',
    routeId: 'route-mnl-ceb',
    aircraftId: 'aircraft-a321-001',
    departureTime: '06:30',
    arrivalTime: '07:55',
    frequency: 'DAILY',
    active: true,
  },
  {
    id: 'schedule-004',
    flightNumber: 'AP302',
    routeId: 'route-ceb-mnl',
    aircraftId: 'aircraft-a321-001',
    departureTime: '09:15',
    arrivalTime: '10:45',
    frequency: 'DAILY',
    active: true,
  },
  {
    id: 'schedule-005',
    flightNumber: 'AP401',
    routeId: 'route-mnl-dvo',
    aircraftId: 'aircraft-a321-001',
    departureTime: '10:45',
    arrivalTime: '12:45',
    frequency: 'DAILY',
    active: true,
  },
  {
    id: 'schedule-006',
    flightNumber: 'AP402',
    routeId: 'route-dvo-mnl',
    aircraftId: 'aircraft-a321-001',
    departureTime: '14:15',
    arrivalTime: '16:15',
    frequency: 'DAILY',
    active: true,
  },
  {
    id: 'schedule-007',
    flightNumber: 'AP501',
    routeId: 'route-ceb-cgy',
    aircraftId: 'aircraft-atr-001',
    departureTime: '13:20',
    arrivalTime: '14:30',
    frequency: 'DAILY',
    active: true,
  },
  {
    id: 'schedule-008',
    flightNumber: 'AP502',
    routeId: 'route-cgy-ceb',
    aircraftId: 'aircraft-atr-001',
    departureTime: '15:15',
    arrivalTime: '16:30',
    frequency: 'DAILY',
    active: true,
  },
  {
    id: 'schedule-009',
    flightNumber: 'AP701',
    routeId: 'route-mnl-pps',
    aircraftId: 'aircraft-a220-001',
    departureTime: '09:45',
    arrivalTime: '11:05',
    frequency: 'DAILY',
    active: true,
  },
  {
    id: 'schedule-010',
    flightNumber: 'AP801',
    routeId: 'route-mnl-ilo',
    aircraftId: 'aircraft-a220-001',
    departureTime: '15:00',
    arrivalTime: '16:15',
    frequency: 'DAILY',
    active: true,
  },
  {
    id: 'schedule-011',
    flightNumber: 'AP901',
    routeId: 'route-mnl-tag',
    aircraftId: 'aircraft-a320-001',
    departureTime: '12:30',
    arrivalTime: '14:00',
    frequency: 'WEEKENDS',
    active: true,
  },
  {
    id: 'schedule-012',
    flightNumber: 'AP601',
    routeId: 'route-ceb-dvo',
    aircraftId: 'aircraft-atr-001',
    departureTime: '17:20',
    arrivalTime: '18:35',
    frequency: 'DAILY',
    active: true,
  },
];

/* -------------------------------------------------------------------------- */
/* FLIGHT CREATION                                                            */
/* -------------------------------------------------------------------------- */

function createFlight(
  id: string,
  scheduleId: string,
  date: string,
  status: FlightStatus,
  gate: string,
  seatsAvailable: number,
  checkedInPassengers: number,
  boardedPassengers: number,
  delayMinutes = 0,
): Flight {
  const schedule = schedules.find((item) => item.id === scheduleId);

  if (!schedule) {
    throw new Error(`Missing schedule: ${scheduleId}`);
  }

  const route = routes.find((item) => item.id === schedule.routeId);

  if (!route) {
    throw new Error(`Missing route: ${schedule.routeId}`);
  }

  const aircraftItem = aircraft.find((item) => item.id === schedule.aircraftId);

  if (!aircraftItem) {
    throw new Error(`Missing aircraft: ${schedule.aircraftId}`);
  }

  const originAirport = airports.find(
    (airport) => airport.id === route.originAirportId,
  );

  if (!originAirport) {
    throw new Error(`Missing origin airport: ${route.originAirportId}`);
  }

  return {
    id,
    flightNumber: schedule.flightNumber,
    scheduleId,
    routeId: route.id,
    aircraftId: aircraftItem.id,
    departureDate: date,
    departureTime: schedule.departureTime,
    arrivalDate: date,
    arrivalTime: schedule.arrivalTime,
    durationMinutes: route.durationMinutes,
    gate,
    terminal: originAirport.terminal,
    status,
    capacity: aircraftItem.totalSeats,
    seatsAvailable,
    checkedInPassengers,
    boardedPassengers,
    delayMinutes,
  };
}

/* -------------------------------------------------------------------------- */
/* FLIGHTS                                                                    */
/* -------------------------------------------------------------------------- */

export const flights: Flight[] = [
  createFlight(
    'flight-001',
    'schedule-001',
    '2026-09-22',
    'BOARDING',
    'A12',
    71,
    94,
    72,
  ),
  createFlight(
    'flight-002',
    'schedule-002',
    '2026-09-22',
    'CHECK_IN_OPEN',
    'B06',
    96,
    62,
    0,
  ),
  createFlight(
    'flight-003',
    'schedule-003',
    '2026-09-22',
    'DEPARTED',
    'C01',
    48,
    122,
    122,
  ),
  createFlight(
    'flight-004',
    'schedule-004',
    '2026-09-22',
    'SCHEDULED',
    'C07',
    154,
    0,
    0,
  ),
  createFlight(
    'flight-005',
    'schedule-005',
    '2026-09-22',
    'DELAYED',
    'D03',
    33,
    109,
    0,
    45,
  ),
  createFlight(
    'flight-006',
    'schedule-006',
    '2026-09-23',
    'SCHEDULED',
    'D08',
    131,
    0,
    0,
  ),
  createFlight(
    'flight-007',
    'schedule-007',
    '2026-09-23',
    'SCHEDULED',
    'E02',
    41,
    0,
    0,
  ),
  createFlight(
    'flight-008',
    'schedule-008',
    '2026-09-23',
    'SCHEDULED',
    'E05',
    49,
    0,
    0,
  ),
  createFlight(
    'flight-009',
    'schedule-009',
    '2026-09-24',
    'SCHEDULED',
    'F03',
    88,
    0,
    0,
  ),
  createFlight(
    'flight-010',
    'schedule-010',
    '2026-09-24',
    'SCHEDULED',
    'F08',
    102,
    0,
    0,
  ),
  createFlight(
    'flight-011',
    'schedule-011',
    '2026-09-26',
    'SCHEDULED',
    'G02',
    112,
    0,
    0,
  ),
  createFlight(
    'flight-012',
    'schedule-012',
    '2026-09-25',
    'SCHEDULED',
    'H04',
    36,
    0,
    0,
  ),
  createFlight(
    'flight-013',
    'schedule-001',
    '2026-10-01',
    'SCHEDULED',
    'A14',
    109,
    0,
    0,
  ),
  createFlight(
    'flight-014',
    'schedule-003',
    '2026-10-01',
    'SCHEDULED',
    'C04',
    132,
    0,
    0,
  ),
  createFlight(
    'flight-015',
    'schedule-005',
    '2026-10-02',
    'SCHEDULED',
    'D06',
    76,
    0,
    0,
  ),
  createFlight(
    'flight-016',
    'schedule-009',
    '2026-10-03',
    'SCHEDULED',
    'F05',
    116,
    0,
    0,
  ),
  createFlight(
    'flight-017',
    'schedule-010',
    '2026-10-04',
    'SCHEDULED',
    'F09',
    91,
    0,
    0,
  ),
  createFlight(
    'flight-018',
    'schedule-007',
    '2026-10-05',
    'SCHEDULED',
    'E04',
    32,
    0,
    0,
  ),
];

/* -------------------------------------------------------------------------- */
/* FARE CLASSES                                                               */
/* -------------------------------------------------------------------------- */

export const fareClasses: FareClass[] = [
  {
    id: 'fare-economy',
    code: 'ECONOMY',
    name: 'Economy',
    description: 'Essential fare with standard seating and cabin baggage.',
    baggageAllowanceKg: 7,
    cabinClass: 'ECONOMY',
    refundable: false,
    changeable: true,
    changeFee: 1500,
  },
  {
    id: 'fare-premium',
    code: 'PREMIUM',
    name: 'Premium Economy',
    description: 'Extra legroom, priority services, and checked baggage.',
    baggageAllowanceKg: 20,
    cabinClass: 'PREMIUM_ECONOMY',
    refundable: true,
    changeable: true,
    changeFee: 800,
  },
  {
    id: 'fare-business',
    code: 'BUSINESS',
    name: 'Business',
    description: 'Premium cabin with flexible travel benefits.',
    baggageAllowanceKg: 30,
    cabinClass: 'BUSINESS',
    refundable: true,
    changeable: true,
    changeFee: 0,
  },
];

/* -------------------------------------------------------------------------- */
/* FLIGHT FARES                                                               */
/* -------------------------------------------------------------------------- */

const fareSeed: Array<[string, number, number, number]> = [
  ['flight-001', 3250, 5450, 9800],
  ['flight-002', 3490, 5750, 10200],
  ['flight-003', 2990, 4990, 9200],
  ['flight-004', 3190, 5290, 9500],
  ['flight-005', 2890, 4790, 8900],
  ['flight-006', 3050, 5090, 9300],
  ['flight-007', 2150, 3490, 6500],
  ['flight-008', 2250, 3590, 6700],
  ['flight-009', 2990, 4990, 8500],
  ['flight-010', 2790, 4590, 7900],
  ['flight-011', 3350, 5690, 9800],
  ['flight-012', 2590, 4190, 7200],
  ['flight-013', 3290, 5490, 9900],
  ['flight-014', 3090, 5190, 9400],
  ['flight-015', 3150, 5290, 9600],
  ['flight-016', 2890, 4790, 8500],
  ['flight-017', 2750, 4490, 7900],
  ['flight-018', 2190, 3590, 6500],
];

export const flightFares: FlightFare[] = fareSeed.flatMap(
  ([flightId, economyPrice, premiumPrice, businessPrice]) => [
    {
      id: `flight-fare-${flightId}-economy`,
      flightId,
      fareClassId: 'fare-economy',
      price: economyPrice,
      taxesIncluded: false,
      seatsAvailable: 100,
    },
    {
      id: `flight-fare-${flightId}-premium`,
      flightId,
      fareClassId: 'fare-premium',
      price: premiumPrice,
      taxesIncluded: false,
      seatsAvailable: 30,
    },
    {
      id: `flight-fare-${flightId}-business`,
      flightId,
      fareClassId: 'fare-business',
      price: businessPrice,
      taxesIncluded: false,
      seatsAvailable: 12,
    },
  ],
);

/* -------------------------------------------------------------------------- */
/* PASSENGERS                                                                 */
/* -------------------------------------------------------------------------- */

export const passengers: Passenger[] = [
  {
    id: 'passenger-001',
    bookingId: 'booking-001',
    firstName: 'Juan',
    middleName: 'Miguel',
    lastName: 'Dela Cruz',
    email: 'juan@aeropass.local',
    phone: '+639171100001',
    dateOfBirth: '1996-05-12',
    gender: 'MALE',
    nationality: 'Filipino',
    passportNumber: 'PDEMO0001',
    passportExpiry: '2032-05-12',
    specialAssistance: false,
    frequentFlyerNumber: 'APF-10001',
  },
  {
    id: 'passenger-002',
    bookingId: 'booking-002',
    firstName: 'Maria',
    middleName: 'Anne',
    lastName: 'Lopez',
    email: 'maria@aeropass.local',
    phone: '+639171100002',
    dateOfBirth: '1998-08-20',
    gender: 'FEMALE',
    nationality: 'Filipino',
    passportNumber: 'PDEMO0002',
    passportExpiry: '2033-08-20',
    specialAssistance: false,
    frequentFlyerNumber: 'APF-10002',
  },
  {
    id: 'passenger-003',
    bookingId: 'booking-003',
    firstName: 'Jose',
    middleName: 'Luis',
    lastName: 'Ramos',
    email: 'jose@aeropass.local',
    phone: '+639171100003',
    dateOfBirth: '1993-02-14',
    gender: 'MALE',
    nationality: 'Filipino',
    passportNumber: 'PDEMO0003',
    passportExpiry: '2031-02-14',
    specialAssistance: false,
  },
  {
    id: 'passenger-004',
    bookingId: 'booking-004',
    firstName: 'Ana',
    middleName: 'Marie',
    lastName: 'Torres',
    email: 'ana@aeropass.local',
    phone: '+639171100004',
    dateOfBirth: '1994-11-02',
    gender: 'FEMALE',
    nationality: 'Filipino',
    passportNumber: 'PDEMO0004',
    passportExpiry: '2031-11-02',
    specialAssistance: false,
  },
  {
    id: 'passenger-005',
    bookingId: 'booking-005',
    firstName: 'Miguel',
    lastName: 'Santos',
    email: 'miguel@aeropass.local',
    phone: '+639171100005',
    dateOfBirth: '1991-03-18',
    gender: 'MALE',
    nationality: 'Filipino',
    passportNumber: 'PDEMO0005',
    passportExpiry: '2031-03-18',
    specialAssistance: true,
  },
  {
    id: 'passenger-006',
    bookingId: 'booking-006',
    firstName: 'Sofia',
    middleName: 'Grace',
    lastName: 'Garcia',
    email: 'sofia@aeropass.local',
    phone: '+639171100006',
    dateOfBirth: '1997-09-22',
    gender: 'FEMALE',
    nationality: 'Filipino',
    passportNumber: 'PDEMO0006',
    passportExpiry: '2032-09-22',
    specialAssistance: false,
  },
  {
    id: 'passenger-007',
    bookingId: 'booking-007',
    firstName: 'Paolo',
    middleName: 'James',
    lastName: 'Mendoza',
    email: 'paolo@aeropass.local',
    phone: '+639171100007',
    dateOfBirth: '1989-12-10',
    gender: 'MALE',
    nationality: 'Filipino',
    passportNumber: 'PDEMO0007',
    passportExpiry: '2030-12-10',
    specialAssistance: false,
  },
  {
    id: 'passenger-008',
    bookingId: 'booking-008',
    firstName: 'Elena',
    middleName: 'Rose',
    lastName: 'Dela Cruz',
    email: 'elena@aeropass.local',
    phone: '+639171100008',
    dateOfBirth: '1999-04-05',
    gender: 'FEMALE',
    nationality: 'Filipino',
    passportNumber: 'PDEMO0008',
    passportExpiry: '2033-04-05',
    specialAssistance: false,
  },
  {
    id: 'passenger-009',
    bookingId: 'booking-009',
    firstName: 'Carlos',
    lastName: 'Reyes',
    email: 'carlos@aeropass.local',
    phone: '+639171100009',
    dateOfBirth: '1990-06-25',
    gender: 'MALE',
    nationality: 'Filipino',
    passportNumber: 'PDEMO0009',
    passportExpiry: '2030-06-25',
    specialAssistance: false,
  },
  {
    id: 'passenger-010',
    bookingId: 'booking-010',
    firstName: 'Beatriz',
    lastName: 'Navarro',
    email: 'beatriz@aeropass.local',
    phone: '+639171100010',
    dateOfBirth: '1995-01-30',
    gender: 'FEMALE',
    nationality: 'Filipino',
    passportNumber: 'PDEMO0010',
    passportExpiry: '2032-01-30',
    specialAssistance: false,
  },
];

/* -------------------------------------------------------------------------- */
/* BOOKINGS                                                                   */
/* -------------------------------------------------------------------------- */

export const bookings: Booking[] = [
  {
    id: 'booking-001',
    bookingReference: 'APX8K2',
    customerId: 'user-006',
    flightId: 'flight-001',
    status: 'CHECKED_IN',
    passengerCount: 1,
    subtotal: 3250,
    taxes: 390,
    fees: 250,
    baggageFees: 800,
    seatFees: 350,
    discount: 0,
    total: 5040,
    currency: 'PHP',
    paymentStatus: 'PAID',
    paymentMethod: 'GCASH',
    createdAt: '2026-09-18T08:30:00+08:00',
    expiresAt: null,
  },
  {
    id: 'booking-002',
    bookingReference: 'APM4Q7',
    customerId: 'user-007',
    flightId: 'flight-001',
    status: 'CONFIRMED',
    passengerCount: 1,
    subtotal: 5450,
    taxes: 654,
    fees: 250,
    baggageFees: 0,
    seatFees: 350,
    discount: 0,
    total: 6704,
    currency: 'PHP',
    paymentStatus: 'PAID',
    paymentMethod: 'MAYA',
    createdAt: '2026-09-19T09:15:00+08:00',
    expiresAt: null,
  },
  {
    id: 'booking-003',
    bookingReference: 'APK3V9',
    customerId: 'user-008',
    flightId: 'flight-002',
    status: 'PENDING_PAYMENT',
    passengerCount: 1,
    subtotal: 3190,
    taxes: 383,
    fees: 250,
    baggageFees: 0,
    seatFees: 0,
    discount: 0,
    total: 3823,
    currency: 'PHP',
    paymentStatus: 'PENDING',
    paymentMethod: 'GCASH',
    createdAt: '2026-09-22T07:10:00+08:00',
    expiresAt: '2026-09-22T07:40:00+08:00',
  },
  {
    id: 'booking-004',
    bookingReference: 'APQ9T4',
    customerId: 'user-009',
    flightId: 'flight-004',
    status: 'CONFIRMED',
    passengerCount: 1,
    subtotal: 2990,
    taxes: 359,
    fees: 250,
    baggageFees: 800,
    seatFees: 350,
    discount: 300,
    total: 4449,
    currency: 'PHP',
    paymentStatus: 'PAID',
    paymentMethod: 'QRPH',
    createdAt: '2026-09-19T11:20:00+08:00',
    expiresAt: null,
  },
  {
    id: 'booking-005',
    bookingReference: 'APZ5H1',
    customerId: 'user-010',
    flightId: 'flight-005',
    status: 'CONFIRMED',
    passengerCount: 1,
    subtotal: 2890,
    taxes: 347,
    fees: 250,
    baggageFees: 1200,
    seatFees: 350,
    discount: 0,
    total: 5037,
    currency: 'PHP',
    paymentStatus: 'PAID',
    paymentMethod: 'CARD',
    createdAt: '2026-09-20T14:05:00+08:00',
    expiresAt: null,
  },
  {
    id: 'booking-006',
    bookingReference: 'APW2C8',
    customerId: 'user-011',
    flightId: 'flight-006',
    status: 'CONFIRMED',
    passengerCount: 1,
    subtotal: 3050,
    taxes: 366,
    fees: 250,
    baggageFees: 800,
    seatFees: 0,
    discount: 0,
    total: 4466,
    currency: 'PHP',
    paymentStatus: 'PAID',
    paymentMethod: 'MAYA',
    createdAt: '2026-09-21T08:25:00+08:00',
    expiresAt: null,
  },
  {
    id: 'booking-007',
    bookingReference: 'APN7L5',
    customerId: 'user-006',
    flightId: 'flight-007',
    status: 'COMPLETED',
    passengerCount: 1,
    subtotal: 2150,
    taxes: 258,
    fees: 250,
    baggageFees: 500,
    seatFees: 150,
    discount: 0,
    total: 3308,
    currency: 'PHP',
    paymentStatus: 'PAID',
    paymentMethod: 'GCASH',
    createdAt: '2026-09-10T15:30:00+08:00',
    expiresAt: null,
  },
  {
    id: 'booking-008',
    bookingReference: 'APF1Y6',
    customerId: 'user-007',
    flightId: 'flight-008',
    status: 'CANCELLED',
    passengerCount: 1,
    subtotal: 2250,
    taxes: 270,
    fees: 250,
    baggageFees: 0,
    seatFees: 0,
    discount: 0,
    total: 2770,
    currency: 'PHP',
    paymentStatus: 'CANCELLED',
    paymentMethod: 'CARD',
    createdAt: '2026-09-12T10:30:00+08:00',
    expiresAt: null,
  },
  {
    id: 'booking-009',
    bookingReference: 'APR4B2',
    customerId: 'user-008',
    flightId: 'flight-009',
    status: 'REFUND_PENDING',
    passengerCount: 1,
    subtotal: 2990,
    taxes: 359,
    fees: 250,
    baggageFees: 800,
    seatFees: 350,
    discount: 0,
    total: 4749,
    currency: 'PHP',
    paymentStatus: 'PAID',
    paymentMethod: 'MAYA',
    createdAt: '2026-09-15T13:40:00+08:00',
    expiresAt: null,
  },
  {
    id: 'booking-010',
    bookingReference: 'APD6P4',
    customerId: 'user-012',
    flightId: 'flight-010',
    status: 'CONFIRMED',
    passengerCount: 1,
    subtotal: 2790,
    taxes: 335,
    fees: 250,
    baggageFees: 800,
    seatFees: 350,
    discount: 250,
    total: 4275,
    currency: 'PHP',
    paymentStatus: 'PAID',
    paymentMethod: 'BANK_TRANSFER',
    createdAt: '2026-09-20T16:20:00+08:00',
    expiresAt: null,
  },
];

/* -------------------------------------------------------------------------- */
/* RESERVATIONS                                                               */
/* -------------------------------------------------------------------------- */

export const reservations: Reservation[] = [
  {
    id: 'reservation-001',
    bookingId: 'booking-001',
    passengerId: 'passenger-001',
    flightId: 'flight-001',
    seatId: 'seat-aircraft-a320-001-12A',
    fareClassId: 'fare-economy',
    status: 'CONFIRMED',
    price: 3250,
    createdAt: '2026-09-18T08:32:00+08:00',
  },
  {
    id: 'reservation-002',
    bookingId: 'booking-002',
    passengerId: 'passenger-002',
    flightId: 'flight-001',
    seatId: 'seat-aircraft-a320-001-12B',
    fareClassId: 'fare-premium',
    status: 'CONFIRMED',
    price: 5450,
    createdAt: '2026-09-19T09:18:00+08:00',
  },
  {
    id: 'reservation-003',
    bookingId: 'booking-003',
    passengerId: 'passenger-003',
    flightId: 'flight-002',
    seatId: 'seat-aircraft-a320-001-08C',
    fareClassId: 'fare-economy',
    status: 'HELD',
    price: 3190,
    createdAt: '2026-09-22T07:11:00+08:00',
  },
  {
    id: 'reservation-004',
    bookingId: 'booking-004',
    passengerId: 'passenger-004',
    flightId: 'flight-004',
    seatId: 'seat-aircraft-a321-001-04A',
    fareClassId: 'fare-economy',
    status: 'CONFIRMED',
    price: 2990,
    createdAt: '2026-09-19T11:23:00+08:00',
  },
  {
    id: 'reservation-005',
    bookingId: 'booking-005',
    passengerId: 'passenger-005',
    flightId: 'flight-005',
    seatId: 'seat-aircraft-a321-001-15F',
    fareClassId: 'fare-economy',
    status: 'CONFIRMED',
    price: 2890,
    createdAt: '2026-09-20T14:07:00+08:00',
  },
  {
    id: 'reservation-006',
    bookingId: 'booking-006',
    passengerId: 'passenger-006',
    flightId: 'flight-006',
    seatId: 'seat-aircraft-a321-001-09A',
    fareClassId: 'fare-economy',
    status: 'CONFIRMED',
    price: 3050,
    createdAt: '2026-09-21T08:28:00+08:00',
  },
  {
    id: 'reservation-007',
    bookingId: 'booking-007',
    passengerId: 'passenger-007',
    flightId: 'flight-007',
    seatId: 'seat-aircraft-atr-001-05A',
    fareClassId: 'fare-economy',
    status: 'CONFIRMED',
    price: 2150,
    createdAt: '2026-09-10T15:33:00+08:00',
  },
  {
    id: 'reservation-008',
    bookingId: 'booking-008',
    passengerId: 'passenger-008',
    flightId: 'flight-008',
    seatId: 'seat-aircraft-atr-001-06B',
    fareClassId: 'fare-economy',
    status: 'CANCELLED',
    price: 2250,
    createdAt: '2026-09-12T10:33:00+08:00',
  },
  {
    id: 'reservation-009',
    bookingId: 'booking-009',
    passengerId: 'passenger-009',
    flightId: 'flight-009',
    seatId: 'seat-aircraft-a220-001-14C',
    fareClassId: 'fare-economy',
    status: 'CONFIRMED',
    price: 2990,
    createdAt: '2026-09-15T13:43:00+08:00',
  },
  {
    id: 'reservation-010',
    bookingId: 'booking-010',
    passengerId: 'passenger-010',
    flightId: 'flight-010',
    seatId: 'seat-aircraft-a220-001-07D',
    fareClassId: 'fare-economy',
    status: 'CONFIRMED',
    price: 2790,
    createdAt: '2026-09-20T16:23:00+08:00',
  },
];

/* -------------------------------------------------------------------------- */
/* PAYMENT ATTEMPTS                                                           */
/* -------------------------------------------------------------------------- */

export const paymentAttempts: PaymentAttempt[] = [
  {
    id: 'attempt-001',
    bookingId: 'booking-001',
    provider: 'LOCAL_MOCK',
    reference: 'MOCK-APX8K2-01',
    method: 'GCASH',
    amount: 5040,
    status: 'PAID',
    attemptedAt: '2026-09-18T08:35:00+08:00',
  },
  {
    id: 'attempt-002',
    bookingId: 'booking-002',
    provider: 'LOCAL_MOCK',
    reference: 'MOCK-APM4Q7-01',
    method: 'MAYA',
    amount: 6704,
    status: 'PAID',
    attemptedAt: '2026-09-19T09:20:00+08:00',
  },
  {
    id: 'attempt-003',
    bookingId: 'booking-003',
    provider: 'LOCAL_MOCK',
    reference: 'MOCK-APK3V9-01',
    method: 'GCASH',
    amount: 3823,
    status: 'PENDING',
    attemptedAt: '2026-09-22T07:12:00+08:00',
  },
  {
    id: 'attempt-004',
    bookingId: 'booking-004',
    provider: 'LOCAL_MOCK',
    reference: 'MOCK-APQ9T4-01',
    method: 'QRPH',
    amount: 4449,
    status: 'PAID',
    attemptedAt: '2026-09-19T11:25:00+08:00',
  },
  {
    id: 'attempt-005',
    bookingId: 'booking-005',
    provider: 'LOCAL_MOCK',
    reference: 'MOCK-APZ5H1-01',
    method: 'CARD',
    amount: 5037,
    status: 'PAID',
    attemptedAt: '2026-09-20T14:10:00+08:00',
  },
  {
    id: 'attempt-006',
    bookingId: 'booking-008',
    provider: 'LOCAL_MOCK',
    reference: 'MOCK-APF1Y6-01',
    method: 'CARD',
    amount: 2770,
    status: 'FAILED',
    attemptedAt: '2026-09-12T10:35:00+08:00',
  },
];

/* -------------------------------------------------------------------------- */
/* PAYMENTS                                                                   */
/* -------------------------------------------------------------------------- */

export const payments: Payment[] = [
  {
    id: 'payment-001',
    bookingId: 'booking-001',
    provider: 'LOCAL_MOCK',
    providerReference: 'LOCAL-PAY-APX8K2',
    paymentMethod: 'GCASH',
    amount: 5040,
    currency: 'PHP',
    status: 'PAID',
    paidAt: '2026-09-18T08:35:00+08:00',
    createdAt: '2026-09-18T08:32:00+08:00',
  },
  {
    id: 'payment-002',
    bookingId: 'booking-002',
    provider: 'LOCAL_MOCK',
    providerReference: 'LOCAL-PAY-APM4Q7',
    paymentMethod: 'MAYA',
    amount: 6704,
    currency: 'PHP',
    status: 'PAID',
    paidAt: '2026-09-19T09:20:00+08:00',
    createdAt: '2026-09-19T09:18:00+08:00',
  },
  {
    id: 'payment-003',
    bookingId: 'booking-003',
    provider: 'LOCAL_MOCK',
    providerReference: 'LOCAL-PAY-APK3V9',
    paymentMethod: 'GCASH',
    amount: 3823,
    currency: 'PHP',
    status: 'PENDING',
    paidAt: null,
    createdAt: '2026-09-22T07:12:00+08:00',
  },
  {
    id: 'payment-004',
    bookingId: 'booking-004',
    provider: 'LOCAL_MOCK',
    providerReference: 'LOCAL-PAY-APQ9T4',
    paymentMethod: 'QRPH',
    amount: 4449,
    currency: 'PHP',
    status: 'PAID',
    paidAt: '2026-09-19T11:25:00+08:00',
    createdAt: '2026-09-19T11:23:00+08:00',
  },
  {
    id: 'payment-005',
    bookingId: 'booking-005',
    provider: 'LOCAL_MOCK',
    providerReference: 'LOCAL-PAY-APZ5H1',
    paymentMethod: 'CARD',
    amount: 5037,
    currency: 'PHP',
    status: 'PAID',
    paidAt: '2026-09-20T14:10:00+08:00',
    createdAt: '2026-09-20T14:07:00+08:00',
  },
  {
    id: 'payment-006',
    bookingId: 'booking-006',
    provider: 'LOCAL_MOCK',
    providerReference: 'LOCAL-PAY-APW2C8',
    paymentMethod: 'MAYA',
    amount: 4466,
    currency: 'PHP',
    status: 'PAID',
    paidAt: '2026-09-21T08:30:00+08:00',
    createdAt: '2026-09-21T08:28:00+08:00',
  },
  {
    id: 'payment-007',
    bookingId: 'booking-007',
    provider: 'LOCAL_MOCK',
    providerReference: 'LOCAL-PAY-APN7L5',
    paymentMethod: 'GCASH',
    amount: 3308,
    currency: 'PHP',
    status: 'PAID',
    paidAt: '2026-09-10T15:35:00+08:00',
    createdAt: '2026-09-10T15:33:00+08:00',
  },
  {
    id: 'payment-008',
    bookingId: 'booking-008',
    provider: 'LOCAL_MOCK',
    providerReference: 'LOCAL-PAY-APF1Y6',
    paymentMethod: 'CARD',
    amount: 2770,
    currency: 'PHP',
    status: 'CANCELLED',
    paidAt: null,
    createdAt: '2026-09-12T10:35:00+08:00',
  },
  {
    id: 'payment-009',
    bookingId: 'booking-009',
    provider: 'LOCAL_MOCK',
    providerReference: 'LOCAL-PAY-APR4B2',
    paymentMethod: 'MAYA',
    amount: 4749,
    currency: 'PHP',
    status: 'PAID',
    paidAt: '2026-09-15T13:45:00+08:00',
    createdAt: '2026-09-15T13:43:00+08:00',
  },
  {
    id: 'payment-010',
    bookingId: 'booking-010',
    provider: 'LOCAL_MOCK',
    providerReference: 'LOCAL-PAY-APD6P4',
    paymentMethod: 'BANK_TRANSFER',
    amount: 4275,
    currency: 'PHP',
    status: 'PAID',
    paidAt: '2026-09-20T16:25:00+08:00',
    createdAt: '2026-09-20T16:23:00+08:00',
  },
];

/* -------------------------------------------------------------------------- */
/* TICKETS                                                                    */
/* -------------------------------------------------------------------------- */

export const tickets: Ticket[] = [
  {
    id: 'ticket-001',
    bookingId: 'booking-001',
    passengerId: 'passenger-001',
    flightId: 'flight-001',
    seatId: 'seat-aircraft-a320-001-12A',
    ticketNumber: '230-1000000001',
    qrToken: 'AP-QR-APX8K2-PASSENGER001',
    status: 'USED',
    issuedAt: '2026-09-18T08:40:00+08:00',
    expiresAt: '2026-09-22T23:59:59+08:00',
  },
  {
    id: 'ticket-002',
    bookingId: 'booking-002',
    passengerId: 'passenger-002',
    flightId: 'flight-001',
    seatId: 'seat-aircraft-a320-001-12B',
    ticketNumber: '230-1000000002',
    qrToken: 'AP-QR-APM4Q7-PASSENGER002',
    status: 'VALID',
    issuedAt: '2026-09-19T09:25:00+08:00',
    expiresAt: '2026-09-22T23:59:59+08:00',
  },
  {
    id: 'ticket-003',
    bookingId: 'booking-004',
    passengerId: 'passenger-004',
    flightId: 'flight-004',
    seatId: 'seat-aircraft-a321-001-04A',
    ticketNumber: '230-1000000003',
    qrToken: 'AP-QR-APQ9T4-PASSENGER004',
    status: 'VALID',
    issuedAt: '2026-09-19T11:30:00+08:00',
    expiresAt: '2026-09-22T23:59:59+08:00',
  },
  {
    id: 'ticket-004',
    bookingId: 'booking-005',
    passengerId: 'passenger-005',
    flightId: 'flight-005',
    seatId: 'seat-aircraft-a321-001-15F',
    ticketNumber: '230-1000000004',
    qrToken: 'AP-QR-APZ5H1-PASSENGER005',
    status: 'VALID',
    issuedAt: '2026-09-20T14:15:00+08:00',
    expiresAt: '2026-09-22T23:59:59+08:00',
  },
  {
    id: 'ticket-005',
    bookingId: 'booking-006',
    passengerId: 'passenger-006',
    flightId: 'flight-006',
    seatId: 'seat-aircraft-a321-001-09A',
    ticketNumber: '230-1000000005',
    qrToken: 'AP-QR-APW2C8-PASSENGER006',
    status: 'VALID',
    issuedAt: '2026-09-21T08:35:00+08:00',
    expiresAt: '2026-09-23T23:59:59+08:00',
  },
  {
    id: 'ticket-006',
    bookingId: 'booking-007',
    passengerId: 'passenger-007',
    flightId: 'flight-007',
    seatId: 'seat-aircraft-atr-001-05A',
    ticketNumber: '230-1000000006',
    qrToken: 'AP-QR-APN7L5-PASSENGER007',
    status: 'USED',
    issuedAt: '2026-09-10T15:40:00+08:00',
    expiresAt: '2026-09-23T23:59:59+08:00',
  },
  {
    id: 'ticket-007',
    bookingId: 'booking-008',
    passengerId: 'passenger-008',
    flightId: 'flight-008',
    seatId: 'seat-aircraft-atr-001-06B',
    ticketNumber: '230-1000000007',
    qrToken: 'AP-QR-APF1Y6-PASSENGER008',
    status: 'CANCELLED',
    issuedAt: '2026-09-12T10:40:00+08:00',
    expiresAt: '2026-09-23T23:59:59+08:00',
  },
  {
    id: 'ticket-008',
    bookingId: 'booking-009',
    passengerId: 'passenger-009',
    flightId: 'flight-009',
    seatId: 'seat-aircraft-a220-001-14C',
    ticketNumber: '230-1000000008',
    qrToken: 'AP-QR-APR4B2-PASSENGER009',
    status: 'VALID',
    issuedAt: '2026-09-15T13:50:00+08:00',
    expiresAt: '2026-09-24T23:59:59+08:00',
  },
  {
    id: 'ticket-009',
    bookingId: 'booking-010',
    passengerId: 'passenger-010',
    flightId: 'flight-010',
    seatId: 'seat-aircraft-a220-001-07D',
    ticketNumber: '230-1000000009',
    qrToken: 'AP-QR-APD6P4-PASSENGER010',
    status: 'VALID',
    issuedAt: '2026-09-20T16:30:00+08:00',
    expiresAt: '2026-09-24T23:59:59+08:00',
  },
];

/* -------------------------------------------------------------------------- */
/* CHECK-INS                                                                  */
/* -------------------------------------------------------------------------- */

export const checkIns: CheckIn[] = [
  {
    id: 'checkin-001',
    ticketId: 'ticket-001',
    bookingId: 'booking-001',
    passengerId: 'passenger-001',
    flightId: 'flight-001',
    staffId: 'user-004',
    seatId: 'seat-aircraft-a320-001-12A',
    status: 'COMPLETED',
    checkedInAt: '2026-09-22T06:55:00+08:00',
    checkInMethod: 'WEB',
  },
  {
    id: 'checkin-002',
    ticketId: 'ticket-002',
    bookingId: 'booking-002',
    passengerId: 'passenger-002',
    flightId: 'flight-001',
    staffId: 'user-004',
    seatId: 'seat-aircraft-a320-001-12B',
    status: 'COMPLETED',
    checkedInAt: '2026-09-22T07:02:00+08:00',
    checkInMethod: 'MOBILE',
  },
  {
    id: 'checkin-003',
    ticketId: 'ticket-006',
    bookingId: 'booking-007',
    passengerId: 'passenger-007',
    flightId: 'flight-007',
    staffId: 'user-004',
    seatId: 'seat-aircraft-atr-001-05A',
    status: 'COMPLETED',
    checkedInAt: '2026-09-23T12:00:00+08:00',
    checkInMethod: 'COUNTER',
  },
];

/* -------------------------------------------------------------------------- */
/* BOARDING                                                                   */
/* -------------------------------------------------------------------------- */

export const boarding: Boarding[] = [
  {
    id: 'boarding-001',
    ticketId: 'ticket-001',
    passengerId: 'passenger-001',
    flightId: 'flight-001',
    gate: 'A12',
    status: 'BOARDED',
    boardedAt: '2026-09-22T07:50:00+08:00',
    scannedBy: 'user-005',
  },
  {
    id: 'boarding-002',
    ticketId: 'ticket-002',
    passengerId: 'passenger-002',
    flightId: 'flight-001',
    gate: 'A12',
    status: 'NOT_BOARDED',
    boardedAt: null,
    scannedBy: null,
  },
  {
    id: 'boarding-003',
    ticketId: 'ticket-006',
    passengerId: 'passenger-007',
    flightId: 'flight-007',
    gate: 'E02',
    status: 'BOARDED',
    boardedAt: '2026-09-23T12:55:00+08:00',
    scannedBy: 'user-005',
  },
];

/* -------------------------------------------------------------------------- */
/* BAGGAGE                                                                    */
/* -------------------------------------------------------------------------- */

export const baggage: Baggage[] = [
  {
    id: 'bag-001',
    bookingId: 'booking-001',
    passengerId: 'passenger-001',
    bagTag: 'APBG000001',
    type: 'CHECKED',
    weightKg: 15,
    status: 'RECEIVED',
    destination: 'CGY',
    checkedAt: '2026-09-22T06:20:00+08:00',
    receivedAt: '2026-09-22T10:20:00+08:00',
  },
  {
    id: 'bag-002',
    bookingId: 'booking-002',
    passengerId: 'passenger-002',
    bagTag: 'APBG000002',
    type: 'CHECKED',
    weightKg: 20,
    status: 'CHECKED',
    destination: 'CGY',
    checkedAt: '2026-09-22T06:25:00+08:00',
    receivedAt: null,
  },
  {
    id: 'bag-003',
    bookingId: 'booking-005',
    passengerId: 'passenger-005',
    bagTag: 'APBG000003',
    type: 'CHECKED',
    weightKg: 23,
    status: 'IN_TRANSIT',
    destination: 'DVO',
    checkedAt: '2026-09-22T08:15:00+08:00',
    receivedAt: null,
  },
  {
    id: 'bag-004',
    bookingId: 'booking-006',
    passengerId: 'passenger-006',
    bagTag: 'APBG000004',
    type: 'CHECKED',
    weightKg: 18,
    status: 'PENDING',
    destination: 'MNL',
    checkedAt: null,
    receivedAt: null,
  },
  {
    id: 'bag-005',
    bookingId: 'booking-007',
    passengerId: 'passenger-007',
    bagTag: 'APBG000005',
    type: 'CHECKED',
    weightKg: 12,
    status: 'RECEIVED',
    destination: 'CGY',
    checkedAt: '2026-09-23T11:45:00+08:00',
    receivedAt: '2026-09-23T14:40:00+08:00',
  },
];

/* -------------------------------------------------------------------------- */
/* REFUNDS                                                                    */
/* -------------------------------------------------------------------------- */

export const refunds: Refund[] = [
  {
    id: 'refund-001',
    bookingId: 'booking-009',
    paymentId: 'payment-009',
    amount: 4749,
    reason: 'Customer requested cancellation',
    status: 'PROCESSING',
    requestedBy: 'user-008',
    requestedAt: '2026-09-21T15:30:00+08:00',
    processedAt: null,
  },
  {
    id: 'refund-002',
    bookingId: 'booking-007',
    paymentId: 'payment-007',
    amount: 3308,
    reason: 'Flight disruption compensation',
    status: 'COMPLETED',
    requestedBy: 'user-006',
    requestedAt: '2026-09-12T09:00:00+08:00',
    processedAt: '2026-09-13T10:15:00+08:00',
  },
];

/* -------------------------------------------------------------------------- */
/* COUPONS                                                                    */
/* -------------------------------------------------------------------------- */

export const coupons: Coupon[] = [
  {
    id: 'coupon-001',
    code: 'WELCOME500',
    description: '₱500 discount for new customers',
    type: 'FIXED',
    value: 500,
    minimumSpend: 3000,
    usageLimit: 500,
    usedCount: 124,
    active: true,
    expiresAt: '2026-12-31T23:59:59+08:00',
  },
  {
    id: 'coupon-002',
    code: 'FLY10',
    description: '10% off selected domestic flights',
    type: 'PERCENTAGE',
    value: 10,
    minimumSpend: 2500,
    usageLimit: 1000,
    usedCount: 302,
    active: true,
    expiresAt: '2026-11-30T23:59:59+08:00',
  },
  {
    id: 'coupon-003',
    code: 'WEEKEND250',
    description: 'Weekend promo discount',
    type: 'FIXED',
    value: 250,
    minimumSpend: 2000,
    usageLimit: 200,
    usedCount: 87,
    active: true,
    expiresAt: '2026-10-31T23:59:59+08:00',
  },
];

/* -------------------------------------------------------------------------- */
/* NOTIFICATIONS                                                              */
/* -------------------------------------------------------------------------- */

export const notifications: Notification[] = [
  {
    id: 'notification-001',
    userId: 'user-006',
    title: 'Booking confirmed',
    message: 'Your AeroPass booking APX8K2 has been confirmed.',
    type: 'BOOKING',
    read: false,
    createdAt: '2026-09-18T08:40:00+08:00',
  },
  {
    id: 'notification-002',
    userId: 'user-006',
    title: 'Check-in complete',
    message: 'You have successfully checked in for AP204.',
    type: 'CHECK_IN',
    read: false,
    createdAt: '2026-09-22T06:56:00+08:00',
  },
  {
    id: 'notification-003',
    userId: 'user-007',
    title: 'Boarding reminder',
    message: 'Please proceed to Gate A12 before boarding closes.',
    type: 'BOARDING',
    read: false,
    createdAt: '2026-09-22T07:30:00+08:00',
  },
  {
    id: 'notification-004',
    userId: 'user-008',
    title: 'Payment pending',
    message: 'Your payment for booking APK3V9 is still pending.',
    type: 'PAYMENT',
    read: false,
    createdAt: '2026-09-22T07:14:00+08:00',
  },
  {
    id: 'notification-005',
    userId: 'user-009',
    title: 'Travel reminder',
    message: 'Your upcoming trip is scheduled for September 22.',
    type: 'FLIGHT',
    read: true,
    createdAt: '2026-09-21T18:00:00+08:00',
  },
  {
    id: 'notification-006',
    userId: 'user-010',
    title: 'Flight delayed',
    message: 'AP401 is currently delayed by approximately 45 minutes.',
    type: 'FLIGHT',
    read: false,
    createdAt: '2026-09-22T08:10:00+08:00',
  },
  {
    id: 'notification-007',
    userId: 'user-002',
    title: 'Refund requires attention',
    message: 'Refund request APR4B2 is waiting for processing.',
    type: 'PAYMENT',
    read: false,
    createdAt: '2026-09-21T15:35:00+08:00',
  },
  {
    id: 'notification-008',
    userId: 'user-003',
    title: 'Flight delayed',
    message: 'AP401 has been delayed by 45 minutes.',
    type: 'FLIGHT',
    read: true,
    createdAt: '2026-09-22T08:05:00+08:00',
  },
  {
    id: 'notification-009',
    userId: 'user-004',
    title: 'High check-in activity',
    message: 'Flight AP204 currently has heavy passenger activity.',
    type: 'SYSTEM',
    read: false,
    createdAt: '2026-09-22T07:00:00+08:00',
  },
  {
    id: 'notification-010',
    userId: 'user-005',
    title: 'Boarding started',
    message: 'Boarding is now active for AP204 at Gate A12.',
    type: 'BOARDING',
    read: false,
    createdAt: '2026-09-22T07:45:00+08:00',
  },
];

/* -------------------------------------------------------------------------- */
/* AIRPORT STAFF                                                              */
/* -------------------------------------------------------------------------- */

export const airportStaffAssignments: AirportStaffAssignment[] = [
  {
    id: 'assignment-001',
    userId: 'user-004',
    airportId: 'airport-mnl',
    position: 'CHECK_IN_AGENT',
    active: true,
  },
  {
    id: 'assignment-002',
    userId: 'user-005',
    airportId: 'airport-mnl',
    position: 'GATE_AGENT',
    active: true,
  },
  {
    id: 'assignment-003',
    userId: 'user-004',
    airportId: 'airport-cgy',
    position: 'SUPERVISOR',
    active: true,
  },
];

/* -------------------------------------------------------------------------- */
/* ACTIVITY LOGS                                                              */
/* -------------------------------------------------------------------------- */

export const activityLogs: ActivityLog[] = [
  {
    id: 'activity-001',
    userId: 'user-001',
    action: 'LOGIN',
    entity: 'AUTH',
    description: 'Super administrator signed in',
    createdAt: '2026-09-22T07:42:00+08:00',
  },
  {
    id: 'activity-002',
    userId: 'user-002',
    action: 'UPDATE',
    entity: 'FLIGHT',
    entityId: 'flight-005',
    description: 'Updated AP401 status to delayed',
    createdAt: '2026-09-22T08:05:00+08:00',
  },
  {
    id: 'activity-003',
    userId: 'user-003',
    action: 'UPDATE',
    entity: 'FLIGHT',
    entityId: 'flight-001',
    description: 'Updated AP204 operational status',
    createdAt: '2026-09-22T07:40:00+08:00',
  },
  {
    id: 'activity-004',
    userId: 'user-006',
    action: 'CREATE',
    entity: 'BOOKING',
    entityId: 'booking-001',
    description: 'Created booking APX8K2',
    createdAt: '2026-09-18T08:30:00+08:00',
  },
  {
    id: 'activity-005',
    userId: 'user-006',
    action: 'PAYMENT',
    entity: 'PAYMENT',
    entityId: 'payment-001',
    description: 'Completed payment through GCash',
    createdAt: '2026-09-18T08:35:00+08:00',
  },
  {
    id: 'activity-006',
    userId: 'user-004',
    action: 'CHECK_IN',
    entity: 'CHECK_IN',
    entityId: 'checkin-001',
    description: 'Checked in Juan Dela Cruz',
    createdAt: '2026-09-22T06:55:00+08:00',
  },
  {
    id: 'activity-007',
    userId: 'user-005',
    action: 'BOARD',
    entity: 'BOARDING',
    entityId: 'boarding-001',
    description: 'Boarded passenger for AP204',
    createdAt: '2026-09-22T07:50:00+08:00',
  },
  {
    id: 'activity-008',
    userId: 'user-002',
    action: 'REFUND_REQUEST',
    entity: 'REFUND',
    entityId: 'refund-001',
    description: 'Refund request created for APR4B2',
    createdAt: '2026-09-21T15:30:00+08:00',
  },
  {
    id: 'activity-009',
    userId: 'user-003',
    action: 'CREATE',
    entity: 'SCHEDULE',
    entityId: 'schedule-001',
    description: 'Created daily MNL-CGY flight schedule',
    createdAt: '2026-08-20T09:30:00+08:00',
  },
  {
    id: 'activity-010',
    userId: 'user-001',
    action: 'CREATE',
    entity: 'AIRCRAFT',
    entityId: 'aircraft-a321-001',
    description: 'Added Airbus A321neo to fleet',
    createdAt: '2026-07-15T13:20:00+08:00',
  },
  {
    id: 'activity-011',
    userId: 'user-001',
    action: 'UPDATE',
    entity: 'USER',
    entityId: 'user-006',
    description: 'Customer account activated',
    createdAt: '2026-08-01T10:05:00+08:00',
  },
  {
    id: 'activity-012',
    userId: 'user-004',
    action: 'BAGGAGE',
    entity: 'BAGGAGE',
    entityId: 'bag-001',
    description: 'Checked baggage APBG000001',
    createdAt: '2026-09-22T06:20:00+08:00',
  },
];

/* -------------------------------------------------------------------------- */
/* SHARED LOOKUPS                                                             */
/* -------------------------------------------------------------------------- */

export function getUserById(userId: string) {
  return users.find((user) => user.id === userId);
}

export function getRoleByCode(roleCode: RoleCode) {
  return roles.find((role) => role.code === roleCode);
}

export function getAirportById(airportId: string) {
  return airports.find((airport) => airport.id === airportId);
}

export function getAirportByCode(code: string) {
  return airports.find(
    (airport) => airport.code.toUpperCase() === code.toUpperCase(),
  );
}

export function getRouteById(routeId: string) {
  return routes.find((route) => route.id === routeId);
}

export function getAircraftById(aircraftId: string) {
  return aircraft.find((item) => item.id === aircraftId);
}

export function getAircraftSeats(aircraftId: string) {
  return aircraftSeats.filter((seat) => seat.aircraftId === aircraftId);
}

export function getScheduleById(scheduleId: string) {
  return schedules.find((schedule) => schedule.id === scheduleId);
}

export function getFlightById(flightId: string) {
  return flights.find((flight) => flight.id === flightId);
}

export function getFareClassById(fareClassId: string) {
  return fareClasses.find((fareClass) => fareClass.id === fareClassId);
}

export function getPassengerById(passengerId: string) {
  return passengers.find((passenger) => passenger.id === passengerId);
}

export function getBookingById(bookingId: string) {
  return bookings.find((booking) => booking.id === bookingId);
}

export function getReservationById(reservationId: string) {
  return reservations.find((reservation) => reservation.id === reservationId);
}

export function getPaymentById(paymentId: string) {
  return payments.find((payment) => payment.id === paymentId);
}

export function getTicketById(ticketId: string) {
  return tickets.find((ticket) => ticket.id === ticketId);
}

export function getCheckInById(checkInId: string) {
  return checkIns.find((checkIn) => checkIn.id === checkInId);
}

export function getBoardingById(boardingId: string) {
  return boarding.find((item) => item.id === boardingId);
}

export function getBaggageById(baggageId: string) {
  return baggage.find((item) => item.id === baggageId);
}

export function getRefundById(refundId: string) {
  return refunds.find((refund) => refund.id === refundId);
}

/* -------------------------------------------------------------------------- */
/* FLIGHT READ FUNCTIONS                                                      */
/* -------------------------------------------------------------------------- */

export function getFlightDetails(flightId: string) {
  const flight = getFlightById(flightId);

  if (!flight) {
    return null;
  }

  const route = getRouteById(flight.routeId);

  const schedule = getScheduleById(flight.scheduleId);

  const aircraftItem = getAircraftById(flight.aircraftId);

  const origin = route ? getAirportById(route.originAirportId) : undefined;

  const destination =
    route ? getAirportById(route.destinationAirportId) : undefined;

  const fares = flightFares
    .filter((fare) => fare.flightId === flight.id)
    .map((fare) => ({
      ...fare,
      fareClass: getFareClassById(fare.fareClassId),
    }));

  return {
    flight,
    route,
    schedule,
    aircraft: aircraftItem,
    origin,
    destination,
    fares,
  };
}

export function searchFlights({
  from,
  to,
  departureDate,
}: {
  from?: string;
  to?: string;
  departureDate?: string;
}) {
  return flights.filter((flight) => {
    if (departureDate && flight.departureDate !== departureDate) {
      return false;
    }

    const route = getRouteById(flight.routeId);

    if (!route) {
      return false;
    }

    const origin = getAirportById(route.originAirportId);

    const destination = getAirportById(route.destinationAirportId);

    if (from && origin?.code !== from.toUpperCase()) {
      return false;
    }

    if (to && destination?.code !== to.toUpperCase()) {
      return false;
    }

    return flight.status !== 'CANCELLED';
  });
}

/* -------------------------------------------------------------------------- */
/* PUBLIC DESTINATION READ FUNCTION                                           */
/* -------------------------------------------------------------------------- */

export function getPopularDestinations(limit = 4) {
  const today = '2026-09-23';

  const destinationIds = new Map<
    string,
    {
      airport: Airport;
      activeFlights: number;
    }
  >();

  for (const route of routes) {
    if (route.status !== 'ACTIVE') {
      continue;
    }

    const destination = getAirportById(route.destinationAirportId);

    if (!destination) {
      continue;
    }

    const activeFlightCount = flights.filter(
      (flight) =>
        flight.routeId === route.id &&
        flight.departureDate >= today &&
        flight.status !== 'CANCELLED',
    ).length;

    if (activeFlightCount === 0) {
      continue;
    }

    const existing = destinationIds.get(destination.id);

    destinationIds.set(destination.id, {
      airport: destination,
      activeFlights: (existing?.activeFlights ?? 0) + activeFlightCount,
    });
  }

  return Array.from(destinationIds.values())
    .sort((a, b) => b.activeFlights - a.activeFlights)
    .slice(0, limit)
    .map(({ airport }) => ({
      id: airport.id,
      code: airport.code,
      city: airport.city,
      airport: airport.name,
      href: `/search?to=${encodeURIComponent(airport.code)}`,
    }));
}

/* -------------------------------------------------------------------------- */
/* BOOKING READ FUNCTIONS                                                     */
/* -------------------------------------------------------------------------- */

export function getBookingsByCustomerId(customerId: string) {
  return bookings.filter((booking) => booking.customerId === customerId);
}

export function getPassengersByBookingId(bookingId: string) {
  return passengers.filter((passenger) => passenger.bookingId === bookingId);
}

export function getReservationsByBookingId(bookingId: string) {
  return reservations.filter(
    (reservation) => reservation.bookingId === bookingId,
  );
}

export function getTicketsByBookingId(bookingId: string) {
  return tickets.filter((ticket) => ticket.bookingId === bookingId);
}

export function getPaymentByBookingId(bookingId: string) {
  return payments.find((payment) => payment.bookingId === bookingId);
}

export function getPaymentAttemptsByBookingId(bookingId: string) {
  return paymentAttempts.filter((attempt) => attempt.bookingId === bookingId);
}

export function getRefundByBookingId(bookingId: string) {
  return refunds.find((refund) => refund.bookingId === bookingId);
}

export function getBookingDetails(bookingId: string) {
  const booking = getBookingById(bookingId);

  if (!booking) {
    return null;
  }

  return {
    booking,

    passengers: getPassengersByBookingId(bookingId),

    reservations: getReservationsByBookingId(bookingId),

    tickets: getTicketsByBookingId(bookingId),

    payment: getPaymentByBookingId(bookingId),

    paymentAttempts: getPaymentAttemptsByBookingId(bookingId),

    refund: getRefundByBookingId(bookingId),

    flight: getFlightDetails(booking.flightId),
  };
}

/* -------------------------------------------------------------------------- */
/* TICKET READ FUNCTIONS                                                      */
/* -------------------------------------------------------------------------- */

export function getTicketsByPassengerId(passengerId: string) {
  return tickets.filter((ticket) => ticket.passengerId === passengerId);
}

export function getTicketDetails(ticketId: string) {
  const ticket = getTicketById(ticketId);

  if (!ticket) {
    return null;
  }

  const passenger = getPassengerById(ticket.passengerId);

  const booking = getBookingDetails(ticket.bookingId);

  const checkIn = checkIns.find((item) => item.ticketId === ticket.id);

  const boardingRecord = boarding.find((item) => item.ticketId === ticket.id);

  return {
    ticket,
    passenger,
    booking,
    flight: getFlightDetails(ticket.flightId),
    checkIn,
    boarding: boardingRecord,
  };
}

/* -------------------------------------------------------------------------- */
/* OPERATIONS READ FUNCTIONS                                                  */
/* -------------------------------------------------------------------------- */

export function getCheckInsByFlightId(flightId: string) {
  return checkIns.filter((checkIn) => checkIn.flightId === flightId);
}

export function getBoardingByFlightId(flightId: string) {
  return boarding.filter((item) => item.flightId === flightId);
}

export function getBaggageByBookingId(bookingId: string) {
  return baggage.filter((item) => item.bookingId === bookingId);
}

export function getBaggageByPassengerId(passengerId: string) {
  return baggage.filter((item) => item.passengerId === passengerId);
}

export function getOperationsByFlightId(flightId: string) {
  return {
    flight: getFlightDetails(flightId),

    checkIns: getCheckInsByFlightId(flightId),

    boardings: getBoardingByFlightId(flightId),

    baggage: baggage.filter((item) => {
      const booking = getBookingById(item.bookingId);

      return booking?.flightId === flightId;
    }),
  };
}

/* -------------------------------------------------------------------------- */
/* CUSTOMER READ FUNCTIONS                                                    */
/* -------------------------------------------------------------------------- */

export function getCustomerNotifications(userId: string) {
  return notifications.filter((notification) => notification.userId === userId);
}

export function getCustomerDashboard(userId: string, date = '2026-09-23') {
  const customerBookings = getBookingsByCustomerId(userId);

  const upcomingTrips = customerBookings.filter((booking) => {
    if (!['CONFIRMED', 'CHECKED_IN'].includes(booking.status)) {
      return false;
    }

    const flight = getFlightById(booking.flightId);

    return Boolean(flight && flight.departureDate >= date);
  });

  return {
    userId,
    upcomingTrips,
    recentBookings: customerBookings,
    notifications: getCustomerNotifications(userId),
  };
}

/* -------------------------------------------------------------------------- */
/* ADMIN / STAFF READ FUNCTIONS                                               */
/* -------------------------------------------------------------------------- */

export function getDashboardStats(date = '2026-09-23') {
  return {
    totalFlights: flights.length,

    todaysFlights: flights.filter((flight) => flight.departureDate === date)
      .length,

    activeFlights: flights.filter(
      (flight) => flight.status !== 'CANCELLED' && flight.status !== 'ARRIVED',
    ).length,

    totalBookings: bookings.length,

    confirmedBookings: bookings.filter(
      (booking) => booking.status === 'CONFIRMED',
    ).length,

    pendingPayments: bookings.filter(
      (booking) => booking.paymentStatus === 'PENDING',
    ).length,

    checkedInPassengers: checkIns.filter(
      (checkIn) => checkIn.status === 'COMPLETED',
    ).length,

    boardedPassengers: boarding.filter((item) => item.status === 'BOARDED')
      .length,

    totalTickets: tickets.length,

    validTickets: tickets.filter((ticket) => ticket.status === 'VALID').length,

    totalPassengers: passengers.length,

    totalAircraft: aircraft.length,

    activeAircraft: aircraft.filter((item) => item.status === 'ACTIVE').length,

    totalAirports: airports.length,

    totalRoutes: routes.length,
  };
}

export function getRevenueStats() {
  const paid = payments.filter((payment) => payment.status === 'PAID');

  const pending = payments.filter((payment) => payment.status === 'PENDING');

  const completedRefunds = refunds.filter(
    (refund) => refund.status === 'COMPLETED',
  );

  return {
    grossRevenue: paid.reduce((sum, payment) => sum + payment.amount, 0),

    pendingRevenue: pending.reduce((sum, payment) => sum + payment.amount, 0),

    refundedAmount: completedRefunds.reduce(
      (sum, refund) => sum + refund.amount,
      0,
    ),

    averageBookingValue:
      bookings.length > 0 ?
        Math.round(
          bookings.reduce((sum, booking) => sum + booking.total, 0) /
            bookings.length,
        )
      : 0,
  };
}

export function getRecentFlights(limit = 8) {
  return flights.slice(0, limit);
}

export function getUpcomingFlights(date = '2026-09-23') {
  return flights.filter(
    (flight) => flight.departureDate >= date && flight.status !== 'CANCELLED',
  );
}

export function getStaffDashboard(date = '2026-09-23') {
  return {
    todayFlights: flights.filter((flight) => flight.departureDate === date),

    todayCheckIns: checkIns.filter(
      (checkIn) =>
        checkIn.status === 'COMPLETED' && checkIn.checkedInAt?.startsWith(date),
    ),

    todayBoardings: boarding.filter((item) => item.boardedAt?.startsWith(date)),

    baggageInProgress: baggage.filter(
      (item) => item.status === 'CHECKED' || item.status === 'IN_TRANSIT',
    ),
  };
}

/* -------------------------------------------------------------------------- */
/* COMPLETE LOCAL DATASET                                                     */
/* -------------------------------------------------------------------------- */

export const aeroPassData = {
  roles,
  permissions,

  users,

  airports,
  routes,

  aircraft,
  aircraftSeats,

  schedules,
  flights,

  fareClasses,
  flightFares,

  passengers,

  bookings,
  reservations,

  paymentAttempts,
  payments,
  refunds,

  tickets,
  checkIns,
  boarding,
  baggage,

  coupons,
  notifications,

  airportStaffAssignments,
  activityLogs,

  demoCredentials,
};

export function getBookingByReference(bookingReference: string) {
  const normalizedReference = bookingReference.trim().toUpperCase();

  const booking = bookings.find(
    (item) => item.bookingReference.toUpperCase() === normalizedReference,
  );

  if (!booking) {
    return null;
  }

  return {
    ...booking,
    passengers: getPassengersByBookingId(booking.id),
    reservations: getReservationsByBookingId(booking.id),
    tickets: getTicketsByBookingId(booking.id),
    payment: getPaymentByBookingId(booking.id),
    paymentAttempts: getPaymentAttemptsByBookingId(booking.id),
    refund: getRefundByBookingId(booking.id),
    flight: getFlightDetails(booking.flightId),
  };
}

export function getCheckInByTicketId(ticketId: string) {
  return checkIns.find((checkIn) => checkIn.ticketId === ticketId);
}

/* -------------------------------------------------------------------------- */
/* DEFAULT EXPORT                                                             */
/* -------------------------------------------------------------------------- */

export function getBoardingDetailsByFlightId(flightId: string) {
  const flight = getFlightDetails(flightId);

  if (!flight) {
    return [];
  }

  const flightBoarding = getBoardingByFlightId(flightId);

  return flightBoarding.map((boardingRecord) => {
    const passenger = getPassengerById(boardingRecord.passengerId);

    const ticket = getTicketById(boardingRecord.ticketId);

    const reservation = reservations.find(
      (item) =>
        item.passengerId === boardingRecord.passengerId &&
        item.flightId === flightId,
    );

    return {
      boarding: boardingRecord,
      passenger,
      ticket,
      reservation,
    };
  });
}
export default aeroPassData;
