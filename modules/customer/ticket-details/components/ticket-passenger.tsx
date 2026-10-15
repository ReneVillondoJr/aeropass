import { UserRound } from 'lucide-react';

import type { CustomerTicketDetailView } from '@/modules/customer/tickets/types/ticket';

export function TicketPassenger({ ticket }: { ticket: CustomerTicketDetailView }) {
  const items = [
    { label: 'Passenger name', value: ticket.passengerName },
    { label: 'Passenger email', value: ticket.passengerEmail || 'Not provided' },
    { label: 'Seat', value: ticket.seatNumber },
    { label: 'Cabin', value: ticket.cabinClass },
    { label: 'Fare type', value: ticket.reservationFareName },
    { label: 'Ticket expiry', value: new Intl.DateTimeFormat('en-PH', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'Asia/Manila' }).format(new Date(ticket.expiresAt)) },
  ];

  return (
    <section className="rounded-2xl border border-border/70 bg-card p-4 shadow-sm sm:p-5">
      <div className="flex items-center gap-2.5 border-b border-border/70 pb-3">
        <span className="flex size-9 items-center justify-center rounded-xl bg-[#EEF7FB] text-[#2879A8]"><UserRound className="size-4" aria-hidden="true" /></span>
        <div><h2 className="text-sm font-semibold text-foreground">Passenger & seat</h2><p className="mt-0.5 text-[11px] text-muted-foreground">Details attached to this ticket</p></div>
      </div>
      <dl className="mt-4 grid gap-4 sm:grid-cols-2">
        {items.map((item) => (
          <div key={item.label} className="min-w-0">
            <dt className="text-[10px] font-medium uppercase tracking-[0.1em] text-muted-foreground">{item.label}</dt>
            <dd className="mt-1 break-words text-xs font-semibold text-foreground">{item.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
