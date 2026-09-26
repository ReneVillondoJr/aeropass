import { Plane, SearchX } from 'lucide-react';

import { FlightResultCard } from './flight-result-card';

import type { FlightSearchResult } from '../types/search';

interface FlightResultsProps {
  results: FlightSearchResult[];
  hasSearched: boolean;
}

export function FlightResults({ results, hasSearched }: FlightResultsProps) {
  if (hasSearched && results.length === 0) {
    return (
      <section className='rounded-2xl border border-dashed border-sky-200 bg-white px-6 py-14 text-center'>
        <div className='mx-auto flex size-12 items-center justify-center rounded-2xl bg-[#f4f9fc] text-slate-400'>
          <SearchX className='size-5' />
        </div>

        <h2 className='mt-5 text-lg font-semibold tracking-tight text-[#102a43]'>
          No flights found
        </h2>

        <p className='mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500'>
          Try another route or departure date. Your available demo flights come
          from the AeroPass temporary dataset.
        </p>
      </section>
    );
  }

  if (!hasSearched) {
    return (
      <section className='rounded-2xl border border-sky-100 bg-white px-6 py-14 text-center'>
        <div className='mx-auto flex size-12 items-center justify-center rounded-2xl bg-[#e5f5fc] text-[#3f88b2]'>
          <Plane className='size-5' />
        </div>

        <h2 className='mt-5 text-lg font-semibold tracking-tight text-[#102a43]'>
          Find your next flight
        </h2>

        <p className='mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500'>
          Search the temporary AeroPass flight dataset to explore routes, fares,
          and flight details.
        </p>
      </section>
    );
  }

  return (
    <section>
      <div className='mb-4 flex items-center justify-between gap-4'>
        <div>
          <p className='text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400'>
            Available flights
          </p>

          <h2 className='mt-1 text-lg font-semibold tracking-tight text-[#102a43]'>
            {results.length} {results.length === 1 ? 'flight' : 'flights'} found
          </h2>
        </div>
      </div>

      <div className='space-y-4'>
        {results.map((flight) => (
          <FlightResultCard key={flight.id} flight={flight} />
        ))}
      </div>
    </section>
  );
}
