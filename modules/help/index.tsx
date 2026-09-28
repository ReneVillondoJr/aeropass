'use client';

import { Sparkles } from 'lucide-react';

import { AiChatBox } from './components/ai-chat-box';

import { HelpSupportCard } from './components/help-support-card';

export function Help() {
  return (
    <div className='bg-[#f4f9fc]'>
      <section className='border-b border-[#dce8ef] bg-white'>
        <div className='mx-auto max-w-5xl px-6 pb-4 pt-14 text-center sm:px-8 lg:px-10 lg:pb-6 lg:pt-18'>
          <div className='mx-auto inline-flex items-center gap-2 rounded-full border border-[#d5e7ef] bg-[#f4f9fc] px-3.5 py-2 text-xs font-semibold text-[#4d7f9d]'>
            <Sparkles className='size-3.5' />
            AeroPass Concierge
          </div>

          <h1 className='mx-auto mt-5 max-w-3xl text-4xl font-semibold tracking-tight text-[#102a43] sm:text-5xl lg:text-6xl'>
            Help, without the hassle.
          </h1>

          <p className='mx-auto mt-5 max-w-2xl text-base leading-7 text-[#64748b] sm:text-lg'>
            Ask AeroPass about your booking, check-in, flights, baggage,
            payments, or anything related to your journey.
          </p>
        </div>
      </section>

      <AiChatBox />

      <HelpSupportCard />
    </div>
  );
}
