import {
  BriefcaseBusiness,
  CircleHelp,
  CreditCard,
  Luggage,
  Plane,
  TicketCheck,
} from 'lucide-react';

import type { ChatAction, QuickAction, SuggestedQuestion } from '../types/help';

export const quickActions: QuickAction[] = [
  {
    id: 'check-in',
    label: 'Check in',
    description: 'Get ready for your upcoming flight.',
    href: '/check-in',
    icon: 'check-in',
  },
  {
    id: 'manage-booking',
    label: 'Manage booking',
    description: 'View and manage an existing reservation.',
    href: '/manage-booking',
    icon: 'booking',
  },
  {
    id: 'flights',
    label: 'Find a flight',
    description: 'Search available AeroPass flights.',
    href: '/search',
    icon: 'flight',
  },
  {
    id: 'baggage',
    label: 'Baggage',
    description: 'Learn about baggage and allowances.',
    href: '#chat',
    icon: 'baggage',
  },
  {
    id: 'payments',
    label: 'Payments',
    description: 'Get help with payment questions.',
    href: '#chat',
    icon: 'payment',
  },
  {
    id: 'support',
    label: 'Contact support',
    description: 'Send a message to the AeroPass team.',
    href: '#support',
    icon: 'support',
  },
];

export const quickActionIcons = {
  booking: BriefcaseBusiness,
  'check-in': TicketCheck,
  flight: Plane,
  baggage: Luggage,
  payment: CreditCard,
  support: CircleHelp,
} as const;

export const suggestedQuestions: SuggestedQuestion[] = [
  {
    id: 'check-in-question',
    label: 'How do I check in?',
  },
  {
    id: 'booking-question',
    label: 'How do I manage my booking?',
  },
  {
    id: 'boarding-pass-question',
    label: 'Where can I find my boarding pass?',
  },
  {
    id: 'baggage-question',
    label: 'What is my baggage allowance?',
  },
];

export interface MockAiResponse {
  content: string;
  actions?: ChatAction[];
}

export function getMockAiResponse(message: string): MockAiResponse {
  const normalized = message.trim().toLowerCase();

  if (
    normalized.includes('check in') ||
    normalized.includes('check-in') ||
    normalized.includes('checkin')
  ) {
    return {
      content:
        'I can help you with check-in. Open AeroPass Check-in and enter your booking reference together with the passenger last name. After your booking is verified, you can continue through the check-in process.',
      actions: [
        {
          label: 'Start check-in',
          href: '/check-in',
        },
      ],
    };
  }

  if (
    normalized.includes('booking') ||
    normalized.includes('reservation') ||
    normalized.includes('manage')
  ) {
    return {
      content:
        'You can review an existing reservation through Manage Booking. Enter your booking reference and passenger last name to view your trip information and available booking actions.',
      actions: [
        {
          label: 'Manage booking',
          href: '/manage-booking',
        },
      ],
    };
  }

  if (normalized.includes('boarding pass') || normalized.includes('boarding')) {
    return {
      content:
        'Your boarding pass becomes available through the check-in and boarding-pass flow after the required check-in steps are completed.',
      actions: [
        {
          label: 'Go to check-in',
          href: '/check-in',
        },
      ],
    };
  }

  if (
    normalized.includes('baggage') ||
    normalized.includes('luggage') ||
    normalized.includes('bag')
  ) {
    return {
      content:
        'Baggage allowances depend on the fare associated with your reservation. For an existing trip, open Manage Booking to review the booking details and available options.',
      actions: [
        {
          label: 'Manage booking',
          href: '/manage-booking',
        },
      ],
    };
  }

  if (
    normalized.includes('flight') ||
    normalized.includes('schedule') ||
    normalized.includes('destination')
  ) {
    return {
      content:
        'You can search AeroPass flights by route and travel date. From the results, select a flight to review its detailed schedule and fare options.',
      actions: [
        {
          label: 'Search flights',
          href: '/search',
        },
      ],
    };
  }

  if (
    normalized.includes('payment') ||
    normalized.includes('pay') ||
    normalized.includes('refund')
  ) {
    return {
      content:
        'Payment and refund options depend on the booking status and payment method. For an existing reservation, start with Manage Booking so you can review the booking information first.',
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
      'I can help with AeroPass bookings, check-in, boarding passes, flights, baggage, payments, and general travel questions. Try one of the suggested questions below or tell me what you need help with.',
  };
}
