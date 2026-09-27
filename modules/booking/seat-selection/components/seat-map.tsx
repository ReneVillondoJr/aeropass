'use client';

import type { SeatOption } from '../types/seat-selection';

interface SeatMapProps {
  seats: SeatOption[];
  onSelect: (seat: SeatOption) => void;
}

export function SeatMap({ seats, onSelect }: SeatMapProps) {
  const rows = Array.from(new Set(seats.map((seat) => seat.row)));

  return (
    <div className='rounded-2xl border border-sky-100 bg-white p-5 sm:p-7'>
      <div className='mb-6 flex flex-wrap items-center justify-between gap-3'>
        <div>
          <p className='text-sm font-semibold text-[#102a43]'>
            Select your seat
          </p>

          <p className='mt-1 text-xs text-slate-400'>
            Choose an available seat for this passenger.
          </p>
        </div>

        <div className='flex items-center gap-4 text-[10px] text-slate-400'>
          <span className='flex items-center gap-1.5'>
            <span className='size-3 rounded bg-slate-100' />
            Available
          </span>

          <span className='flex items-center gap-1.5'>
            <span className='size-3 rounded bg-[#102a43]' />
            Selected
          </span>
        </div>
      </div>

      <div className='mx-auto max-w-md rounded-t-[40px] border border-sky-100 bg-[#f4f9fc] p-5 sm:p-7'>
        <div className='mb-7 rounded-2xl bg-white px-4 py-3 text-center'>
          <p className='text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400'>
            Aircraft front
          </p>

          <div className='mx-auto mt-2 h-px max-w-40 bg-sky-100' />
        </div>

        <div className='space-y-3'>
          {rows.map((row) => {
            const rowSeats = seats.filter((seat) => seat.row === row);

            return (
              <div
                key={row}
                className='grid grid-cols-[24px_1fr_1fr_1fr_1fr_1fr_1fr] items-center gap-1.5'
              >
                <span className='text-[10px] text-slate-400'>{row}</span>

                {rowSeats.map((seat, index) => {
                  const aisle = index === 2 || index === 3;

                  return (
                    <div key={seat.id} className={aisle ? 'ml-2' : ''}>
                      <button
                        type='button'
                        disabled={!seat.available}
                        onClick={() => onSelect(seat)}
                        className={`flex aspect-square w-full min-w-0 items-center justify-center rounded-md border text-[10px] font-medium transition-all ${
                          !seat.available ?
                            'cursor-not-allowed border-slate-200 bg-slate-100 text-slate-300'
                          : seat.selected ?
                            'border-[#102a43] bg-[#102a43] text-white shadow-sm'
                          : 'border-sky-100 bg-white text-slate-500 hover:border-[#5ba9d6] hover:text-[#102a43]'
                        }`}
                        aria-label={`Seat ${seat.seatNumber}`}
                      >
                        {seat.column}
                      </button>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
