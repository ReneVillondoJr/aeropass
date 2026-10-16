import { LockKeyhole, ShieldCheck } from 'lucide-react';

import type { CustomerCheckInPassengerDetail } from '@/modules/customer/check-in/types/check-in';

interface CheckInReviewProps {
  passengers: CustomerCheckInPassengerDetail[];
  selectedSeatByTicket: Record<string, string>;
  confirmed: boolean;
  onConfirmedChange: (checked: boolean) => void;
  disabled: boolean;
}

export function CheckInReview({ passengers, selectedSeatByTicket, confirmed, onConfirmedChange, disabled }: CheckInReviewProps) {
  const eligiblePassengers = passengers.filter((passenger) => passenger.canCheckIn);

  return (
    <section className="rounded-2xl border border-border/70 bg-card p-4 shadow-sm sm:p-5">
      <div className="flex items-start gap-3">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#EEF7FB] text-[#102A43]"><ShieldCheck className="size-5" /></span>
        <div><h2 className="text-sm font-semibold text-foreground">Review before confirming</h2><p className="mt-1 text-xs leading-5 text-muted-foreground">Confirm that passenger details and seat selections are correct before continuing.</p></div>
      </div>

      {eligiblePassengers.length > 0 ? (
        <div className="mt-4 divide-y divide-border/60 rounded-xl border border-border/70">
          {eligiblePassengers.map((passenger) => {
            const seat = passenger.seatOptions.find((option) => option.id === selectedSeatByTicket[passenger.ticketId]);
            return (
              <div key={passenger.ticketId} className="flex items-center justify-between gap-3 px-3.5 py-3">
                <div className="min-w-0"><p className="truncate text-xs font-semibold text-foreground">{passenger.passengerName}</p><p className="mt-1 text-[10px] text-muted-foreground">{passenger.ticketNumber}</p></div>
                <div className="shrink-0 text-right"><p className="text-xs font-semibold text-foreground">Seat {seat?.seatNumber ?? passenger.currentSeatNumber}</p><p className="mt-1 text-[10px] text-muted-foreground">{seat?.cabinClass ?? 'Assigned seat'}</p></div>
              </div>
            );
          })}
        </div>
      ) : null}

      <label className={['mt-4 flex cursor-pointer items-start gap-3 rounded-xl border p-3.5 transition-colors', confirmed ? 'border-[#5BA9D6] bg-[#EEF7FB]/65' : 'border-border/70 bg-background', disabled ? 'cursor-not-allowed opacity-70' : ''].join(' ')}>
        <input
          type="checkbox"
          checked={confirmed}
          onChange={(event) => onConfirmedChange(event.target.checked)}
          disabled={disabled}
          className="mt-0.5 size-4 shrink-0 accent-[#102A43]"
        />
        <span className="text-xs leading-5 text-foreground">I confirm that the passenger information is correct and that I have reviewed the seat selection for each eligible passenger.</span>
      </label>

      <div className="mt-3 flex items-start gap-2 rounded-lg bg-muted/50 px-3 py-2.5 text-[10px] leading-4 text-muted-foreground">
        <LockKeyhole className="mt-0.5 size-3.5 shrink-0" />
        <p>Changes shown in this demo are local UI state only. Connect the confirmation action to a canonical AeroPass check-in write helper before treating the check-in as saved.</p>
      </div>
    </section>
  );
}
