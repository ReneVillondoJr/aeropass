'use client';

import { useState } from 'react';

import { AiChatWindow } from './components/ai-chat-window';

export function AiConcierge() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {isOpen ?
        <div className='fixed bottom-24 right-4 z-[70] sm:right-6'>
          <AiChatWindow onClose={() => setIsOpen(false)} />
        </div>
      : null}

      {!isOpen ?
        <button
          type='button'
          onClick={() => setIsOpen(true)}
          aria-label='Open AeroPass AI Concierge'
          className='group fixed bottom-5 right-4 z-[70] flex items-center gap-2.5 rounded-2xl bg-[#102a43] px-4 py-3 text-white shadow-[0_12px_35px_rgba(16,42,67,0.22)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#183b5b] hover:shadow-[0_16px_42px_rgba(16,42,67,0.28)] sm:bottom-6 sm:right-6'
        >
          <span className='relative flex size-9 items-center justify-center rounded-xl bg-white/10'>
            <span className='absolute inset-0 rounded-xl bg-[#5ba9d6]/20 blur-md transition-opacity group-hover:opacity-100' />

            <span className='relative'>✦</span>

            <span className='absolute -right-0.5 -top-0.5 size-2.5 rounded-full border-2 border-[#102a43] bg-emerald-400' />
          </span>

          <span className='text-left'>
            <span className='block text-xs font-semibold'>AeroPass AI</span>

            <span className='block text-[10px] text-white/65'>Need help?</span>
          </span>
        </button>
      : null}
    </>
  );
}
