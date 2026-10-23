export type HelpCategory =
  | 'BOOKING'
  | 'PAYMENTS'
  | 'FLIGHTS'
  | 'CHECK_IN'
  | 'BAGGAGE'
  | 'ACCOUNT';

export type HelpCategoryFilter = 'ALL' | HelpCategory;

export type SupportPriority = 'LOW' | 'NORMAL' | 'HIGH';

export type SupportRequestStatus = 'SUBMITTED' | 'IN_PROGRESS' | 'RESOLVED';

export interface HelpArticle {
  id: string;
  question: string;
  answer: string;
  category: HelpCategory;
  keywords: string[];
}

export interface HelpCategoryOption {
  value: HelpCategoryFilter;
  label: string;
}

export interface SupportRequestFormValues {
  subject: string;
  category: HelpCategory;
  message: string;
  priority: SupportPriority;
}

export interface SupportRequest extends SupportRequestFormValues {
  id: string;
  customerId: string;
  status: SupportRequestStatus;
  createdAt: string;
}

export interface SupportRequestFieldErrors {
  subject?: string;
  category?: string;
  message?: string;
}

export interface HelpSupportStats {
  totalArticles: number;
  totalCategories: number;
}
