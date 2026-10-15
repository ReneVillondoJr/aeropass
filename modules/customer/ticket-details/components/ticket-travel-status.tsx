import { CheckCircle2, CircleHelp, CreditCard, PlaneTakeoff } from 'lucide-react';

import { CustomerStatusBadge } from '@/components/customer/shared/customer-status-badge';
import type { CustomerTicketDetailView } from '@/modules/customer/tickets/types/ticket';

export function TicketTravelStatus({ ticket }: { ticket: CustomerTicketDetailView }) {
  const rows = [
    { label: 'Booking', value: ticket.bookingStatus },
    { label: 'Payment', value: ticket.paymentStatus },
    { label: 'Flight', value: ticket.flightStatus },
    { label: 'Check-in', value: ticket.checkInStatus ?? 'NOT_CHECKED_IN' },
    { label: 'Boarding', value: ticket.boardingStatus ?? 'NOT_BOARDED' },
  ];

  return (
    <section className="rounded-2xl border border-border/70 bg-card p-4 shadow-sm sm:p-5">
      <div className="flex items-center gap-2.5 border-b border-border/70 pb-3">
        <span className="flex size-9 items-center justify-center rounded-xl bg-[#EEF7FB] text-[#2879A8]"><PlaneTakeoff className="size-4" aria-hidden="true" /></span>
        <div><h2 className="text-sm font-semibold text-foreground">Travel status</h2><p className="mt-0.5 text-[11px] text-muted-foreground">Status from the current AeroPass mock records</p></div>
      </div>
      <div className="mt-3 divide-y divide-border/70">
        {rows.map((row) => (
          <div key={row.label} className="flex items-center justify-between gap-3 py-3 first:pt-1 last:pb-1">
            <span className="text-xs text-muted-foreground">{row.label}</span>
            <CustomerStatusBadge status={row.value} />
          </div>
        ))}
      </div>
      {ticket.isBoardingPassReady ? (
        <div className="mt-4 flex items-start gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-emerald-800">
          <CheckCircle2 className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          <p className="text-xs leading-5">Check-in is complete and the booking qualifies for boarding-pass access.</p>
        </div>
      ) : (
        <div className="mt-4 flex items-start gap-2 rounded-xl border border-border bg-muted/40 p-3 text-muted-foreground">
          <CircleHelp className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          <p className="text-xs leading-5">A boarding pass is shown only when the ticket is still valid, payment is confirmed, and check-in is complete.</p>
        </div>
      )}
    </section>
  );
}
