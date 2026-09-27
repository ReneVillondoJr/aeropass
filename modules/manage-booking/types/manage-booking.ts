export interface ManageBookingResult {
  bookingId: string;
  bookingReference: string;
  passengerName: string;
  flightNumber: string;
  originCode: string;
  destinationCode: string;
  departureDate: string;
  departureTime: string;
  terminal: string;
  gate: string;
  seat: string | null;
  fareClass: string | null;
  bookingStatus: string;
  paymentStatus: string;
  ticketNumber: string | null;
  checkInStatus: string;
  boardingStatus: string;
}
