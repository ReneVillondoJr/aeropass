import Link from 'next/link';
import { ArrowUpRight, UsersRound } from 'lucide-react';

import { CustomerStatusBadge } from './customer-status-badge';
import { FlightRouteSummary } from './flight-route-summary';

export interface BookingCardData {
  id: string;
  bookingReference: string;
  status: string;
  originCode: string;
  originCity?: string;
  destinationCode: string;
  destinationCity?: string;
  departureAt?: string | Date | null;
  arrivalAt?: string | Date | null;
  flightNumber?: string;
  duration?: string;
  passengerCount?: number;
  cabinClass?: string;
  totalAmount?: number;
  currency?: string;
}

interface BookingCardProps {
  booking: BookingCardData;
  href: string;
  primaryAction?: {
    label: string;
    onClick: () => void;
    disabled?: boolean;
  };
}

function formatAmount(amount?: number, currency = 'PHP'): string | null {
  if (amount === undefined || !Number.isFinite(amount)) return null;

  try {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency,
      maximumFractionDigits: 2,
    }).format(amount);
  } catch {
    return `${currency} ${amount.toLocaleString('en-PH')}`;
  }
}

export function BookingCard({ booking, href, primaryAction }: BookingCardProps) {
  const amount = formatAmount(booking.totalAmount, booking.currency ?? 'PHP');

  return (
    <article className="overflow-hidden rounded-2xl border border-border/70 bg-card shadow-sm transition-shadow hover:shadow-md">
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-border/60 px-4 py-4 sm:px-5">
        <div className="min-w-0">
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">Booking reference</p>
          <p className="mt-1 break-all font-mono text-sm font-semibold tracking-wide text-foreground">{booking.bookingReference}</p>
        </div>
        <CustomerStatusBadge status={booking.status} />
      </div>

      <div className="px-4 py-5 sm:px-5">
        <FlightRouteSummary
          originCode={booking.originCode}
          originCity={booking.originCity}
          destinationCode={booking.destinationCode}
          destinationCity={booking.destinationCity}
          departureAt={booking.departureAt}
          arrivalAt={booking.arrivalAt}
          flightNumber={booking.flightNumber}
          duration={booking.duration}
        />

        <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-border/60 pt-4 text-xs text-muted-foreground">
          {booking.passengerCount !== undefined ? (
            <span className="inline-flex items-center gap-1.5">
              <UsersRound className="size-3.5" aria-hidden="true" />
              {booking.passengerCount} {booking.passengerCount === 1 ? 'passenger' : 'passengers'}
            </span>
          ) : null}
          {booking.cabinClass ? <span>{booking.cabinClass.replaceAll('_', ' ')}</span> : null}
          {amount ? <span className="ml-auto text-sm font-semibold text-foreground">{amount}</span> : null}
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-end gap-2">
          {primaryAction ? (
            <button
              type="button"
              onClick={primaryAction.onClick}
              disabled={primaryAction.disabled}
              className="inline-flex min-h-10 items-center justify-center rounded-xl bg-[#102A43] px-4 py-2 text-xs font-semibold text-white outline-none transition-colors hover:bg-[#183F5D] focus-visible:ring-2 focus-visible:ring-[#5BA9D6] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {primaryAction.label}
            </button>
          ) : null}
          <Link
            href={href}
            className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-border bg-background px-4 py-2 text-xs font-semibold text-foreground outline-none transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-[#5BA9D6] focus-visible:ring-offset-2"
          >
            View booking <ArrowUpRight className="size-3.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}
