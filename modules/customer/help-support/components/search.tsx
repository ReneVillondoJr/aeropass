'use client';

import { Search, X } from 'lucide-react';

interface HelpSupportSearchProps {
  value: string;
  onChange: (value: string) => void;
  resultCount: number;
}

export function HelpSupportSearch({
  value,
  onChange,
  resultCount,
}: HelpSupportSearchProps) {
  return (
    <section className='rounded-2xl border border-slate-200 bg-white p-5 sm:p-6'>
      <label
        htmlFor='help-search'
        className='mb-3 block text-sm font-semibold text-[#102A43]'
      >
        How can we help you?
      </label>

      <div className='relative'>
        <Search
          className='pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-slate-400'
          aria-hidden='true'
        />

        <input
          id='help-search'
          type='search'
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder='Search bookings, payments, check-in...'
          className='w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-12 pr-12 text-sm text-[#102A43] outline-none transition placeholder:text-slate-400 focus:border-[#5BA9D6] focus:bg-white focus:ring-2 focus:ring-[#E5F5FC]'
        />

        {value && (
          <button
            type='button'
            onClick={() => onChange('')}
            aria-label='Clear search'
            className='absolute right-3 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-200 hover:text-slate-700'
          >
            <X className='size-4' />
          </button>
        )}
      </div>

      <p className='mt-3 text-xs text-slate-500' aria-live='polite'>
        {resultCount} {resultCount === 1 ? 'article' : 'articles'} found
      </p>
    </section>
  );
}
