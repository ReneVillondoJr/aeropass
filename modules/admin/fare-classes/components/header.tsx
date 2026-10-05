import { CircleDollarSign, HandCoins, Plane, ShieldCheck } from 'lucide-react';

import type { FareClassStats } from '../types/fare-class';

import { formatPhp } from '../data/fare-class';

interface FareClassHeaderProps {
  stats: FareClassStats;
}

export function FareClassHeader({ stats }: FareClassHeaderProps) {
  return (
    <section className='overflow-hidden rounded-3xl bg-[#102A43] text-white shadow-sm'>
      <div className='relative p-6 sm:p-7'>
        <div className='absolute -right-20 -top-24 size-64 rounded-full bg-[#5BA9D6]/10 blur-3xl' />

        <div className='relative'>
          <div className='flex flex-col gap-7 xl:flex-row xl:items-end xl:justify-between'>
            <div className='max-w-2xl'>
              <div className='mb-3 flex items-center gap-2'>
                <div className='flex size-9 items-center justify-center rounded-xl bg-white/10'>
                  <CircleDollarSign className='size-4 text-[#B9E4F8]' />
                </div>

                <span className='text-xs font-semibold uppercase tracking-[0.14em] text-[#B9E4F8]'>
                  Fare management
                </span>
              </div>

              <h1 className='text-2xl font-semibold tracking-tight sm:text-3xl'>
                Fare Classes
              </h1>

              <p className='mt-2 max-w-xl text-sm leading-6 text-white/65'>
                Manage fare families, cabin classes, baggage allowances,
                flexibility rules, and flight-level pricing across the AeroPass
                network.
              </p>
            </div>

            <div className='grid grid-cols-2 gap-3 sm:grid-cols-4 xl:w-[500px]'>
              <HeaderMetric
                icon={<Plane className='size-4' />}
                label='Classes'
                value={stats.totalClasses}
              />

              <HeaderMetric
                icon={<HandCoins className='size-4' />}
                label='Fare records'
                value={stats.totalFlightFares}
              />

              <HeaderMetric
                icon={<ShieldCheck className='size-4' />}
                label='Refundable'
                value={stats.refundableClasses}
              />

              <HeaderMetric
                icon={<CircleDollarSign className='size-4' />}
                label='Average'
                value={formatPhp(stats.averageFare)}
              />
            </div>
          </div>

          <div className='mt-7 border-t border-white/10 pt-4'>
            <div className='grid gap-4 text-xs sm:grid-cols-3'>
              <HeaderFootprint
                label='Lowest published fare'
                value={formatPhp(stats.lowestFare)}
              />

              <HeaderFootprint
                label='Highest published fare'
                value={formatPhp(stats.highestFare)}
              />

              <HeaderFootprint
                label='Fare inventory'
                value={`${stats.totalSeatsAvailable.toLocaleString()} seats`}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HeaderMetric({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}) {
  return (
    <div className='min-w-0 rounded-2xl border border-white/10 bg-white/[0.07] p-3'>
      <div className='flex min-w-0 items-center gap-2 text-white/50'>
        {icon}

        <span className='truncate text-[10px] font-medium uppercase tracking-[0.08em]'>
          {label}
        </span>
      </div>

      <p className='mt-2 truncate text-xl font-semibold tabular-nums'>
        {value}
      </p>
    </div>
  );
}

function HeaderFootprint({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className='min-w-0'>
      <p className='text-white/40'>{label}</p>

      <p className='mt-1 truncate font-medium text-white/90'>{value}</p>
    </div>
  );
}
