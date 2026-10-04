import type { AircraftSeat, AircraftStatus, SeatStatus } from '@/data/aeropass';

export const aircraftStatusMeta = {
  ACTIVE: {
    label: 'Active',
    description: 'Aircraft available for operations',
    className: 'bg-emerald-50 text-emerald-700',
  },

  MAINTENANCE: {
    label: 'Maintenance',
    description: 'Aircraft currently unavailable',
    className: 'bg-amber-50 text-amber-700',
  },

  INACTIVE: {
    label: 'Inactive',
    description: 'Aircraft not assigned to operations',
    className: 'bg-slate-100 text-slate-600',
  },
} satisfies Record<
  AircraftStatus,
  {
    label: string;
    description: string;
    className: string;
  }
>;

export const seatStatusMeta = {
  AVAILABLE: {
    label: 'Available',
    description: 'Seat is configured and available',
    className: 'border-border bg-background text-foreground',
  },

  BLOCKED: {
    label: 'Blocked',
    description: 'Seat is unavailable for assignment',
    className: 'border-amber-200 bg-amber-50 text-amber-700',
  },

  MAINTENANCE: {
    label: 'Maintenance',
    description: 'Seat is unavailable because of maintenance',
    className: 'border-red-200 bg-red-50 text-red-700',
  },
} satisfies Record<
  SeatStatus,
  {
    label: string;
    description: string;
    className: string;
  }
>;

export const cabinClassMeta = {
  BUSINESS: {
    label: 'Business',
    description: 'Premium cabin configuration',
    className: 'bg-[#EEF7FB] text-[#102A43]',
  },

  PREMIUM_ECONOMY: {
    label: 'Premium Economy',
    description: 'Enhanced economy configuration',
    className: 'bg-violet-50 text-violet-700',
  },

  ECONOMY: {
    label: 'Economy',
    description: 'Standard economy configuration',
    className: 'bg-slate-100 text-slate-700',
  },
} satisfies Record<
  AircraftSeat['cabinClass'],
  {
    label: string;
    description: string;
    className: string;
  }
>;

export const seatTypeMeta = {
  STANDARD: 'Standard',
  EXTRA_LEGROOM: 'Extra legroom',
  EXIT_ROW: 'Exit row',
  WINDOW: 'Window',
  AISLE: 'Aisle',
} satisfies Record<AircraftSeat['seatType'], string>;
