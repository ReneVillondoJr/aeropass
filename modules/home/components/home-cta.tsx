import Link from 'next/link';

import { ArrowRight, ShieldCheck } from 'lucide-react';

import { Button } from '@/components/ui/button';

export function HomeCta() {
  return (
    <section className='border-t border-sky-100 bg-white'>
      <div className='mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-10 lg:py-14'>
        <div className='flex flex-col gap-6 rounded-2xl border border-sky-100 bg-linear-to-r from-[#f3fbff] via-white to-[#fffdf7] p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between'>
          <div>
            <div className='flex items-center gap-2'>
              <ShieldCheck className='size-4 text-emerald-500' />

              <p className='text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400'>
                Ready when you are
              </p>
            </div>

            <h2 className='mt-2 text-xl font-semibold tracking-tight text-[#102a43] sm:text-2xl'>
              Start planning your next journey.
            </h2>

            <p className='mt-2 max-w-xl text-sm leading-6 text-slate-500'>
              Search available flights and find a journey that works for you.
            </p>
          </div>

          <Link href='/search'>
            <Button className='h-11 gap-2 rounded-xl bg-[#102a43] px-5 text-white hover:bg-[#183b5b]'>
              Search flights
              <ArrowRight className='size-4' />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
