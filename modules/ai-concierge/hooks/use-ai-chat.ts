'use client';

import { useState } from 'react';

import { getMockAiResponse } from '../data/ai-concierge';

import type { AiChatMessage } from '../types/ai-concierge';

const welcomeMessage: AiChatMessage = {
  id: 'welcome',
  role: 'assistant',
  content: 'Hi! I’m the AeroPass Concierge. How can I help with your journey?',
};

export function useAiChat() {
  const [messages, setMessages] = useState<AiChatMessage[]>([welcomeMessage]);

  const [input, setInput] = useState('');

  const [isTyping, setIsTyping] = useState(false);

  async function sendMessage(message?: string) {
    const value = (message ?? input).trim();

    if (!value || isTyping) {
      return;
    }

    const userMessage: AiChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: value,
    };

    setMessages((current) => [...current, userMessage]);

    setInput('');
    setIsTyping(true);

    await new Promise((resolve) => setTimeout(resolve, 650));

    const response = getMockAiResponse(value);

    const assistantMessage: AiChatMessage = {
      id: `assistant-${Date.now()}`,
      role: 'assistant',
      content: response.content,
      actions: response.actions,
    };

    setMessages((current) => [...current, assistantMessage]);

    setIsTyping(false);
  }

  function resetChat() {
    setMessages([welcomeMessage]);

    setInput('');
    setIsTyping(false);
  }

  return {
    messages,
    input,
    setInput,
    isTyping,
    sendMessage,
    resetChat,
  };
}
