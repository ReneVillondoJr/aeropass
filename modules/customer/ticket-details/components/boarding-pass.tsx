'use client';

import { useState } from 'react';
import { CheckCircle2, Copy, Printer, QrCode, Ticket } from 'lucide-react';

import { CustomerStatusBadge } from '@/components/customer/shared/customer-status-badge';
import type { CustomerTicketDetailView } from '@/modules/customer/tickets/types/ticket';

function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'Date unavailable';
  return new Intl.DateTimeFormat('en-PH', {
    weekday: 'short', day: 'numeric', month: 'short', year: 'numeric',
    timeZone: 'Asia/Manila',
  }).format(date);
}

function formatTime(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '--:--';
  return new Intl.DateTimeFormat('en-PH', {
    hour: '2-digit', minute: '2-digit', hour12: true,
    timeZone: 'Asia/Manila',
  }).format(date);
}

export function BoardingPass({ ticket }: { ticket: CustomerTicketDetailView }) {
  const [copied, setCopied] = useState(false);

  async function copyTicketToken() {
    try {
      await navigator.clipboard.writeText(ticket.qrToken);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <section className="overflow-hidden rounded-2xl border border-border/70 bg-card shadow-sm print:border-0 print:shadow-none">
      <div className="flex items-start justify-between gap-3 border-b border-dashed border-border p-4 sm:p-5">
        <div className="flex items-start gap-3">
          <span className="flex size-10 items-center justify-center rounded-xl bg-[#102A43] text-white"><Ticket className="size-4.5" aria-hidden="true" /></span>
          <div><p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#2879A8]">AeroPass</p><h2 className="mt-1 text-base font-semibold text-foreground">Electronic ticket</h2><p className="mt-1 text-xs text-muted-foreground">{ticket.ticketNumber}</p></div>
        </div>
        <div className="print:hidden"><CustomerStatusBadge status={ticket.displayStatus} /></div>
      </div>
      <div className="p-4 sm:p-5">
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 sm:gap-5">
          <div><p className="text-3xl font-semibold tracking-tight text-[#102A43]">{ticket.originCode}</p><p className="mt-1 text-xs text-muted-foreground">{ticket.originCity}</p><p className="mt-3 text-sm font-semibold text-foreground">{formatTime(ticket.departureAt)}</p></div>
          <div className="flex w-16 flex-col items-center gap-2 text-[#2879A8]"><span className="text-[10px] font-semibold">{ticket.flightNumber}</span><div className="w-full border-t border-dashed border-[#5BA9D6]" /><span className="text-[10px] text-muted-foreground">One way</span></div>
          <div className="text-right"><p className="text-3xl font-semibold tracking-tight text-[#102A43]">{ticket.destinationCode}</p><p className="mt-1 text-xs text-muted-foreground">{ticket.destinationCity}</p><p className="mt-3 text-sm font-semibold text-foreground">{formatTime(ticket.arrivalAt)}</p></div>
        </div>
        <p className="mt-4 text-xs text-muted-foreground">{formatDate(ticket.departureAt)}</p>
        <div className="mt-4 grid grid-cols-2 gap-3 rounded-xl bg-[#EEF7FB] p-3 sm:grid-cols-4 sm:p-4">
          <div><p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-[#4D7187]">Passenger</p><p className="mt-1 break-words text-xs font-semibold text-[#102A43]">{ticket.passengerName}</p></div>
          <div><p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-[#4D7187]">Seat</p><p className="mt-1 text-xs font-semibold text-[#102A43]">{ticket.seatNumber}</p></div>
          <div><p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-[#4D7187]">Gate</p><p className="mt-1 text-xs font-semibold text-[#102A43]">{ticket.gate || 'TBA'}</p></div>
          <div><p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-[#4D7187]">Terminal</p><p className="mt-1 text-xs font-semibold text-[#102A43]">{ticket.terminal || 'TBA'}</p></div>
        </div>
        <div className="mt-4 rounded-xl border border-dashed border-border p-3 sm:p-4">
          <div className="flex items-center gap-3">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground"><QrCode className="size-5" aria-hidden="true" /></span>
            <div className="min-w-0 flex-1"><p className="text-xs font-semibold text-foreground">Mock ticket validation token</p><p className="mt-1 break-all font-mono text-[10px] leading-4 text-muted-foreground">{ticket.qrToken}</p></div>
            <button type="button" onClick={copyTicketToken} className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg border border-border text-muted-foreground outline-none transition hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-[#5BA9D6]" aria-label="Copy ticket validation token" title="Copy token"><Copy className="size-3.5" aria-hidden="true" /></button>
          </div>
          {copied ? <p className="mt-2 inline-flex items-center gap-1 text-[10px] font-medium text-emerald-700"><CheckCircle2 className="size-3.5" aria-hidden="true" />Token copied</p> : null}
          <p className="mt-2 text-[10px] leading-4 text-muted-foreground">This local mock token is not a scannable QR code and cannot be used for real airport boarding.</p>
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 print:hidden">
          <p className="text-[10px] leading-4 text-muted-foreground">Booking reference: <span className="font-semibold text-foreground">{ticket.bookingReference}</span></p>
          <button type="button" onClick={() => window.print()} disabled={!ticket.isBoardingPassReady} className="inline-flex min-h-9 items-center justify-center gap-2 rounded-xl bg-[#102A43] px-3.5 py-2 text-xs font-semibold text-white outline-none transition hover:bg-[#183F5D] disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground focus-visible:ring-2 focus-visible:ring-[#5BA9D6] focus-visible:ring-offset-2"><Printer className="size-3.5" aria-hidden="true" />Print boarding pass</button>
        </div>
      </div>
    </section>
  );
}
