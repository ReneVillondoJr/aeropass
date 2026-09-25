import Link from 'next/link';

import { Plane } from 'lucide-react';

export function PublicFooter() {
  return (
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

        <nav className='flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-slate-400'>
          <Link
            href='/search'
            className='transition-colors hover:text-[#102a43]'
          >
            Flights
          </Link>

          <Link
            href='/check-in'
            className='transition-colors hover:text-[#102a43]'
          >
            Check-in
          </Link>

          <Link
            href='/manage-booking'
            className='transition-colors hover:text-[#102a43]'
          >
            Manage booking
          </Link>

          <Link href='/help' className='transition-colors hover:text-[#102a43]'>
            Help
          </Link>
        </nav>

        <p className='text-[10px] text-slate-400'>© AeroPass</p>
      </div>
    </footer>
  );
}
