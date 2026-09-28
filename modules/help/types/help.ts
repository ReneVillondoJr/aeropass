export type ChatRole = 'assistant' | 'user';

export interface ChatAction {
  label: string;
  href: string;
}

export interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
  actions?: ChatAction[];
}

export interface QuickAction {
  id: string;
  label: string;
  description: string;
  href: string;
  icon: 'booking' | 'check-in' | 'flight' | 'baggage' | 'payment' | 'support';
}

export interface SuggestedQuestion {
  id: string;
  label: string;
}
