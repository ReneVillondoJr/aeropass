'use client';

import { ChevronDown, CircleHelp } from 'lucide-react';

import type { HelpArticle } from '../types/help-support';

import { getHelpCategoryLabel } from '../data/help-support';

interface HelpFaqItemProps {
  article: HelpArticle;
  isOpen: boolean;
  onToggle: () => void;
}

export function HelpFaqItem({ article, isOpen, onToggle }: HelpFaqItemProps) {
  const answerId = `help-answer-${article.id}`;

  return (
    <article className='overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:border-[#C5E3F2]'>
      <button
        type='button'
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={answerId}
        className='flex w-full items-start gap-3 p-4 text-left sm:p-5'
      >
        <div className='flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#EEF7FB] text-[#397FA5]'>
          <CircleHelp className='size-5' />
        </div>

        <div className='min-w-0 flex-1 pt-0.5'>
          <h3 className='text-sm font-semibold leading-6 text-[#102A43] sm:text-base'>
            {article.question}
          </h3>

          <span className='mt-2 inline-flex rounded-full border border-[#D4EAF5] bg-[#EEF7FB] px-2.5 py-1 text-[11px] font-semibold text-[#397FA5]'>
            {getHelpCategoryLabel(article.category)}
          </span>
        </div>

        <div
          className={`mt-1 flex size-8 shrink-0 items-center justify-center rounded-lg transition ${
            isOpen ? 'bg-[#EEF7FB] text-[#24658A]' : 'text-slate-400'
          }`}
        >
          <ChevronDown
            className={`size-4 transition-transform ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </div>
      </button>

      {isOpen && (
        <div
          id={answerId}
          className='border-t border-slate-100 px-4 pb-5 pt-4 sm:px-5'
        >
          <p className='pl-0 text-sm leading-7 text-slate-600 sm:pl-[52px]'>
            {article.answer}
          </p>
        </div>
      )}
    </article>
  );
}
