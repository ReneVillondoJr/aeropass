'use client';

import {
  Accessibility,
  ChevronRight,
  Plane,
  ScanLine,
  TicketCheck,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';

import type { CheckInViewModel } from '../types/check-in';

interface CheckInRowProps {
  checkIn: CheckInViewModel;
  selected: boolean;
  onSelect: (id: string) => void;
}

function formatStatus(value: string) {
  return value
    .toLowerCase()
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function getInitials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join('');
}

function getStatusClasses(status: CheckInViewModel['status']) {
  switch (status) {
    case 'COMPLETED':
      return 'border-emerald-200 bg-emerald-50 text-emerald-700';

    case 'NOT_CHECKED_IN':
      return 'border-amber-200 bg-amber-50 text-amber-700';

    case 'CANCELLED':
      return 'border-rose-200 bg-rose-50 text-rose-700';

    default:
      return 'border-border/70 bg-muted/40 text-muted-foreground';
  }
}

export function CheckInRow({ checkIn, selected, onSelect }: CheckInRowProps) {
  return (
    <button
      type='button'
      onClick={() => onSelect(checkIn.id)}
      className={[
        'group w-full rounded-2xl border p-4 text-left transition-all',
        selected ?
          'border-[#5BA9D6]/50 bg-[#E5F5FC]/60 shadow-sm'
        : 'border-border/70 bg-background hover:border-[#5BA9D6]/40 hover:bg-muted/30',
      ].join(' ')}
    >
      <div className='flex min-w-0 items-start gap-3'>
        <div
          className={[
            'flex size-10 shrink-0 items-center justify-center rounded-xl text-xs font-semibold',
            selected ?
              'bg-[#5BA9D6] text-white'
            : 'bg-[#E5F5FC] text-[#356D91]',
          ].join(' ')}
        >
          {getInitials(checkIn.passengerName)}
        </div>

        <div className='min-w-0 flex-1'>
          <div className='flex min-w-0 flex-col gap-2 sm:flex-row sm:items-start sm:justify-between'>
            <div className='min-w-0'>
              <div className='flex flex-wrap items-center gap-2'>
                <p className='truncate text-sm font-semibold text-foreground'>
                  {checkIn.passengerName}
                </p>

                {checkIn.specialAssistance ?
                  <span className='inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-[9px] font-medium text-amber-700'>
                    <Accessibility className='size-3' />
                    Assistance
                  </span>
                : null}
              </div>

              <p className='mt-0.5 truncate text-[11px] text-muted-foreground'>
                {checkIn.ticketNumber ?? 'No ticket number'}
              </p>
            </div>

            <Badge
              variant='outline'
              className={`w-fit shrink-0 text-[9px] font-medium ${getStatusClasses(
                checkIn.status,
              )}`}
            >
              {formatStatus(checkIn.status)}
            </Badge>
          </div>

          <div className='mt-3 grid gap-2 text-[10px] text-muted-foreground sm:grid-cols-3'>
            <div className='flex min-w-0 items-center gap-1.5'>
              <TicketCheck className='size-3.5 shrink-0' />

              <span className='truncate font-medium text-foreground'>
                {checkIn.bookingReference ?? 'No booking'}
              </span>
            </div>

            <div className='flex min-w-0 items-center gap-1.5'>
              <Plane className='size-3.5 shrink-0' />

              <span className='truncate'>
                {checkIn.flightNumber ?
                  `${checkIn.flightNumber} · ${checkIn.originCode ?? '—'} → ${checkIn.destinationCode ?? '—'}`
                : 'Flight unavailable'}
              </span>
            </div>

            <div className='flex min-w-0 items-center gap-1.5'>
              <ScanLine className='size-3.5 shrink-0' />

              <span className='truncate'>
                {checkIn.checkInMethod ?? 'No method'}
              </span>
            </div>
          </div>

          <div className='mt-3 flex flex-wrap items-center gap-2'>
            <span className='rounded-full border border-border/60 bg-muted/20 px-2 py-1 text-[9px] text-muted-foreground'>
              Seat:{' '}
              <span className='font-medium text-foreground'>
                {checkIn.seatNumber ?? 'Unassigned'}
              </span>
            </span>

            <span className='rounded-full border border-border/60 bg-muted/20 px-2 py-1 text-[9px] text-muted-foreground'>
              Boarding:{' '}
              <span className='font-medium text-foreground'>
                {checkIn.boardingStatus ?? 'Not boarded'}
              </span>
            </span>

            {checkIn.gate ?
              <span className='rounded-full border border-border/60 bg-muted/20 px-2 py-1 text-[9px] text-muted-foreground'>
                Gate:{' '}
                <span className='font-medium text-foreground'>
                  {checkIn.gate}
                </span>
              </span>
            : null}
          </div>
        </div>

        <ChevronRight
          className={[
            'mt-3 size-4 shrink-0 transition-transform',
            selected ? 'text-[#5BA9D6]' : (
              'text-muted-foreground/50 group-hover:translate-x-0.5 group-hover:text-foreground'
            ),
          ].join(' ')}
        />
      </div>
    </button>
  );
}
