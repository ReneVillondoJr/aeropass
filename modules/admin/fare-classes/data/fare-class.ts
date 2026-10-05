import type { FareClass } from '@/data/aeropass';

export const cabinClassMeta = {
  ECONOMY: {
    label: 'Economy',
    shortLabel: 'Economy',
    description: 'Standard cabin configuration for essential travel.',
    className: 'bg-slate-100 text-slate-700',
    badgeClassName: 'bg-slate-100 text-slate-700',
  },

  PREMIUM_ECONOMY: {
    label: 'Premium Economy',
    shortLabel: 'Premium',
    description: 'Enhanced economy experience with additional benefits.',
    className: 'bg-violet-50 text-violet-700',
    badgeClassName: 'bg-violet-50 text-violet-700',
  },

  BUSINESS: {
    label: 'Business',
    shortLabel: 'Business',
    description: 'Premium cabin with flexible travel benefits.',
    className: 'bg-[#EEF7FB] text-[#102A43]',
    badgeClassName: 'bg-[#EEF7FB] text-[#102A43]',
  },
} satisfies Record<
  FareClass['cabinClass'],
  {
    label: string;
    shortLabel: string;
    description: string;
    className: string;
    badgeClassName: string;
  }
>;

export const flexibilityMeta = {
  refundable: {
    label: 'Refundable',
    activeClassName: 'bg-emerald-50 text-emerald-700',
    inactiveClassName: 'bg-slate-100 text-slate-500',
  },

  changeable: {
    label: 'Changeable',
    activeClassName: 'bg-[#EEF7FB] text-[#102A43]',
    inactiveClassName: 'bg-slate-100 text-slate-500',
  },
};

export const formatPhp = (amount: number) =>
  new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    maximumFractionDigits: 0,
  }).format(amount);
