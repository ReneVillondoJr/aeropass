import { CircleDollarSign } from 'lucide-react';

import type { FareClassViewModel } from '../types/fare-class';

import { FareClassRow } from './row';

interface FareClassListProps {
  fareClasses: FareClassViewModel[];

  selectedFareClassId: string | null;

  onSelect: (fareClassId: string) => void;
}

export function FareClassList({
  fareClasses,
  selectedFareClassId,
  onSelect,
}: FareClassListProps) {
  return (
    <section className='min-w-0 rounded-2xl border border-border/70 bg-background p-4 shadow-sm sm:p-5'>
      <div className='mb-4 flex min-w-0 flex-col gap-2 sm:flex-row sm:items-center sm:justify-between'>
        <div className='min-w-0'>
          <div className='flex items-center gap-2'>
            <CircleDollarSign className='size-4 text-[#5BA9D6]' />

            <h2 className='text-sm font-semibold'>Fare class roster</h2>
          </div>

          <p className='mt-1 text-xs leading-5 text-muted-foreground'>
            Configured fare families and their pricing rules.
          </p>
        </div>

        <span className='w-fit shrink-0 rounded-full bg-[#EEF7FB] px-2.5 py-1 text-[10px] font-semibold text-[#102A43]'>
          {fareClasses.length}{' '}
          {fareClasses.length === 1 ? 'fare class' : 'fare classes'}
        </span>
      </div>

      {fareClasses.length > 0 ?
        <div className='grid min-w-0 gap-3'>
          {fareClasses.map((item) => (
            <FareClassRow
              key={item.fareClass.id}
              item={item}
              selected={item.fareClass.id === selectedFareClassId}
              onSelect={onSelect}
            />
          ))}
        </div>
      : <div className='rounded-2xl border border-dashed border-border p-10 text-center'>
          <div className='mx-auto flex size-11 items-center justify-center rounded-full bg-muted'>
            <CircleDollarSign className='size-5 text-muted-foreground' />
          </div>

          <h3 className='mt-4 text-sm font-semibold'>No fare classes found</h3>

          <p className='mx-auto mt-1 max-w-sm text-xs leading-5 text-muted-foreground'>
            Try adjusting your search or fare flexibility filters.
          </p>
        </div>
      }
    </section>
  );
}
