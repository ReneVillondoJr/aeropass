'use client';

import { useState } from 'react';

import { askAeroPassAi } from '../../ai-concierge/services/ai-concierge';

import type { AiChatMessage as ChatMessage } from '../../ai-concierge/types/ai-concierge';

const initialMessage: ChatMessage = {
  id: 'welcome',
  role: 'assistant',
  content:
    'Hi! I’m the AeroPass Concierge. I can help with bookings, check-in, boarding passes, flights, baggage, payments, and more. What can I help you with today?',
};

export function useAiChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([initialMessage]);

  const [input, setInput] = useState('');

  const [isTyping, setIsTyping] = useState(false);

  async function sendMessage(message?: string) {
    const value = (message ?? input).trim();

    if (!value || isTyping) {
      return;
    }

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: value,
    };

    setMessages((current) => [...current, userMessage]);

    setInput('');
    setIsTyping(true);

    try {
      const response = await askAeroPassAi(value);

      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: response.content,
        actions: response.actions,
      };

      setMessages((current) => [...current, assistantMessage]);
    } catch {
      const errorMessage: ChatMessage = {
        id: `assistant-error-${Date.now()}`,
        role: 'assistant',
        content:
          'I’m having trouble responding right now. Please try again or use the AeroPass Help Center for assistance.',
        actions: [{ label: 'Open Help Center', href: '/help' }],
      };

      setMessages((current) => [...current, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  }

  function clearChat() {
    setMessages([initialMessage]);

    setInput('');
    setIsTyping(false);
  }

  return {
    messages,
    input,
    setInput,
    isTyping,
    sendMessage,
    clearChat,
  };
}
