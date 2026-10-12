import type { BookingCardData } from '@/components/customer/shared/booking-card';
import type { FlightStatus, Notification } from '@/data/aeropass';

export type DashboardStatIcon = 'bookings' | 'flights' | 'tickets' | 'notifications';

export interface DashboardStat {
  id: string;
  label: string;
  value: number;
  description: string;
  icon: DashboardStatIcon;
}

export type DashboardNotificationType = Notification['type'];

export interface DashboardNotificationView {
  id: string;
  title: string;
  message: string;
  type: DashboardNotificationType;
  read: boolean;
  createdAt: string;
}

export type TripCheckInState = 'COMPLETED' | 'OPEN' | 'UPCOMING' | 'UNAVAILABLE';

export interface UpcomingTripView extends BookingCardData {
  flightStatus: FlightStatus;
  gate: string;
  terminal: string;
  checkInState: TripCheckInState;
  issuedTicketCount: number;
}

export interface CustomerDashboardView {
  accountAvailable: boolean;
  customerId: string;
  customerName: string;
  customerEmail: string;
  stats: DashboardStat[];
  upcomingTrip: UpcomingTripView | null;
  recentBookings: BookingCardData[];
  recentNotifications: DashboardNotificationView[];
  unreadNotificationCount: number;
  pendingPaymentCount: number;
  pendingPaymentAmount: number;
}
