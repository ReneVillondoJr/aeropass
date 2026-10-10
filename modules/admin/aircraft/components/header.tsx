import { Activity, Plane, Settings2, Wrench } from 'lucide-react';

import type { AircraftStats } from '../types/aircraft';

interface AircraftHeaderProps {
  stats: AircraftStats;
}

export function AircraftHeader({ stats }: AircraftHeaderProps) {
  return (
    <section className='overflow-hidden rounded-3xl bg-[#102A43] text-white shadow-sm'>
      <div className='relative p-6 sm:p-7'>
        <div className='absolute -right-20 -top-24 size-64 rounded-full bg-[#5BA9D6]/10 blur-3xl' />

        <div className='relative'>
          <div className='flex flex-col gap-7 xl:flex-row xl:items-end xl:justify-between'>
            <div className='max-w-2xl'>
              <div className='mb-3 flex items-center gap-2'>
                <div className='flex size-9 items-center justify-center rounded-xl bg-white/10'>
                  <Plane className='size-4 text-[#B9E4F8]' />
                </div>

                <span className='text-xs font-semibold uppercase tracking-[0.14em] text-[#B9E4F8]'>
                  Fleet control
                </span>
              </div>

              <h1 className='text-2xl font-semibold tracking-tight sm:text-3xl'>
                Aircraft
              </h1>

              <p className='mt-2 max-w-xl text-sm leading-6 text-white/65'>
                Manage AeroPass fleet configuration, capacity, assignments,
                operational schedules, and aircraft readiness from one
                workspace.
              </p>
            </div>

            <div className='grid grid-cols-2 gap-3 sm:grid-cols-3 xl:w-[430px]'>
              <HeaderMetric
                icon={<Plane className='size-4' />}
                label='Fleet'
                value={stats.total}
              />

              <HeaderMetric
                icon={<Activity className='size-4' />}
                label='Active'
                value={stats.active}
              />

              <HeaderMetric
                icon={<Wrench className='size-4' />}
                label='Maintenance'
                value={stats.maintenance}
              />

              <HeaderMetric
                icon={<Settings2 className='size-4' />}
                label='Schedules'
                value={stats.schedules}
              />

              <HeaderMetric
                icon={<Plane className='size-4' />}
                label='Seats'
                value={stats.totalSeats}
              />

              <HeaderMetric
                icon={<Activity className='size-4' />}
                label='Instances'
                value={stats.flightInstances}
              />
            </div>
          </div>

          <div className='mt-7 border-t border-white/10 pt-4'>
            <div className='grid gap-4 text-xs sm:grid-cols-3'>
              <HeaderFootprint
                label='Manufacturers'
                value={stats.manufacturers}
              />

              <HeaderFootprint
                label='Seat capacity'
                value={stats.totalSeats.toLocaleString()}
              />

              <HeaderFootprint
                label='Active schedule coverage'
                value={stats.schedules}
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
  value: number;
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
        {value.toLocaleString()}
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
      <p className='truncate text-white/40'>{label}</p>

      <p className='mt-1 truncate font-medium text-white/90'>{value}</p>
    </div>
  );
}
