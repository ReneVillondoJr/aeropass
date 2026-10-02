import { ArrowRight, Clock3, Plane, Route as RouteIcon } from 'lucide-react';

import type { Route } from '@/data/aeropass';

import type { RouteDetails } from '../types/route';
import { Badge } from '@/components/ui/badge';

interface RouteListProps {
  routes: RouteDetails[];
  selectedRouteId: string | null;
  onSelect: (route: RouteDetails) => void;
}

function getStatusVariant(status: Route['status']) {
  switch (status) {
    case 'ACTIVE':
      return 'default';

    case 'INACTIVE':
      return 'secondary';

    default:
      return 'outline';
  }
}

function formatDuration(minutes: number) {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (hours === 0) {
    return `${remainingMinutes}m`;
  }

  if (remainingMinutes === 0) {
    return `${hours}h`;
  }

  return `${hours}h ${remainingMinutes}m`;
}

function getRouteLabel(route: RouteDetails) {
  const origin = route.origin?.code ?? '---';
  const destination = route.destination?.code ?? '---';

  return `${origin} → ${destination}`;
}

export function RouteList({
  routes,
  selectedRouteId,
  onSelect,
}: RouteListProps) {
  if (routes.length === 0) {
    return (
      <section className='rounded-xl border border-border bg-card p-8'>
        <div className='flex min-h-[280px] items-center justify-center'>
          <div className='text-center'>
            <RouteIcon className='mx-auto size-8 text-muted-foreground' />

            <h2 className='mt-4 text-sm font-semibold'>No routes found</h2>

            <p className='mt-1 max-w-sm text-sm text-muted-foreground'>
              Try adjusting your search or route status filter.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className='rounded-xl border border-border bg-card'>
      <div className='border-b border-border px-4 py-3'>
        <h2 className='text-sm font-semibold'>Airline route network</h2>

        <p className='mt-1 text-xs text-muted-foreground'>
          Select a route to view airports, schedules, flights, and operational
          details.
        </p>
      </div>

      <div className='divide-y divide-border'>
        {routes.map((item) => {
          const route = item.route;
          const isSelected = route.id === selectedRouteId;

          const routeLabel = getRouteLabel(item);

          return (
            <button
              key={route.id}
              type='button'
              onClick={() => onSelect(item)}
              className={[
                'w-full text-left transition-colors',
                'hover:bg-muted/40',
                isSelected && 'bg-muted/50',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              <div className='flex gap-4 p-4'>
                <div className='flex shrink-0 flex-col items-center'>
                  <div
                    className={[
                      'flex size-9 items-center justify-center rounded-full border',
                      isSelected ?
                        'border-primary bg-primary text-primary-foreground'
                      : 'border-border bg-muted/40 text-muted-foreground',
                    ].join(' ')}
                  >
                    <Plane className='size-4' />
                  </div>

                  <div className='mt-2 h-full w-px bg-border' />
                </div>

                <div className='min-w-0 flex-1'>
                  <div className='flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between'>
                    <div className='min-w-0'>
                      <div className='flex flex-wrap items-center gap-2'>
                        <h3 className='text-sm font-semibold'>{routeLabel}</h3>

                        <Badge variant={getStatusVariant(route.status)}>
                          {route.status}
                        </Badge>
                      </div>

                      <p className='mt-1 truncate text-xs text-muted-foreground'>
                        {item.origin?.city ?? 'Unknown origin'} →{' '}
                        {item.destination?.city ?? 'Unknown destination'}
                      </p>
                    </div>

                    <ArrowRight className='hidden size-4 shrink-0 text-muted-foreground sm:block' />
                  </div>

                  <div className='mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4'>
                    <div className='min-w-0'>
                      <p className='text-[11px] uppercase tracking-wide text-muted-foreground'>
                        Route
                      </p>

                      <p className='mt-1 truncate text-xs font-medium'>
                        {route.id}
                      </p>
                    </div>

                    <div>
                      <p className='text-[11px] uppercase tracking-wide text-muted-foreground'>
                        Distance
                      </p>

                      <p className='mt-1 text-xs font-medium'>
                        {route.distanceKm.toLocaleString()} km
                      </p>
                    </div>

                    <div>
                      <p className='text-[11px] uppercase tracking-wide text-muted-foreground'>
                        Duration
                      </p>

                      <p className='mt-1 inline-flex items-center gap-1.5 text-xs font-medium'>
                        <Clock3 className='size-3.5 text-muted-foreground' />
                        {formatDuration(route.durationMinutes)}
                      </p>
                    </div>

                    <div>
                      <p className='text-[11px] uppercase tracking-wide text-muted-foreground'>
                        Operations
                      </p>

                      <p className='mt-1 text-xs font-medium'>
                        {item.schedules.length} schedules ·{' '}
                        {item.flights.length} flights
                      </p>
                    </div>
                  </div>

                  <div className='mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground'>
                    <span>
                      Origin:{' '}
                      <span className='font-medium text-foreground'>
                        {item.origin?.code ?? '---'}
                      </span>
                    </span>

                    <span>
                      Destination:{' '}
                      <span className='font-medium text-foreground'>
                        {item.destination?.code ?? '---'}
                      </span>
                    </span>

                    <span>
                      {item.origin?.terminal ?? 'Terminal unavailable'}
                    </span>

                    <span>
                      {item.destination?.terminal ?? 'Terminal unavailable'}
                    </span>
                  </div>

                  <div className='mt-4 flex flex-wrap gap-2'>
                    {item.schedules.slice(0, 4).map((schedule) => (
                      <span
                        key={schedule.id}
                        className='inline-flex items-center gap-1.5 rounded-md border border-border bg-muted/30 px-2 py-1 text-[11px] font-medium'
                      >
                        <Plane className='size-3' />
                        {schedule.flightNumber}
                      </span>
                    ))}

                    {item.schedules.length > 4 && (
                      <span className='inline-flex items-center rounded-md border border-border bg-muted/30 px-2 py-1 text-[11px] text-muted-foreground'>
                        +{item.schedules.length - 4} more
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
