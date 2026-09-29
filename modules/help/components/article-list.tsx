'use client';

import { BookOpen, ChevronDown } from 'lucide-react';

import { useState } from 'react';

import { categoryLabels } from '../data/help';

import type { HelpArticle, HelpCategory } from '../types/help';

interface HelpArticleListProps {
  articles: HelpArticle[];
  activeCategory: HelpCategory | 'ALL';
  onCategoryChange: (category: HelpCategory | 'ALL') => void;
}

const categories: Array<{
  value: HelpCategory | 'ALL';
  label: string;
}> = [
  {
    value: 'ALL',
    label: 'All',
  },
  {
    value: 'BOOKING',
    label: 'Booking',
  },
  {
    value: 'CHECK_IN',
    label: 'Check-in',
  },
  {
    value: 'BAGGAGE',
    label: 'Baggage',
  },
  {
    value: 'PAYMENTS',
    label: 'Payments',
  },
  {
    value: 'CHANGES',
    label: 'Changes',
  },
  {
    value: 'DISRUPTIONS',
    label: 'Disruptions',
  },
];

export function HelpArticleList({
  articles,
  activeCategory,
  onCategoryChange,
}: HelpArticleListProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section id='articles' className='px-6 pb-14 sm:px-8 lg:px-10 lg:pb-18'>
      <div className='mx-auto max-w-4xl'>
        <div className='text-center'>
          <div className='mx-auto flex size-12 items-center justify-center rounded-2xl bg-[#e5f5fc] text-[#3f88b2]'>
            <BookOpen className='size-5' />
          </div>

          <h2 className='mt-5 text-2xl font-semibold tracking-tight text-[#102a43] sm:text-3xl'>
            Popular help articles
          </h2>

          <p className='mt-3 text-sm leading-6 text-[#64748b] sm:text-base'>
            Quick answers to common AeroPass questions.
          </p>
        </div>

        <div className='mt-8 flex flex-wrap justify-center gap-2'>
          {categories.map((item) => {
            const active = activeCategory === item.value;

            return (
              <button
                key={item.value}
                type='button'
                onClick={() => onCategoryChange(item.value)}
                className={[
                  'rounded-full border px-4 py-2 text-sm font-medium transition-colors',
                  active ?
                    'border-[#102a43] bg-[#102a43] text-white'
                  : 'border-[#dce8ef] bg-white text-[#66798a] hover:border-[#b8d7e7] hover:text-[#102a43]',
                ].join(' ')}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        <div className='mt-8 space-y-3'>
          {articles.length > 0 ?
            articles.map((article) => {
              const isOpen = openId === article.id;

              return (
                <article
                  key={article.id}
                  className='overflow-hidden rounded-2xl border border-[#dce8ef] bg-white'
                >
                  <button
                    type='button'
                    aria-expanded={isOpen}
                    onClick={() => setOpenId(isOpen ? null : article.id)}
                    className='flex w-full items-center justify-between gap-5 px-5 py-5 text-left sm:px-6'
                  >
                    <span className='min-w-0'>
                      <span className='mb-1 block text-[11px] font-semibold uppercase tracking-[0.12em] text-[#6e94aa]'>
                        {categoryLabels[article.category]}
                      </span>

                      <span className='block font-semibold text-[#102a43]'>
                        {article.title}
                      </span>

                      <span className='mt-1 block text-sm leading-6 text-[#718396]'>
                        {article.description}
                      </span>
                    </span>

                    <ChevronDown
                      className={[
                        'size-5 shrink-0 text-[#8193a3] transition-transform duration-200',
                        isOpen ? 'rotate-180' : '',
                      ].join(' ')}
                    />
                  </button>

                  {isOpen ?
                    <div className='border-t border-[#e7eff4] px-5 pb-5 pt-4 sm:px-6'>
                      <p className='text-sm leading-7 text-[#5f7284]'>
                        {article.content}
                      </p>
                    </div>
                  : null}
                </article>
              );
            })
          : <div className='rounded-3xl border border-dashed border-[#c8dce7] bg-white px-6 py-12 text-center'>
              <p className='font-semibold text-[#102a43]'>
                No help articles found.
              </p>

              <p className='mt-2 text-sm text-[#718396]'>
                Try a different search or category.
              </p>
            </div>
          }
        </div>
      </div>
    </section>
  );
}
