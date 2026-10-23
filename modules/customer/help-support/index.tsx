'use client';

import { useMemo, useRef, useState } from 'react';

import { ArrowUp, Headphones } from 'lucide-react';

import type {
  HelpArticle,
  HelpCategoryFilter,
  SupportRequest,
  SupportRequestFormValues,
} from './types/help-support';

import { getHelpArticles } from './data/help-support';

import { HelpSupportHeader } from './components/header';
import { HelpSupportSearch } from './components/search';
import { HelpCategoryFilter as HelpCategoryFilterComponent } from './components/category-filter';
import { HelpFaqList } from './components/faq-list';
import { HelpContactSection } from './components/contact-section';
import {
  SupportRequestForm,
  SupportRequestSuccess,
} from './components/request-form';

interface CustomerHelpSupportModuleProps {
  customerId: string;
}

function matchesHelpArticle(
  article: HelpArticle,
  search: string,
  category: HelpCategoryFilter,
): boolean {
  const matchesCategory = category === 'ALL' || article.category === category;

  if (!matchesCategory) {
    return false;
  }

  const normalizedSearch = search.trim().toLowerCase();

  if (!normalizedSearch) {
    return true;
  }

  const searchableText = [
    article.question,
    article.answer,
    article.category,
    ...article.keywords,
  ]
    .join(' ')
    .toLowerCase();

  return searchableText.includes(normalizedSearch);
}

function createDemoRequestId(): string {
  return `SUP-${Date.now().toString(36).toUpperCase()}`;
}

export function CustomerHelpSupportModule({
  customerId,
}: CustomerHelpSupportModuleProps) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<HelpCategoryFilter>('ALL');

  const [showRequestForm, setShowRequestForm] = useState(false);
  const [submittedRequest, setSubmittedRequest] =
    useState<SupportRequest | null>(null);

  const requestFormRef = useRef<HTMLDivElement>(null);

  const articles = useMemo(() => getHelpArticles(), []);

  const filteredArticles = useMemo(
    () =>
      articles.filter((article) =>
        matchesHelpArticle(article, search, category),
      ),
    [articles, search, category],
  );

  const hasFilters = search.trim().length > 0 || category !== 'ALL';

  function resetFilters() {
    setSearch('');
    setCategory('ALL');
  }

  function openRequestForm() {
    setSubmittedRequest(null);
    setShowRequestForm(true);

    window.setTimeout(() => {
      requestFormRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }, 50);
  }

  function closeRequestForm() {
    setShowRequestForm(false);
    setSubmittedRequest(null);
  }

  function handleSubmitRequest(values: SupportRequestFormValues) {
    const request: SupportRequest = {
      ...values,
      id: createDemoRequestId(),
      customerId,
      status: 'SUBMITTED',
      createdAt: new Date().toISOString(),
    };

    setSubmittedRequest(request);
  }

  return (
    <section className='mx-auto w-full max-w-7xl space-y-6 p-4 sm:p-6 lg:p-8'>
      <HelpSupportHeader />

      <div className='grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_320px]'>
        <div className='min-w-0 space-y-6'>
          <HelpSupportSearch
            value={search}
            onChange={setSearch}
            resultCount={filteredArticles.length}
          />

          <HelpCategoryFilterComponent
            value={category}
            onChange={setCategory}
          />

          <HelpFaqList
            articles={filteredArticles}
            hasFilters={hasFilters}
            onReset={resetFilters}
          />
        </div>

        <aside className='min-w-0 space-y-5 xl:sticky xl:top-6'>
          <section className='rounded-2xl border border-[#D4EAF5] bg-[#EEF7FB] p-5 sm:p-6'>
            <div className='flex size-12 items-center justify-center rounded-xl bg-white text-[#24658A]'>
              <Headphones className='size-6' />
            </div>

            <h2 className='mt-4 text-lg font-bold text-[#102A43]'>
              Need more assistance?
            </h2>

            <p className='mt-2 text-sm leading-6 text-slate-600'>
              If the help articles do not answer your question, create a support
              request with the details of your concern.
            </p>

            <button
              type='button'
              onClick={openRequestForm}
              className='mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#102A43] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#183D5B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5BA9D6] focus-visible:ring-offset-2'
            >
              Create support request
              <ArrowUp className='size-4 rotate-45' />
            </button>
          </section>

          <section className='rounded-2xl border border-slate-200 bg-white p-5'>
            <h3 className='font-semibold text-[#102A43]'>Quick tips</h3>

            <ul className='mt-4 space-y-3 text-sm leading-6 text-slate-500'>
              <li className='flex items-start gap-2.5'>
                <span className='mt-2 size-1.5 shrink-0 rounded-full bg-[#5BA9D6]' />
                Check your booking details before submitting a reservation
                question.
              </li>

              <li className='flex items-start gap-2.5'>
                <span className='mt-2 size-1.5 shrink-0 rounded-full bg-[#5BA9D6]' />
                Include the relevant booking reference when appropriate.
              </li>

              <li className='flex items-start gap-2.5'>
                <span className='mt-2 size-1.5 shrink-0 rounded-full bg-[#5BA9D6]' />
                Never share your password or one-time verification codes.
              </li>
            </ul>
          </section>
        </aside>
      </div>

      <HelpContactSection onContactForm={openRequestForm} />

      {showRequestForm && (
        <div ref={requestFormRef} className='scroll-mt-6 space-y-4'>
          {submittedRequest ?
            <SupportRequestSuccess
              requestId={submittedRequest.id}
              onClose={closeRequestForm}
            />
          : <SupportRequestForm
              onSubmit={handleSubmitRequest}
              onCancel={closeRequestForm}
            />
          }
        </div>
      )}

      <footer className='border-t border-slate-200 pt-5'>
        <p className='text-center text-xs leading-5 text-slate-400'>
          AeroPass Help Center · Demo support content. Actual support channels,
          ticket delivery, and response times must be configured before
          production use.
        </p>
      </footer>
    </section>
  );
}
