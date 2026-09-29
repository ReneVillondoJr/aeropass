'use client';

import { ArrowRight, BookOpen, FileText, Plane } from 'lucide-react';

import { travelInformation } from './data/help';

import { HelpArticleList } from './components/article-list';

import { HelpCategoryGrid } from './components/category-grid';

import { HelpDisruptionSection } from './components/disruption-section';

import { HelpHero } from './components/hero';

import { HelpSupportCard } from './components/help-support-card';

import { useHelpSearch } from './hooks/use-help-search';

export function Help() {
  const { query, setQuery, category, setCategory, filteredArticles } =
    useHelpSearch();

  return (
    <div className='bg-[#f4f9fc]'>
      <HelpHero query={query} onQueryChange={setQuery} />

      <HelpCategoryGrid />

      <HelpArticleList
        articles={filteredArticles}
        activeCategory={category}
        onCategoryChange={setCategory}
      />

      <section
        id='travel-information'
        className='px-6 py-14 sm:px-8 lg:px-10 lg:py-18'
      >
        <div className='mx-auto max-w-6xl'>
          <div className='mb-8'>
            <p className='text-xs font-semibold uppercase tracking-[0.16em] text-[#648da7]'>
              Travel information
            </p>

            <h2 className='mt-2 text-2xl font-semibold tracking-tight text-[#102a43] sm:text-3xl'>
              Prepare for your journey
            </h2>

            <p className='mt-3 max-w-2xl text-sm leading-6 text-[#718396]'>
              Helpful information for planning and preparing for your AeroPass
              trip.
            </p>
          </div>

          <div className='grid gap-4 md:grid-cols-2'>
            {travelInformation.map((item, index) => {
              const Icon =
                index === 0 ? Plane
                : index === 1 ? FileText
                : index === 2 ? BookOpen
                : ArrowRight;

              return (
                <a
                  key={item.id}
                  href='#support'
                  className='group rounded-3xl border border-[#dce8ef] bg-white p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#b9d8e7] hover:shadow-[0_14px_36px_rgba(16,42,67,0.07)]'
                >
                  <div className='flex items-start justify-between'>
                    <div className='flex size-11 items-center justify-center rounded-2xl bg-[#f1f7fa] text-[#537d97]'>
                      <Icon className='size-5' />
                    </div>

                    <ArrowRight className='size-4 text-[#9aaab7] transition-transform duration-200 group-hover:translate-x-1 group-hover:text-[#3f88b2]' />
                  </div>

                  <h3 className='mt-6 text-lg font-semibold text-[#102a43]'>
                    {item.title}
                  </h3>

                  <p className='mt-2 text-sm leading-6 text-[#718396]'>
                    {item.description}
                  </p>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      <HelpDisruptionSection />

      <HelpSupportCard />
    </div>
  );
}
