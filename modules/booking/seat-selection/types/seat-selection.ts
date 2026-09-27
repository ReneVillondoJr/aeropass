export interface SeatOption {
  id: string;
  seatNumber: string;
  row: number;
  column: string;
  cabinClass: 'ECONOMY' | 'PREMIUM_ECONOMY' | 'BUSINESS';
  seatType: 'STANDARD' | 'EXTRA_LEGROOM' | 'EXIT_ROW' | 'WINDOW' | 'AISLE';
  available: boolean;
  selected: boolean;
}
