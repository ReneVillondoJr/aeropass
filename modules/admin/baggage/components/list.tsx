import { Luggage } from 'lucide-react';

import type { BaggageViewModel } from '../types/baggage';

import { BaggageRow } from './row';

interface BaggageListProps {
  baggage: BaggageViewModel[];
  selectedId: string | null;
  onSelect: (item: BaggageViewModel) => void;
}

export function BaggageList({
  baggage,
  selectedId,
  onSelect,
}: BaggageListProps) {
  return (
    <section className='min-w-0 rounded-[1.5rem] border border-border/70 bg-card p-4 shadow-sm sm:p-5'>
      <div className='mb-4 flex items-center justify-between gap-4'>
        <div>
          <h2 className='text-sm font-semibold tracking-tight'>
            Baggage roster
          </h2>
          <p className='mt-1 text-xs text-muted-foreground'>
            Live baggage records matched to their booking and flight.
          </p>
        </div>

        <div className='flex size-9 shrink-0 items-center justify-center rounded-xl bg-muted/50'>
          <Luggage className='size-4 text-muted-foreground' />
        </div>
      </div>

      {baggage.length > 0 ?
        <div className='max-h-[640px] overflow-y-auto overscroll-contain pr-1'>
          <div className='grid min-w-0 gap-3'>
            {baggage.map((item) => (
              <BaggageRow
                key={item.id}
                baggage={item}
                selected={item.id === selectedId}
                onClick={() => onSelect(item)}
              />
            ))}
          </div>
        </div>
      : <div className='flex min-h-64 flex-col items-center justify-center rounded-2xl border border-dashed border-border/70 bg-muted/20 px-6 text-center'>
          <div className='flex size-11 items-center justify-center rounded-xl bg-background'>
            <Luggage className='size-5 text-muted-foreground' />
          </div>

          <h3 className='mt-4 text-sm font-semibold'>
            No baggage records found
          </h3>

          <p className='mt-1 max-w-sm text-xs leading-5 text-muted-foreground'>
            Try changing your search or removing one of the active baggage
            filters.
          </p>
        </div>
      }
    </section>
  );
}
