import type {
  HelpArticle,
  HelpCategory,
  HelpCategoryOption,
  HelpSupportStats,
} from '../types/help-support';

export const helpCategories: HelpCategoryOption[] = [
  {
    value: 'ALL',
    label: 'All topics',
  },
  {
    value: 'BOOKING',
    label: 'Bookings',
  },
  {
    value: 'PAYMENTS',
    label: 'Payments',
  },
  {
    value: 'FLIGHTS',
    label: 'Flights',
  },
  {
    value: 'CHECK_IN',
    label: 'Check-in',
  },
  {
    value: 'BAGGAGE',
    label: 'Baggage',
  },
  {
    value: 'ACCOUNT',
    label: 'Account',
  },
];

export const helpArticles: HelpArticle[] = [
  {
    id: 'faq-001',
    question: 'How do I book a flight?',
    answer:
      'Open the flight search page, select your departure and arrival airports, choose your travel dates, and enter the number of passengers. Review the available flights, select the option that suits you, provide the required passenger information, and follow the booking flow to review your reservation. Your booking confirmation should be available after a successful booking.',
    category: 'BOOKING',
    keywords: [
      'reserve',
      'reservation',
      'purchase',
      'search',
      'ticket',
      'travel',
    ],
  },
  {
    id: 'faq-002',
    question: 'Where can I find my booking reference?',
    answer:
      'Open the My Bookings section of your customer dashboard and select the relevant reservation. Your booking reference and reservation details should be displayed on the booking details page when those details are available.',
    category: 'BOOKING',
    keywords: [
      'confirmation',
      'reference number',
      'booking id',
      'reservation code',
      'pnr',
    ],
  },
  {
    id: 'faq-003',
    question: 'Can I cancel my flight booking?',
    answer:
      'Cancellation eligibility depends on the fare conditions and the applicable airline policy. Review your booking details and available cancellation options before proceeding. If the cancellation option is unavailable or you are unsure about any fees, contact support for assistance.',
    category: 'BOOKING',
    keywords: [
      'cancel',
      'cancellation',
      'refund',
      'change booking',
      'reschedule',
    ],
  },
  {
    id: 'faq-004',
    question: 'How can I change my travel date?',
    answer:
      'Open your booking details and review the available modification options. Some fares may permit date changes subject to seat availability, airline rules, and any applicable fare difference or change fee. If the booking cannot be modified through the customer portal, submit a support request with your booking reference.',
    category: 'BOOKING',
    keywords: [
      'reschedule',
      'change date',
      'modify',
      'rebook',
      'travel schedule',
    ],
  },
  {
    id: 'faq-005',
    question: 'How do I check my payment status?',
    answer:
      'Open the Payments section of your customer dashboard to review the payment records available for your account. Check the status associated with the relevant booking. If the payment status appears incorrect, provide your booking reference and relevant payment details when contacting support. Never include your password or full card details.',
    category: 'PAYMENTS',
    keywords: [
      'payment history',
      'transaction',
      'paid',
      'pending',
      'payment confirmation',
    ],
  },
  {
    id: 'faq-006',
    question: 'What should I do if my payment is pending?',
    answer:
      'First, check the payment status and your booking details. Avoid repeatedly submitting the same payment while its outcome is uncertain. If the payment remains pending, contact support with your booking reference, transaction reference if available, and the approximate transaction time. Do not send your password, one-time password, or complete card details.',
    category: 'PAYMENTS',
    keywords: [
      'failed payment',
      'processing',
      'transaction pending',
      'charged',
      'duplicate payment',
    ],
  },
  {
    id: 'faq-007',
    question: 'How do I request a refund?',
    answer:
      'Review the cancellation and refund conditions associated with your booking. If a refund is available, follow the refund instructions provided in the booking or payment flow. Refund eligibility, amounts, and processing times depend on the applicable fare rules and payment arrangements. Contact support if you need help understanding the available options.',
    category: 'PAYMENTS',
    keywords: [
      'money back',
      'reimbursement',
      'refund status',
      'cancel booking',
    ],
  },
  {
    id: 'faq-008',
    question: 'How can I check my flight status?',
    answer:
      'Open the flight information or booking details section and review the latest flight information available in the application. For a real reservation, confirm time-sensitive information with the operating airline or airport, especially before departing for the airport.',
    category: 'FLIGHTS',
    keywords: [
      'departure',
      'arrival',
      'delay',
      'flight schedule',
      'flight number',
      'status',
    ],
  },
  {
    id: 'faq-009',
    question: 'What happens if my flight is delayed?',
    answer:
      'Check the flight status and any notifications associated with your reservation. Follow instructions from the operating airline or airport staff. Options for rebooking, compensation, accommodation, or refunds depend on the circumstances, applicable regulations, and the airline policy.',
    category: 'FLIGHTS',
    keywords: [
      'late flight',
      'delay',
      'missed connection',
      'disruption',
      'reschedule',
    ],
  },
  {
    id: 'faq-010',
    question: 'How do I check in for my flight?',
    answer:
      'Open the Check-in section of your customer dashboard and select an eligible booking. Follow the displayed instructions and review your passenger details before submitting. Check-in availability depends on the flight, airline rules, and departure time. If online check-in is unavailable, contact the airline or airport for instructions.',
    category: 'CHECK_IN',
    keywords: [
      'online check-in',
      'boarding pass',
      'check in',
      'passenger details',
    ],
  },
  {
    id: 'faq-011',
    question: 'Where can I find my boarding pass?',
    answer:
      'If your booking supports online check-in and the check-in process has been completed, review the check-in or booking details page for your boarding pass. If it is not available, follow the airline instructions for obtaining one at the airport.',
    category: 'CHECK_IN',
    keywords: [
      'boarding document',
      'check-in confirmation',
      'airport',
      'boarding pass',
    ],
  },
  {
    id: 'faq-012',
    question: 'What baggage can I bring?',
    answer:
      'Baggage allowances vary by airline, route, cabin, and fare type. Review the baggage information associated with your flight before traveling. Check both cabin and checked baggage limits, including weight, dimensions, restricted items, and any additional baggage charges.',
    category: 'BAGGAGE',
    keywords: [
      'luggage',
      'carry-on',
      'checked baggage',
      'weight limit',
      'baggage allowance',
    ],
  },
  {
    id: 'faq-013',
    question: 'What should I do if my baggage is lost or damaged?',
    answer:
      'Report the issue to the airline baggage service desk as soon as possible, preferably before leaving the airport. Keep your baggage tag and any report or claim reference provided by the airline. Contact support if you need help locating the relevant booking information.',
    category: 'BAGGAGE',
    keywords: [
      'lost luggage',
      'damaged luggage',
      'missing baggage',
      'baggage claim',
    ],
  },
  {
    id: 'faq-014',
    question: 'How do I update my profile information?',
    answer:
      'Open My Profile from the customer dashboard and select the edit option. Update the available contact fields, review the information, and save your changes. Some passenger or identity details may require a separate workflow and may not be editable after a booking has been issued.',
    category: 'ACCOUNT',
    keywords: [
      'edit profile',
      'email',
      'phone',
      'personal details',
      'account information',
    ],
  },
  {
    id: 'faq-015',
    question: 'What should I do if I cannot access my account?',
    answer:
      'Confirm that you are using the correct account credentials and that your browser is working normally. If a password reset option is available, follow its instructions. If you still cannot access your account, contact support through an approved channel. Never share your password or one-time verification codes.',
    category: 'ACCOUNT',
    keywords: ['login', 'sign in', 'password', 'locked account', 'access'],
  },
];

export function getHelpArticles(): HelpArticle[] {
  return [...helpArticles];
}

export function getHelpArticleById(articleId: string): HelpArticle | undefined {
  return helpArticles.find((article) => article.id === articleId);
}

export function getHelpCategoryLabel(category: HelpCategory): string {
  return (
    helpCategories.find((item) => item.value === category)?.label ?? 'Other'
  );
}

export function getHelpSupportStats(): HelpSupportStats {
  return {
    totalArticles: helpArticles.length,
    totalCategories: helpCategories.length - 1,
  };
}
