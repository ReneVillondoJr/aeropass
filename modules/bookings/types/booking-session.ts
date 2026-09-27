export interface PassengerDraft {
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: 'MALE' | 'FEMALE' | 'OTHER';
  nationality: string;
  passportNumber: string;
  passportExpiry: string;
}

export interface AddonSelection {
  checkedBaggageKg: number;
  travelProtection: boolean;
  loungeAccess: boolean;
}

export interface BookingSession {
  flightId: string;
  seatId: string | null;
  passenger: PassengerDraft | null;
  addons: AddonSelection;
  paymentMethod: 'GCASH' | 'MAYA' | 'QRPH' | 'CARD' | 'BANK_TRANSFER' | null;
}
