import type { AircraftSeat } from '@/data/aeropass';

import { seatStatusMeta } from '../data/aircraft';

interface AircraftSeatLayoutProps {
  seats: AircraftSeat[];
}

export function AircraftSeatLayout({ seats }: AircraftSeatLayoutProps) {
  const rows = Array.from(
    new Map(
      seats.map((seat) => [
        seat.row,
        seats.filter((item) => item.row === seat.row),
      ]),
    ),
  );

  return (
    <div className='rounded-2xl border border-border/70 bg-background/70'>
      <div className='border-b border-border/60 p-4'>
        <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
          <div>
            <h3 className='text-sm font-semibold'>Configured seat layout</h3>

            <p className='mt-1 text-xs text-muted-foreground'>
              Static aircraft seat configuration.
            </p>
          </div>

          <div className='flex flex-wrap gap-2'>
            <Legend
              label='Available'
              className={seatStatusMeta.AVAILABLE.className}
            />

            <Legend
              label='Blocked'
              className={seatStatusMeta.BLOCKED.className}
            />

            <Legend
              label='Maintenance'
              className={seatStatusMeta.MAINTENANCE.className}
            />
          </div>
        </div>
      </div>

      <div className='max-h-[430px] overflow-y-auto p-4'>
        {rows.length > 0 ?
          <div className='space-y-1.5'>
            {rows.map(([row, rowSeats]) => (
              <div
                key={row}
                className='grid grid-cols-[32px_minmax(0,1fr)] items-center gap-2'
              >
                <span className='text-center text-[10px] font-medium tabular-nums text-muted-foreground'>
                  {row}
                </span>

                <div className='grid grid-cols-6 gap-1.5'>
                  {Array.from(
                    {
                      length: 6,
                    },
                    (_, index) => {
                      const column = String.fromCharCode(65 + index);

                      const seat = rowSeats.find(
                        (item) => item.column === column,
                      );

                      if (!seat) {
                        return <div key={column} className='h-7' />;
                      }

                      return <Seat key={seat.id} seat={seat} />;
                    },
                  )}
                </div>
              </div>
            ))}
          </div>
        : <div className='py-10 text-center text-xs text-muted-foreground'>
            No seat configuration found.
          </div>
        }
      </div>
    </div>
  );
}

function Seat({ seat }: { seat: AircraftSeat }) {
  const status = seatStatusMeta[seat.status];

  return (
    <div
      title={`${seat.seatNumber} · ${seat.cabinClass} · ${status.label}`}
      className={[
        'flex h-7 min-w-0 items-center justify-center rounded-md border text-[9px] font-medium tabular-nums',
        status.className,
      ].join(' ')}
    >
      {seat.seatNumber}
    </div>
  );
}

function Legend({ label, className }: { label: string; className: string }) {
  return (
    <span
      className={[
        'rounded-full border px-2 py-1 text-[9px] font-medium',
        className,
      ].join(' ')}
    >
      {label}
    </span>
  );
}
