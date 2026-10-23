import { MessageCircleQuestion, SearchX } from 'lucide-react';

interface HelpEmptyStateProps {
  hasFilters: boolean;
  onReset: () => void;
}

export function HelpEmptyState({ hasFilters, onReset }: HelpEmptyStateProps) {
  return (
    <section className='flex min-h-64 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-10 text-center'>
      <div className='flex size-14 items-center justify-center rounded-2xl bg-[#EEF7FB] text-[#397FA5]'>
        {hasFilters ?
          <SearchX className='size-7' />
        : <MessageCircleQuestion className='size-7' />}
      </div>

      <h3 className='mt-4 text-base font-semibold text-[#102A43]'>
        {hasFilters ? 'No matching articles' : 'No help articles available'}
      </h3>

      <p className='mt-2 max-w-sm text-sm leading-6 text-slate-500'>
        {hasFilters ?
          'Try another search term or select a different category to find the information you need.'
        : 'Help articles will appear here when they become available.'}
      </p>

      {hasFilters && (
        <button
          type='button'
          onClick={onReset}
          className='mt-5 rounded-xl bg-[#102A43] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#183D5B]'
        >
          Clear filters
        </button>
      )}
    </section>
  );
}
