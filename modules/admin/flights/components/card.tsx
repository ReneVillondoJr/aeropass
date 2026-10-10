import {
  ArrowRight,
  Clock3,
  DoorOpen,
  PlaneTakeoff,
  Users,
} from 'lucide-react';

import type { FlightListItem } from '../types/flights';

interface FlightCardProps {
  flight: FlightListItem;
  selected: boolean;
  onSelect: () => void;
}

const statusStyles: Record<FlightListItem['status'], string> = {
  SCHEDULED: 'bg-slate-100 text-slate-600',
  CHECK_IN_OPEN: 'bg-sky-50 text-sky-700',
  BOARDING: 'bg-amber-50 text-amber-700',
  DEPARTED: 'bg-emerald-50 text-emerald-700',
  ARRIVED: 'bg-slate-100 text-slate-500',
  DELAYED: 'bg-orange-50 text-orange-700',
  CANCELLED: 'bg-red-50 text-red-700',
};

function formatStatus(status: FlightListItem['status']) {
  return status
    .toLowerCase()
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export function FlightCard({ flight, selected, onSelect }: FlightCardProps) {
  const occupancy =
    flight.capacity > 0 ?
      Math.round(
        ((flight.capacity - flight.seatsAvailable) / flight.capacity) * 100,
      )
    : 0;

  return (
    <button
      type='button'
      onClick={onSelect}
      className={`w-full rounded-2xl border p-5 text-left transition-all ${
        selected ?
          'border-primary bg-primary/[0.025] shadow-sm'
        : 'border-border bg-card hover:border-primary/30 hover:shadow-sm'
      }`}
    >
      <div className='flex items-start justify-between gap-4'>
        <div className='min-w-0'>
          <div className='flex items-center gap-2'>
            <span className='font-semibold tracking-tight'>
              {flight.flightNumber}
            </span>

            <span
              className={`rounded-full px-2 py-1 text-[10px] font-semibold uppercase tracking-wide ${statusStyles[flight.status]}`}
            >
              {formatStatus(flight.status)}
            </span>
          </div>

          <p className='mt-1 text-xs text-muted-foreground'>
            {flight.departureDate}
          </p>
        </div>

        <PlaneTakeoff className='size-4 shrink-0 text-muted-foreground' />
      </div>

      <div className='mt-5 flex items-center gap-3'>
        <div>
          <p className='text-xl font-semibold tracking-tight'>
            {flight.originCode}
          </p>

          <p className='mt-0.5 text-xs text-muted-foreground'>
            {flight.departureTime}
          </p>
        </div>

        <div className='flex flex-1 items-center gap-2'>
          <div className='h-px flex-1 bg-border' />

          <ArrowRight className='size-3.5 text-muted-foreground' />

          <div className='h-px flex-1 bg-border' />
        </div>

        <div className='text-right'>
          <p className='text-xl font-semibold tracking-tight'>
            {flight.destinationCode}
          </p>

          <p className='mt-0.5 text-xs text-muted-foreground'>
            {flight.arrivalTime}
          </p>
        </div>
      </div>

      <div className='mt-5 grid grid-cols-3 gap-3 border-t border-border pt-4'>
        <div>
          <div className='flex items-center gap-1.5 text-muted-foreground'>
            <DoorOpen className='size-3.5' />

            <span className='text-[10px] uppercase tracking-wide'>Gate</span>
          </div>

          <p className='mt-1 text-sm font-medium'>{flight.gate}</p>
        </div>

        <div>
          <div className='flex items-center gap-1.5 text-muted-foreground'>
            <Clock3 className='size-3.5' />

            <span className='text-[10px] uppercase tracking-wide'>
              Check-in
            </span>
          </div>

          <p className='mt-1 text-sm font-medium'>{flight.checkedInCount}</p>
        </div>

        <div>
          <div className='flex items-center gap-1.5 text-muted-foreground'>
            <Users className='size-3.5' />

            <span className='text-[10px] uppercase tracking-wide'>Seats</span>
          </div>

          <p className='mt-1 text-sm font-medium'>{flight.seatsAvailable}</p>
        </div>
      </div>

      <div className='mt-4'>
        <div className='mb-1.5 flex items-center justify-between'>
          <span className='text-[10px] uppercase tracking-wide text-muted-foreground'>
            Occupancy
          </span>

          <span className='text-[10px] font-medium text-muted-foreground'>
            {occupancy}%
          </span>
        </div>

        <div className='h-1.5 overflow-hidden rounded-full bg-muted'>
          <div
            className='h-full rounded-full bg-primary transition-all'
            style={{
              width: `${occupancy}%`,
            }}
          />
        </div>
      </div>
    </button>
  );
}
