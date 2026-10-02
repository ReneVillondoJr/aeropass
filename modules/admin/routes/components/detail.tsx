import {
  CalendarClock,
  Clock3,
  MapPin,
  Plane,
  Route as RouteIcon,
  Ruler,
} from 'lucide-react';

import type { Route } from '@/data/aeropass';

import type { RouteDetails } from '../types/route';

import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface RouteDetailProps {
  route: RouteDetails | null;
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
    return `${remainingMinutes} min`;
  }

  if (remainingMinutes === 0) {
    return `${hours} hr`;
  }

  return `${hours} hr ${remainingMinutes} min`;
}

function formatFrequency(frequency: 'DAILY' | 'WEEKDAYS' | 'WEEKENDS') {
  switch (frequency) {
    case 'DAILY':
      return 'Daily';

    case 'WEEKDAYS':
      return 'Weekdays';

    case 'WEEKENDS':
      return 'Weekends';

    default:
      return frequency;
  }
}

export function RouteDetail({ route }: RouteDetailProps) {
  if (!route) {
    return (
      <aside className='rounded-xl border border-border bg-card p-6'>
        <div className='flex min-h-[420px] items-center justify-center'>
          <div className='text-center'>
            <RouteIcon className='mx-auto size-8 text-muted-foreground' />

            <p className='mt-4 text-sm font-medium'>No route selected</p>

            <p className='mt-1 text-sm text-muted-foreground'>
              Select an airline route to view its operational details.
            </p>
          </div>
        </div>
      </aside>
    );
  }

  return (
    <aside className='rounded-xl border border-border bg-card'>
      <div className='flex items-start justify-between gap-3 p-5'>
        <div className='min-w-0'>
          <p className='text-xs font-medium text-muted-foreground'>
            {route.route.id}
          </p>

          <h2 className='mt-1 truncate text-lg font-semibold'>
            {route.origin?.code ?? '---'} → {route.destination?.code ?? '---'}
          </h2>

          <p className='mt-1 text-sm text-muted-foreground'>
            {route.origin?.city ?? 'Unknown'} →{' '}
            {route.destination?.city ?? 'Unknown'}
          </p>
        </div>

        <Badge variant={getStatusVariant(route.route.status)}>
          {route.route.status}
        </Badge>
      </div>

      <Separator />

      <div className='flex flex-col gap-5 p-5'>
        <div className='grid grid-cols-2 gap-4'>
          <div>
            <p className='text-xs text-muted-foreground'>Distance</p>

            <p className='mt-1 flex items-center gap-1.5 text-sm font-semibold'>
              <Ruler className='size-3.5 text-muted-foreground' />
              {route.route.distanceKm.toLocaleString()} km
            </p>
          </div>

          <div>
            <p className='text-xs text-muted-foreground'>Duration</p>

            <p className='mt-1 flex items-center gap-1.5 text-sm font-semibold'>
              <Clock3 className='size-3.5 text-muted-foreground' />
              {formatDuration(route.route.durationMinutes)}
            </p>
          </div>

          <div>
            <p className='text-xs text-muted-foreground'>Schedules</p>

            <p className='mt-1 flex items-center gap-1.5 text-sm font-semibold'>
              <CalendarClock className='size-3.5 text-muted-foreground' />
              {route.schedules.length}
            </p>
          </div>

          <div>
            <p className='text-xs text-muted-foreground'>Flights</p>

            <p className='mt-1 flex items-center gap-1.5 text-sm font-semibold'>
              <Plane className='size-3.5 text-muted-foreground' />
              {route.flights.length}
            </p>
          </div>
        </div>

        <Separator />

        <div>
          <p className='text-xs font-medium text-muted-foreground'>Airports</p>

          <div className='mt-3 grid gap-4 sm:grid-cols-2'>
            <div className='rounded-lg border border-border bg-muted/20 p-4'>
              <div className='flex items-start gap-3'>
                <div className='flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted/60'>
                  <MapPin className='size-4 text-muted-foreground' />
                </div>

                <div className='min-w-0'>
                  <p className='text-[11px] font-medium uppercase tracking-wide text-muted-foreground'>
                    Origin
                  </p>

                  <p className='mt-1 text-sm font-semibold'>
                    {route.origin?.code ?? '---'}
                  </p>

                  <p className='mt-0.5 truncate text-xs text-muted-foreground'>
                    {route.origin?.name ?? 'Airport unavailable'}
                  </p>

                  <p className='mt-1 text-xs text-muted-foreground'>
                    {route.origin?.city ?? 'Unknown city'} ·{' '}
                    {route.origin?.terminal ?? 'Unknown terminal'}
                  </p>
                </div>
              </div>
            </div>

            <div className='rounded-lg border border-border bg-muted/20 p-4'>
              <div className='flex items-start gap-3'>
                <div className='flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted/60'>
                  <MapPin className='size-4 text-muted-foreground' />
                </div>

                <div className='min-w-0'>
                  <p className='text-[11px] font-medium uppercase tracking-wide text-muted-foreground'>
                    Destination
                  </p>

                  <p className='mt-1 text-sm font-semibold'>
                    {route.destination?.code ?? '---'}
                  </p>

                  <p className='mt-0.5 truncate text-xs text-muted-foreground'>
                    {route.destination?.name ?? 'Airport unavailable'}
                  </p>

                  <p className='mt-1 text-xs text-muted-foreground'>
                    {route.destination?.city ?? 'Unknown city'} ·{' '}
                    {route.destination?.terminal ?? 'Unknown terminal'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        <div>
          <div className='flex items-center justify-between gap-3'>
            <div>
              <p className='text-xs font-medium text-muted-foreground'>
                Flight schedules
              </p>

              <p className='mt-1 text-sm font-semibold'>
                {route.schedules.length} configured
              </p>
            </div>

            <Plane className='size-4 text-muted-foreground' />
          </div>

          <div className='mt-3 flex flex-col gap-2'>
            {route.schedules.map((schedule) => (
              <div
                key={schedule.id}
                className='flex items-center justify-between gap-3 rounded-lg border border-border bg-muted/20 px-3 py-3'
              >
                <div className='flex min-w-0 items-center gap-3'>
                  <div className='flex size-8 shrink-0 items-center justify-center rounded-md bg-background'>
                    <Plane className='size-3.5 text-muted-foreground' />
                  </div>

                  <div className='min-w-0'>
                    <p className='text-sm font-medium'>
                      {schedule.flightNumber}
                    </p>

                    <p className='mt-0.5 text-xs text-muted-foreground'>
                      {schedule.departureTime} → {schedule.arrivalTime}
                    </p>
                  </div>
                </div>

                <span className='shrink-0 text-xs text-muted-foreground'>
                  {formatFrequency(schedule.frequency)}
                </span>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        <div>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-xs font-medium text-muted-foreground'>
                Flight operations
              </p>

              <p className='mt-1 text-sm font-semibold'>
                {route.flights.length} flight records
              </p>
            </div>
          </div>

          <div className='mt-3 flex flex-col gap-2'>
            {route.flights.map((flight) => (
              <div
                key={flight.id}
                className='flex items-center justify-between gap-3 rounded-lg border border-border px-3 py-3'
              >
                <div className='min-w-0'>
                  <p className='text-sm font-medium'>{flight.flightNumber}</p>

                  <p className='mt-0.5 text-xs text-muted-foreground'>
                    {flight.departureDate} · {flight.departureTime}
                  </p>
                </div>

                <Badge variant='outline'>{flight.status}</Badge>
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
