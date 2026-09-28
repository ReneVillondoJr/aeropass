'use client';

import { Bot, RotateCcw, Send, Sparkles } from 'lucide-react';

import { useRef } from 'react';

import { Button } from '@/components/ui/button';

import { ChatMessage } from './chat-message';

import { ChatQuickActions } from './chat-quick-actions';

import { quickActions, suggestedQuestions } from '../data/help';

import { useAiChat } from '../hooks/use-ai-chat';

export function AiChatBox() {
  const { messages, input, setInput, isTyping, sendMessage, clearChat } =
    useAiChat();

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    void sendMessage();
  }

  function handleInput(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setInput(event.target.value);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();

      void sendMessage();
    }
  }

  return (
    <section id='chat' className='px-6 py-10 sm:px-8 lg:px-10 lg:py-14'>
      <div className='mx-auto max-w-5xl'>
        <div className='overflow-hidden rounded-[2rem] border border-[#d4e5ee] bg-white shadow-[0_24px_70px_rgba(16,42,67,0.10)]'>
          <div className='relative overflow-hidden border-b border-[#e1edf3] bg-[radial-gradient(circle_at_top_right,rgba(91,169,214,0.18),transparent_35%),linear-gradient(135deg,#ffffff_0%,#f4f9fc_100%)] px-5 py-5 sm:px-7'>
            <div className='absolute -right-14 -top-14 size-40 rounded-full bg-[#5ba9d6]/10 blur-3xl' />

            <div className='relative flex items-center justify-between gap-4'>
              <div className='flex items-center gap-3'>
                <div className='relative flex size-11 items-center justify-center rounded-2xl bg-[#102a43] text-white shadow-lg shadow-[#102a43]/10'>
                  <Sparkles className='size-5' />

                  <span className='absolute -right-1 -top-1 size-2.5 rounded-full border-2 border-white bg-emerald-400' />
                </div>

                <div>
                  <div className='flex items-center gap-2'>
                    <h2 className='font-semibold text-[#102a43]'>
                      AeroPass Concierge
                    </h2>

                    <span className='rounded-full border border-[#cde5f1] bg-white px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#4f86a7]'>
                      AI
                    </span>
                  </div>

                  <p className='mt-0.5 text-xs text-[#708398]'>
                    Your travel assistant
                  </p>
                </div>
              </div>

              <Button
                type='button'
                variant='ghost'
                size='icon-sm'
                aria-label='Start a new conversation'
                onClick={clearChat}
                className='rounded-xl text-[#64748b] hover:bg-white hover:text-[#102a43]'
              >
                <RotateCcw className='size-4' />
              </Button>
            </div>
          </div>

          <div className='grid lg:grid-cols-[minmax(0,1fr)_300px]'>
            <div className='flex min-h-[620px] flex-col border-b border-[#e1edf3] lg:border-b-0 lg:border-r'>
              <div className='flex-1 space-y-5 overflow-y-auto px-5 py-6 sm:px-7'>
                {messages.map((message) => (
                  <ChatMessage key={message.id} message={message} />
                ))}

                {isTyping ?
                  <div className='flex items-start gap-3'>
                    <div className='flex size-8 shrink-0 items-center justify-center rounded-xl bg-[#e5f5fc] text-[#3f88b2]'>
                      <Bot className='size-4' />
                    </div>

                    <div className='flex items-center gap-1 rounded-2xl rounded-tl-md bg-[#f4f9fc] px-4 py-3'>
                      <span className='size-1.5 animate-bounce rounded-full bg-[#7fa8bf]' />
                      <span className='size-1.5 animate-bounce rounded-full bg-[#7fa8bf] [animation-delay:120ms]' />
                      <span className='size-1.5 animate-bounce rounded-full bg-[#7fa8bf] [animation-delay:240ms]' />
                    </div>
                  </div>
                : null}
              </div>

              <div className='border-t border-[#e1edf3] bg-[#fbfdfe] px-5 py-4 sm:px-7'>
                <div className='mb-3 flex flex-wrap gap-2'>
                  {suggestedQuestions.map((question) => (
                    <button
                      key={question.id}
                      type='button'
                      disabled={isTyping}
                      onClick={() => void sendMessage(question.label)}
                      className='rounded-full border border-[#dce8ef] bg-white px-3 py-1.5 text-xs font-medium text-[#5f7284] transition-colors hover:border-[#b7d7e7] hover:text-[#102a43] disabled:pointer-events-none disabled:opacity-50'
                    >
                      {question.label}
                    </button>
                  ))}
                </div>

                <form onSubmit={handleSubmit} className='relative'>
                  <textarea
                    ref={textareaRef}
                    value={input}
                    onChange={handleInput}
                    onKeyDown={handleKeyDown}
                    rows={2}
                    disabled={isTyping}
                    placeholder='Ask AeroPass anything...'
                    aria-label='Ask AeroPass anything'
                    className='min-h-20 w-full resize-none rounded-2xl border border-[#d5e5ed] bg-white px-4 py-3.5 pr-14 text-sm leading-6 text-[#102a43] outline-none transition-shadow placeholder:text-[#9aa9b7] focus:border-[#8cc3df] focus:ring-4 focus:ring-[#5ba9d6]/10 disabled:bg-[#f7fafc]'
                  />

                  <Button
                    type='submit'
                    size='icon'
                    disabled={!input.trim() || isTyping}
                    aria-label='Send message'
                    className='absolute bottom-3 right-3 size-9 rounded-xl bg-[#102a43] text-white shadow-sm hover:bg-[#183b5b] disabled:opacity-40'
                  >
                    <Send className='size-4' />
                  </Button>
                </form>

                <p className='mt-2 text-center text-[11px] text-[#94a3b8]'>
                  AeroPass Concierge may provide general guidance. Check your
                  booking details for trip-specific information.
                </p>
              </div>
            </div>

            <aside className='bg-[#fbfdfe] p-5 sm:p-6'>
              <div>
                <p className='text-xs font-semibold uppercase tracking-[0.15em] text-[#6891aa]'>
                  Quick access
                </p>

                <h3 className='mt-2 text-lg font-semibold tracking-tight text-[#102a43]'>
                  What do you need?
                </h3>

                <p className='mt-1 text-sm leading-6 text-[#718396]'>
                  Go directly to the most common AeroPass services.
                </p>
              </div>

              <div className='mt-5'>
                <ChatQuickActions
                  actions={quickActions}
                  onAsk={(value) => void sendMessage(value)}
                />
              </div>

              <div className='mt-6 rounded-2xl border border-[#dce8ef] bg-white p-4'>
                <div className='flex items-center gap-2'>
                  <div className='flex size-8 items-center justify-center rounded-xl bg-[#eaf7ee] text-emerald-600'>
                    <Bot className='size-4' />
                  </div>

                  <div>
                    <p className='text-xs font-semibold text-[#102a43]'>
                      Concierge online
                    </p>

                    <p className='text-[11px] text-[#7d8d9d]'>Ready to help</p>
                  </div>
                </div>

                <p className='mt-3 text-xs leading-5 text-[#718396]'>
                  Ask naturally. You do not need to know the exact wording for
                  your question.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}
