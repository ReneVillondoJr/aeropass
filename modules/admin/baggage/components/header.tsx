import { Luggage, PackageCheck, Plane, Weight } from 'lucide-react';

import type { BaggageStats } from '../types/baggage';

interface BaggageHeaderProps {
  stats: BaggageStats;
}

function formatWeight(value: number) {
  return `${value.toLocaleString('en-PH')} kg`;
}

export function BaggageHeader({ stats }: BaggageHeaderProps) {
  return (
    <section className='overflow-hidden rounded-[1.75rem] bg-[#102A43] text-white shadow-sm'>
      <div className='relative px-6 py-7 sm:px-8'>
        <div className='absolute -right-16 -top-20 size-48 rounded-full bg-[#5BA9D6]/10 blur-3xl' />
        <div className='absolute -bottom-24 left-1/3 size-56 rounded-full bg-white/5 blur-3xl' />

        <div className='relative flex flex-col gap-7'>
          <div className='flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between'>
            <div className='max-w-2xl'>
              <div className='mb-3 flex items-center gap-2 text-[#9FD5EE]'>
                <Luggage className='size-4' />
                <span className='text-[11px] font-semibold uppercase tracking-[0.18em]'>
                  Airport Operations
                </span>
              </div>

              <h1 className='text-2xl font-semibold tracking-tight sm:text-3xl'>
                Baggage Operations
              </h1>

              <p className='mt-2 max-w-xl text-sm leading-6 text-white/65'>
                Monitor baggage handling, check-in handoffs, routing, and
                delivery status across active flights.
              </p>
            </div>

            <div className='flex flex-wrap items-center gap-2 text-xs text-white/60'>
              <div className='flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2'>
                <Luggage className='size-3.5' />
                {stats.total} bags
              </div>

              <div className='flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2'>
                <Weight className='size-3.5' />
                {formatWeight(stats.totalWeightKg)}
              </div>
            </div>
          </div>

          <div className='grid gap-2 sm:grid-cols-3'>
            <div className='rounded-2xl border border-white/10 bg-white/5 p-4'>
              <div className='flex items-center gap-2 text-xs text-white/50'>
                <PackageCheck className='size-3.5' />
                Checked
              </div>
              <p className='mt-2 text-xl font-semibold'>{stats.checked}</p>
              <p className='mt-1 text-[11px] text-white/45'>
                Bags accepted into operations
              </p>
            </div>

            <div className='rounded-2xl border border-white/10 bg-white/5 p-4'>
              <div className='flex items-center gap-2 text-xs text-white/50'>
                <Plane className='size-3.5' />
                In Transit
              </div>
              <p className='mt-2 text-xl font-semibold'>{stats.inTransit}</p>
              <p className='mt-1 text-[11px] text-white/45'>
                Bags moving through routing
              </p>
            </div>

            <div className='rounded-2xl border border-white/10 bg-white/5 p-4'>
              <div className='flex items-center gap-2 text-xs text-white/50'>
                <PackageCheck className='size-3.5' />
                Received
              </div>
              <p className='mt-2 text-xl font-semibold'>{stats.received}</p>
              <p className='mt-1 text-[11px] text-white/45'>
                Bags delivered to destination
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
