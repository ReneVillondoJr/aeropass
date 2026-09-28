export type AiMessageRole = 'assistant' | 'user';

export interface AiChatAction {
  label: string;
  href: string;
}

export interface AiChatMessage {
  id: string;
  role: AiMessageRole;
  content: string;
  actions?: AiChatAction[];
}

export interface AiQuickAction {
  id: string;
  label: string;
  href: string;
  icon: 'booking' | 'check-in' | 'flight' | 'baggage' | 'payment';
}
