import { CheckCircle2, Circle, UserRound } from 'lucide-react';

import type { CustomerCheckInPassengerDetail } from '@/modules/customer/check-in/types/check-in';

interface PassengerConfirmationProps {
  passengers: CustomerCheckInPassengerDetail[];
  activePassengerId: string;
  onSelectPassenger: (ticketId: string) => void;
  selectedSeatByTicket: Record<string, string>;
}

export function PassengerConfirmation({ passengers, activePassengerId, onSelectPassenger, selectedSeatByTicket }: PassengerConfirmationProps) {
  if (passengers.length === 0) {
    return <div className="rounded-xl border border-dashed border-border p-5 text-sm text-muted-foreground">No passenger tickets are linked to this booking.</div>;
  }

  return (
    <div className="space-y-3">
      {passengers.map((passenger) => {
        const active = passenger.ticketId === activePassengerId;
        const selectedSeat = passenger.seatOptions.find((seat) => seat.id === selectedSeatByTicket[passenger.ticketId]);
        return (
          <button
            type="button"
            key={passenger.ticketId}
            onClick={() => onSelectPassenger(passenger.ticketId)}
            aria-pressed={active}
            className={[
              'w-full rounded-2xl border p-4 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5BA9D6]/50 sm:p-5',
              active ? 'border-[#5BA9D6] bg-[#EEF7FB]/70 ring-1 ring-[#5BA9D6]/25' : 'border-border/70 bg-card hover:bg-muted/40',
            ].join(' ')}
          >
            <div className="flex items-start gap-3">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-background text-[#102A43] ring-1 ring-border/70"><UserRound className="size-4" /></span>
              <span className="min-w-0 flex-1">
                <span className="flex flex-wrap items-center gap-2">
                  <span className="truncate text-sm font-semibold text-foreground">{passenger.passengerName}</span>
                  {passenger.canCheckIn ? <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[9px] font-semibold text-emerald-700">Eligible</span> : <span className="rounded-full bg-muted px-2 py-0.5 text-[9px] font-semibold text-muted-foreground">{passenger.displayStatus.replaceAll('_', ' ')}</span>}
                </span>
                <span className="mt-1 block break-all text-xs text-muted-foreground">{passenger.passengerEmail}</span>
                <span className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-[10px] text-muted-foreground">
                  <span>Ticket: <strong className="font-mono font-semibold text-foreground">{passenger.ticketNumber}</strong></span>
                  <span>Seat: <strong className="font-semibold text-foreground">{selectedSeat?.seatNumber ?? passenger.currentSeatNumber}</strong></span>
                </span>
              </span>
              <span className="mt-1 shrink-0 text-[#2879A8]">{active ? <CheckCircle2 className="size-5" /> : <Circle className="size-5 text-muted-foreground/50" />}</span>
            </div>
            {passenger.specialAssistance ? <span className="mt-3 block rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-[10px] leading-4 text-amber-800">Special assistance is recorded for this passenger. Please review any airport assistance instructions before departure.</span> : null}
          </button>
        );
      })}
    </div>
  );
}
