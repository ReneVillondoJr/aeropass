import {
  Airplay,
  Banknote,
  CircleCheck,
  PlaneTakeoff,
  TicketCheck,
  Users,
} from 'lucide-react';

export const DASHBOARD_DATE = '2026-09-23';

export const dashboardKpiMeta = [
  {
    id: 'todays-flights',
    label: "Today's flights",
    description: 'Flights scheduled for the operations date.',
    icon: PlaneTakeoff,
  },
  {
    id: 'active-flights',
    label: 'Active flights',
    description: 'Flights currently active in operations.',
    icon: Airplay,
  },
  {
    id: 'bookings',
    label: 'Total bookings',
    description: 'Reservations recorded in AeroPass.',
    icon: TicketCheck,
  },
  {
    id: 'pending-payments',
    label: 'Pending payments',
    description: 'Bookings waiting for payment completion.',
    icon: Banknote,
  },
  {
    id: 'checked-in',
    label: 'Checked-in passengers',
    description: 'Passengers with completed check-in.',
    icon: CircleCheck,
  },
  {
    id: 'aircraft',
    label: 'Active aircraft',
    description: 'Aircraft currently marked active.',
    icon: Users,
  },
] as const;

export const flightStatusLabels = {
  SCHEDULED: 'Scheduled',
  CHECK_IN_OPEN: 'Check-in open',
  BOARDING: 'Boarding',
  DEPARTED: 'Departed',
  ARRIVED: 'Arrived',
  DELAYED: 'Delayed',
  CANCELLED: 'Cancelled',
} as const;

export const actionLabels: Record<string, string> = {
  LOGIN: 'Signed in',
  UPDATE: 'Updated',
  CREATE: 'Created',
  PAYMENT: 'Payment',
  CHECK_IN: 'Check-in',
  BOARD: 'Boarding',
  REFUND_REQUEST: 'Refund request',
  BAGGAGE: 'Baggage',
};

export const entityLabels: Record<string, string> = {
  AUTH: 'Authentication',
  FLIGHT: 'Flight',
  BOOKING: 'Booking',
  PAYMENT: 'Payment',
  CHECK_IN: 'Check-in',
  BOARDING: 'Boarding',
  REFUND: 'Refund',
  SCHEDULE: 'Schedule',
  AIRCRAFT: 'Aircraft',
  USER: 'User',
  BAGGAGE: 'Baggage',
};
