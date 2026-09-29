import type { FlightStatus } from '@/data/aeropass';

export interface DashboardKpi {
  id: string;
  label: string;
  value: number | string;
  description: string;
  icon:
    | 'flights'
    | 'bookings'
    | 'payments'
    | 'check-in'
    | 'boarding'
    | 'aircraft';
}

export interface DashboardFlightRow {
  id: string;
  flightNumber: string;
  originCode: string;
  destinationCode: string;
  departureTime: string;
  departureDate: string;
  gate: string;
  terminal: string;
  status: FlightStatus;
  capacity: number;
  checkedInPassengers: number;
  boardedPassengers: number;
  seatsAvailable: number;
  delayMinutes: number;
}

export interface DashboardActivity {
  id: string;
  action: string;
  entity: string;
  description: string;
  userName: string;
  createdAt: string;
}

export interface DashboardData {
  stats: {
    totalFlights: number;
    todaysFlights: number;
    activeFlights: number;
    totalBookings: number;
    confirmedBookings: number;
    pendingPayments: number;
    checkedInPassengers: number;
    boardedPassengers: number;
    totalAircraft: number;
    activeAircraft: number;
    totalPassengers: number;
    totalTickets: number;
    validTickets: number;
    totalAirports: number;
    totalRoutes: number;
  };

  revenue: {
    grossRevenue: number;
    pendingRevenue: number;
    refundedAmount: number;
    averageBookingValue: number;
  };

  flights: DashboardFlightRow[];

  activities: DashboardActivity[];
}
