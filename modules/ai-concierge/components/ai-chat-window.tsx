'use client';

import { ChevronDown, RotateCcw, Send, Sparkles } from 'lucide-react';

import { useRef } from 'react';

import { Button } from '@/components/ui/button';

import { aiSuggestedQuestions } from '../data/ai-concierge';
import { useAiChat } from '../hooks/use-ai-chat';

import { AiChatMessage } from './ai-chat-message';

interface AiChatWindowProps {
  onClose: () => void;
}

export function AiChatWindow({ onClose }: AiChatWindowProps) {
  const { messages, input, setInput, isTyping, sendMessage, resetChat } =
    useAiChat();

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    void sendMessage();
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();

      void sendMessage();
    }
  }

  function handleSuggestedQuestion(question: string) {
    void sendMessage(question);
  }

  return (
    <div className='flex h-[min(700px,calc(100dvh-110px))] w-[calc(100vw-2rem)] max-w-[420px] flex-col overflow-hidden rounded-[1.75rem] border border-[#d5e6ef] bg-white shadow-[0_25px_80px_rgba(16,42,67,0.20)] sm:h-[650px]'>
      {/* Header */}
      <header className='relative shrink-0 overflow-hidden border-b border-[#e0edf3] bg-[radial-gradient(circle_at_top_right,rgba(91,169,214,0.20),transparent_38%),linear-gradient(135deg,#ffffff,#f4f9fc)] px-4 py-4'>
        <div className='absolute -right-12 -top-12 size-32 rounded-full bg-[#5ba9d6]/10 blur-3xl' />

        <div className='relative flex items-center justify-between gap-3'>
          <div className='flex min-w-0 items-center gap-3'>
            <div className='relative flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#102a43] text-white shadow-lg shadow-[#102a43]/10'>
              <Sparkles className='size-4.5' />

              <span className='absolute -right-0.5 -top-0.5 size-2.5 rounded-full border-2 border-white bg-emerald-400' />
            </div>

            <div className='min-w-0'>
              <div className='flex items-center gap-1.5'>
                <h2 className='truncate text-sm font-semibold text-[#102a43]'>
                  AeroPass Concierge
                </h2>

                <span className='rounded-full border border-[#cfe3ee] bg-white px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-[#4e85a4]'>
                  AI
                </span>
              </div>

              <p className='mt-0.5 text-[11px] text-[#748699]'>
                Online and ready to help
              </p>
            </div>
          </div>

          <div className='flex shrink-0 items-center gap-1'>
            <Button
              type='button'
              variant='ghost'
              size='icon-sm'
              aria-label='Reset conversation'
              onClick={resetChat}
              className='size-8 rounded-lg text-[#6b7d8e] hover:bg-white hover:text-[#102a43]'
            >
              <RotateCcw className='size-3.5' />
            </Button>

            <Button
              type='button'
              variant='ghost'
              size='icon-sm'
              aria-label='Close AeroPass Concierge'
              onClick={onClose}
              className='size-8 rounded-lg text-[#6b7d8e] hover:bg-white hover:text-[#102a43]'
            >
              <ChevronDown className='size-4' />
            </Button>
          </div>
        </div>
      </header>

      {/* Messages */}
      <div className='min-h-0 flex-1 overflow-y-auto px-4 py-4'>
        <div className='space-y-4'>
          {messages.map((message) => (
            <AiChatMessage key={message.id} message={message} />
          ))}

          {isTyping ?
            <div className='flex items-start gap-2.5'>
              <div className='flex size-7 shrink-0 items-center justify-center rounded-lg bg-[#e5f5fc] text-[#3f88b2]'>
                <Sparkles className='size-3.5' />
              </div>

              <div className='flex items-center gap-1 rounded-2xl rounded-tl-md bg-[#f4f9fc] px-4 py-3'>
                <span className='size-1.5 animate-bounce rounded-full bg-[#8aa6b8]' />

                <span className='size-1.5 animate-bounce rounded-full bg-[#8aa6b8] [animation-delay:120ms]' />

                <span className='size-1.5 animate-bounce rounded-full bg-[#8aa6b8] [animation-delay:240ms]' />
              </div>
            </div>
          : null}
        </div>
      </div>

      {/* Composer */}
      <div className='shrink-0 border-t border-[#e1edf3] bg-[#fbfdfe] px-3.5 pb-3.5 pt-3'>
        {/* Always-visible suggested questions */}
        <div className='mb-3'>
          <div className='mb-2 flex items-center justify-between'>
            <p className='text-[10px] font-semibold uppercase tracking-[0.14em] text-[#7891a3]'>
              Suggested questions
            </p>

            <span className='text-[10px] text-[#a0adb8]'>
              Ask anything about AeroPass
            </span>
          </div>

          <div className='flex flex-wrap gap-1.5'>
            {aiSuggestedQuestions.map((question) => (
              <button
                key={question}
                type='button'
                disabled={isTyping}
                onClick={() => handleSuggestedQuestion(question)}
                className='rounded-full border border-[#dbe8ef] bg-white px-2.5 py-1.5 text-[11px] font-medium text-[#627687] transition-all duration-200 hover:border-[#afd1e2] hover:bg-[#f7fbfd] hover:text-[#102a43] disabled:pointer-events-none disabled:opacity-50'
              >
                {question}
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className='relative'>
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isTyping}
            rows={2}
            placeholder='Ask AeroPass...'
            aria-label='Ask AeroPass'
            className='min-h-[68px] w-full resize-none rounded-2xl border border-[#d5e5ed] bg-white px-3.5 py-3 pr-12 text-sm leading-5 text-[#102a43] outline-none transition-all placeholder:text-[#9aa9b7] focus:border-[#8fc5df] focus:ring-4 focus:ring-[#5ba9d6]/10 disabled:bg-[#f7fafc]'
          />

          <Button
            type='submit'
            size='icon'
            disabled={!input.trim() || isTyping}
            aria-label='Send message'
            className='absolute bottom-2.5 right-2.5 size-8 rounded-lg bg-[#102a43] text-white shadow-sm transition-colors hover:bg-[#183b5b] disabled:opacity-40'
          >
            <Send className='size-3.5' />
          </Button>
        </form>

        <p className='mt-2 text-center text-[10px] leading-4 text-[#9aa8b5]'>
          AeroPass Concierge provides general guidance. Verify trip-specific
          details in your booking.
        </p>
      </div>
    </div>
  );
}
