import { ArrowDown, Armchair, DoorOpen } from 'lucide-react';

import type { AircraftSeat } from '@/data/aeropass';

import { cabinClassMeta, seatStatusMeta, seatTypeMeta } from '../data/seat-map';

interface SeatMapProps {
  seats: AircraftSeat[];

  selectedSeatId: string | null;

  onSelectSeat: (seat: AircraftSeat) => void;
}

export function SeatMap({ seats, selectedSeatId, onSelectSeat }: SeatMapProps) {
  const rows = Array.from(new Set(seats.map((seat) => seat.row))).sort(
    (a, b) => a - b,
  );

  return (
    <section className='overflow-hidden rounded-2xl border border-border/70 bg-background'>
      <div className='border-b border-border/60 p-4'>
        <div className='flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between'>
          <div>
            <div className='flex items-center gap-2'>
              <Armchair className='size-4 text-[#5BA9D6]' />

              <h2 className='text-sm font-semibold'>Aircraft seat layout</h2>
            </div>

            <p className='mt-1 text-xs leading-5 text-muted-foreground'>
              Select a seat to inspect its configuration.
            </p>
          </div>

          <div className='flex flex-wrap gap-x-4 gap-y-2'>
            <StatusLegend label='Available' className='bg-background' />

            <StatusLegend label='Blocked' className='bg-amber-50' />

            <StatusLegend label='Maintenance' className='bg-red-50' />
          </div>
        </div>
      </div>

      <div className='overflow-x-auto'>
        <div className='min-w-[350px] p-4 sm:p-6'>
          <div className='mx-auto max-w-[620px]'>
            {/* Cockpit */}
            <div className='mx-auto mb-5 flex w-[170px] flex-col items-center'>
              <div className='flex h-10 w-full items-center justify-center rounded-t-[55%] rounded-b-lg border border-border bg-muted/50'>
                <span className='flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground'>
                  <ArrowDown className='size-3' />
                  Cockpit
                </span>
              </div>
            </div>

            {/* Column headers */}
            <div className='mb-2 grid grid-cols-[28px_repeat(3,minmax(32px,1fr))_18px_repeat(3,minmax(32px,1fr))] gap-1.5'>
              <div />

              {['A', 'B', 'C'].map((column) => (
                <div
                  key={column}
                  className='text-center text-[10px] font-semibold text-muted-foreground'
                >
                  {column}
                </div>
              ))}

              <div />

              {['D', 'E', 'F'].map((column) => (
                <div
                  key={column}
                  className='text-center text-[10px] font-semibold text-muted-foreground'
                >
                  {column}
                </div>
              ))}
            </div>

            {/* Seats */}
            <div className='space-y-1.5'>
              {rows.map((row) => (
                <SeatRow
                  key={row}
                  row={row}
                  seats={seats}
                  selectedSeatId={selectedSeatId}
                  onSelectSeat={onSelectSeat}
                />
              ))}
            </div>

            {/* Tail */}
            <div className='mx-auto mt-6 flex w-[220px] items-center justify-center rounded-b-[55%] rounded-t-xl border border-border bg-muted/40 px-4 py-3'>
              <span className='text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground'>
                Rear cabin
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SeatRow({
  row,
  seats,
  selectedSeatId,
  onSelectSeat,
}: {
  row: number;

  seats: AircraftSeat[];

  selectedSeatId: string | null;

  onSelectSeat: (seat: AircraftSeat) => void;
}) {
  return (
    <div className='grid grid-cols-[28px_repeat(3,minmax(32px,1fr))_18px_repeat(3,minmax(32px,1fr))] gap-1.5'>
      <div className='flex items-center justify-center text-[9px] font-medium tabular-nums text-muted-foreground'>
        {row}
      </div>

      {['A', 'B', 'C'].map((column) => (
        <SeatButton
          key={`${row}${column}`}
          seat={findSeat(seats, row, column)}
          selectedSeatId={selectedSeatId}
          onSelectSeat={onSelectSeat}
        />
      ))}

      <div className='relative flex items-center justify-center'>
        {(row === 1 || row === 12 || row === 13) && (
          <DoorOpen className='size-3 text-muted-foreground/50' />
        )}
      </div>

      {['D', 'E', 'F'].map((column) => (
        <SeatButton
          key={`${row}${column}`}
          seat={findSeat(seats, row, column)}
          selectedSeatId={selectedSeatId}
          onSelectSeat={onSelectSeat}
        />
      ))}
    </div>
  );
}

function SeatButton({
  seat,
  selectedSeatId,
  onSelectSeat,
}: {
  seat: AircraftSeat | undefined;

  selectedSeatId: string | null;

  onSelectSeat: (seat: AircraftSeat) => void;
}) {
  if (!seat) {
    return <div className='h-9' />;
  }

  const status = seatStatusMeta[seat.status];

  const cabin = cabinClassMeta[seat.cabinClass];

  const selected = seat.id === selectedSeatId;

  return (
    <button
      type='button'
      onClick={() => onSelectSeat(seat)}
      title={`${seat.seatNumber} · ${cabin.label} · ${seatTypeMeta[seat.seatType]} · ${status.label}`}
      className={[
        'group flex h-9 min-w-0 items-center justify-center rounded-lg border text-[9px] font-semibold tabular-nums transition-all',
        'focus:outline-none focus:ring-2 focus:ring-[#5BA9D6]/30',
        status.className,
        selected ? 'border-[#102A43] bg-[#102A43] text-white shadow-sm' : '',
        seat.cabinClass === 'BUSINESS' && !selected ?
          'ring-1 ring-[#5BA9D6]/20'
        : '',
      ].join(' ')}
    >
      <span className='truncate px-0.5'>{seat.seatNumber}</span>
    </button>
  );
}

function findSeat(seats: AircraftSeat[], row: number, column: string) {
  return seats.find((seat) => seat.row === row && seat.column === column);
}

function StatusLegend({
  label,
  className,
}: {
  label: string;
  className: string;
}) {
  return (
    <div className='flex items-center gap-2'>
      <span
        className={[
          'size-3 rounded-[4px] border border-border',
          className,
        ].join(' ')}
      />

      <span className='text-[10px] font-medium text-muted-foreground'>
        {label}
      </span>
    </div>
  );
}
