export interface AddonSelection {
  checkedBaggageKg: number;
  travelProtection: boolean;
  loungeAccess: boolean;
}

export interface AddonOption {
  id: 'baggage' | 'protection' | 'lounge';
  title: string;
  description: string;
  price: number;
}
