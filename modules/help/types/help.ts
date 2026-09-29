export type HelpCategory =
  | 'BOOKING'
  | 'CHECK_IN'
  | 'BAGGAGE'
  | 'PAYMENTS'
  | 'CHANGES'
  | 'DISRUPTIONS';

export interface HelpCategoryItem {
  id: string;
  title: string;
  description: string;
  icon:
    | 'booking'
    | 'check-in'
    | 'baggage'
    | 'payments'
    | 'changes'
    | 'disruptions';
}

export interface HelpArticle {
  id: string;
  category: HelpCategory;
  title: string;
  description: string;
  content: string;
}

export interface SupportRequest {
  name: string;
  email: string;
  bookingReference: string;
  category: string;
  message: string;
}
