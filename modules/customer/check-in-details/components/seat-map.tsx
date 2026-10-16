'use client';

import { Armchair, Check } from 'lucide-react';

import type { CheckInSeatOption } from '@/modules/customer/check-in/types/check-in';

interface SeatMapProps {
  seats: CheckInSeatOption[];
  selectedSeatId: string;
  unavailableSeatIds: string[];
  onSelectSeat: (seatId: string) => void;
  disabled?: boolean;
}

const COLUMNS = ['A', 'B', 'C', 'D', 'E', 'F'] as const;

export function SeatMap({ seats, selectedSeatId, unavailableSeatIds, onSelectSeat, disabled = false }: SeatMapProps) {
  if (seats.length === 0) {
    return <div className="rounded-xl border border-dashed border-border p-5 text-center text-sm text-muted-foreground">No selectable seats are available for this passenger. Keep the assigned seat or contact AeroPass support.</div>;
  }

  const rows = Array.from(new Set(seats.map((seat) => seat.row))).sort((a, b) => a - b);
  const byPosition = new Map(seats.map((seat) => [`${seat.row}-${seat.column}`, seat]));

  return (
    <div className="rounded-2xl border border-border/70 bg-card p-4 sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div><p className="text-sm font-semibold text-foreground">Choose a seat</p><p className="mt-1 text-xs text-muted-foreground">Select one of the available seats shown below.</p></div>
        <span className="inline-flex items-center gap-1.5 text-[10px] text-muted-foreground"><Armchair className="size-3.5" /> Aircraft seat map</span>
      </div>

      <div className="mt-5 flex justify-center">
        <div className="w-full max-w-[420px] rounded-t-[48%] border-x border-t border-border/80 bg-muted/30 px-3 pb-5 pt-7 sm:px-6">
          <div className="mb-4 flex items-center justify-center gap-5 text-[9px] font-semibold text-muted-foreground">
            <span className="inline-flex items-center gap-1.5"><span className="size-3 rounded border border-slate-300 bg-white" /> Available</span>
            <span className="inline-flex items-center gap-1.5"><span className="size-3 rounded border border-[#102A43] bg-[#102A43]" /> Selected</span>
            <span className="inline-flex items-center gap-1.5"><span className="size-3 rounded border border-slate-300 bg-slate-200" /> Assigned</span>
          </div>
          <div className="space-y-2">
            {rows.map((row) => (
              <div key={row} className="grid grid-cols-6 gap-1.5 sm:gap-2">
                {COLUMNS.map((column) => {
                  const seat = byPosition.get(`${row}-${column}`);
                  if (!seat) return <span key={`${row}-${column}`} aria-hidden="true" className="h-9 sm:h-10" />;
                  const selected = seat.id === selectedSeatId;
                  const unavailable = unavailableSeatIds.includes(seat.id) && !selected;
                  return (
                    <button
                      type="button"
                      key={seat.id}
                      disabled={disabled || unavailable}
                      onClick={() => onSelectSeat(seat.id)}
                      title={`${seat.seatNumber} · ${seat.cabinClass} · ${seat.seatType}${seat.isCurrentSeat ? ' · Current seat' : ''}`}
                      aria-label={`Seat ${seat.seatNumber}${selected ? ', selected' : unavailable ? ', selected by another passenger in this booking' : ''}`}
                      aria-pressed={selected}
                      className={[
                        'flex h-9 min-w-0 items-center justify-center rounded-md border text-[10px] font-semibold transition-colors sm:h-10 sm:text-xs',
                        selected ? 'border-[#102A43] bg-[#102A43] text-white shadow-sm' : unavailable ? 'cursor-not-allowed border-slate-200 bg-slate-200 text-slate-400' : 'border-slate-300 bg-white text-slate-600 hover:border-[#5BA9D6] hover:bg-[#EEF7FB] hover:text-[#102A43]',
                        disabled ? 'cursor-not-allowed opacity-75' : '',
                      ].join(' ')}
                    >
                      {selected ? <Check className="size-3.5" /> : seat.column}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
          <div className="mt-5 border-t border-dashed border-border/80 pt-4 text-center text-[9px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">Front of aircraft</div>
        </div>
      </div>

      <div className="mt-4 rounded-xl bg-[#EEF7FB] px-3.5 py-3 text-xs text-[#102A43]">
        {seats.find((seat) => seat.id === selectedSeatId) ? (
          <><strong>{seats.find((seat) => seat.id === selectedSeatId)?.seatNumber}</strong> selected · {seats.find((seat) => seat.id === selectedSeatId)?.cabinClass} · {seats.find((seat) => seat.id === selectedSeatId)?.seatType}</>
        ) : 'Choose a seat to continue.'}
      </div>
    </div>
  );
}
