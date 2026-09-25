'use client';

import Link from 'next/link';

import { HelpCircle, Menu, Plane, UserRound } from 'lucide-react';

import { Button } from '@/components/ui/button';

export function PublicHeader() {
  return (
    <header className='sticky top-0 z-40 border-b border-sky-100/80 bg-white/80 backdrop-blur-xl'>
      <div className='mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10'>
        <Link href='/' className='inline-flex items-center gap-3'>
          <span className='flex size-9 items-center justify-center rounded-xl bg-[#102a43] text-white shadow-sm'>
            <Plane className='size-4' />
          </span>

          <span className='hidden sm:block'>
            <span className='block text-sm font-semibold tracking-tight text-[#102a43]'>
              AeroPass
            </span>

            <span className='block text-[10px] uppercase tracking-[0.16em] text-slate-400'>
              Airline Reservation
            </span>
          </span>
        </Link>

        <nav className='hidden items-center gap-7 md:flex'>
          <Link
            href='/search'
            className='text-sm text-slate-600 transition-colors hover:text-[#102a43]'
          >
            Flights
          </Link>

          <Link
            href='/check-in'
            className='text-sm text-slate-600 transition-colors hover:text-[#102a43]'
          >
            Check-in
          </Link>

          <Link
            href='/manage-booking'
            className='text-sm text-slate-600 transition-colors hover:text-[#102a43]'
          >
            Manage booking
          </Link>

          <Link
            href='/help'
            className='text-sm text-slate-600 transition-colors hover:text-[#102a43]'
          >
            Help
          </Link>
        </nav>

        <div className='flex items-center gap-2'>
          <Button
            variant='ghost'
            size='icon'
            className='size-9 text-slate-500 hover:bg-sky-50 hover:text-[#102a43] md:hidden'
            aria-label='Open menu'
          >
            <Menu className='size-4' />
          </Button>

          <Button
            variant='ghost'
            size='icon'
            className='size-9 text-slate-500 hover:bg-sky-50 hover:text-[#102a43]'
            aria-label='Help'
          >
            <HelpCircle className='size-4' />
          </Button>

          <Link href='/login' className='hidden md:block'>
            <Button
              variant='outline'
              className='h-9 rounded-lg border-sky-200 bg-white px-4 text-sm text-[#102a43] hover:bg-sky-50'
            >
              <UserRound className='mr-2 size-4' />
              Sign in
            </Button>
          </Link>

          <Link href='/login' className='md:hidden'>
            <Button
              size='icon'
              className='size-9 rounded-lg bg-[#102a43] text-white hover:bg-[#183b5b]'
              aria-label='Sign in'
            >
              <UserRound className='size-4' />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
