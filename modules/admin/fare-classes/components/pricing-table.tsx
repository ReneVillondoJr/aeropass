import {
  ArrowRight,
  CalendarDays,
  CircleDollarSign,
  Ticket,
} from 'lucide-react';

import { formatPhp } from '../data/fare-class';
import type { FareFlightView } from '../types/fare-class';

interface FarePricingTableProps {
  fares: FareFlightView[];
}

export function FarePricingTable({ fares }: FarePricingTableProps) {
  return (
    <section className='overflow-hidden rounded-2xl border border-border/70 bg-background shadow-sm'>
      <div className='border-b border-border/60 p-5'>
        <div className='flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between'>
          <div>
            <div className='flex items-center gap-2'>
              <Ticket className='size-4 text-[#5BA9D6]' />
              <h2 className='text-sm font-semibold'>Flight pricing</h2>
            </div>

            <p className='mt-1 text-xs text-muted-foreground'>
              Published fares for this fare class.
            </p>
          </div>

          <span className='w-fit shrink-0 rounded-full bg-[#EEF7FB] px-2.5 py-1 text-[10px] font-semibold text-[#102A43]'>
            {fares.length} {fares.length === 1 ? 'record' : 'records'}
          </span>
        </div>
      </div>

      {fares.length > 0 ?
        <div className='divide-y divide-border/60'>
          {fares.map((item) => (
            <div
              key={item.fare.id}
              className='p-4 transition-colors hover:bg-muted/20 sm:p-5'
            >
              <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
                <div className='min-w-0'>
                  <div className='flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1'>
                    <span className='text-sm font-semibold tabular-nums'>
                      {item.flightNumber}
                    </span>

                    <span className='text-xs text-muted-foreground'>
                      {item.originCode}
                      <ArrowRight className='mx-1 inline size-3' />
                      {item.destinationCode}
                    </span>
                  </div>

                  <div className='mt-1.5 flex items-center gap-1.5 text-xs text-muted-foreground'>
                    <CalendarDays className='size-3.5 shrink-0' />
                    <span>{item.departureDate}</span>
                  </div>
                </div>

                <div className='flex items-center gap-5 sm:shrink-0'>
                  <div className='flex items-center gap-1.5'>
                    <CircleDollarSign className='size-3.5 text-muted-foreground' />
                    <span className='text-sm font-semibold tabular-nums'>
                      {formatPhp(item.fare.price)}
                    </span>
                  </div>

                  <span className='text-xs text-muted-foreground'>
                    <span className='font-semibold tabular-nums text-foreground'>
                      {item.seatsAvailable}
                    </span>{' '}
                    {item.seatsAvailable === 1 ? 'seat' : 'seats'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      : <div className='p-8 text-center'>
          <Ticket className='mx-auto size-5 text-muted-foreground' />

          <p className='mt-2 text-xs font-medium'>No flight pricing records</p>

          <p className='mt-1 text-xs text-muted-foreground'>
            Published fares will appear here.
          </p>
        </div>
      }
    </section>
  );
}
