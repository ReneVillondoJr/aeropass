'use client';

import {
  Check,
  CheckCircle2,
  Clock3,
  DoorOpen,
  Plane,
  ScanLine,
  UserRound,
  XCircle,
} from 'lucide-react';

import { getFlightSeatMap, type FlightSeatDisplay } from '@/data/aeropass';

import type { FlightOperations } from '../types/flights';

interface FlightBoardingProps {
  operations: FlightOperations | null;
  flightId?: string | null;
}

const seatColumns = ['A', 'B', 'C', 'D', 'E', 'F'] as const;

function getSeatByNumber(seats: FlightSeatDisplay[], seatNumber: string) {
  return seats.find((item) => item.seat.seatNumber === seatNumber) ?? null;
}

function getSeatStatusLabel(status: FlightSeatDisplay['status']) {
  switch (status) {
    case 'BOARDED':
      return 'Boarded';

    case 'WAITING':
      return 'Waiting';

    case 'DENIED':
      return 'Denied';

    case 'OCCUPIED':
      return 'Occupied';

    default:
      return 'Available';
  }
}

function getSeatClasses(status: FlightSeatDisplay['status']) {
  switch (status) {
    case 'BOARDED':
      return [
        'border-emerald-400/80',
        'bg-emerald-500',
        'text-white',
        'shadow-[0_4px_14px_rgba(16,185,129,0.24)]',
        'boarding-seat-boarded',
      ].join(' ');

    case 'WAITING':
      return [
        'border-amber-300/90',
        'bg-amber-400',
        'text-amber-950',
        'shadow-[0_4px_14px_rgba(245,158,11,0.18)]',
        'boarding-seat-waiting',
      ].join(' ');

    case 'DENIED':
      return [
        'border-red-400/90',
        'bg-red-500',
        'text-white',
        'shadow-[0_4px_14px_rgba(239,68,68,0.18)]',
        'boarding-seat-denied',
      ].join(' ');

    case 'OCCUPIED':
      return ['border-slate-300', 'bg-slate-200', 'text-slate-700'].join(' ');

    case 'AVAILABLE':
    default:
      return [
        'border-slate-200',
        'bg-white',
        'text-slate-400',
        'shadow-sm',
        'hover:border-[#5BA9D6]',
        'hover:bg-[#EAF7FC]',
        'hover:text-[#102A43]',
        'hover:shadow-[0_4px_12px_rgba(91,169,214,0.14)]',
      ].join(' ');
  }
}

function getSeatIcon(status: FlightSeatDisplay['status']) {
  switch (status) {
    case 'BOARDED':
      return <Check className='size-3.5' strokeWidth={3} />;

    case 'WAITING':
      return <Clock3 className='size-3.5' strokeWidth={2.4} />;

    case 'DENIED':
      return <XCircle className='size-3.5' strokeWidth={2.4} />;

    case 'OCCUPIED':
      return <UserRound className='size-3.5' strokeWidth={2} />;

    default:
      return null;
  }
}

function formatBoardedTime(value: string | null) {
  if (!value) {
    return null;
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return new Intl.DateTimeFormat('en-PH', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  }).format(date);
}

function SeatCell({ seat }: { seat: FlightSeatDisplay }) {
  const passengerName = seat.passengerName;
  const boardedTime = formatBoardedTime(seat.boardedAt);

  return (
    <div className='group relative flex justify-center'>
      <div
        aria-label={`${seat.seat.seatNumber}: ${getSeatStatusLabel(
          seat.status,
        )}`}
        className={[
          'relative flex size-9 items-center justify-center rounded-[7px] border text-[9px] font-bold transition-all duration-200',
          'sm:size-10',
          getSeatClasses(seat.status),
        ].join(' ')}
      >
        {/*
         * Small seat-back detail gives the seat a more
         * realistic airline-seat appearance.
         */}
        <span
          className={[
            'pointer-events-none absolute inset-x-1.5 top-1 h-0.5 rounded-full',
            seat.status === 'AVAILABLE' ?
              'bg-slate-200'
            : 'bg-current opacity-20',
          ].join(' ')}
        />

        {getSeatIcon(seat.status) ?? (
          <span className='mt-0.5'>{seat.seat.seatNumber}</span>
        )}

        {seat.status === 'BOARDED' ?
          <span className='absolute -right-1 -top-1 flex size-3 items-center justify-center rounded-full bg-white text-emerald-600 shadow-sm'>
            <Check className='size-2' strokeWidth={3} />
          </span>
        : null}
      </div>

      {passengerName ?
        <div className='pointer-events-none absolute bottom-full left-1/2 z-50 mb-3 w-56 -translate-x-1/2 translate-y-1 opacity-0 transition-all duration-150 group-hover:translate-y-0 group-hover:opacity-100'>
          <div className='overflow-hidden rounded-2xl border border-white/10 bg-[#102A43] text-white shadow-2xl shadow-[#102A43]/20'>
            <div className='border-b border-white/10 px-4 py-3'>
              <div className='flex items-start justify-between gap-3'>
                <div className='min-w-0'>
                  <p className='truncate text-xs font-semibold'>
                    {passengerName}
                  </p>

                  <p className='mt-1 text-[10px] text-white/50'>
                    Seat {seat.seat.seatNumber}
                  </p>
                </div>

                <span
                  className={[
                    'shrink-0 rounded-full px-2 py-1 text-[9px] font-semibold',
                    seat.status === 'BOARDED' ?
                      'bg-emerald-400/15 text-emerald-300'
                    : seat.status === 'WAITING' ?
                      'bg-amber-400/15 text-amber-300'
                    : 'bg-red-400/15 text-red-300',
                  ].join(' ')}
                >
                  {getSeatStatusLabel(seat.status)}
                </span>
              </div>
            </div>

            <div className='space-y-2.5 px-4 py-3'>
              {seat.ticketNumber ?
                <div>
                  <p className='text-[9px] uppercase tracking-[0.14em] text-white/35'>
                    Ticket
                  </p>

                  <p className='mt-1 font-mono text-[10px] text-white/85'>
                    {seat.ticketNumber}
                  </p>
                </div>
              : null}

              {boardedTime ?
                <div>
                  <p className='text-[9px] uppercase tracking-[0.14em] text-white/35'>
                    Boarding scan
                  </p>

                  <p className='mt-1 text-[10px] text-white/85'>
                    {boardedTime}
                  </p>
                </div>
              : null}
            </div>
          </div>
        </div>
      : null}
    </div>
  );
}

function SeatLegend({
  label,
  status,
}: {
  label: string;
  status: FlightSeatDisplay['status'];
}) {
  return (
    <div className='flex items-center gap-2.5'>
      <span
        className={[
          'flex size-3.5 items-center justify-center rounded-[4px] border',
          getSeatClasses(status),
        ].join(' ')}
      />

      <span className='text-[11px] font-medium text-muted-foreground'>
        {label}
      </span>
    </div>
  );
}

function StatCard({
  label,
  value,
  icon,
  emphasis = false,
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
  emphasis?: boolean;
}) {
  return (
    <div
      className={[
        'rounded-2xl border px-4 py-4 transition-colors',
        emphasis ?
          'border-emerald-200/80 bg-emerald-50/60'
        : 'border-border/70 bg-background/70',
      ].join(' ')}
    >
      <div className='flex items-center justify-between gap-3'>
        <span
          className={[
            'flex size-8 items-center justify-center rounded-xl',
            emphasis ?
              'bg-emerald-500 text-white'
            : 'bg-muted text-muted-foreground',
          ].join(' ')}
        >
          {icon}
        </span>

        <span className='text-[9px] font-semibold uppercase tracking-[0.14em] text-muted-foreground'>
          {label}
        </span>
      </div>

      <p className='mt-3 text-2xl font-semibold tracking-tight text-foreground'>
        {value}
      </p>
    </div>
  );
}

function OccupancyRing({ percentage }: { percentage: number }) {
  return (
    <div className='relative size-16 shrink-0'>
      <div
        className='size-full rounded-full'
        style={{
          background: `conic-gradient(#102A43 ${percentage}%, #E5EDF2 ${percentage}% 100%)`,
        }}
      />

      <div className='absolute inset-[5px] flex flex-col items-center justify-center rounded-full bg-card'>
        <span className='text-sm font-semibold tracking-tight'>
          {percentage}%
        </span>

        <span className='text-[8px] uppercase tracking-[0.12em] text-muted-foreground'>
          load
        </span>
      </div>
    </div>
  );
}

export function FlightBoarding({ operations, flightId }: FlightBoardingProps) {
  const operationFlightId =
    (
      operations &&
      typeof operations === 'object' &&
      'flightId' in operations &&
      typeof operations.flightId === 'string'
    ) ?
      operations.flightId
    : null;

  const resolvedFlightId = flightId ?? operationFlightId;

  if (!operations || !resolvedFlightId) {
    return (
      <section className='overflow-hidden rounded-[1.75rem] border border-dashed border-border bg-card'>
        <div className='flex min-h-[360px] flex-col items-center justify-center px-6 text-center'>
          <div className='flex size-14 items-center justify-center rounded-2xl bg-muted'>
            <Plane className='size-6 text-muted-foreground' />
          </div>

          <h3 className='mt-5 text-base font-semibold'>
            Boarding view unavailable
          </h3>

          <p className='mt-2 max-w-md text-xs leading-5 text-muted-foreground'>
            Select a flight to display its aircraft, seat occupancy, and
            passenger boarding status.
          </p>
        </div>
      </section>
    );
  }

  const seatMap = getFlightSeatMap(resolvedFlightId);

  if (!seatMap) {
    return (
      <section className='overflow-hidden rounded-[1.75rem] border border-dashed border-border bg-card'>
        <div className='flex min-h-[360px] flex-col items-center justify-center px-6 text-center'>
          <div className='flex size-14 items-center justify-center rounded-2xl bg-muted'>
            <Plane className='size-6 text-muted-foreground' />
          </div>

          <h3 className='mt-5 text-base font-semibold'>
            Aircraft configuration unavailable
          </h3>

          <p className='mt-2 max-w-md text-xs leading-5 text-muted-foreground'>
            The selected flight does not have a valid aircraft seat
            configuration.
          </p>
        </div>
      </section>
    );
  }

  const rows = Array.from(
    new Set(seatMap.seats.map((item) => item.seat.row)),
  ).sort((a, b) => a - b);

  const boardingProgress =
    seatMap.occupiedSeats > 0 ?
      Math.min(
        Math.round((seatMap.boardedSeats / seatMap.occupiedSeats) * 100),
        100,
      )
    : 0;

  const occupancyPercentage =
    seatMap.totalSeats > 0 ?
      Math.round((seatMap.occupiedSeats / seatMap.totalSeats) * 100)
    : 0;

  const trackedPassengers = seatMap.seats.filter(
    (seat) =>
      seat.passengerId &&
      ['BOARDED', 'WAITING', 'DENIED'].includes(seat.status),
  );

  return (
    <section className='overflow-hidden rounded-[1.75rem] border border-border/70 bg-card shadow-[0_18px_50px_rgba(15,23,42,0.06)]'>
      {/* ---------------------------------------------------------------- */}
      {/* TOP HEADER                                                        */}
      {/* ---------------------------------------------------------------- */}
      <div className='relative overflow-hidden border-b border-border/70'>
        <div className='absolute inset-0 bg-[radial-gradient(circle_at_85%_20%,rgba(91,169,214,0.12),transparent_30%),radial-gradient(circle_at_20%_120%,rgba(16,42,67,0.05),transparent_28%)]' />

        <div className='relative px-5 py-5 sm:px-6 sm:py-6'>
          <div className='flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between'>
            <div className='flex min-w-0 items-start gap-4'>
              <div className='flex size-12 shrink-0 items-center justify-center rounded-2xl bg-[#102A43] text-white shadow-lg shadow-[#102A43]/15'>
                <Plane className='size-5' />
              </div>

              <div className='min-w-0'>
                <div className='flex flex-wrap items-center gap-2'>
                  <h3 className='text-lg font-semibold tracking-tight text-foreground sm:text-xl'>
                    {seatMap.flight.flightNumber}
                  </h3>

                  <span className='rounded-full border border-[#DCE8EF] bg-[#F4F9FC] px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.13em] text-[#102A43]'>
                    Boarding
                  </span>

                  <span className='inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[9px] font-semibold text-emerald-700'>
                    <span className='size-1.5 rounded-full bg-emerald-500' />
                    Live operations
                  </span>
                </div>

                <p className='mt-1 text-xs text-muted-foreground'>
                  {seatMap.aircraft.manufacturer} {seatMap.aircraft.model}
                  <span className='mx-2 text-border'>/</span>
                  {seatMap.aircraft.registrationNumber}
                </p>
              </div>
            </div>

            <div className='flex items-center gap-3'>
              <div className='rounded-xl border border-border/70 bg-background/75 px-3 py-2.5 backdrop-blur-sm'>
                <p className='text-[9px] uppercase tracking-[0.14em] text-muted-foreground'>
                  Gate
                </p>

                <p className='mt-0.5 text-sm font-semibold'>
                  {seatMap.flight.gate}
                </p>
              </div>

              <div className='rounded-xl border border-border/70 bg-background/75 px-3 py-2.5 backdrop-blur-sm'>
                <p className='text-[9px] uppercase tracking-[0.14em] text-muted-foreground'>
                  Terminal
                </p>

                <p className='mt-0.5 text-sm font-semibold'>
                  {seatMap.flight.terminal}
                </p>
              </div>

              <div className='rounded-xl border border-border/70 bg-background/75 px-3 py-2.5 backdrop-blur-sm'>
                <p className='text-[9px] uppercase tracking-[0.14em] text-muted-foreground'>
                  Aircraft
                </p>

                <p className='mt-0.5 text-sm font-semibold'>
                  {seatMap.totalSeats}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* OPERATIONAL SUMMARY                                               */}
      {/* ---------------------------------------------------------------- */}
      <div className='border-b border-border/70 px-5 py-5 sm:px-6'>
        <div className='grid grid-cols-2 gap-3 md:grid-cols-4'>
          <StatCard
            label='Available'
            value={seatMap.availableSeats}
            icon={<Plane className='size-3.5' />}
          />

          <StatCard
            label='Occupied'
            value={seatMap.occupiedSeats}
            icon={<UserRound className='size-3.5' />}
          />

          <StatCard
            label='Boarded'
            value={seatMap.boardedSeats}
            icon={<CheckCircle2 className='size-3.5' />}
            emphasis
          />

          <StatCard
            label='Waiting'
            value={seatMap.waitingSeats}
            icon={<Clock3 className='size-3.5' />}
          />
        </div>

        <div className='mt-4 grid gap-4 lg:grid-cols-[1fr_auto]'>
          <div className='rounded-2xl border border-border/70 bg-background/60 p-4'>
            <div className='flex items-center justify-between gap-4'>
              <div>
                <p className='text-xs font-semibold'>Boarding completion</p>

                <p className='mt-1 text-[11px] leading-5 text-muted-foreground'>
                  {seatMap.boardedSeats} of {seatMap.occupiedSeats} occupied
                  seats have cleared the gate.
                </p>
              </div>

              <span className='text-lg font-semibold tracking-tight'>
                {boardingProgress}%
              </span>
            </div>

            <div className='mt-3 h-2 overflow-hidden rounded-full bg-muted'>
              <div
                className='h-full rounded-full bg-emerald-500 transition-[width] duration-700 ease-out'
                style={{
                  width: `${boardingProgress}%`,
                }}
              />
            </div>
          </div>

          <div className='flex items-center gap-3 rounded-2xl border border-border/70 bg-background/60 p-4'>
            <OccupancyRing percentage={occupancyPercentage} />

            <div>
              <p className='text-xs font-semibold'>Cabin occupancy</p>

              <p className='mt-1 text-[11px] leading-5 text-muted-foreground'>
                {seatMap.occupiedSeats} occupied of {seatMap.totalSeats} total
                seats.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* LEGEND                                                            */}
      {/* ---------------------------------------------------------------- */}
      <div className='flex flex-wrap items-center gap-x-5 gap-y-3 border-b border-border/70 px-5 py-4 sm:px-6'>
        <p className='mr-1 text-[9px] font-semibold uppercase tracking-[0.16em] text-muted-foreground'>
          Seat status
        </p>

        <SeatLegend label='Available' status='AVAILABLE' />

        <SeatLegend label='Occupied' status='OCCUPIED' />

        <SeatLegend label='Boarded' status='BOARDED' />

        <SeatLegend label='Waiting' status='WAITING' />

        <SeatLegend label='Denied' status='DENIED' />
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* AIRCRAFT                                                          */}
      {/* ---------------------------------------------------------------- */}
      <div className='bg-[#F5F9FB] px-3 py-7 sm:px-6 sm:py-9'>
        <div className='mx-auto w-full max-w-4xl'>
          <div className='overflow-hidden rounded-[2.25rem] border border-[#D5E2E9] bg-white shadow-[0_20px_55px_rgba(15,23,42,0.07)]'>
            {/* Nose */}
            <div className='relative mx-auto flex w-[210px] flex-col items-center rounded-b-[1.5rem] border-x border-[#D5E2E9] bg-white px-6 pb-5 pt-7'>
              <div className='absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#D5E2E9] to-transparent' />

              <div className='flex size-9 items-center justify-center rounded-xl bg-[#EEF7FB] text-[#102A43]'>
                <Plane className='size-4 rotate-90' />
              </div>

              <p className='mt-3 text-[9px] font-semibold uppercase tracking-[0.18em] text-muted-foreground'>
                Cockpit
              </p>
            </div>

            {/* Cabin shell */}
            <div className='relative mx-3 overflow-hidden rounded-[1.75rem] border border-[#DCE7ED] bg-[#FBFDFE] px-3 py-5 shadow-inner sm:mx-5 sm:px-6'>
              {/* Decorative center rail */}
              <div className='pointer-events-none absolute bottom-5 left-1/2 top-16 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-[#D9E5EB] to-transparent' />

              {/* Cabin header */}
              <div className='mb-5 flex items-center justify-between gap-3'>
                <div className='flex items-center gap-2'>
                  <div className='flex size-7 items-center justify-center rounded-lg bg-[#102A43] text-white'>
                    <ScanLine className='size-3.5' />
                  </div>

                  <div>
                    <p className='text-[10px] font-semibold uppercase tracking-[0.16em]'>
                      Passenger cabin
                    </p>

                    <p className='mt-0.5 text-[9px] text-muted-foreground'>
                      {seatMap.totalSeats} configured seats
                    </p>
                  </div>
                </div>

                <div className='flex items-center gap-1.5 rounded-full border border-[#DCE8EF] bg-white px-2.5 py-1.5'>
                  <DoorOpen className='size-3 text-[#5BA9D6]' />

                  <span className='text-[9px] font-semibold text-[#102A43]'>
                    Gate {seatMap.flight.gate}
                  </span>
                </div>
              </div>

              {/* Column labels */}
              <div className='mb-2 grid grid-cols-[28px_repeat(6,minmax(0,1fr))] gap-2 sm:grid-cols-[34px_repeat(6,minmax(0,1fr))] sm:gap-2.5'>
                <div />

                {seatColumns.map((column) => (
                  <div
                    key={column}
                    className='text-center text-[9px] font-semibold uppercase tracking-[0.18em] text-muted-foreground'
                  >
                    {column}
                  </div>
                ))}
              </div>

              {/* Rows */}
              <div className='max-h-230 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent'>
                <div className='space-y-2'>
                  {rows.map((rowNumber) => (
                    <div
                      key={rowNumber}
                      className='grid grid-cols-[28px_repeat(6,minmax(0,1fr))] items-center gap-2 sm:grid-cols-[34px_repeat(6,minmax(0,1fr))] sm:gap-2.5'
                    >
                      <div className='flex justify-end pr-1'>
                        <span className='text-[8px] font-medium tabular-nums text-muted-foreground'>
                          {rowNumber}
                        </span>
                      </div>

                      {seatColumns.map((column, index) => {
                        const seat = getSeatByNumber(
                          seatMap.seats,
                          `${rowNumber}${column}`,
                        );

                        return (
                          <div
                            key={`${rowNumber}-${column}`}
                            className={[
                              'relative flex justify-center',
                              index === 3 ? 'ml-2 sm:ml-4' : '',
                            ].join(' ')}
                          >
                            {seat ?
                              <SeatCell seat={seat} />
                            : <div className='size-9 sm:size-10' />}
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>

              {/* Emergency / rear labels */}
              <div className='mt-5 flex items-center justify-between border-t border-dashed border-[#DCE7ED] pt-4'>
                <div className='flex items-center gap-2'>
                  <span className='size-1.5 rounded-full bg-[#5BA9D6]' />

                  <span className='text-[8px] font-semibold uppercase tracking-[0.16em] text-muted-foreground'>
                    Forward cabin
                  </span>
                </div>

                <div className='h-px flex-1 bg-[#E2EBF0]' />

                <div className='flex items-center gap-2'>
                  <span className='text-[8px] font-semibold uppercase tracking-[0.16em] text-muted-foreground'>
                    Rear cabin
                  </span>

                  <span className='size-1.5 rounded-full bg-[#5BA9D6]' />
                </div>
              </div>
            </div>

            {/* Tail */}
            <div className='relative mx-auto w-[225px] rounded-t-[2.75rem] border-x border-t border-[#D5E2E9] bg-white px-6 pb-5 pt-4'>
              <div className='mx-auto h-1 w-16 rounded-full bg-[#DCE7ED]' />

              <p className='mt-3 text-center text-[8px] font-semibold uppercase tracking-[0.17em] text-muted-foreground'>
                Rear exit
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* PASSENGER ACTIVITY                                               */}
      {/* ---------------------------------------------------------------- */}
      <div className='border-t border-border/70'>
        <div className='flex flex-col gap-3 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6'>
          <div>
            <div className='flex items-center gap-2'>
              <div className='flex size-8 items-center justify-center rounded-xl bg-[#EEF7FB] text-[#102A43]'>
                <UserRound className='size-3.5' />
              </div>

              <h4 className='text-sm font-semibold'>Boarding activity</h4>
            </div>

            <p className='mt-1.5 text-[11px] leading-5 text-muted-foreground'>
              Passenger-level status from current boarding records.
            </p>
          </div>

          <div className='flex items-center gap-2 self-start rounded-xl border border-border/70 bg-background/70 px-3 py-2 sm:self-auto'>
            <span className='size-1.5 rounded-full bg-emerald-500' />

            <span className='text-[10px] font-semibold'>
              {trackedPassengers.length} tracked
            </span>
          </div>
        </div>

        {trackedPassengers.length > 0 ?
          <div className='grid border-t border-border/70 md:grid-cols-2'>
            {trackedPassengers.map((seat) => (
              <div
                key={seat.seat.id}
                className='flex items-center justify-between gap-4 border-b border-border/70 px-5 py-4 transition-colors hover:bg-muted/20 last:border-b-0 md:px-6 md:odd:border-r boarding-passenger-row'
              >
                <div className='flex min-w-0 items-center gap-3'>
                  <div
                    className={[
                      'flex size-9 shrink-0 items-center justify-center rounded-xl',
                      seat.status === 'BOARDED' ?
                        'bg-emerald-50 text-emerald-600'
                      : seat.status === 'WAITING' ? 'bg-amber-50 text-amber-600'
                      : 'bg-red-50 text-red-600',
                    ].join(' ')}
                  >
                    {seat.status === 'BOARDED' ?
                      <CheckCircle2 className='size-4' />
                    : seat.status === 'WAITING' ?
                      <Clock3 className='size-4' />
                    : <XCircle className='size-4' />}
                  </div>

                  <div className='min-w-0'>
                    <p className='truncate text-xs font-semibold'>
                      {seat.passengerName}
                    </p>

                    <p className='mt-0.5 text-[10px] text-muted-foreground'>
                      Seat {seat.seat.seatNumber}
                      {seat.ticketNumber ? ` · ${seat.ticketNumber}` : ''}
                    </p>
                  </div>
                </div>

                <div className='shrink-0 text-right'>
                  <span
                    className={[
                      'inline-flex rounded-full px-2.5 py-1 text-[9px] font-semibold',
                      seat.status === 'BOARDED' ?
                        'bg-emerald-50 text-emerald-700'
                      : seat.status === 'WAITING' ? 'bg-amber-50 text-amber-700'
                      : 'bg-red-50 text-red-700',
                    ].join(' ')}
                  >
                    {getSeatStatusLabel(seat.status)}
                  </span>

                  {seat.boardedAt ?
                    <p className='mt-1 text-[9px] text-muted-foreground'>
                      {formatBoardedTime(seat.boardedAt)}
                    </p>
                  : null}
                </div>
              </div>
            ))}
          </div>
        : <div className='border-t border-border/70 px-5 py-10 text-center sm:px-6'>
            <div className='mx-auto flex size-10 items-center justify-center rounded-xl bg-muted'>
              <UserRound className='size-4 text-muted-foreground' />
            </div>

            <p className='mt-3 text-sm font-medium'>
              No tracked boarding records
            </p>

            <p className='mx-auto mt-1 max-w-md text-[11px] leading-5 text-muted-foreground'>
              Seat occupancy is still displayed from the flight manifest, while
              passenger-level boarding records have not yet been recorded.
            </p>
          </div>
        }
      </div>
    </section>
  );
}
