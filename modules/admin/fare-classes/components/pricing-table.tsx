import {
  ArrowRight,
  CalendarDays,
  CircleDollarSign,
  Clock3,
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

              <h2 className='text-sm font-semibold'>Flight-level pricing</h2>
            </div>

            <p className='mt-1 text-xs leading-5 text-muted-foreground'>
              Published fare records connected to this fare class.
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
              <div className='flex min-w-0 flex-col gap-4 lg:flex-row lg:items-center lg:justify-between'>
                <div className='min-w-0'>
                  <div className='flex min-w-0 flex-wrap items-center gap-2'>
                    <span className='text-sm font-semibold tabular-nums'>
                      {item.flightNumber}
                    </span>

                    <span className='rounded-full bg-muted px-2.5 py-1 text-[10px] font-medium text-muted-foreground'>
                      {item.flightId}
                    </span>
                  </div>

                  <div className='mt-2 flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground'>
                    <span className='shrink-0 font-medium text-foreground'>
                      {item.originCode}
                    </span>

                    <ArrowRight className='size-3 shrink-0' />

                    <span className='shrink-0 font-medium text-foreground'>
                      {item.destinationCode}
                    </span>
                  </div>
                </div>

                <div className='grid min-w-0 gap-2 sm:grid-cols-3 lg:w-[420px]'>
                  <PriceMetric
                    icon={<CircleDollarSign className='size-3.5' />}
                    label='Price'
                    value={formatPhp(item.fare.price)}
                  />

                  <PriceMetric
                    icon={<CalendarDays className='size-3.5' />}
                    label='Date'
                    value={item.departureDate}
                  />

                  <PriceMetric
                    icon={<Clock3 className='size-3.5' />}
                    label='Seats'
                    value={String(item.seatsAvailable)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      : <div className='p-8 text-center'>
          <Ticket className='mx-auto size-5 text-muted-foreground' />

          <p className='mt-2 text-xs font-medium'>No flight pricing records</p>
        </div>
      }
    </section>
  );
}

function PriceMetric({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className='min-w-0 rounded-xl border border-border/60 bg-muted/10 p-3'>
      <div className='flex items-center gap-1.5 text-muted-foreground'>
        {icon}

        <span className='truncate text-[9px] font-medium uppercase tracking-[0.05em]'>
          {label}
        </span>
      </div>

      <p className='mt-1.5 truncate text-xs font-semibold tabular-nums'>
        {value}
      </p>
    </div>
  );
}
