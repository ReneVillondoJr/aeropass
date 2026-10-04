import {
  Activity,
  Armchair,
  CalendarClock,
  CalendarDays,
  Clock3,
  Factory,
  Gauge,
  MapPin,
  Plane,
  PlaneLanding,
  PlaneTakeoff,
  Settings2,
  ShieldCheck,
  Users,
  Wrench,
} from 'lucide-react';

import { aircraftStatusMeta } from '../data/aircraft';

import type { AircraftViewModel } from '../types/aircraft';

import { AircraftSeatLayout } from './seat-layout';

interface AircraftDetailProps {
  aircraft: AircraftViewModel | null;
}

export function AircraftDetail({ aircraft: item }: AircraftDetailProps) {
  if (!item) {
    return (
      <aside className='rounded-2xl border border-dashed border-border bg-background p-8 text-center'>
        <div className='mx-auto flex size-12 items-center justify-center rounded-full bg-muted'>
          <Plane className='size-5 text-muted-foreground' />
        </div>

        <h2 className='mt-4 text-sm font-semibold'>No aircraft selected</h2>

        <p className='mt-1 text-xs leading-5 text-muted-foreground'>
          Select an aircraft from the fleet roster to view its operational
          profile.
        </p>
      </aside>
    );
  }

  const aircraft = item.aircraft;

  const status = aircraftStatusMeta[aircraft.status];

  return (
    <aside className='min-w-0 space-y-4'>
      {/* Hero */}
      <section className='overflow-hidden rounded-2xl border border-[#102A43] bg-[#102A43] text-white shadow-sm'>
        <div className='relative p-5'>
          <div className='absolute -right-12 -top-12 size-36 rounded-full bg-[#5BA9D6]/10 blur-2xl' />

          <div className='relative'>
            <div className='flex items-start justify-between gap-4'>
              <div className='flex min-w-0 items-start gap-3'>
                <div className='flex size-11 shrink-0 items-center justify-center rounded-xl bg-white/10'>
                  <Plane className='size-5 text-[#B9E4F8]' />
                </div>

                <div className='min-w-0'>
                  <p className='truncate text-lg font-semibold tracking-tight'>
                    {aircraft.model}
                  </p>

                  <p className='mt-1 break-words text-xs text-white/55'>
                    {aircraft.manufacturer}
                  </p>
                </div>
              </div>

              <span
                className={[
                  'shrink-0 rounded-full px-2.5 py-1 text-[10px] font-semibold',
                  status.className,
                ].join(' ')}
              >
                {status.label}
              </span>
            </div>

            <div className='mt-5 rounded-xl border border-white/10 bg-white/[0.05] p-3'>
              <p className='text-[10px] uppercase tracking-[0.1em] text-white/40'>
                Registration
              </p>

              <p className='mt-1 text-base font-semibold tabular-nums'>
                {aircraft.registrationNumber}
              </p>
            </div>

            <div className='mt-4 grid grid-cols-2 gap-2'>
              <DarkMetric label='Seats' value={aircraft.totalSeats} />

              <DarkMetric label='Flights' value={item.flights.length} />

              <DarkMetric
                label='Schedules'
                value={item.activeSchedules.length}
              />

              <DarkMetric label='Load factor' value={`${item.loadFactor}%`} />
            </div>
          </div>
        </div>
      </section>

      {/* Profile */}
      <section className='rounded-2xl border border-border/70 bg-background p-5 shadow-sm'>
        <SectionHeading
          icon={<Settings2 className='size-4' />}
          title='Aircraft profile'
        />

        <div className='mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-1'>
          <InfoItem
            icon={<Factory className='size-3.5' />}
            label='Manufacturer'
            value={aircraft.manufacturer}
          />

          <InfoItem
            icon={<Plane className='size-3.5' />}
            label='Aircraft model'
            value={aircraft.model}
          />

          <InfoItem
            icon={<CalendarDays className='size-3.5' />}
            label='Year manufactured'
            value={aircraft.yearOfManufacture}
          />

          <InfoItem
            icon={<Clock3 className='size-3.5' />}
            label='Years in service'
            value={`${item.yearsInService} ${
              item.yearsInService === 1 ? 'year' : 'years'
            }`}
          />

          <InfoItem
            icon={<Users className='size-3.5' />}
            label='Configured capacity'
            value={`${aircraft.totalSeats} seats`}
          />

          <InfoItem
            icon={<ShieldCheck className='size-3.5' />}
            label='Operational state'
            value={status.description}
          />
        </div>
      </section>

      {/* Seat summary */}
      <section className='rounded-2xl border border-border/70 bg-background p-5 shadow-sm'>
        <SectionHeading
          icon={<Armchair className='size-4' />}
          title='Seat configuration'
        />

        <div className='mt-4 grid grid-cols-2 gap-3'>
          <SummaryCard
            label='Available'
            value={item.availableSeats}
            icon={<Activity className='size-3.5' />}
          />

          <SummaryCard
            label='Blocked'
            value={item.blockedSeats}
            icon={<Wrench className='size-3.5' />}
          />

          <SummaryCard
            label='Business'
            value={item.businessSeats}
            icon={<Gauge className='size-3.5' />}
          />

          <SummaryCard
            label='Economy'
            value={item.economySeats}
            icon={<Users className='size-3.5' />}
          />
        </div>
      </section>

      {/* Routes */}
      <section className='rounded-2xl border border-border/70 bg-background p-5 shadow-sm'>
        <div className='flex items-center justify-between gap-3'>
          <SectionHeading
            icon={<MapPin className='size-4' />}
            title='Assigned routes'
          />

          <span className='shrink-0 rounded-full bg-[#EEF7FB] px-2.5 py-1 text-[10px] font-semibold text-[#102A43]'>
            {item.routes.length} {item.routes.length === 1 ? 'route' : 'routes'}
          </span>
        </div>

        <div className='mt-4 space-y-3'>
          {item.routes.length > 0 ?
            item.routes.map((route) => (
              <div
                key={route.route.id}
                className='min-w-0 rounded-xl border border-border/60 bg-muted/20 p-3.5'
              >
                <div className='flex min-w-0 items-center gap-2'>
                  <div className='min-w-0 flex-1'>
                    <div className='flex min-w-0 items-center gap-2'>
                      <span className='text-sm font-semibold'>
                        {route.origin.code}
                      </span>

                      <Plane className='size-3 shrink-0 text-[#5BA9D6]' />

                      <span className='text-sm font-semibold'>
                        {route.destination.code}
                      </span>
                    </div>

                    <p className='mt-1 truncate text-xs text-muted-foreground'>
                      {route.origin.city} → {route.destination.city}
                    </p>
                  </div>

                  <span className='shrink-0 text-[10px] tabular-nums text-muted-foreground'>
                    {route.route.distanceKm} km
                  </span>
                </div>

                <div className='mt-3 flex flex-wrap gap-1.5'>
                  {route.schedules.map((schedule) => (
                    <span
                      key={schedule.id}
                      className='rounded-full border border-border/70 bg-background px-2 py-1 text-[9px] font-semibold tabular-nums'
                    >
                      {schedule.flightNumber} · {schedule.departureTime}
                    </span>
                  ))}
                </div>
              </div>
            ))
          : <p className='py-4 text-center text-xs text-muted-foreground'>
              No route assignments.
            </p>
          }
        </div>
      </section>

      {/* Flight activity */}
      <section className='rounded-2xl border border-border/70 bg-background p-5 shadow-sm'>
        <SectionHeading
          icon={<Activity className='size-4' />}
          title='Flight activity'
        />

        <div className='mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-1'>
          {item.flights.length > 0 ?
            item.flights.map((flight) => (
              <FlightActivity key={flight.id} flight={flight} item={item} />
            ))
          : <p className='py-4 text-center text-xs text-muted-foreground'>
              No flight instances assigned.
            </p>
          }
        </div>
      </section>

      {/* Seat layout */}
      <AircraftSeatLayout seats={item.seats} />
    </aside>
  );
}

function SectionHeading({
  icon,
  title,
}: {
  icon: React.ReactNode;
  title: string;
}) {
  return (
    <div className='flex items-center gap-2'>
      <div className='flex size-7 items-center justify-center rounded-lg bg-[#EEF7FB] text-[#102A43]'>
        {icon}
      </div>

      <h2 className='text-sm font-semibold'>{title}</h2>
    </div>
  );
}

function DarkMetric({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className='rounded-xl border border-white/10 bg-white/[0.05] p-3'>
      <p className='text-[9px] uppercase tracking-[0.09em] text-white/40'>
        {label}
      </p>

      <p className='mt-1.5 text-sm font-semibold tabular-nums text-white'>
        {value}
      </p>
    </div>
  );
}

function InfoItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}) {
  return (
    <div className='flex min-w-0 items-start gap-3 rounded-xl border border-border/60 bg-muted/10 p-3'>
      <div className='mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg bg-[#EEF7FB] text-[#102A43]'>
        {icon}
      </div>

      <div className='min-w-0'>
        <p className='text-[10px] font-medium uppercase tracking-[0.07em] text-muted-foreground'>
          {label}
        </p>

        <p className='mt-1 break-words text-sm font-medium text-foreground'>
          {value}
        </p>
      </div>
    </div>
  );
}

function SummaryCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
}) {
  return (
    <div className='rounded-xl border border-border/60 bg-muted/10 p-3'>
      <div className='flex items-center gap-2 text-muted-foreground'>
        {icon}

        <span className='text-[10px] font-medium uppercase tracking-[0.06em]'>
          {label}
        </span>
      </div>

      <p className='mt-1.5 text-base font-semibold tabular-nums'>{value}</p>
    </div>
  );
}

function FlightActivity({
  flight,
}: {
  flight: {
    id: string;
    flightNumber: string;
    departureDate: string;
    departureTime: string;
    arrivalTime: string;
    status: string;
    seatsAvailable: number;
    capacity: number;
    gate: string;
    terminal: string;
  };
  item: AircraftViewModel;
}) {
  const occupied = flight.capacity - flight.seatsAvailable;

  const flightLoad =
    flight.capacity > 0 ? Math.round((occupied / flight.capacity) * 100) : 0;

  return (
    <div className='min-w-0 rounded-xl border border-border/60 bg-muted/10 p-3.5'>
      <div className='flex min-w-0 items-start justify-between gap-3'>
        <div className='min-w-0'>
          <div className='flex items-center gap-2'>
            <span className='text-sm font-semibold tabular-nums'>
              {flight.flightNumber}
            </span>

            <span className='rounded-full bg-background px-2 py-1 text-[9px] font-semibold'>
              {flight.status.replace('_', ' ')}
            </span>
          </div>

          <p className='mt-1 text-xs text-muted-foreground'>
            {flight.departureDate}
          </p>
        </div>

        <span className='shrink-0 text-sm font-semibold tabular-nums'>
          {flightLoad}%
        </span>
      </div>

      <div className='mt-3 grid grid-cols-2 gap-2'>
        <ActivityMetric
          icon={<PlaneTakeoff className='size-3.5' />}
          label='Departure'
          value={flight.departureTime}
        />

        <ActivityMetric
          icon={<PlaneLanding className='size-3.5' />}
          label='Arrival'
          value={flight.arrivalTime}
        />

        <ActivityMetric
          icon={<MapPin className='size-3.5' />}
          label='Gate'
          value={flight.gate}
        />

        <ActivityMetric
          icon={<Settings2 className='size-3.5' />}
          label='Terminal'
          value={flight.terminal}
        />
      </div>
    </div>
  );
}

function ActivityMetric({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className='min-w-0 rounded-lg border border-border/50 bg-background p-2.5'>
      <div className='flex items-center gap-1.5 text-muted-foreground'>
        {icon}

        <span className='truncate text-[9px] uppercase tracking-[0.05em]'>
          {label}
        </span>
      </div>

      <p className='mt-1 truncate text-xs font-semibold tabular-nums'>
        {value}
      </p>
    </div>
  );
}
