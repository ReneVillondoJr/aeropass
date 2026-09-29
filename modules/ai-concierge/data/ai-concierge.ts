import {
  BriefcaseBusiness,
  CreditCard,
  Luggage,
  Plane,
  TicketCheck,
} from 'lucide-react';

import type {
  AiIntent,
  AiQuickAction,
  AiResponse,
} from '../types/ai-concierge';

export const aiQuickActions: AiQuickAction[] = [
  {
    id: 'check-in',
    label: 'Check in',
    href: '/check-in',
    icon: 'check-in',
  },
  {
    id: 'manage-booking',
    label: 'Manage booking',
    href: '/manage-booking',
    icon: 'booking',
  },
  {
    id: 'flights',
    label: 'Find a flight',
    href: '/search',
    icon: 'flight',
  },
  {
    id: 'baggage',
    label: 'Baggage',
    href: '/help#articles',
    icon: 'baggage',
  },
  {
    id: 'payments',
    label: 'Payments',
    href: '/help#articles',
    icon: 'payment',
  },
];

export const aiQuickActionIcons = {
  booking: BriefcaseBusiness,
  'check-in': TicketCheck,
  flight: Plane,
  baggage: Luggage,
  payment: CreditCard,
} as const;

/**
 * These remain visible in the chat at all times.
 */
export const aiSuggestedQuestions = [
  'How do I check in?',
  'How can I manage my booking?',
  'Where is my boarding pass?',
  'What is my baggage allowance?',
  'Can I change my flight?',
  'How do payments and refunds work?',
] as const;

function containsAny(query: string, terms: string[]) {
  return terms.some((term) => query.includes(term));
}

function getIntent(query: string): AiIntent {
  if (
    containsAny(query, [
      'hello',
      'hi',
      'hey',
      'good morning',
      'good afternoon',
      'good evening',
    ])
  ) {
    return 'GREETING';
  }

  if (
    containsAny(query, ['check in', 'check-in', 'checkin', 'check-in process'])
  ) {
    return 'CHECK_IN';
  }

  if (
    containsAny(query, ['boarding pass', 'boarding', 'board my flight', 'gate'])
  ) {
    return 'BOARDING';
  }

  if (
    containsAny(query, [
      'booking',
      'reservation',
      'manage booking',
      'booking reference',
      'itinerary',
      'ticket',
    ])
  ) {
    return 'BOOKING';
  }

  if (
    containsAny(query, [
      'baggage',
      'luggage',
      'checked bag',
      'carry-on',
      'carry on',
      'bag allowance',
    ])
  ) {
    return 'BAGGAGE';
  }

  if (
    containsAny(query, [
      'flight',
      'flights',
      'destination',
      'route',
      'departure',
      'arrival',
      'schedule',
      'delayed',
      'delay',
      'cancelled flight',
      'cancelled',
    ])
  ) {
    return 'FLIGHT';
  }

  if (
    containsAny(query, [
      'payment',
      'pay',
      'paid',
      'refund',
      'refunds',
      'transaction',
      'gcash',
      'maya',
      'qrph',
      'card',
    ])
  ) {
    return 'PAYMENT';
  }

  if (
    containsAny(query, [
      'change my flight',
      'change flight',
      'reschedule',
      'rebook',
      'cancel my booking',
      'cancel booking',
      'cancellation',
      'change booking',
    ])
  ) {
    return 'CHANGES';
  }

  if (
    containsAny(query, [
      'support',
      'agent',
      'human',
      'contact',
      'help me',
      'customer service',
    ])
  ) {
    return 'SUPPORT';
  }

  return 'OUT_OF_SCOPE';
}

export function getMockAiResponse(message: string): AiResponse {
  const query = message.trim().toLowerCase();

  const intent = getIntent(query);

  switch (intent) {
    case 'GREETING':
      return {
        intent,
        content:
          'Hello! I’m the AeroPass Concierge. I can help with flights, bookings, check-in, boarding passes, baggage, payments, and changes to your trip. What can I help you with?',
      };

    case 'CHECK_IN':
      return {
        intent,
        content:
          'I can help you check in. You will need your booking reference and passenger last name. After your booking is verified, you can continue through the AeroPass check-in flow.',
        actions: [
          {
            label: 'Start check-in',
            href: '/check-in',
          },
        ],
      };

    case 'BOOKING':
      return {
        intent,
        content:
          'You can review your reservation, passenger information, flight details, seat, ticket, and available booking actions through Manage Booking.',
        actions: [
          {
            label: 'Manage booking',
            href: '/manage-booking',
          },
        ],
      };

    case 'BOARDING':
      return {
        intent,
        content:
          'Your boarding pass is available through the check-in and boarding-pass flow after the required check-in steps are completed. Your booking also contains your terminal, gate, and seat information when available.',
        actions: [
          {
            label: 'Go to check-in',
            href: '/check-in',
          },
        ],
      };

    case 'BAGGAGE':
      return {
        intent,
        content:
          'Baggage allowance depends on the fare associated with your booking. For an existing reservation, Manage Booking is the best place to review your trip and available baggage options.',
        actions: [
          {
            label: 'Manage booking',
            href: '/manage-booking',
          },
        ],
      };

    case 'FLIGHT':
      return {
        intent,
        content:
          'You can search AeroPass flights by origin, destination, and travel date. Select a flight from the results to view its detailed schedule and fare options.',
        actions: [
          {
            label: 'Search flights',
            href: '/search',
          },
        ],
      };

    case 'PAYMENT':
      return {
        intent,
        content:
          'Payment and refund information depends on your booking status and payment method. Start with Manage Booking to review the reservation and its payment information.',
        actions: [
          {
            label: 'Manage booking',
            href: '/manage-booking',
          },
        ],
      };

    case 'CHANGES':
      return {
        intent,
        content:
          'Flight changes and cancellations depend on the booking and fare conditions. Open Manage Booking to review the options available for your reservation.',
        actions: [
          {
            label: 'Manage booking',
            href: '/manage-booking',
          },
        ],
      };

    case 'SUPPORT':
      return {
        intent,
        content:
          'I can help with common AeroPass questions. When you need personal assistance, visit the AeroPass Help Center and contact support with your booking details.',
        actions: [
          {
            label: 'Open Help Center',
            href: '/help',
          },
        ],
      };

    case 'OUT_OF_SCOPE':
    default:
      return {
        intent,
        content:
          'I’m the AeroPass Concierge, so I’m focused on helping with AeroPass flights, bookings, check-in, boarding passes, baggage, payments, and trip changes. I can’t help with unrelated topics, but you can ask me one of the AeroPass questions below.',
      };
  }
}
