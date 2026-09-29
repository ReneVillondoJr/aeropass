'use client';

import { ArrowRight } from 'lucide-react';

import { helpCategories, helpCategoryIcons } from '../data/help';

export function HelpCategoryGrid() {
  return (
    <section className='px-6 py-14 sm:px-8 lg:px-10 lg:py-18'>
      <div className='mx-auto max-w-6xl'>
        <div className='mb-8'>
          <p className='text-xs font-semibold uppercase tracking-[0.16em] text-[#648da7]'>
            Browse help
          </p>

          <h2 className='mt-2 text-2xl font-semibold tracking-tight text-[#102a43] sm:text-3xl'>
            What can we help you with?
          </h2>
        </div>

        <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
          {helpCategories.map((category) => {
            const Icon = helpCategoryIcons[category.icon];

            return (
              <a
                key={category.id}
                href={`#${category.id}`}
                className='group rounded-3xl border border-[#dce8ef] bg-white p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#b9d8e7] hover:shadow-[0_16px_42px_rgba(16,42,67,0.08)]'
              >
                <div className='flex items-start justify-between'>
                  <div className='flex size-11 items-center justify-center rounded-2xl bg-[#e5f5fc] text-[#3f88b2]'>
                    <Icon className='size-5' />
                  </div>

                  <ArrowRight className='size-4 text-[#9aaab7] transition-transform duration-200 group-hover:translate-x-1 group-hover:text-[#3f88b2]' />
                </div>

                <h3 className='mt-6 text-lg font-semibold text-[#102a43]'>
                  {category.title}
                </h3>

                <p className='mt-2 text-sm leading-6 text-[#64748b]'>
                  {category.description}
                </p>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
