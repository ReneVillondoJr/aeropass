'use client';

import { Accessibility, ChevronRight, Mail, Plane, Ticket } from 'lucide-react';

import { Badge } from '@/components/ui/badge';

import type { PassengerViewModel } from '../types/passenger';

interface PassengerRowProps {
  passenger: PassengerViewModel;
  selected: boolean;
  onSelect: (id: string) => void;
}

function getInitials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join('');
}

function getStatusClasses(status: string | null) {
  switch (status) {
    case 'Confirmed':
      return 'border-emerald-200 bg-emerald-50 text-emerald-700';

    case 'Checked In':
      return 'border-sky-200 bg-sky-50 text-sky-700';

    case 'Completed':
      return 'border-slate-200 bg-slate-50 text-slate-700';

    case 'Pending Payment':
      return 'border-amber-200 bg-amber-50 text-amber-700';

    case 'Cancelled':
      return 'border-rose-200 bg-rose-50 text-rose-700';

    case 'Refund Pending':
    case 'Refunded':
      return 'border-violet-200 bg-violet-50 text-violet-700';

    default:
      return 'border-border/70 bg-muted/40 text-muted-foreground';
  }
}

export function PassengerRow({
  passenger,
  selected,
  onSelect,
}: PassengerRowProps) {
  return (
    <button
      type='button'
      onClick={() => onSelect(passenger.id)}
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
          {getInitials(passenger.fullName)}
        </div>

        <div className='min-w-0 flex-1'>
          <div className='flex min-w-0 flex-col gap-2 sm:flex-row sm:items-start sm:justify-between'>
            <div className='min-w-0'>
              <div className='flex flex-wrap items-center gap-2'>
                <p className='truncate text-sm font-semibold text-foreground'>
                  {passenger.fullName}
                </p>

                {passenger.specialAssistance ?
                  <span className='inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-[9px] font-medium text-amber-700'>
                    <Accessibility className='size-3' />
                    Assistance
                  </span>
                : null}
              </div>

              <p className='mt-0.5 truncate text-[11px] text-muted-foreground'>
                {passenger.email}
              </p>
            </div>

            <Badge
              variant='outline'
              className={`w-fit shrink-0 text-[9px] font-medium ${getStatusClasses(
                passenger.bookingStatus ?
                  passenger.bookingStatus
                    .toLowerCase()
                    .split('_')
                    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
                    .join(' ')
                : null,
              )}`}
            >
              {passenger.bookingStatus ?
                passenger.bookingStatus
                  .toLowerCase()
                  .split('_')
                  .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
                  .join(' ')
              : 'No booking'}
            </Badge>
          </div>

          <div className='mt-3 grid gap-2 text-[10px] text-muted-foreground sm:grid-cols-3'>
            <div className='flex min-w-0 items-center gap-1.5'>
              <Ticket className='size-3.5 shrink-0' />
              <span className='truncate font-medium text-foreground'>
                {passenger.bookingReference}
              </span>
            </div>

            <div className='flex min-w-0 items-center gap-1.5'>
              <Plane className='size-3.5 shrink-0' />
              <span className='truncate'>
                {passenger.flightNumber ?
                  `${passenger.flightNumber} · ${passenger.originCode ?? '—'} → ${passenger.destinationCode ?? '—'}`
                : 'Flight unavailable'}
              </span>
            </div>

            <div className='flex min-w-0 items-center gap-1.5'>
              <Mail className='size-3.5 shrink-0' />
              <span className='truncate'>{passenger.phone}</span>
            </div>
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
