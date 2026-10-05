import type { FareClass, FlightFare } from '@/data/aeropass';

export type FareCabinFilter = 'ALL' | FareClass['cabinClass'];

export type FareRefundFilter = 'ALL' | 'REFUNDABLE' | 'NON_REFUNDABLE';

export type FareChangeFilter = 'ALL' | 'CHANGEABLE' | 'NON_CHANGEABLE';

export interface FareFlightView {
  fare: FlightFare;

  flightId: string;

  flightNumber: string;

  departureDate: string;

  departureTime: string;

  arrivalTime: string;

  originCode: string;

  destinationCode: string;

  seatsAvailable: number;
}

export interface FareClassViewModel {
  fareClass: FareClass;

  flightFares: FareFlightView[];

  totalFlightFares: number;

  averagePrice: number;

  minimumPrice: number;

  maximumPrice: number;

  totalSeatsAvailable: number;

  refundable: boolean;

  changeable: boolean;
}

export interface FareClassStats {
  totalClasses: number;

  totalFlightFares: number;

  refundableClasses: number;

  changeableClasses: number;

  totalSeatsAvailable: number;

  averageFare: number;

  lowestFare: number;

  highestFare: number;
}
