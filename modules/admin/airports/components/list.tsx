'use client';

import { Building2, ListTree } from 'lucide-react';

import type { AirportViewModel } from '../types/airports';

import { AirportRow } from './row';

interface AirportListProps {
  airports: AirportViewModel[];
  selectedAirportId: string | null;
  onSelect: (airportId: string) => void;
}

export function AirportList({
  airports,
  selectedAirportId,
  onSelect,
}: AirportListProps) {
  return (
    <section className='overflow-hidden rounded-[1.5rem] border border-border/70 bg-card shadow-sm'>
      <div className='flex items-center justify-between gap-4 border-b border-border/70 px-5 py-4'>
        <div className='flex items-center gap-3'>
          <div className='flex size-8 items-center justify-center rounded-xl bg-[#EEF7FB] text-[#102A43]'>
            <ListTree className='size-3.5' />
          </div>

          <div>
            <h2 className='text-sm font-semibold'>Airport network</h2>
            <p className='mt-0.5 text-[10px] text-muted-foreground'>
              Locations and connected operations
            </p>
          </div>
        </div>

        <span className='rounded-full bg-muted px-2.5 py-1 text-[9px] font-semibold text-muted-foreground'>
          {airports.length} airports
        </span>
      </div>

      {airports.length > 0 ?
        <div className='max-h-168 overflow-y-auto overscroll-contain pr-1'>
          {airports.map((item) => (
            <AirportRow
              key={item.airport.id}
              item={item}
              selected={selectedAirportId === item.airport.id}
              onSelect={() => onSelect(item.airport.id)}
            />
          ))}
        </div>
      : <div className='flex min-h-80 flex-col items-center justify-center px-6 text-center'>
          <div className='flex size-12 items-center justify-center rounded-2xl bg-muted'>
            <Building2 className='size-5 text-muted-foreground' />
          </div>

          <p className='mt-4 text-sm font-semibold'>No airports found</p>

          <p className='mt-1 max-w-sm text-xs leading-5 text-muted-foreground'>
            Try another airport code, city, or terminal.
          </p>
        </div>
      }
    </section>
  );
}
