import { ArrowRight, Plane, Route as RouteIcon } from 'lucide-react';

import type { RouteStatsData } from '../types/route';

interface RouteHeaderProps {
  stats: RouteStatsData;
}

export function RouteHeader({ stats }: RouteHeaderProps) {
  return (
    <div className='flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between'>
      <div className='flex items-start gap-3'>
        <div className='flex size-10 shrink-0 items-center justify-center rounded-xl border border-border bg-muted/40'>
          <RouteIcon className='size-5 text-muted-foreground' />
        </div>

        <div>
          <div className='flex flex-wrap items-center gap-2'>
            <h1 className='text-2xl font-semibold tracking-tight sm:text-3xl'>
              Routes
            </h1>

            <span className='inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/40 px-2 py-1 text-[11px] font-medium text-muted-foreground'>
              <Plane className='size-3' />
              Airline network
            </span>
          </div>

          <p className='mt-1 text-sm text-muted-foreground'>
            Manage AeroPass airport-to-airport route network and flight
            operations.
          </p>

          <div className='mt-3 flex flex-wrap items-center gap-2 text-xs text-muted-foreground'>
            <span>{stats.total} routes</span>

            <span aria-hidden='true'>•</span>

            <span>{stats.active} active</span>

            <span aria-hidden='true'>•</span>

            <span>{stats.flights} flights</span>
          </div>
        </div>
      </div>

      <div className='hidden items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-xs text-muted-foreground sm:flex'>
        <span className='size-1.5 rounded-full bg-primary' />
        Network operational
        <ArrowRight className='size-3.5' />
      </div>
    </div>
  );
}
