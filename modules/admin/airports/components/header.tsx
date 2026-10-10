import { Globe2, Plane, RadioTower } from 'lucide-react';

import type { AirportStats } from '../types/airports';

interface AirportHeaderProps {
  stats: AirportStats;
}

export function AirportHeader({ stats }: AirportHeaderProps) {
  return (
    <section className='overflow-hidden rounded-3xl bg-[#102A43] text-white shadow-sm'>
      <div className='relative p-6 sm:p-7'>
        <div className='absolute -right-20 -top-24 size-64 rounded-full bg-[#5BA9D6]/10 blur-3xl' />

        <div className='relative'>
          <div className='flex flex-col gap-7 xl:flex-row xl:items-end xl:justify-between'>
            <div className='max-w-2xl'>
              <div className='mb-3 flex flex-wrap items-center gap-2'>
                <div className='flex size-9 items-center justify-center rounded-xl bg-white/10'>
                  <Globe2 className='size-4 text-[#B9E4F8]' />
                </div>

                <span className='text-xs font-semibold uppercase tracking-[0.14em] text-[#B9E4F8]'>
                  Airport network
                </span>

                <span className='inline-flex items-center gap-1.5 rounded-full bg-emerald-400/15 px-2.5 py-1 text-[10px] font-semibold text-emerald-300'>
                  <span
                    aria-hidden='true'
                    className='size-1.5 rounded-full bg-emerald-400'
                  />
                  Network connected
                </span>
              </div>

              <h1 className='text-2xl font-semibold tracking-tight sm:text-3xl'>
                Airports
              </h1>

              <p className='mt-2 max-w-xl text-sm leading-6 text-white/65'>
                Monitor airport locations, terminal configuration, route
                connectivity, schedules, and linked flight activity across the
                AeroPass network.
              </p>
            </div>

            <div className='grid grid-cols-2 gap-3 sm:grid-cols-4 xl:w-[500px]'>
              <HeaderMetric
                icon={<Globe2 className='size-4' />}
                label='Airports'
                value={stats.total}
              />

              <HeaderMetric
                icon={<Plane className='size-4' />}
                label='Routes'
                value={stats.routes}
              />

              <HeaderMetric
                icon={<Plane className='size-4' />}
                label='Schedules'
                value={stats.schedules}
              />

              <HeaderMetric
                icon={<Plane className='size-4' />}
                label='Instances'
                value={stats.flightInstances}
              />
            </div>
          </div>

          <div className='mt-7 border-t border-white/10 pt-4'>
            <div className='grid gap-4 text-xs sm:grid-cols-3'>
              <HeaderFootprint
                icon={<Plane className='size-3.5' />}
                label='Network footprint'
                value={`${stats.total} airports`}
              />

              <HeaderFootprint
                icon={<RadioTower className='size-3.5' />}
                label='Terminal groups'
                value={stats.terminals}
              />

              <HeaderFootprint
                icon={<Globe2 className='size-3.5' />}
                label='Countries'
                value={stats.countries}
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
  icon,
  label,
  value,
}: {
  icon?: React.ReactNode;
  label: string;
  value: string | number;
}) {
  return (
    <div className='min-w-0'>
      <p className='flex items-center gap-1.5 text-white/40'>
        {icon}

        <span className='truncate'>{label}</span>
      </p>

      <p className='mt-1 truncate font-medium text-white/90'>{value}</p>
    </div>
  );
}
