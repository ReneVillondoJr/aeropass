'use client';

import { Filter } from 'lucide-react';

import { helpCategories } from '../data/help-support';

import type { HelpCategoryFilter } from '../types/help-support';

interface HelpCategoryFilterProps {
  value: HelpCategoryFilter;
  onChange: (value: HelpCategoryFilter) => void;
}

export function HelpCategoryFilter({
  value,
  onChange,
}: HelpCategoryFilterProps) {
  return (
    <section className='rounded-2xl border border-slate-200 bg-white p-4 sm:p-5'>
      <div className='mb-4 flex items-center gap-2'>
        <Filter className='size-4 text-[#397FA5]' />

        <h2 className='text-sm font-semibold text-[#102A43]'>
          Browse by topic
        </h2>
      </div>

      <div className='flex flex-wrap gap-2'>
        {helpCategories.map((category) => {
          const isActive = value === category.value;

          return (
            <button
              key={category.value}
              type='button'
              onClick={() => onChange(category.value)}
              aria-pressed={isActive}
              className={`rounded-xl border px-3.5 py-2.5 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5BA9D6] focus-visible:ring-offset-2 ${
                isActive ?
                  'border-[#102A43] bg-[#102A43] text-white'
                : 'border-slate-200 bg-white text-slate-600 hover:border-[#C5E3F2] hover:bg-[#EEF7FB] hover:text-[#102A43]'
              }`}
            >
              {category.label}
            </button>
          );
        })}
      </div>
    </section>
  );
}
