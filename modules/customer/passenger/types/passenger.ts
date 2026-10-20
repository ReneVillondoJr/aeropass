import type { CustomerPassengerRecord } from '@/data/aeropass';

export type CustomerPassengerFilter =
  | 'ALL'
  | 'HAS_TICKET'
  | 'CHECKED_IN'
  | 'SPECIAL_ASSISTANCE'
  | 'NO_TICKET';

export type CustomerPassengerCounts = Record<CustomerPassengerFilter, number>;

export interface CustomerPassengerStats {
  total: number;
  linkedBookings: number;
  ticketed: number;
  checkedIn: number;
  specialAssistance: number;
}

export type { CustomerPassengerRecord };
