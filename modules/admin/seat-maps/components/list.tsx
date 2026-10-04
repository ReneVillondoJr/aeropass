import { Armchair } from 'lucide-react';

import type { SeatMapViewModel } from '../types/seat-map';

import { SeatMapRow } from './row';

interface SeatMapListProps {
  seatMaps: SeatMapViewModel[];

  selectedAircraftId: string | null;

  onSelect: (aircraftId: string) => void;
}

export function SeatMapList({
  seatMaps,
  selectedAircraftId,
  onSelect,
}: SeatMapListProps) {
  return (
    <section className='min-w-0 rounded-2xl border border-border/70 bg-background p-4 shadow-sm sm:p-5'>
      <div className='mb-4 flex min-w-0 flex-col gap-2 sm:flex-row sm:items-center sm:justify-between'>
        <div className='min-w-0'>
          <div className='flex items-center gap-2'>
            <Armchair className='size-4 text-[#5BA9D6]' />

            <h2 className='text-sm font-semibold'>Seat map roster</h2>
          </div>

          <p className='mt-1 text-xs leading-5 text-muted-foreground'>
            Aircraft cabin layouts available for configuration.
          </p>
        </div>

        <span className='w-fit shrink-0 rounded-full bg-[#EEF7FB] px-2.5 py-1 text-[10px] font-semibold text-[#102A43]'>
          {seatMaps.length} {seatMaps.length === 1 ? 'seat map' : 'seat maps'}
        </span>
      </div>

      {seatMaps.length > 0 ?
        <div className='grid min-w-0 gap-3'>
          {seatMaps.map((item) => (
            <SeatMapRow
              key={item.aircraft.id}
              item={item}
              selected={item.aircraft.id === selectedAircraftId}
              onSelect={onSelect}
            />
          ))}
        </div>
      : <div className='rounded-2xl border border-dashed border-border p-10 text-center'>
          <div className='mx-auto flex size-11 items-center justify-center rounded-full bg-muted'>
            <Armchair className='size-5 text-muted-foreground' />
          </div>

          <h3 className='mt-4 text-sm font-semibold'>No seat maps found</h3>

          <p className='mx-auto mt-1 max-w-sm text-xs leading-5 text-muted-foreground'>
            Try adjusting the search, aircraft status, or cabin filters.
          </p>
        </div>
      }
    </section>
  );
}
