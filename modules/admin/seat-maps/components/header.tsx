import {
  Armchair,
  CheckCircle2,
  LayoutGrid,
  Plane,
  Wrench,
} from 'lucide-react';

import type { SeatMapStats } from '../types/seat-map';

interface SeatMapHeaderProps {
  stats: SeatMapStats;
}

export function SeatMapHeader({ stats }: SeatMapHeaderProps) {
  return (
    <section className='overflow-hidden rounded-3xl bg-[#102A43] text-white shadow-sm'>
      <div className='relative p-6 sm:p-7'>
        <div className='absolute -right-20 -top-24 size-64 rounded-full bg-[#5BA9D6]/10 blur-3xl' />

        <div className='relative'>
          <div className='flex flex-col gap-7 xl:flex-row xl:items-end xl:justify-between'>
            <div className='max-w-2xl'>
              <div className='mb-3 flex items-center gap-2'>
                <div className='flex size-9 items-center justify-center rounded-xl bg-white/10'>
                  <Armchair className='size-4 text-[#B9E4F8]' />
                </div>

                <span className='text-xs font-semibold uppercase tracking-[0.14em] text-[#B9E4F8]'>
                  Seat configuration
                </span>
              </div>

              <h1 className='text-2xl font-semibold tracking-tight sm:text-3xl'>
                Seat Maps
              </h1>

              <p className='mt-2 max-w-xl text-sm leading-6 text-white/65'>
                Configure and inspect aircraft cabin layouts, seat classes, seat
                types, and availability states across the AeroPass fleet.
              </p>
            </div>

            <div className='grid grid-cols-2 gap-3 sm:grid-cols-4 xl:w-[500px]'>
              <HeaderMetric
                icon={<Plane className='size-4' />}
                label='Aircraft'
                value={stats.aircraftCount}
              />

              <HeaderMetric
                icon={<LayoutGrid className='size-4' />}
                label='Seats'
                value={stats.totalSeats}
              />

              <HeaderMetric
                icon={<CheckCircle2 className='size-4' />}
                label='Available'
                value={stats.availableSeats}
              />

              <HeaderMetric
                icon={<Wrench className='size-4' />}
                label='Blocked'
                value={stats.blockedSeats}
              />
            </div>
          </div>

          <div className='mt-7 border-t border-white/10 pt-4'>
            <div className='grid gap-4 text-xs sm:grid-cols-3'>
              <HeaderFootprint
                label='Active aircraft'
                value={stats.activeAircraft}
              />

              <HeaderFootprint
                label='Maintenance aircraft'
                value={stats.maintenanceAircraft}
              />

              <HeaderFootprint
                label='Configured capacity'
                value={`${stats.totalSeats.toLocaleString()} seats`}
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
    <div className='rounded-2xl border border-white/10 bg-white/[0.07] p-3'>
      <div className='flex items-center gap-2 text-white/50'>
        {icon}

        <span className='truncate text-[10px] font-medium uppercase tracking-[0.08em]'>
          {label}
        </span>
      </div>

      <p className='mt-2 text-xl font-semibold tabular-nums'>
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
    <div>
      <p className='text-white/40'>{label}</p>

      <p className='mt-1 font-medium text-white/90'>{value}</p>
    </div>
  );
}
