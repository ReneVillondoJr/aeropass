export type AiMessageRole = 'assistant' | 'user';

export type AiIntent =
  | 'GREETING'
  | 'CHECK_IN'
  | 'BOOKING'
  | 'BOARDING'
  | 'BAGGAGE'
  | 'FLIGHT'
  | 'PAYMENT'
  | 'CHANGES'
  | 'SUPPORT'
  | 'OUT_OF_SCOPE';

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

export interface AiResponse {
  intent: AiIntent;
  content: string;
  actions?: AiChatAction[];
}
