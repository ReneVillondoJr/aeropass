'use client';

import { useState } from 'react';

import { BookOpen } from 'lucide-react';

import type { HelpArticle } from '../types/help-support';

import { HelpFaqItem } from './faq-item';
import { HelpEmptyState } from './empty-state';

interface HelpFaqListProps {
  articles: HelpArticle[];
  hasFilters: boolean;
  onReset: () => void;
}

export function HelpFaqList({
  articles,
  hasFilters,
  onReset,
}: HelpFaqListProps) {
  const [openArticleId, setOpenArticleId] = useState<string | null>(null);

  function handleToggle(articleId: string) {
    setOpenArticleId((current) => (current === articleId ? null : articleId));
  }

  return (
    <section className='space-y-4'>
      <div className='flex flex-wrap items-center justify-between gap-3'>
        <div className='flex items-center gap-3'>
          <div className='flex size-10 items-center justify-center rounded-xl bg-[#EEF7FB] text-[#397FA5]'>
            <BookOpen className='size-5' />
          </div>

          <div>
            <h2 className='font-semibold text-[#102A43]'>
              Frequently asked questions
            </h2>

            <p className='mt-1 text-xs text-slate-500'>
              Find quick answers to common questions.
            </p>
          </div>
        </div>

        {articles.length > 0 && (
          <span className='rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-500'>
            {articles.length} articles
          </span>
        )}
      </div>

      {articles.length === 0 ?
        <HelpEmptyState hasFilters={hasFilters} onReset={onReset} />
      : <div className='max-h-[640px] space-y-3 overflow-y-auto overscroll-contain pr-1'>
          {articles.map((article) => (
            <HelpFaqItem
              key={article.id}
              article={article}
              isOpen={openArticleId === article.id}
              onToggle={() => handleToggle(article.id)}
            />
          ))}
        </div>
      }
    </section>
  );
}
