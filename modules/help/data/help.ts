import {
  AlertTriangle,
  ArrowUpRight,
  BriefcaseBusiness,
  CreditCard,
  Luggage,
  RefreshCcw,
  TicketCheck,
} from 'lucide-react';

import type { HelpArticle, HelpCategoryItem } from '../types/help';

export const helpCategories: HelpCategoryItem[] = [
  {
    id: 'booking',
    title: 'Booking & tickets',
    description:
      'Learn about reservations, tickets, booking references, and your itinerary.',
    icon: 'booking',
  },
  {
    id: 'check-in',
    title: 'Check-in & boarding',
    description:
      'Learn how online check-in, boarding passes, and airport boarding work.',
    icon: 'check-in',
  },
  {
    id: 'baggage',
    title: 'Baggage',
    description:
      'Understand baggage allowances, checked bags, and baggage services.',
    icon: 'baggage',
  },
  {
    id: 'payments',
    title: 'Payments & refunds',
    description:
      'Find information about payments, failed transactions, and refunds.',
    icon: 'payments',
  },
  {
    id: 'changes',
    title: 'Changes & cancellations',
    description:
      'Understand flight changes, cancellations, and booking adjustments.',
    icon: 'changes',
  },
  {
    id: 'disruptions',
    title: 'Flight disruptions',
    description:
      'Find guidance for delays, cancellations, and unexpected travel changes.',
    icon: 'disruptions',
  },
];

export const helpCategoryIcons = {
  booking: BriefcaseBusiness,
  'check-in': TicketCheck,
  baggage: Luggage,
  payments: CreditCard,
  changes: RefreshCcw,
  disruptions: AlertTriangle,
} as const;

export const popularArticles: HelpArticle[] = [
  {
    id: 'booking-reference',
    category: 'BOOKING',
    title: 'Where can I find my booking reference?',
    description: 'Your booking reference is used to access your reservation.',
    content:
      'Your AeroPass booking reference is provided after a successful reservation. Use it together with the passenger last name when accessing Manage Booking or Check-in.',
  },
  {
    id: 'manage-booking',
    category: 'BOOKING',
    title: 'How do I manage my booking?',
    description: 'Review your itinerary and available booking options.',
    content:
      'Open Manage Booking and provide your booking reference and passenger last name. AeroPass will retrieve the reservation associated with those details.',
  },
  {
    id: 'check-in-online',
    category: 'CHECK_IN',
    title: 'How do I check in online?',
    description: 'Complete your check-in before heading to the airport.',
    content:
      'Open Check-in, provide your booking reference and passenger last name, verify your trip information, and continue through the check-in process.',
  },
  {
    id: 'boarding-pass',
    category: 'CHECK_IN',
    title: 'Where can I find my boarding pass?',
    description: 'Access your boarding pass after completing check-in.',
    content:
      'After completing the required check-in steps, your boarding pass becomes available through the appropriate AeroPass boarding-pass flow.',
  },
  {
    id: 'baggage-allowance',
    category: 'BAGGAGE',
    title: 'What is my baggage allowance?',
    description: 'Understand how baggage allowance relates to your fare.',
    content:
      'Baggage allowance depends on the fare associated with your reservation. Review the fare and booking details before completing your travel arrangements.',
  },
  {
    id: 'extra-baggage',
    category: 'BAGGAGE',
    title: 'Can I add baggage after booking?',
    description: 'Review additional baggage options for an existing trip.',
    content:
      'Additional baggage services depend on the reservation and fare rules. Use Manage Booking to review the options available for your trip.',
  },
  {
    id: 'payment-pending',
    category: 'PAYMENTS',
    title: 'Why is my payment still pending?',
    description: 'Understand what can happen while a payment is processing.',
    content:
      'A payment may remain pending while the transaction is being processed. Review your booking and payment information before starting another payment attempt.',
  },
  {
    id: 'refund',
    category: 'PAYMENTS',
    title: 'How do refunds work?',
    description: 'Learn what can affect refund availability.',
    content:
      'Refund availability depends on the booking status and applicable fare or booking conditions. Review Manage Booking for the information associated with your reservation.',
  },
  {
    id: 'change-flight',
    category: 'CHANGES',
    title: 'Can I change my flight?',
    description: 'Review options for modifying an existing reservation.',
    content:
      'Flight changes depend on your booking and fare conditions. Start with Manage Booking to review the options associated with your reservation.',
  },
  {
    id: 'cancel-flight',
    category: 'CHANGES',
    title: 'How do I cancel a booking?',
    description: 'Understand the first step when you need to cancel.',
    content:
      'Open Manage Booking to review the reservation and available cancellation options. Any applicable refund or fees depend on the booking conditions.',
  },
];

export const travelInformation = [
  {
    id: 'airport-arrival',
    title: 'Preparing for the airport',
    description:
      'Give yourself enough time for airport entry, baggage, security, and boarding.',
  },
  {
    id: 'travel-requirements',
    title: 'Travel requirements',
    description:
      'Make sure you have the documents and information required for your journey.',
  },
  {
    id: 'boarding-process',
    title: 'Understanding boarding',
    description:
      'Review what happens between check-in, the gate, and boarding.',
  },
  {
    id: 'flight-information',
    title: 'Understanding your flight details',
    description:
      'Learn how to read your route, departure time, terminal, gate, and seat information.',
  },
];

export const disruptionItems = [
  {
    title: 'My flight is delayed',
    description:
      'Check your latest flight information and review your available booking options.',
  },
  {
    title: 'My flight was cancelled',
    description:
      'Review your reservation and available options through Manage Booking.',
  },
  {
    title: 'I missed my connection',
    description:
      'Review your itinerary and contact AeroPass support for assistance with your situation.',
  },
];

export const supportCategories = [
  'Booking',
  'Check-in',
  'Baggage',
  'Payment',
  'Changes & refunds',
  'Flight disruption',
  'Other',
];

export const categoryLabels: Record<HelpArticle['category'], string> = {
  BOOKING: 'Booking',
  CHECK_IN: 'Check-in',
  BAGGAGE: 'Baggage',
  PAYMENTS: 'Payments',
  CHANGES: 'Changes',
  DISRUPTIONS: 'Disruptions',
};

export const helpActionIcons = {
  booking: ArrowUpRight,
} as const;
