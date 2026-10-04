import {
  Activity,
  CalendarClock,
  ChevronRight,
  Gauge,
  Plane,
  Users,
} from 'lucide-react';

import type { AircraftViewModel } from '../types/aircraft';

import { aircraftStatusMeta } from '../data/aircraft';

interface AircraftRowProps {
  item: AircraftViewModel;

  selected: boolean;

  onSelect: (aircraftId: string) => void;
}

export function AircraftRow({ item, selected, onSelect }: AircraftRowProps) {
  const aircraft = item.aircraft;

  const status = aircraftStatusMeta[aircraft.status];

  return (
    <button
      type='button'
      onClick={() => onSelect(aircraft.id)}
      className={[
        'w-full rounded-2xl border p-5 text-left transition-all',
        'focus:outline-none focus:ring-2 focus:ring-[#5BA9D6]/30',
        selected ?
          'border-[#5BA9D6]/60 bg-[#EEF7FB] shadow-sm'
        : 'border-border/70 bg-background hover:border-border hover:bg-muted/20',
      ].join(' ')}
    >
      <div className='flex min-w-0 flex-col gap-5'>
        {/* Heading */}
        <div className='flex min-w-0 items-start justify-between gap-4'>
          <div className='flex min-w-0 items-start gap-3'>
            <div className='flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#102A43] text-white'>
              <Plane className='size-5' />
            </div>

            <div className='min-w-0'>
              <div className='flex min-w-0 flex-wrap items-center gap-2'>
                <h3 className='truncate text-base font-semibold tracking-tight'>
                  {aircraft.model}
                </h3>

                <span
                  className={[
                    'shrink-0 rounded-full px-2.5 py-1 text-[10px] font-semibold',
                    status.className,
                  ].join(' ')}
                >
                  {status.label}
                </span>
              </div>

              <p className='mt-1 break-words text-xs text-muted-foreground'>
                {aircraft.manufacturer} · {aircraft.registrationNumber}
              </p>
            </div>
          </div>

          <ChevronRight
            className={[
              'mt-1 size-4 shrink-0',
              selected ? 'text-[#102A43]' : 'text-muted-foreground',
            ].join(' ')}
          />
        </div>

        {/* Metrics */}
        <div className='grid gap-3 sm:grid-cols-2 xl:grid-cols-4'>
          <Metric
            icon={<Users className='size-3.5' />}
            label='Seats'
            value={aircraft.totalSeats}
          />

          <Metric
            icon={<CalendarClock className='size-3.5' />}
            label='Schedules'
            value={item.activeSchedules.length}
          />

          <Metric
            icon={<Activity className='size-3.5' />}
            label='Flights'
            value={item.flights.length}
          />

          <Metric
            icon={<Gauge className='size-3.5' />}
            label='Load factor'
            value={`${item.loadFactor}%`}
          />
        </div>

        {/* Footer */}
        <div className='flex min-w-0 flex-col gap-3 border-t border-border/60 pt-4 sm:flex-row sm:items-center sm:justify-between'>
          <div className='min-w-0'>
            <p className='text-[10px] font-medium uppercase tracking-[0.08em] text-muted-foreground'>
              Assigned routes
            </p>

            <div className='mt-2 flex min-w-0 flex-wrap gap-1.5'>
              {item.routes.length > 0 ?
                item.routes.map((route) => (
                  <span
                    key={route.route.id}
                    className='rounded-full border border-border/70 bg-background px-2.5 py-1 text-[10px] font-medium text-foreground'
                  >
                    {route.origin.code}
                    {' → '}
                    {route.destination.code}
                  </span>
                ))
              : <span className='text-xs text-muted-foreground'>
                  No routes assigned
                </span>
              }
            </div>
          </div>

          <div className='shrink-0 text-xs text-muted-foreground'>
            In service{' '}
            <span className='font-semibold text-foreground'>
              {item.yearsInService}
            </span>{' '}
            {item.yearsInService === 1 ? 'year' : 'years'}
          </div>
        </div>
      </div>
    </button>
  );
}

function Metric({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}) {
  return (
    <div className='min-w-0 rounded-xl border border-border/60 bg-background/70 p-3'>
      <div className='flex min-w-0 items-center gap-1.5 text-muted-foreground'>
        {icon}

        <span className='truncate text-[10px] font-medium uppercase tracking-[0.06em]'>
          {label}
        </span>
      </div>

      <p className='mt-1.5 truncate text-sm font-semibold tabular-nums'>
        {value}
      </p>
    </div>
  );
}
