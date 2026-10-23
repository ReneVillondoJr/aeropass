import { BookOpen, Headphones, ShieldCheck } from 'lucide-react';

import { getHelpSupportStats } from '../data/help-support';

export function HelpSupportHeader() {
  const stats = getHelpSupportStats();

  return (
    <section className='relative overflow-hidden rounded-3xl border border-slate-200 bg-white'>
      <div className='absolute -right-12 -top-16 size-64 rounded-full bg-[#E5F5FC] opacity-70 blur-3xl' />

      <div className='relative grid gap-8 p-6 sm:p-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center'>
        <div className='space-y-4'>
          <div className='inline-flex items-center gap-2 rounded-full border border-[#D4EAF5] bg-[#EEF7FB] px-3 py-1.5 text-xs font-semibold text-[#102A43]'>
            <Headphones className='size-3.5' />
            CUSTOMER CARE
          </div>

          <div>
            <h1 className='text-2xl font-bold tracking-tight text-[#102A43] sm:text-3xl'>
              Help &amp; Support
            </h1>

            <p className='mt-3 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base'>
              Need assistance with your trip? Find answers to common questions
              about bookings, payments, flights, check-in, and your AeroPass
              account.
            </p>
          </div>

          <div className='flex flex-wrap items-center gap-3 pt-1'>
            <div className='inline-flex items-center gap-2 rounded-xl bg-[#EEF7FB] px-3 py-2 text-sm font-medium text-[#102A43]'>
              <BookOpen className='size-4 text-[#397FA5]' />
              {stats.totalArticles} help articles
            </div>

            <div className='inline-flex items-center gap-2 rounded-xl bg-[#EEF7FB] px-3 py-2 text-sm font-medium text-[#102A43]'>
              <ShieldCheck className='size-4 text-[#397FA5]' />
              {stats.totalCategories} help categories
            </div>
          </div>
        </div>

        <div className='hidden size-32 items-center justify-center rounded-3xl border border-[#D4EAF5] bg-[#EEF7FB] lg:flex'>
          <div className='flex size-20 items-center justify-center rounded-2xl bg-white shadow-sm'>
            <Headphones className='size-10 text-[#24658A]' strokeWidth={1.6} />
          </div>
        </div>
      </div>
    </section>
  );
}
