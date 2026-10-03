export const airportViewMeta = {
  networkLabel: 'AeroPass network',
  networkDescription:
    'Airport locations, route connectivity, and flight activity.',
} as const;

export const airportDetailSections = [
  'overview',
  'network',
  'flights',
] as const;

export const airportDirectionMeta = {
  DEPARTURE: {
    label: 'Departure',
  },

  ARRIVAL: {
    label: 'Arrival',
  },

  OUTBOUND: {
    label: 'Outbound',
  },

  INBOUND: {
    label: 'Inbound',
  },
} as const;
