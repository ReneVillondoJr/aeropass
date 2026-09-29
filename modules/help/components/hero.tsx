'use client';

import { Search, ShieldCheck } from 'lucide-react';

import { Input } from '@/components/ui/input';

interface HelpHeroProps {
  query: string;
  onQueryChange: (value: string) => void;
}

export function HelpHero({ query, onQueryChange }: HelpHeroProps) {
  return (
    <section className='border-b border-[#dce8ef] bg-white'>
      <div className='mx-auto max-w-6xl px-6 pb-14 pt-14 sm:px-8 lg:px-10 lg:pb-18 lg:pt-18'>
        <div className='mx-auto max-w-3xl text-center'>
          <div className='inline-flex items-center gap-2 rounded-full border border-[#d6e7ef] bg-[#f4f9fc] px-3.5 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#5b87a1]'>
            <ShieldCheck className='size-3.5' />
            AeroPass Help Center
          </div>

          <h1 className='mt-5 text-4xl font-semibold tracking-tight text-[#102a43] sm:text-5xl lg:text-6xl'>
            Help for every part of your journey.
          </h1>

          <p className='mx-auto mt-5 max-w-2xl text-base leading-7 text-[#64748b] sm:text-lg'>
            Find answers about bookings, check-in, baggage, payments, changes,
            and flight disruptions.
          </p>

          <div className='relative mx-auto mt-8 max-w-2xl'>
            <Search className='pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-[#8194a5]' />

            <Input
              value={query}
              onChange={(event) => onQueryChange(event.target.value)}
              placeholder='Search help articles...'
              aria-label='Search AeroPass help articles'
              className='h-14 rounded-2xl border-[#d7e7ef] bg-white pl-12 pr-4 text-base shadow-[0_14px_40px_rgba(16,42,67,0.08)] focus-visible:border-[#74afd0] focus-visible:ring-[#5ba9d6]/15'
            />
          </div>
        </div>
      </div>
    </section>
  );
}
