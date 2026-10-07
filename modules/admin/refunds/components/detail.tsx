import {
  CalendarDays,
  CheckCircle2,
  CreditCard,
  FileText,
  Mail,
  Plane,
  RotateCcw,
  UserRound,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';

import type { RefundViewModel } from '../types/refund';

interface RefundDetailProps {
  refund: RefundViewModel | null;
}

function formatDate(value: string | null) {
  if (!value) {
    return '—';
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat('en-PH', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}

function formatDateTime(value: string | null) {
  if (!value) {
    return '—';
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat('en-PH', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(date);
}

function formatCurrency(amount: number | null) {
  if (amount === null) {
    return '—';
  }

  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    maximumFractionDigits: 2,
  }).format(amount);
}

function getStatusClasses(status: RefundViewModel['status']) {
  switch (status) {
    case 'REQUESTED':
      return 'border-amber-200 bg-amber-50 text-amber-700';

    case 'PROCESSING':
      return 'border-sky-200 bg-sky-50 text-sky-700';

    case 'COMPLETED':
      return 'border-emerald-200 bg-emerald-50 text-emerald-700';

    case 'REJECTED':
      return 'border-rose-200 bg-rose-50 text-rose-700';

    default:
      return 'border-border/70 bg-muted/40 text-muted-foreground';
  }
}

function formatStatus(value: string | null) {
  return value ?? '—';
}

export function RefundDetail({ refund }: RefundDetailProps) {
  if (!refund) {
    return (
      <section className='xl:sticky xl:top-6'>
        <div className='flex min-h-[520px] flex-col items-center justify-center rounded-2xl border border-dashed border-border/70 bg-background px-6 text-center shadow-sm'>
          <div className='flex size-12 items-center justify-center rounded-2xl bg-[#E5F5FC] text-[#5BA9D6]'>
            <RotateCcw className='size-5' />
          </div>

          <h2 className='mt-4 text-sm font-semibold text-foreground'>
            Select a refund
          </h2>

          <p className='mt-1 max-w-sm text-xs leading-5 text-muted-foreground'>
            Choose a refund request from the roster to inspect refund, payment,
            booking, passenger, and flight details.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className='min-w-0 xl:sticky xl:top-6'>
      <div className='overflow-hidden rounded-2xl border border-border/70 bg-background shadow-sm'>
        <div className='bg-[#102A43] px-5 py-5 text-white sm:px-6'>
          <div className='flex items-start gap-3'>
            <div className='flex size-11 shrink-0 items-center justify-center rounded-2xl bg-white/10'>
              <RotateCcw className='size-5' />
            </div>

            <div className='min-w-0 flex-1'>
              <p className='text-[9px] font-medium uppercase tracking-[0.16em] text-white/45'>
                Refund details
              </p>

              <h2 className='mt-1 truncate text-lg font-semibold'>
                {formatCurrency(refund.amount)}
              </h2>

              <p className='mt-1 truncate text-[11px] text-white/60'>
                {refund.bookingReference ?? 'No booking'}
                {' · '}
                {refund.paymentMethod ?? 'Payment unavailable'}
              </p>
            </div>

            <Badge
              variant='outline'
              className={`shrink-0 text-[9px] ${getStatusClasses(
                refund.status,
              )}`}
            >
              {refund.status.toLowerCase().charAt(0).toUpperCase() +
                refund.status.toLowerCase().slice(1)}
            </Badge>
          </div>

          <div className='mt-4 flex flex-wrap gap-2'>
            <Badge
              variant='outline'
              className='border-white/15 bg-white/5 text-[9px] text-white'
            >
              {refund.paymentMethod ?? 'No payment method'}
            </Badge>

            {refund.providerReference ?
              <Badge
                variant='outline'
                className='border-white/15 bg-white/5 text-[9px] text-white'
              >
                {refund.providerReference}
              </Badge>
            : null}
          </div>
        </div>

        <div className='max-h-150 overflow-y-auto overscroll-contain'>
          <div className='space-y-5 p-5 sm:p-6'>
            <section>
              <div className='mb-3 flex items-center gap-2'>
                <RotateCcw className='size-4 text-[#5BA9D6]' />

                <h3 className='text-xs font-semibold uppercase tracking-wide text-foreground'>
                  Refund request
                </h3>
              </div>

              <div className='rounded-2xl border border-border/60 bg-muted/20 p-4'>
                <div className='flex items-start justify-between gap-3'>
                  <div>
                    <p className='text-[10px] text-muted-foreground'>
                      Refund amount
                    </p>

                    <p className='mt-1 text-xl font-semibold'>
                      {formatCurrency(refund.amount)}
                    </p>
                  </div>

                  <Badge
                    variant='outline'
                    className={`text-[9px] ${getStatusClasses(refund.status)}`}
                  >
                    {refund.status}
                  </Badge>
                </div>

                <div className='my-4 border-t border-border/60' />

                <div>
                  <p className='text-[10px] text-muted-foreground'>Reason</p>

                  <p className='mt-1 text-xs font-medium leading-5'>
                    {refund.reason}
                  </p>
                </div>

                <div className='mt-4 grid gap-3 sm:grid-cols-2'>
                  <div>
                    <p className='text-[10px] text-muted-foreground'>
                      Requested at
                    </p>

                    <p className='mt-1 text-xs font-semibold'>
                      {formatDateTime(refund.requestedAt)}
                    </p>
                  </div>

                  <div>
                    <p className='text-[10px] text-muted-foreground'>
                      Processed at
                    </p>

                    <p className='mt-1 text-xs font-semibold'>
                      {formatDateTime(refund.processedAt)}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className='border-t border-border/60 pt-5'>
              <div className='mb-3 flex items-center gap-2'>
                <UserRound className='size-4 text-[#5BA9D6]' />

                <h3 className='text-xs font-semibold uppercase tracking-wide text-foreground'>
                  Requested by
                </h3>
              </div>

              <div className='rounded-xl border border-border/60 bg-muted/20 p-4'>
                <p className='text-sm font-semibold'>{refund.requestedBy}</p>

                <p className='mt-1 text-[10px] text-muted-foreground'>
                  {refund.requestedByEmail ?? 'No email available'}
                </p>
              </div>
            </section>

            <section className='border-t border-border/60 pt-5'>
              <div className='mb-3 flex items-center gap-2'>
                <CreditCard className='size-4 text-[#5BA9D6]' />

                <h3 className='text-xs font-semibold uppercase tracking-wide text-foreground'>
                  Original payment
                </h3>
              </div>

              <div className='rounded-2xl border border-border/60 bg-muted/20 p-4'>
                <div className='flex items-center justify-between gap-3'>
                  <div>
                    <p className='text-[10px] text-muted-foreground'>
                      Refund amount
                    </p>

                    <p className='mt-1 text-lg font-semibold'>
                      {formatCurrency(refund.amount)}
                    </p>
                  </div>

                  <div className='flex size-9 items-center justify-center rounded-xl bg-[#E5F5FC] text-[#5BA9D6]'>
                    <CreditCard className='size-4' />
                  </div>
                </div>

                <div className='my-4 border-t border-border/60' />

                <div className='grid gap-3 sm:grid-cols-2'>
                  <div>
                    <p className='text-[10px] text-muted-foreground'>
                      Payment reference
                    </p>

                    <p className='mt-1 break-all font-mono text-[10px] font-medium'>
                      {refund.providerReference ?? '—'}
                    </p>
                  </div>

                  <div>
                    <p className='text-[10px] text-muted-foreground'>
                      Payment status
                    </p>

                    <p className='mt-1 text-xs font-semibold'>
                      {refund.paymentStatus ?? '—'}
                    </p>
                  </div>

                  <div>
                    <p className='text-[10px] text-muted-foreground'>
                      Payment method
                    </p>

                    <p className='mt-1 text-xs font-semibold'>
                      {refund.paymentMethod ?? '—'}
                    </p>
                  </div>

                  <div>
                    <p className='text-[10px] text-muted-foreground'>
                      Original amount
                    </p>

                    <p className='mt-1 text-xs font-semibold'>
                      {formatCurrency(refund.paymentAmount)}
                    </p>
                  </div>

                  <div className='sm:col-span-2'>
                    <p className='text-[10px] text-muted-foreground'>Paid at</p>

                    <p className='mt-1 text-xs font-semibold'>
                      {formatDateTime(refund.paymentPaidAt)}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className='border-t border-border/60 pt-5'>
              <div className='mb-3 flex items-center gap-2'>
                <UserRound className='size-4 text-[#5BA9D6]' />

                <h3 className='text-xs font-semibold uppercase tracking-wide text-foreground'>
                  Customer & passenger
                </h3>
              </div>

              <div className='rounded-2xl border border-border/60 bg-muted/20 p-4'>
                <div className='flex items-start gap-3'>
                  <div className='flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#E5F5FC] text-xs font-semibold text-[#356D91]'>
                    {refund.passengerName
                      ?.split(' ')
                      .filter(Boolean)
                      .slice(0, 2)
                      .map((part) => part.charAt(0))
                      .join('')
                      .toUpperCase() ?? 'AP'}
                  </div>

                  <div className='min-w-0'>
                    <p className='text-sm font-semibold'>
                      {refund.passengerName ?? 'Unknown passenger'}
                    </p>

                    <p className='mt-1 text-[10px] text-muted-foreground'>
                      Customer: {refund.customerName ?? 'Unknown customer'}
                    </p>
                  </div>
                </div>

                {refund.passengerEmail ?
                  <div className='mt-4 flex items-start gap-3'>
                    <Mail className='mt-0.5 size-4 text-muted-foreground' />

                    <div className='min-w-0'>
                      <p className='text-[10px] text-muted-foreground'>Email</p>

                      <p className='mt-0.5 break-all text-xs font-medium'>
                        {refund.passengerEmail}
                      </p>
                    </div>
                  </div>
                : null}

                {refund.passengerPhone ?
                  <div className='mt-4 flex items-start gap-3'>
                    <UserRound className='mt-0.5 size-4 text-muted-foreground' />

                    <div>
                      <p className='text-[10px] text-muted-foreground'>Phone</p>

                      <p className='mt-0.5 text-xs font-medium'>
                        {refund.passengerPhone}
                      </p>
                    </div>
                  </div>
                : null}
              </div>
            </section>

            <section className='border-t border-border/60 pt-5'>
              <div className='mb-3 flex items-center gap-2'>
                <Plane className='size-4 text-[#5BA9D6]' />

                <h3 className='text-xs font-semibold uppercase tracking-wide text-foreground'>
                  Booking & flight
                </h3>
              </div>

              <div className='rounded-2xl border border-border/60 bg-muted/20 p-4'>
                <div className='grid gap-3 sm:grid-cols-2'>
                  <div>
                    <p className='text-[10px] text-muted-foreground'>
                      Booking reference
                    </p>

                    <p className='mt-1 text-xs font-semibold'>
                      {refund.bookingReference ?? '—'}
                    </p>
                  </div>

                  <div>
                    <p className='text-[10px] text-muted-foreground'>
                      Booking status
                    </p>

                    <p className='mt-1 text-xs font-semibold'>
                      {refund.bookingStatus ?? '—'}
                    </p>
                  </div>
                </div>

                <div className='my-4 border-t border-border/60' />

                <div className='flex items-center justify-center gap-3 text-center'>
                  <div className='min-w-0'>
                    <p className='text-lg font-semibold'>
                      {refund.originCode ?? '—'}
                    </p>

                    <p className='mt-0.5 truncate text-[10px] text-muted-foreground'>
                      {refund.originCity ?? 'Origin'}
                    </p>
                  </div>

                  <Plane className='size-4 shrink-0 text-[#5BA9D6]' />

                  <div className='min-w-0'>
                    <p className='text-lg font-semibold'>
                      {refund.destinationCode ?? '—'}
                    </p>

                    <p className='mt-0.5 truncate text-[10px] text-muted-foreground'>
                      {refund.destinationCity ?? 'Destination'}
                    </p>
                  </div>
                </div>

                <div className='my-4 border-t border-border/60' />

                <div className='grid gap-3 sm:grid-cols-2'>
                  <div>
                    <p className='text-[10px] text-muted-foreground'>Flight</p>

                    <p className='mt-1 text-xs font-semibold'>
                      {refund.flightNumber ?? '—'}
                    </p>
                  </div>

                  <div>
                    <p className='text-[10px] text-muted-foreground'>
                      Booking total
                    </p>

                    <p className='mt-1 text-xs font-semibold'>
                      {formatCurrency(refund.bookingTotal)}
                    </p>
                  </div>

                  <div>
                    <p className='text-[10px] text-muted-foreground'>
                      Departure
                    </p>

                    <p className='mt-1 text-xs font-medium'>
                      {formatDate(refund.departureDate)}

                      {refund.departureTime ? ` · ${refund.departureTime}` : ''}
                    </p>
                  </div>

                  <div>
                    <p className='text-[10px] text-muted-foreground'>Arrival</p>

                    <p className='mt-1 text-xs font-medium'>
                      {formatDate(refund.arrivalDate)}

                      {refund.arrivalTime ? ` · ${refund.arrivalTime}` : ''}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className='border-t border-border/60 pt-5'>
              <div className='mb-3 flex items-center gap-2'>
                <CalendarDays className='size-4 text-[#5BA9D6]' />

                <h3 className='text-xs font-semibold uppercase tracking-wide text-foreground'>
                  Refund timeline
                </h3>
              </div>

              <div className='space-y-3'>
                <div className='flex items-start gap-3 rounded-xl border border-border/60 bg-muted/20 p-3'>
                  <div className='mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg bg-[#E5F5FC] text-[#5BA9D6]'>
                    <RotateCcw className='size-3.5' />
                  </div>

                  <div>
                    <p className='text-xs font-semibold'>Refund requested</p>

                    <p className='mt-1 text-[10px] text-muted-foreground'>
                      {formatDateTime(refund.requestedAt)}
                    </p>
                  </div>
                </div>

                <div className='flex items-start gap-3 rounded-xl border border-border/60 bg-muted/20 p-3'>
                  <div className='mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg bg-[#E5F5FC] text-[#5BA9D6]'>
                    <CheckCircle2 className='size-3.5' />
                  </div>

                  <div>
                    <p className='text-xs font-semibold'>Refund processed</p>

                    <p className='mt-1 text-[10px] text-muted-foreground'>
                      {formatDateTime(refund.processedAt)}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className='rounded-2xl border border-sky-200 bg-sky-50 p-4'>
              <div className='flex items-start gap-3'>
                <FileText className='mt-0.5 size-4 shrink-0 text-sky-700' />

                <div>
                  <p className='text-xs font-semibold text-sky-900'>
                    Refund record
                  </p>

                  <p className='mt-1 text-[10px] leading-5 text-sky-800/80'>
                    This refund is linked to its original payment and booking,
                    with the request reason, requester, processing status, and
                    timestamps retained in the AeroPass record.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </section>
  );
}
