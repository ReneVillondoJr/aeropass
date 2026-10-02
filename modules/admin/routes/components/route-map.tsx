import { CircleDot, MapPin, Navigation, Plane } from 'lucide-react';

import type { RouteDetails } from '../types/route';

interface RouteMapProps {
  route: RouteDetails | null;
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

export function RouteMap({ route }: RouteMapProps) {
  if (!route) {
    return (
      <section className='overflow-hidden rounded-xl border border-border bg-card'>
        <div className='flex min-h-115 items-center justify-center'>
          <div className='text-center'>
            <Navigation className='mx-auto size-8 text-muted-foreground' />

            <p className='mt-4 text-sm font-medium'>Select a route</p>

            <p className='mt-1 text-sm text-muted-foreground'>
              Choose an airline route to view its network path.
            </p>
          </div>
        </div>
      </section>
    );
  }

  const originCode = route.origin?.code ?? '---';

  const destinationCode = route.destination?.code ?? '---';

  const originCity = route.origin?.city ?? 'Unknown';

  const destinationCity = route.destination?.city ?? 'Unknown';

  return (
    <section className='overflow-hidden rounded-xl border border-border bg-card'>
      {/* Map visual */}
      <div className='relative min-h-115 overflow-hidden bg-muted/10'>
        {/* Background grid */}
        <div className='pointer-events-none absolute inset-0 route-grid-effect' />

        {/* Subtle network points */}
        <div className='pointer-events-none absolute inset-0 opacity-45'>
          <span className='absolute left-[21%] top-[28%] size-1 rounded-full bg-border' />
          <span className='absolute left-[37%] top-[18%] size-1 rounded-full bg-border' />
          <span className='absolute left-[62%] top-[27%] size-1 rounded-full bg-border' />
          <span className='absolute left-[76%] top-[39%] size-1 rounded-full bg-border' />
          <span className='absolute left-[31%] top-[69%] size-1 rounded-full bg-border' />
          <span className='absolute left-[69%] top-[72%] size-1 rounded-full bg-border' />
        </div>

        {/* Route */}
        <svg
          className='pointer-events-none absolute inset-0 size-full'
          viewBox='0 0 1000 500'
          preserveAspectRatio='none'
          aria-hidden='true'
        >
          <defs>
            <filter
              id='route-glow'
              x='-50%'
              y='-50%'
              width='200%'
              height='200%'
            >
              <feGaussianBlur stdDeviation='4' result='blur' />

              <feMerge>
                <feMergeNode in='blur' />
                <feMergeNode in='SourceGraphic' />
              </feMerge>
            </filter>
          </defs>

          {/* Soft route shadow */}
          <path
            d='M125 350 C250 350 300 170 470 235 C620 295 680 170 875 115'
            fill='none'
            stroke='currentColor'
            strokeWidth='12'
            strokeLinecap='round'
            className='text-background'
          />

          {/* Main route */}
          <path
            id='aeropass-flight-route'
            d='M125 350 C250 350 300 170 470 235 C620 295 680 170 875 115'
            fill='none'
            stroke='currentColor'
            strokeWidth='3'
            strokeLinecap='round'
            strokeDasharray='8 10'
            className='text-primary/65'
          />

          {/* Moving aircraft */}
          <g filter='url(#route-glow)'>
            <g>
              <Plane
                x='-10'
                y='-10'
                width='20'
                height='20'
                className='fill-background text-foreground'
              />

              <animateMotion dur='7s' repeatCount='indefinite' rotate='auto'>
                <mpath href='#aeropass-flight-route' />
              </animateMotion>
            </g>
          </g>

          {/* Mid-route pulse */}
          <circle cx='470' cy='235' r='4' className='fill-primary'>
            <animate
              attributeName='r'
              values='3;7;3'
              dur='2.4s'
              repeatCount='indefinite'
            />

            <animate
              attributeName='opacity'
              values='0.35;1;0.35'
              dur='2.4s'
              repeatCount='indefinite'
            />
          </circle>
        </svg>

        {/* Origin marker */}
        <div className='absolute bottom-[21%] left-[8%]'>
          <div className='relative'>
            <div className='flex size-11 items-center justify-center rounded-full border-4 border-background bg-primary text-primary-foreground shadow-lg'>
              <CircleDot className='size-4' />
            </div>

            <span className='absolute inset-0 rounded-full border border-primary/30 route-origin-pulse' />
          </div>

          <div className='mt-2 rounded-lg border border-border bg-background/95 px-3 py-2 shadow-sm backdrop-blur'>
            <p className='text-xs font-semibold'>{originCode}</p>

            <p className='text-[10px] text-muted-foreground'>{originCity}</p>
          </div>
        </div>

        {/* Destination marker */}
        <div className='absolute right-[7%] top-[14%]'>
          <div className='relative flex size-11 items-center justify-center rounded-full border-4 border-background bg-primary text-primary-foreground shadow-lg'>
            <MapPin className='size-4' />

            <span className='absolute inset-0 rounded-full border border-primary/30 route-destination-pulse' />
          </div>

          <div className='absolute right-0 top-full mt-2 rounded-lg border border-border bg-background/95 px-3 py-2 text-right shadow-sm backdrop-blur'>
            <p className='text-xs font-semibold'>{destinationCode}</p>

            <p className='text-[10px] text-muted-foreground'>
              {destinationCity}
            </p>
          </div>
        </div>

        {/* Top route header */}
        <div className='absolute left-4 right-4 top-4 flex items-start justify-between gap-3'>
          <div className='rounded-xl border border-border bg-background/95 px-4 py-3 shadow-sm backdrop-blur'>
            <div className='flex items-center gap-2'>
              <span className='size-1.5 rounded-full bg-primary' />

              <p className='text-sm font-semibold'>
                {originCode} → {destinationCode}
              </p>
            </div>

            <p className='mt-1 text-xs text-muted-foreground'>
              {route.route.distanceKm.toLocaleString()} km
              {' · '}
              {formatDuration(route.route.durationMinutes)}
            </p>
          </div>

          <div className='rounded-lg border border-border bg-background/95 px-3 py-2 text-xs font-medium shadow-sm backdrop-blur'>
            {route.route.status}
          </div>
        </div>
      </div>

      {/* Route information footer */}
      <div className='border-t border-border bg-card'>
        <div className='grid gap-0 sm:grid-cols-[1fr_auto_1fr] sm:items-center'>
          {/* Origin */}
          <div className='p-5'>
            <p className='text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground'>
              Origin
            </p>

            <div className='mt-2 flex items-baseline gap-2'>
              <span className='text-lg font-semibold tracking-tight'>
                {originCode}
              </span>

              <span className='text-sm text-muted-foreground'>
                {originCity}
              </span>
            </div>

            <p className='mt-1 text-xs text-muted-foreground'>
              {route.origin?.name ?? 'Airport unavailable'}
            </p>
          </div>

          {/* Center metrics */}
          <div className='border-y border-border px-5 py-4 sm:border-y-0 sm:border-x'>
            <div className='flex items-center justify-center gap-5'>
              <div className='text-center'>
                <p className='text-[10px] uppercase tracking-wide text-muted-foreground'>
                  Distance
                </p>

                <p className='mt-1 text-sm font-semibold'>
                  {route.route.distanceKm.toLocaleString()} km
                </p>
              </div>

              <div className='h-8 w-px bg-border' />

              <div className='text-center'>
                <p className='text-[10px] uppercase tracking-wide text-muted-foreground'>
                  Duration
                </p>

                <p className='mt-1 text-sm font-semibold'>
                  {formatDuration(route.route.durationMinutes)}
                </p>
              </div>

              <div className='h-8 w-px bg-border' />

              <div className='text-center'>
                <p className='text-[10px] uppercase tracking-wide text-muted-foreground'>
                  Flights
                </p>

                <p className='mt-1 text-sm font-semibold'>
                  {route.flights.length}
                </p>
              </div>
            </div>
          </div>

          {/* Destination */}
          <div className='p-5 sm:text-right'>
            <p className='text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground'>
              Destination
            </p>

            <div className='mt-2 flex items-baseline gap-2 sm:justify-end'>
              <span className='text-lg font-semibold tracking-tight'>
                {destinationCode}
              </span>

              <span className='text-sm text-muted-foreground'>
                {destinationCity}
              </span>
            </div>

            <p className='mt-1 text-xs text-muted-foreground'>
              {route.destination?.name ?? 'Airport unavailable'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
