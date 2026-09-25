export interface CheckInResult {
  bookingId: string;
  bookingReference: string;
  passengerName: string;
  flightNumber: string;
  originCode: string;
  originCity: string;
  destinationCode: string;
  destinationCity: string;
  departureDate: string;
  departureTime: string;
  terminal: string;
  gate: string;
  bookingStatus: string;
  checkInStatus: string;
}

export interface CheckInState {
  result: CheckInResult | null;
  error: string | null;
  isChecking: boolean;
}
