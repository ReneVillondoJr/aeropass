import type {
  BookingStatus,
  FlightStatus,
  PaymentMethod,
} from '@/data/aeropass';

export type ReportPeriod = '7D' | '30D' | 'ALL';

export interface ReportKpi {
  id: string;
  label: string;
  value: string;
  description: string;
  icon:
    | 'revenue'
    | 'bookings'
    | 'passengers'
    | 'flights'
    | 'refunds'
    | 'payments';
}

export interface RevenuePoint {
  date: string;
  label: string;
  amount: number;
}

export interface StatusSummary {
  status: string;
  label: string;
  count: number;
  percentage: number;
}

export interface PaymentMethodSummary {
  method: PaymentMethod;
  label: string;
  count: number;
  amount: number;
  percentage: number;
}

export interface FlightPerformanceRow {
  id: string;
  flightNumber: string;
  originCode: string;
  destinationCode: string;
  departureDate: string;
  departureTime: string;
  status: FlightStatus;
  capacity: number;
  seatsAvailable: number;
  checkedInPassengers: number;
  boardedPassengers: number;
  loadFactor: number;
  delayMinutes: number;
}

export interface ReportOperations {
  totalCheckIns: number;
  totalBoardings: number;
  boardingRate: number;
  checkInRate: number;
  checkedBaggage: number;
  baggageInProgress: number;
}

export interface ReportException {
  id: string;
  type: 'DELAY' | 'PAYMENT' | 'REFUND' | 'BAGGAGE';
  title: string;
  description: string;
  href: string;
}

export interface ReportsData {
  kpis: ReportKpi[];
  revenueTrend: RevenuePoint[];
  bookingStatuses: StatusSummary[];
  paymentMethods: PaymentMethodSummary[];
  flights: FlightPerformanceRow[];
  operations: ReportOperations;
  exceptions: ReportException[];
}
