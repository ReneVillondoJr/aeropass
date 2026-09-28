import {
  ArrowUpRight,
  BriefcaseBusiness,
  CreditCard,
  Luggage,
  Plane,
  TicketCheck,
} from 'lucide-react';

import type { AiChatAction, AiQuickAction } from '../types/ai-concierge';

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
    href: '/help#chat',
    icon: 'baggage',
  },
  {
    id: 'payments',
    label: 'Payments',
    href: '/help#chat',
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

export const aiSuggestedQuestions = [
  'How do I check in?',
  'How can I manage my booking?',
  'Where is my boarding pass?',
  'What is my baggage allowance?',
];

interface MockAiResponse {
  content: string;
  actions?: AiChatAction[];
}

export function getMockAiResponse(message: string): MockAiResponse {
  const query = message.trim().toLowerCase();

  if (
    query.includes('check in') ||
    query.includes('check-in') ||
    query.includes('checkin')
  ) {
    return {
      content:
        'I can help you with check-in. You will need your booking reference and passenger last name to continue.',
      actions: [
        {
          label: 'Start check-in',
          href: '/check-in',
        },
      ],
    };
  }

  if (
    query.includes('booking') ||
    query.includes('reservation') ||
    query.includes('manage')
  ) {
    return {
      content:
        'You can review your reservation, passenger information, flight details, and available booking actions through Manage Booking.',
      actions: [
        {
          label: 'Manage booking',
          href: '/manage-booking',
        },
      ],
    };
  }

  if (query.includes('boarding') || query.includes('boarding pass')) {
    return {
      content:
        'Your boarding pass is available through the check-in and boarding-pass flow after the required check-in steps are completed.',
      actions: [
        {
          label: 'Go to check-in',
          href: '/check-in',
        },
      ],
    };
  }

  if (
    query.includes('baggage') ||
    query.includes('luggage') ||
    query.includes('bag')
  ) {
    return {
      content:
        'Baggage allowance depends on the fare associated with your booking. For an existing reservation, Manage Booking is the best place to review your trip details.',
      actions: [
        {
          label: 'Manage booking',
          href: '/manage-booking',
        },
      ],
    };
  }

  if (
    query.includes('flight') ||
    query.includes('destination') ||
    query.includes('schedule')
  ) {
    return {
      content:
        'You can search AeroPass flights by route and travel date, then open a flight to review the detailed schedule and fare options.',
      actions: [
        {
          label: 'Search flights',
          href: '/search',
        },
      ],
    };
  }

  if (
    query.includes('payment') ||
    query.includes('refund') ||
    query.includes('pay')
  ) {
    return {
      content:
        'Payment and refund information depends on your booking status and payment method. Start with Manage Booking to review the reservation.',
      actions: [
        {
          label: 'Manage booking',
          href: '/manage-booking',
        },
      ],
    };
  }

  return {
    content:
      'I can help with AeroPass flights, bookings, check-in, boarding passes, baggage, payments, and general travel questions. What would you like to know?',
  };
}
