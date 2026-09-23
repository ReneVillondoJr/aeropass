import Link from 'next/link';

import { ArrowRight, Plane, ShieldCheck } from 'lucide-react';

import { HomeHeader } from './components/home-header';
import { HeroSection } from './components/hero-section';
import { PopularDestinations } from './components/popular-destinations';
import { TravelServices } from './components/travel-services';
import { Button } from '@/components/ui/button';

export function PublicHome() {
  return (
    <div className='min-h-svh bg-[#f4f9fc] text-[#102a43]'>
      <HomeHeader />

      <main>
        <HeroSection />

        <PopularDestinations />

        <TravelServices />

        <section className='border-t border-sky-100 bg-white'>
          <div className='mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-10 lg:py-14'>
            <div className='flex flex-col gap-6 rounded-2xl border border-sky-100 bg-gradient-to-r from-[#f3fbff] via-white to-[#fffdf7] p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between'>
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
                  Search available flights and find a journey that works for
                  you.
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
      </main>

      <footer className='border-t border-sky-100 bg-[#f8fbfd]'>
        <div className='mx-auto flex max-w-7xl flex-col gap-5 px-5 py-8 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-10'>
          <Link href='/' className='inline-flex items-center gap-3'>
            <span className='flex size-8 items-center justify-center rounded-lg bg-[#102a43] text-white'>
              <Plane className='size-3.5' />
            </span>

            <span>
              <span className='block text-sm font-semibold text-[#102a43]'>
                AeroPass
              </span>

              <span className='block text-[10px] text-slate-400'>
                Airline Reservation
              </span>
            </span>
          </Link>

          <div className='flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-slate-400'>
            <Link href='/search' className='hover:text-[#102a43]'>
              Flights
            </Link>

            <Link href='/check-in' className='hover:text-[#102a43]'>
              Check-in
            </Link>

            <Link href='/manage-booking' className='hover:text-[#102a43]'>
              Manage booking
            </Link>

            <Link href='/help' className='hover:text-[#102a43]'>
              Help
            </Link>
          </div>

          <p className='text-[10px] text-slate-400'>© AeroPass</p>
        </div>
      </footer>
    </div>
  );
}
