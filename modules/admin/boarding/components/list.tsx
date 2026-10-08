import { PlaneTakeoff } from 'lucide-react';

import type { BoardingViewModel } from '../types/boarding';

import { BoardingRow } from './row';

interface BoardingListProps {
  boarding: BoardingViewModel[];
  selectedBoardingId: string | null;
  onSelect: (id: string) => void;
}

export function BoardingList({
  boarding,
  selectedBoardingId,
  onSelect,
}: BoardingListProps) {
  return (
    <section className='min-w-0 rounded-2xl border border-border/70 bg-background p-4 shadow-sm sm:p-5'>
      <div className='mb-4 flex min-w-0 flex-col gap-2 sm:flex-row sm:items-center sm:justify-between'>
        <div className='flex min-w-0 items-center gap-2'>
          <div className='flex size-8 shrink-0 items-center justify-center rounded-xl bg-[#E5F5FC] text-[#5BA9D6]'>
            <PlaneTakeoff className='size-4' />
          </div>

          <div className='min-w-0'>
            <h2 className='truncate text-sm font-semibold text-foreground'>
              Boarding roster
            </h2>

            <p className='text-[10px] text-muted-foreground'>
              Passenger boarding records matching the current filters.
            </p>
          </div>
        </div>

        <p className='text-[10px] text-muted-foreground'>
          {boarding.length} result
          {boarding.length === 1 ? '' : 's'}
        </p>
      </div>

      {boarding.length > 0 ?
        <div className='max-h-[640px] overflow-y-auto overscroll-contain pr-1'>
          <div className='grid min-w-0 gap-3'>
            {boarding.map((boardingRecord) => (
              <BoardingRow
                key={boardingRecord.id}
                boarding={boardingRecord}
                selected={boardingRecord.id === selectedBoardingId}
                onSelect={onSelect}
              />
            ))}
          </div>
        </div>
      : <div className='flex min-h-[260px] flex-col items-center justify-center rounded-2xl border border-dashed border-border/70 bg-muted/20 px-6 text-center'>
          <div className='flex size-11 items-center justify-center rounded-2xl bg-background text-muted-foreground shadow-sm'>
            <PlaneTakeoff className='size-5' />
          </div>

          <h3 className='mt-4 text-sm font-semibold text-foreground'>
            No boarding records found
          </h3>

          <p className='mt-1 max-w-sm text-xs leading-5 text-muted-foreground'>
            Try adjusting the search term or boarding filters.
          </p>
        </div>
      }
    </section>
  );
}
