export const scheduleFrequencyMeta = {
  DAILY: {
    label: 'Daily',
    shortLabel: 'Every day',
    days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  },

  WEEKDAYS: {
    label: 'Weekdays',
    shortLabel: 'Mon–Fri',
    days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
  },

  WEEKENDS: {
    label: 'Weekends',
    shortLabel: 'Sat–Sun',
    days: ['Sat', 'Sun'],
  },
} as const;

export const scheduleStatusMeta = {
  ACTIVE: {
    label: 'Active',
  },

  INACTIVE: {
    label: 'Inactive',
  },
} as const;

export const weekDays = [
  'Mon',
  'Tue',
  'Wed',
  'Thu',
  'Fri',
  'Sat',
  'Sun',
] as const;
