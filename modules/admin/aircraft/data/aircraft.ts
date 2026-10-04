import type { AircraftStatus, SeatStatus } from '@/data/aeropass';

export const aircraftStatusMeta = {
  ACTIVE: {
    label: 'Active',
    description: 'Available for scheduled operations',
    className: 'bg-emerald-50 text-emerald-700',
  },
  MAINTENANCE: {
    label: 'Maintenance',
    description: 'Currently unavailable for operations',
    className: 'bg-amber-50 text-amber-700',
  },
  INACTIVE: {
    label: 'Inactive',
    description: 'Not currently assigned to operations',
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
    className: 'border-border bg-background text-foreground',
  },
  BLOCKED: {
    label: 'Blocked',
    className: 'border-amber-200 bg-amber-50 text-amber-700',
  },
  MAINTENANCE: {
    label: 'Maintenance',
    className: 'border-red-200 bg-red-50 text-red-700',
  },
} satisfies Record<
  SeatStatus,
  {
    label: string;
    className: string;
  }
>;

export const cabinClassMeta = {
  BUSINESS: {
    label: 'Business',
    className: 'bg-[#EEF7FB] text-[#102A43]',
  },
  PREMIUM_ECONOMY: {
    label: 'Premium Economy',
    className: 'bg-violet-50 text-violet-700',
  },
  ECONOMY: {
    label: 'Economy',
    className: 'bg-slate-100 text-slate-700',
  },
};
