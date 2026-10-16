'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { AlertTriangle, ArrowLeft, ArrowRight, CheckCircle2, CircleHelp, PlaneTakeoff, ShieldCheck } from 'lucide-react';

import { CustomerStatusBadge } from '@/components/customer/shared/customer-status-badge';
import type { CustomerCheckInDetailView } from '@/modules/customer/check-in/types/check-in';

import { CheckInReview } from './check-in-review';
import { CheckInSteps } from './check-in-steps';
import { PassengerConfirmation } from './passenger-confirmation';
import { SeatMap } from './seat-map';

interface CheckInWorkflowProps {
  detail: CustomerCheckInDetailView;
}

function formatDateTime(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'Date unavailable';
  return new Intl.DateTimeFormat('en-PH', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'Asia/Manila' }).format(date);
}

export function CheckInWorkflow({ detail }: CheckInWorkflowProps) {
  const eligiblePassengers = detail.passengers.filter((passenger) => passenger.canCheckIn);
  const [activeTicketId, setActiveTicketId] = useState(eligiblePassengers[0]?.ticketId ?? detail.passengers[0]?.ticketId ?? '');
  const [selectedSeatByTicket, setSelectedSeatByTicket] = useState<Record<string, string>>(() => Object.fromEntries(
    detail.passengers.filter((passenger) => passenger.canCheckIn).map((passenger) => [passenger.ticketId, passenger.currentSeatId]),
  ));
  const [confirmed, setConfirmed] = useState(false);
  const [completed, setCompleted] = useState(false);

  const activePassenger = detail.passengers.find((passenger) => passenger.ticketId === activeTicketId) ?? null;
  const selectedSeatIds = useMemo(() => Object.entries(selectedSeatByTicket).filter(([ticketId]) => ticketId !== activeTicketId).map(([, seatId]) => seatId), [activeTicketId, selectedSeatByTicket]);
  const selectionIsValid = eligiblePassengers.every((passenger) => {
    const selectedId = selectedSeatByTicket[passenger.ticketId];
    return Boolean(selectedId && passenger.seatOptions.some((seat) => seat.id === selectedId));
  });
  const canSubmit = eligiblePassengers.length > 0 && confirmed && selectionIsValid && !completed;

  function handleSelectSeat(seatId: string) {
    if (!activePassenger?.canCheckIn) return;
    setSelectedSeatByTicket((current) => ({ ...current, [activePassenger.ticketId]: seatId }));
  }

  function handleComplete() {
    if (!canSubmit) return;
    setCompleted(true);
  }

  return (
    <div className="space-y-6">
      <CheckInSteps completed={completed} />

      {!detail.canCheckIn ? (
        <div className="flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-amber-950 sm:p-5">
          <AlertTriangle className="mt-0.5 size-5 shrink-0" />
          <div><p className="text-sm font-semibold">Online check-in is not available for this booking</p><p className="mt-1 text-xs leading-5">{detail.unavailableReason ?? 'There are no passengers eligible for online check-in for this booking.'}</p></div>
        </div>
      ) : null}

      {completed ? (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 sm:p-6">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="mt-0.5 size-6 shrink-0 text-emerald-700" />
            <div className="flex-1">
              <h2 className="text-base font-semibold text-emerald-950">Demo check-in flow completed</h2>
              <p className="mt-1 text-sm leading-6 text-emerald-900">Your selections have been validated for this screen. This confirmation is a UI preview and has not been saved to the canonical AeroPass check-in records.</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <button type="button" onClick={() => setCompleted(false)} className="inline-flex min-h-10 items-center justify-center rounded-xl border border-emerald-300 bg-white px-4 py-2 text-xs font-semibold text-emerald-950 hover:bg-emerald-100">Review selections</button>
                <Link href="/customer/tickets" className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl bg-[#102A43] px-4 py-2 text-xs font-semibold text-white hover:bg-[#183F5D]">View my tickets <ArrowRight className="size-3.5" /></Link>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
        <div className="min-w-0 space-y-6">
          <section className="rounded-2xl border border-border/70 bg-card p-4 shadow-sm sm:p-5">
            <div className="mb-4 flex items-start justify-between gap-3">
              <div><h2 className="text-sm font-semibold text-foreground">Passenger details</h2><p className="mt-1 text-xs leading-5 text-muted-foreground">Select a passenger to review their ticket and assigned seat.</p></div>
              <span className="rounded-lg border border-border bg-background px-2.5 py-1.5 text-[10px] font-semibold text-muted-foreground">{detail.passengers.length} passenger{detail.passengers.length === 1 ? '' : 's'}</span>
            </div>
            <PassengerConfirmation
              passengers={detail.passengers}
              activePassengerId={activeTicketId}
              onSelectPassenger={setActiveTicketId}
              selectedSeatByTicket={selectedSeatByTicket}
            />
          </section>

          {activePassenger?.canCheckIn ? (
            <SeatMap
              seats={activePassenger.seatOptions}
              selectedSeatId={selectedSeatByTicket[activePassenger.ticketId] ?? activePassenger.currentSeatId}
              unavailableSeatIds={selectedSeatIds}
              onSelectSeat={handleSelectSeat}
              disabled={completed}
            />
          ) : (
            <section className="rounded-2xl border border-border/70 bg-card p-5">
              <div className="flex items-start gap-3"><CircleHelp className="mt-0.5 size-5 text-muted-foreground" /><div><h2 className="text-sm font-semibold text-foreground">Seat selection</h2><p className="mt-1 text-xs leading-5 text-muted-foreground">Select an eligible passenger to choose a seat. Completed or ineligible check-in records are displayed for reference only.</p></div></div>
            </section>
          )}
        </div>

        <aside className="space-y-5 xl:sticky xl:top-6 xl:self-start">
          <section className="rounded-2xl border border-border/70 bg-card p-4 shadow-sm sm:p-5">
            <div className="flex items-center justify-between gap-3"><h2 className="text-sm font-semibold text-foreground">Your trip</h2><CustomerStatusBadge status={detail.flightStatus} /></div>
            <div className="mt-4 flex items-center justify-between gap-3">
              <div><p className="text-2xl font-semibold tracking-tight text-foreground">{detail.originCode}</p><p className="mt-1 text-[10px] text-muted-foreground">{detail.originCity}</p></div>
              <div className="flex min-w-14 flex-1 flex-col items-center gap-1.5 text-[#5BA9D6]"><PlaneTakeoff className="size-4" /><span className="h-px w-full bg-[#B8DCEB]" /><span className="text-[9px] font-semibold text-muted-foreground">{detail.flightNumber}</span></div>
              <div className="text-right"><p className="text-2xl font-semibold tracking-tight text-foreground">{detail.destinationCode}</p><p className="mt-1 text-[10px] text-muted-foreground">{detail.destinationCity}</p></div>
            </div>
            <div className="mt-4 space-y-3 border-t border-border/60 pt-4 text-xs">
              <div><p className="text-[10px] text-muted-foreground">Departure</p><p className="mt-1 font-semibold text-foreground">{formatDateTime(detail.departureAt)}</p></div>
              <div><p className="text-[10px] text-muted-foreground">Booking reference</p><p className="mt-1 font-mono font-semibold tracking-wide text-foreground">{detail.bookingReference}</p></div>
            </div>
          </section>

          <CheckInReview
            passengers={detail.passengers}
            selectedSeatByTicket={selectedSeatByTicket}
            confirmed={confirmed}
            onConfirmedChange={setConfirmed}
            disabled={!detail.canCheckIn || completed}
          />

          <div className="space-y-2">
            <button type="button" onClick={handleComplete} disabled={!canSubmit} className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#102A43] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#183F5D] disabled:cursor-not-allowed disabled:opacity-45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5BA9D6] focus-visible:ring-offset-2">
              <ShieldCheck className="size-4" /> Complete demo check-in
            </button>
            <Link href="/customer/check-in" className="inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold text-muted-foreground hover:bg-muted hover:text-foreground"><ArrowLeft className="size-3.5" /> Back to check-in</Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
