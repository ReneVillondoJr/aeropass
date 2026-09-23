import { ArrowRight, Clock3, ShieldCheck, Sparkles } from 'lucide-react';

import Link from 'next/link';

import { FlightSearch } from './flight-search';

export function HeroSection() {
  return (
    <section className='relative overflow-hidden'>
      <div aria-hidden='true' className='pointer-events-none absolute inset-0'>
        <div className='absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(91,169,214,0.18),transparent_28%),radial-gradient(circle_at_82%_18%,rgba(197,164,109,0.12),transparent_24%),linear-gradient(180deg,#f8fcff_0%,#f4f9fc_100%)]' />

        <div className='absolute -left-24 top-20 size-96 rounded-full border border-sky-200/40' />

        <div className='absolute -right-32 top-10 size-[30rem] rounded-full border border-sky-200/30' />

        <div className='absolute right-[16%] top-[20%] hidden h-px w-40 rotate-[18deg] bg-gradient-to-r from-transparent via-sky-300/50 to-transparent lg:block' />

        <div className='absolute left-[8%] top-[45%] hidden h-px w-32 -rotate-[12deg] bg-gradient-to-r from-transparent via-[#c5a46d]/30 to-transparent lg:block' />
      </div>

      <div className='relative mx-auto max-w-7xl px-5 pb-16 pt-14 sm:px-8 sm:pb-20 sm:pt-18 lg:px-10 lg:pb-24 lg:pt-24'>
        <div className='mx-auto max-w-4xl text-center'>
          <div className='mb-5 inline-flex items-center gap-2 rounded-full border border-sky-100 bg-white/80 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500 shadow-sm backdrop-blur'>
            <Sparkles className='size-3.5 text-sky-500' />
            Travel made simpler
          </div>

          <h1 className='text-4xl font-semibold tracking-[-0.04em] text-[#102a43] sm:text-5xl lg:text-6xl lg:leading-[1.03]'>
            Your next journey
            <span className='block text-[#3f88b2]'>starts here.</span>
          </h1>

          <p className='mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base'>
            Search flights, compare fares, choose your seat, and manage your
            journey from one simple travel experience.
          </p>
        </div>

        <div className='mx-auto mt-10 max-w-5xl'>
          <FlightSearch />
        </div>

        <div className='mx-auto mt-7 flex max-w-4xl flex-wrap items-center justify-center gap-x-7 gap-y-3 text-xs text-slate-400'>
          <span className='inline-flex items-center gap-2'>
            <ShieldCheck className='size-3.5 text-emerald-500' />
            Secure booking experience
          </span>

          <span className='inline-flex items-center gap-2'>
            <Clock3 className='size-3.5 text-sky-500' />
            Fast online check-in
          </span>

          <span className='inline-flex items-center gap-2'>
            <Sparkles className='size-3.5 text-[#c5a46d]' />
            Digital travel documents
          </span>
        </div>

        <div className='mx-auto mt-12 flex max-w-5xl items-center justify-between border-t border-sky-100 pt-5'>
          <div>
            <p className='text-xs font-medium text-[#102a43]'>
              Planning a trip?
            </p>

            <p className='mt-1 text-xs text-slate-400'>
              Explore destinations and find your next route.
            </p>
          </div>

          <Link
            href='#destinations'
            className='inline-flex items-center gap-1.5 text-xs font-medium text-[#3f7194] transition-colors hover:text-[#102a43]'
          >
            Explore destinations
            <ArrowRight className='size-3.5' />
          </Link>
        </div>
      </div>
    </section>
  );
}
