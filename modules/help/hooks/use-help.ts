'use client';

import { useState } from 'react';

import { getMockAiResponse } from '../data/help';

import type { ChatMessage } from '../types/help';

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

    await new Promise((resolve) => setTimeout(resolve, 650));

    const response = getMockAiResponse(value);

    const assistantMessage: ChatMessage = {
      id: `assistant-${Date.now()}`,
      role: 'assistant',
      content: response.content,
      actions: response.actions,
    };

    setMessages((current) => [...current, assistantMessage]);

    setIsTyping(false);
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
