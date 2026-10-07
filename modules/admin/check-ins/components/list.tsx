import { ScanLine } from 'lucide-react';

import type { CheckInViewModel } from '../types/check-in';

import { CheckInRow } from './row';

interface CheckInListProps {
  checkIns: CheckInViewModel[];
  selectedCheckInId: string | null;
  onSelect: (id: string) => void;
}

export function CheckInList({
  checkIns,
  selectedCheckInId,
  onSelect,
}: CheckInListProps) {
  return (
    <section className='flex min-w-0 max-h-151.5 flex-col rounded-2xl border border-border/70 bg-background p-4 shadow-sm sm:p-5'>
      <div className='mb-4 flex shrink-0 min-w-0 flex-col gap-2 sm:flex-row sm:items-center sm:justify-between'>
        <div className='flex min-w-0 items-center gap-2'>
          <div className='flex size-8 shrink-0 items-center justify-center rounded-xl bg-[#E5F5FC] text-[#5BA9D6]'>
            <ScanLine className='size-4' />
          </div>

          <div className='min-w-0'>
            <h2 className='truncate text-sm font-semibold text-foreground'>
              Check-in roster
            </h2>

            <p className='text-[10px] text-muted-foreground'>
              Passenger check-in records matching the current filters.
            </p>
          </div>
        </div>

        <p className='text-[10px] text-muted-foreground'>
          {checkIns.length} result
          {checkIns.length === 1 ? '' : 's'}
        </p>
      </div>

      {checkIns.length > 0 ?
        <div className='min-h-0 flex-1 overflow-y-auto overscroll-contain pr-1'>
          <div className='grid min-w-0 gap-3'>
            {checkIns.map((checkIn) => (
              <CheckInRow
                key={checkIn.id}
                checkIn={checkIn}
                selected={checkIn.id === selectedCheckInId}
                onSelect={onSelect}
              />
            ))}
          </div>
        </div>
      : <div className='flex min-h-[260px] flex-col items-center justify-center rounded-2xl border border-dashed border-border/70 bg-muted/20 px-6 text-center'>
          <div className='flex size-11 items-center justify-center rounded-2xl bg-background text-muted-foreground shadow-sm'>
            <ScanLine className='size-5' />
          </div>

          <h3 className='mt-4 text-sm font-semibold text-foreground'>
            No check-ins found
          </h3>

          <p className='mt-1 max-w-sm text-xs leading-5 text-muted-foreground'>
            Try adjusting the search term or check-in filters.
          </p>
        </div>
      }
    </section>
  );
}
