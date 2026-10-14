import { ArrowUpRight, CreditCard, ReceiptText, RotateCcw } from 'lucide-react';
import Link from 'next/link';

import { CustomerStatusBadge } from '@/components/customer/shared/customer-status-badge';

import type { CustomerBookingDetailView } from '@/modules/customer/bookings/types/booking';

interface BookingPaymentSummaryProps {
  booking: CustomerBookingDetailView;
}

function formatMoney(amount: number, currency = 'PHP') {
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency,
    maximumFractionDigits: 2,
  }).format(amount);
}

function SummaryRow({ label, value, muted = false }: { label: string; value: string; muted?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-3 py-2 text-xs">
      <span className={muted ? 'text-muted-foreground' : 'text-foreground'}>{label}</span>
      <span className={muted ? 'text-muted-foreground' : 'font-medium text-foreground'}>{value}</span>
    </div>
  );
}

export function BookingPaymentSummary({ booking }: BookingPaymentSummaryProps) {
  return (
    <div className="space-y-4">
      <section className="rounded-2xl border border-border/70 bg-card p-4 shadow-sm sm:p-5">
        <div className="flex items-center gap-3">
          <span className="flex size-9 items-center justify-center rounded-xl bg-[#EEF7FB] text-[#2879A8]">
            <ReceiptText className="size-4.5" aria-hidden="true" />
          </span>
          <div>
            <h2 className="text-sm font-semibold text-foreground">Fare breakdown</h2>
            <p className="mt-0.5 text-xs text-muted-foreground">Booking total in Philippine pesos</p>
          </div>
        </div>

        <div className="mt-4 divide-y divide-border/60 border-y border-border/60">
          <SummaryRow label="Base fare" value={formatMoney(booking.subtotal, booking.currency)} />
          <SummaryRow label="Taxes" value={formatMoney(booking.taxes, booking.currency)} muted />
          <SummaryRow label="Booking fees" value={formatMoney(booking.fees, booking.currency)} muted />
          {booking.baggageFees > 0 ? <SummaryRow label="Baggage" value={formatMoney(booking.baggageFees, booking.currency)} muted /> : null}
          {booking.seatFees > 0 ? <SummaryRow label="Seat selection" value={formatMoney(booking.seatFees, booking.currency)} muted /> : null}
          {booking.discount > 0 ? <SummaryRow label="Discount" value={`−${formatMoney(booking.discount, booking.currency)}`} muted /> : null}
        </div>

        <div className="flex items-end justify-between gap-3 pt-4">
          <div>
            <p className="text-xs font-semibold text-foreground">Total paid / due</p>
            <p className="mt-1 text-[10px] text-muted-foreground">Payment status: {booking.paymentStatus.replaceAll('_', ' ').toLowerCase()}</p>
          </div>
          <p className="text-xl font-semibold tracking-tight text-[#102A43]">{formatMoney(booking.totalAmount ?? 0, booking.currency)}</p>
        </div>
      </section>

      <section className="rounded-2xl border border-border/70 bg-card p-4 shadow-sm sm:p-5">
        <div className="flex items-center gap-3">
          <span className="flex size-9 items-center justify-center rounded-xl bg-muted text-muted-foreground">
            <CreditCard className="size-4.5" aria-hidden="true" />
          </span>
          <div>
            <h2 className="text-sm font-semibold text-foreground">Payment</h2>
            <p className="mt-0.5 text-xs text-muted-foreground">Mock payment record</p>
          </div>
          <div className="ml-auto"><CustomerStatusBadge status={booking.paymentStatus} /></div>
        </div>

        {booking.payment ? (
          <div className="mt-4 space-y-3">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">Payment reference</p>
              <p className="mt-1 break-all font-mono text-xs font-medium text-foreground">{booking.payment.providerReference}</p>
            </div>
            <div className="flex items-center justify-between gap-3 text-xs">
              <span className="text-muted-foreground">Method</span>
              <span className="font-medium text-foreground">{booking.payment.paymentMethod.replaceAll('_', ' ')}</span>
            </div>
            {booking.payment.paidAt ? (
              <div className="flex items-center justify-between gap-3 text-xs">
                <span className="text-muted-foreground">Paid on</span>
                <span className="font-medium text-foreground">{new Intl.DateTimeFormat('en-PH', { dateStyle: 'medium', timeZone: 'Asia/Manila' }).format(new Date(booking.payment.paidAt))}</span>
              </div>
            ) : null}
          </div>
        ) : (
          <p className="mt-4 text-xs leading-5 text-muted-foreground">No completed payment record is linked to this booking yet.</p>
        )}

        <Link href="/customer/payments" className="mt-4 inline-flex min-h-9 w-full items-center justify-center gap-2 rounded-xl border border-border px-3 py-2 text-xs font-semibold text-foreground outline-none transition hover:bg-muted focus-visible:ring-2 focus-visible:ring-[#5BA9D6] focus-visible:ring-offset-2">
          View payment history <ArrowUpRight className="size-3.5" aria-hidden="true" />
        </Link>
      </section>

      {booking.refund ? (
        <section className="rounded-2xl border border-violet-200 bg-violet-50/70 p-4 sm:p-5">
          <div className="flex items-center gap-2 text-violet-900">
            <RotateCcw className="size-4" aria-hidden="true" />
            <h2 className="text-sm font-semibold">Refund request</h2>
            <span className="ml-auto"><CustomerStatusBadge status={booking.refund.status} /></span>
          </div>
          <p className="mt-3 text-xs leading-5 text-violet-950/80">{booking.refund.reason}</p>
          <div className="mt-3 flex items-center justify-between gap-3 border-t border-violet-200 pt-3 text-xs">
            <span className="text-violet-900/70">Refund amount</span>
            <span className="font-semibold text-violet-950">{formatMoney(booking.refund.amount, booking.currency)}</span>
          </div>
        </section>
      ) : null}
    </div>
  );
}
