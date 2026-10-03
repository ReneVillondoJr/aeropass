import { Globe2, Plane, RadioTower } from 'lucide-react';

import type { AirportStats } from '../types/airports';

interface AirportHeaderProps {
  stats: AirportStats;
}

export function AirportHeader({ stats }: AirportHeaderProps) {
  return (
    <section className='relative overflow-hidden rounded-[1.75rem] border border-border/70 bg-card shadow-[0_18px_50px_rgba(15,23,42,0.05)]'>
      <div className='absolute inset-0 bg-[radial-gradient(circle_at_88%_0%,rgba(91,169,214,0.16),transparent_30%),radial-gradient(circle_at_15%_120%,rgba(16,42,67,0.05),transparent_28%)]' />

      <div className='relative px-5 py-6 sm:px-7 sm:py-7'>
        <div className='flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between'>
          <div className='flex items-start gap-4'>
            <div className='flex size-12 shrink-0 items-center justify-center rounded-2xl bg-[#102A43] text-white shadow-lg shadow-[#102A43]/15'>
              <Globe2 className='size-5' />
            </div>

            <div>
              <div className='flex flex-wrap items-center gap-2'>
                <span className='text-[10px] font-semibold uppercase tracking-[0.18em] text-[#5BA9D6]'>
                  Airport network
                </span>

                <span className='inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[9px] font-semibold text-emerald-700'>
                  <span className='size-1.5 rounded-full bg-emerald-500' />
                  Network connected
                </span>
              </div>

              <h1 className='mt-1 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl'>
                Airports
              </h1>

              <p className='mt-2 max-w-2xl text-xs leading-5 text-muted-foreground sm:text-sm'>
                Monitor airport locations, terminal configuration, route
                connectivity, schedules, and linked flight activity across the
                AeroPass network.
              </p>
            </div>
          </div>

          <div className='grid grid-cols-2 gap-3 sm:grid-cols-4'>
            <div className='rounded-2xl border border-border/70 bg-background/70 px-4 py-3 backdrop-blur-sm'>
              <p className='text-[9px] font-semibold uppercase tracking-[0.14em] text-muted-foreground'>
                Airports
              </p>

              <p className='mt-1 text-xl font-semibold tracking-tight'>
                {stats.total}
              </p>
            </div>

            <div className='rounded-2xl border border-border/70 bg-background/70 px-4 py-3 backdrop-blur-sm'>
              <p className='text-[9px] font-semibold uppercase tracking-[0.14em] text-muted-foreground'>
                Routes
              </p>

              <p className='mt-1 text-xl font-semibold tracking-tight'>
                {stats.routes}
              </p>
            </div>

            <div className='rounded-2xl border border-border/70 bg-background/70 px-4 py-3 backdrop-blur-sm'>
              <p className='text-[9px] font-semibold uppercase tracking-[0.14em] text-muted-foreground'>
                Schedules
              </p>

              <p className='mt-1 text-xl font-semibold tracking-tight'>
                {stats.schedules}
              </p>
            </div>

            <div className='rounded-2xl border border-border/70 bg-background/70 px-4 py-3 backdrop-blur-sm'>
              <p className='text-[9px] font-semibold uppercase tracking-[0.14em] text-muted-foreground'>
                Flight instances
              </p>

              <p className='mt-1 text-xl font-semibold tracking-tight'>
                {stats.flightInstances}
              </p>
            </div>
          </div>
        </div>

        <div className='mt-6 grid gap-3 border-t border-border/60 pt-5 sm:grid-cols-3'>
          <div className='flex items-center gap-3 rounded-xl bg-[#EEF7FB] px-3 py-2.5'>
            <Plane className='size-4 text-[#102A43]' />

            <div>
              <p className='text-[9px] font-semibold uppercase tracking-[0.12em] text-muted-foreground'>
                Network footprint
              </p>

              <p className='mt-0.5 text-[10px] font-semibold text-[#102A43]'>
                {stats.total} airports
              </p>
            </div>
          </div>

          <div className='flex items-center gap-3 rounded-xl border border-border/70 bg-background/65 px-3 py-2.5'>
            <RadioTower className='size-4 text-muted-foreground' />

            <div>
              <p className='text-[9px] font-semibold uppercase tracking-[0.12em] text-muted-foreground'>
                Terminal groups
              </p>

              <p className='mt-0.5 text-[10px] font-semibold'>
                {stats.terminals}
              </p>
            </div>
          </div>

          <div className='flex items-center gap-3 rounded-xl border border-border/70 bg-background/65 px-3 py-2.5'>
            <Globe2 className='size-4 text-muted-foreground' />

            <div>
              <p className='text-[9px] font-semibold uppercase tracking-[0.12em] text-muted-foreground'>
                Countries
              </p>

              <p className='mt-0.5 text-[10px] font-semibold'>
                {stats.countries}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
