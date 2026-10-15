import Link from 'next/link';
import { AlertCircle, ArrowLeft, CalendarClock, CreditCard, Ticket as TicketIcon } from 'lucide-react';

import { CustomerEmptyState } from '@/components/customer/shared/empty-state';
import { CustomerPageHeader } from '@/components/customer/shared/customer-page-header';
import { CustomerStatusBadge } from '@/components/customer/shared/customer-status-badge';

import { BoardingPass } from './components/boarding-pass';
import { TicketItinerary } from './components/ticket-itinerary';
import { TicketPassenger } from './components/ticket-passenger';
import { TicketTravelStatus } from './components/ticket-travel-status';
import { getCustomerTicketDetailView } from '@/modules/customer/tickets/data/ticket-view';

interface CustomerTicketDetailsModuleProps {
  customerId: string;
  ticketId: string;
}

function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'Date unavailable';
  return new Intl.DateTimeFormat('en-PH', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'Asia/Manila' }).format(date);
}

export function CustomerTicketDetailsModule({ customerId, ticketId }: CustomerTicketDetailsModuleProps) {
  const ticket = getCustomerTicketDetailView(customerId, ticketId);

  if (!ticket) {
    return (
      <section className="space-y-6">
        <CustomerEmptyState
          title="Ticket not found"
          description="We could not find this ticket in your customer account. Check your ticket list or sign in with the account used to make the booking."
          icon={AlertCircle}
          actionLabel="Return to my tickets"
          actionHref="/customer/tickets"
        />
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <Link href="/customer/tickets" className="inline-flex min-h-9 items-center gap-2 rounded-lg px-2 text-xs font-semibold text-muted-foreground outline-none transition hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-[#5BA9D6]">
        <ArrowLeft className="size-3.5" aria-hidden="true" />Back to my tickets
      </Link>

      <CustomerPageHeader
        eyebrow={`Ticket ${ticket.ticketNumber}`}
        title="Ticket details"
        description="Review your electronic ticket, passenger information, itinerary, and current travel status."
        actions={<CustomerStatusBadge status={ticket.displayStatus} className="px-3 py-1.5 text-xs" />}
      />

      <div className="flex flex-wrap gap-2">
        <Link href={`/customer/bookings/${ticket.bookingId}`} className="inline-flex min-h-9 items-center gap-2 rounded-xl bg-[#102A43] px-3.5 py-2 text-xs font-semibold text-white outline-none transition hover:bg-[#183F5D] focus-visible:ring-2 focus-visible:ring-[#5BA9D6] focus-visible:ring-offset-2"><TicketIcon className="size-3.5" aria-hidden="true" />View booking</Link>
        <Link href="/customer/payments" className="inline-flex min-h-9 items-center gap-2 rounded-xl border border-border bg-card px-3.5 py-2 text-xs font-semibold text-foreground outline-none transition hover:bg-muted focus-visible:ring-2 focus-visible:ring-[#5BA9D6] focus-visible:ring-offset-2"><CreditCard className="size-3.5" aria-hidden="true" />Payment history</Link>
      </div>

      <div className="grid min-w-0 gap-6 xl:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]">
        <div className="min-w-0 space-y-6">
          <BoardingPass ticket={ticket} />
          <TicketItinerary ticket={ticket} />
          <TicketPassenger ticket={ticket} />
        </div>
        <div className="min-w-0 space-y-6">
          <TicketTravelStatus ticket={ticket} />
          <section className="rounded-2xl border border-border/70 bg-card p-4 shadow-sm sm:p-5">
            <div className="flex items-center gap-2.5"><span className="flex size-9 items-center justify-center rounded-xl bg-[#EEF7FB] text-[#2879A8]"><CalendarClock className="size-4" aria-hidden="true" /></span><h2 className="text-sm font-semibold text-foreground">Ticket information</h2></div>
            <dl className="mt-4 space-y-3">
              <div className="flex items-start justify-between gap-3"><dt className="text-xs text-muted-foreground">Issued on</dt><dd className="text-right text-xs font-semibold text-foreground">{formatDate(ticket.issuedAt)}</dd></div>
              <div className="flex items-start justify-between gap-3"><dt className="text-xs text-muted-foreground">Expires on</dt><dd className="text-right text-xs font-semibold text-foreground">{formatDate(ticket.expiresAt)}</dd></div>
              <div className="flex items-start justify-between gap-3"><dt className="text-xs text-muted-foreground">Cabin</dt><dd className="text-right text-xs font-semibold text-foreground">{ticket.cabinClass}</dd></div>
              <div className="flex items-start justify-between gap-3"><dt className="text-xs text-muted-foreground">Ticket fare</dt><dd className="text-right text-xs font-semibold text-foreground">{ticket.reservationPrice === null ? 'Included in booking total' : new Intl.NumberFormat('en-PH', { style: 'currency', currency: ticket.currency }).format(ticket.reservationPrice)}</dd></div>
              <div className="flex items-start justify-between gap-3"><dt className="text-xs text-muted-foreground">Booking total</dt><dd className="text-right text-xs font-semibold text-foreground">{new Intl.NumberFormat('en-PH', { style: 'currency', currency: ticket.currency }).format(ticket.totalAmount)}</dd></div>
              <div className="flex items-start justify-between gap-3"><dt className="text-xs text-muted-foreground">Payment method</dt><dd className="text-right text-xs font-semibold text-foreground">{ticket.paymentMethod.replaceAll('_', ' ')}</dd></div>
              <div className="flex items-start justify-between gap-3"><dt className="text-xs text-muted-foreground">Payment reference</dt><dd className="max-w-[60%] break-all text-right font-mono text-[10px] font-medium text-foreground">{ticket.paymentReference ?? 'Not available'}</dd></div>
            </dl>
          </section>
        </div>
      </div>
    </section>
  );
}
