import { Armchair, ChevronRight, Grid2X2, Plane } from 'lucide-react';

import { aircraftStatusMeta } from '../data/seat-map';

import type { SeatMapViewModel } from '../types/seat-map';

interface SeatMapRowProps {
  item: SeatMapViewModel;

  selected: boolean;

  onSelect: (aircraftId: string) => void;
}

export function SeatMapRow({ item, selected, onSelect }: SeatMapRowProps) {
  const aircraft = item.aircraft;

  const status = aircraftStatusMeta[aircraft.status];

  return (
    <button
      type='button'
      onClick={() => onSelect(aircraft.id)}
      className={[
        'w-full min-w-0 rounded-2xl border p-5 text-left transition-all',
        'focus:outline-none focus:ring-2 focus:ring-[#5BA9D6]/30',
        selected ?
          'border-[#5BA9D6]/60 bg-[#EEF7FB] shadow-sm'
        : 'border-border/70 bg-background hover:border-border hover:bg-muted/20',
      ].join(' ')}
    >
      <div className='flex min-w-0 flex-col gap-5'>
        {/* Header */}
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

        {/* Capacity */}
        <div className='grid gap-3 sm:grid-cols-2 xl:grid-cols-4'>
          <Metric
            icon={<Armchair className='size-3.5' />}
            label='Total seats'
            value={item.totalSeats}
          />

          <Metric
            icon={<Grid2X2 className='size-3.5' />}
            label='Available'
            value={item.availableSeats}
          />

          <Metric
            icon={<Grid2X2 className='size-3.5' />}
            label='Blocked'
            value={item.blockedSeats}
          />

          <Metric
            icon={<Grid2X2 className='size-3.5' />}
            label='Rows'
            value={item.rows.length}
          />
        </div>

        {/* Cabin summary */}
        <div className='flex min-w-0 flex-col gap-3 border-t border-border/60 pt-4'>
          <div>
            <p className='text-[10px] font-medium uppercase tracking-[0.08em] text-muted-foreground'>
              Cabin configuration
            </p>

            <div className='mt-2 flex min-w-0 flex-wrap gap-1.5'>
              <span className='rounded-full border border-[#DCE8EF] bg-[#EEF7FB] px-2.5 py-1 text-[10px] font-semibold text-[#102A43]'>
                Business {item.businessSeats}
              </span>

              {item.premiumEconomySeats > 0 && (
                <span className='rounded-full border border-violet-200 bg-violet-50 px-2.5 py-1 text-[10px] font-semibold text-violet-700'>
                  Premium Economy {item.premiumEconomySeats}
                </span>
              )}

              <span className='rounded-full border border-border/70 bg-background px-2.5 py-1 text-[10px] font-semibold'>
                Economy {item.economySeats}
              </span>
            </div>
          </div>

          <div className='flex min-w-0 items-center justify-between gap-3'>
            <div className='flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground'>
              <span>
                Window{' '}
                <strong className='font-semibold text-foreground'>
                  {item.windowSeats}
                </strong>
              </span>

              <span>
                Aisle{' '}
                <strong className='font-semibold text-foreground'>
                  {item.aisleSeats}
                </strong>
              </span>

              <span>
                Exit row{' '}
                <strong className='font-semibold text-foreground'>
                  {item.exitRowSeats}
                </strong>
              </span>
            </div>
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
