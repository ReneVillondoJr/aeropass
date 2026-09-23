import { ArrowUpRight, MapPin, Plane } from 'lucide-react';

import Link from 'next/link';

import { getPopularDestinations } from '@/data/aeropass';

export function PopularDestinations() {
  const popularDestinations = getPopularDestinations(4);

  return (
    <section id='destinations' className='border-y border-sky-100 bg-white'>
      <div className='mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-20'>
        <div className='flex flex-col justify-between gap-5 sm:flex-row sm:items-end'>
          <div>
            <p className='text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400'>
              Explore
            </p>

            <h2 className='mt-2 text-2xl font-semibold tracking-tight text-[#102a43] sm:text-3xl'>
              Popular destinations
            </h2>

            <p className='mt-2 max-w-xl text-sm leading-6 text-slate-500'>
              Discover destinations and routes available through AeroPass.
            </p>
          </div>

          <Link
            href='/search'
            className='inline-flex items-center gap-2 text-sm font-medium text-[#3f7194] transition-colors hover:text-[#102a43]'
          >
            View all routes
            <ArrowUpRight className='size-4' />
          </Link>
        </div>

        <div className='mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
          {popularDestinations.map((destination) => (
            <Link
              key={destination.code}
              href={destination.href}
              className='group overflow-hidden rounded-2xl border border-sky-100 bg-[#f8fbfd] transition-all duration-200 hover:-translate-y-1 hover:border-sky-200 hover:shadow-[0_18px_45px_-28px_rgba(16,42,67,0.30)]'
            >
              <div className='relative flex h-44 items-end overflow-hidden bg-[linear-gradient(145deg,#dff2fb,#edf7fb_55%,#eef3f2)] p-5'>
                <div
                  aria-hidden='true'
                  className='absolute -right-8 -top-8 size-28 rounded-full border border-white/70'
                />

                <div className='absolute right-3 top-3 flex size-10 items-center justify-center rounded-xl bg-white/70 text-[#3f88b2] shadow-sm backdrop-blur'>
                  <Plane className='size-4' />
                </div>

                <div className='relative'>
                  <p className='text-[10px] font-semibold uppercase tracking-[0.18em] text-[#3f7194]'>
                    {destination.code}
                  </p>

                  <h3 className='mt-1 text-2xl font-semibold tracking-tight text-[#102a43]'>
                    {destination.city}
                  </h3>
                </div>
              </div>

              <div className='p-5'>
                <div className='flex items-start gap-2'>
                  <MapPin className='mt-0.5 size-3.5 shrink-0 text-[#c5a46d]' />

                  <div className='min-w-0'>
                    <p className='text-xs font-medium text-[#102a43]'>
                      {destination.airport}
                    </p>

                    <p className='mt-1 text-xs leading-5 text-slate-500'>
                      Explore flights to {destination.city}.
                    </p>
                  </div>
                </div>

                <div className='mt-4 flex items-center justify-between border-t border-slate-100 pt-3'>
                  <span className='text-[10px] uppercase tracking-[0.14em] text-slate-400'>
                    Explore route
                  </span>

                  <ArrowUpRight className='size-3.5 text-slate-400 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5' />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
