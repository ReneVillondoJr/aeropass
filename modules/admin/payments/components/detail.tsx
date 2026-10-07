import {
  CalendarDays,
  CheckCircle2,
  CreditCard,
  FileText,
  History,
  Mail,
  Plane,
  RotateCcw,
  UserRound,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';

import type { PaymentViewModel } from '../types/payment';

interface PaymentDetailProps {
  payment: PaymentViewModel | null;
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

function formatStatus(value: string | null) {
  return value ?? '—';
}

function getStatusClasses(status: PaymentViewModel['status']) {
  switch (status) {
    case 'PAID':
      return 'border-emerald-200 bg-emerald-50 text-emerald-700';

    case 'PENDING':
      return 'border-amber-200 bg-amber-50 text-amber-700';

    case 'PROCESSING':
      return 'border-sky-200 bg-sky-50 text-sky-700';

    case 'FAILED':
      return 'border-orange-200 bg-orange-50 text-orange-700';

    case 'CANCELLED':
      return 'border-rose-200 bg-rose-50 text-rose-700';

    case 'REFUNDED':
      return 'border-violet-200 bg-violet-50 text-violet-700';

    default:
      return 'border-border/70 bg-muted/40 text-muted-foreground';
  }
}

export function PaymentDetail({ payment }: PaymentDetailProps) {
  if (!payment) {
    return (
      <section className='xl:sticky xl:top-6'>
        <div className='flex min-h-130 flex-col items-center justify-center rounded-2xl border border-dashed border-border/70 bg-background px-6 text-center shadow-sm'>
          <div className='flex size-12 items-center justify-center rounded-2xl bg-[#E5F5FC] text-[#5BA9D6]'>
            <CreditCard className='size-5' />
          </div>

          <h2 className='mt-4 text-sm font-semibold text-foreground'>
            Select a payment
          </h2>

          <p className='mt-1 max-w-sm text-xs leading-5 text-muted-foreground'>
            Choose a payment transaction from the roster to inspect transaction,
            booking, passenger, attempts, and refund information.
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
              <CreditCard className='size-5' />
            </div>

            <div className='min-w-0 flex-1'>
              <p className='text-[9px] font-medium uppercase tracking-[0.16em] text-white/45'>
                Payment details
              </p>

              <h2 className='mt-1 truncate text-lg font-semibold'>
                {formatCurrency(payment.amount)}
              </h2>

              <p className='mt-1 truncate text-[11px] text-white/60'>
                {payment.providerReference}
              </p>
            </div>

            <Badge
              variant='outline'
              className={`shrink-0 text-[9px] ${getStatusClasses(
                payment.status,
              )}`}
            >
              {payment.status}
            </Badge>
          </div>

          <div className='mt-4 flex flex-wrap gap-2'>
            <Badge
              variant='outline'
              className='border-white/15 bg-white/5 text-[9px] text-white'
            >
              {payment.paymentMethod}
            </Badge>

            <Badge
              variant='outline'
              className='border-white/15 bg-white/5 text-[9px] text-white'
            >
              {payment.provider}
            </Badge>

            {payment.bookingReference ?
              <Badge
                variant='outline'
                className='border-white/15 bg-white/5 text-[9px] text-white'
              >
                {payment.bookingReference}
              </Badge>
            : null}
          </div>
        </div>

        <div className='max-h-150 overflow-y-auto overscroll-contain'>
          <div className='space-y-5 p-5 sm:p-6'>
            <section>
              <div className='mb-3 flex items-center gap-2'>
                <CreditCard className='size-4 text-[#5BA9D6]' />

                <h3 className='text-xs font-semibold uppercase tracking-wide text-foreground'>
                  Transaction
                </h3>
              </div>

              <div className='rounded-2xl border border-border/60 bg-muted/20 p-4'>
                <div className='flex items-center justify-between gap-3'>
                  <div>
                    <p className='text-[10px] text-muted-foreground'>Amount</p>

                    <p className='mt-1 text-xl font-semibold'>
                      {formatCurrency(payment.amount)}
                    </p>
                  </div>

                  <div className='flex size-10 items-center justify-center rounded-xl bg-[#E5F5FC] text-[#5BA9D6]'>
                    <CreditCard className='size-4' />
                  </div>
                </div>

                <div className='my-4 border-t border-border/60' />

                <div className='grid gap-3 sm:grid-cols-2'>
                  <div>
                    <p className='text-[10px] text-muted-foreground'>Status</p>

                    <p className='mt-1 text-xs font-semibold'>
                      {payment.status}
                    </p>
                  </div>

                  <div>
                    <p className='text-[10px] text-muted-foreground'>Method</p>

                    <p className='mt-1 text-xs font-semibold'>
                      {payment.paymentMethod}
                    </p>
                  </div>

                  <div>
                    <p className='text-[10px] text-muted-foreground'>
                      Currency
                    </p>

                    <p className='mt-1 text-xs font-semibold'>
                      {payment.currency}
                    </p>
                  </div>

                  <div>
                    <p className='text-[10px] text-muted-foreground'>
                      Provider
                    </p>

                    <p className='mt-1 text-xs font-semibold'>
                      {payment.provider}
                    </p>
                  </div>

                  <div className='sm:col-span-2'>
                    <p className='text-[10px] text-muted-foreground'>
                      Provider reference
                    </p>

                    <p className='mt-1 break-all font-mono text-[11px] font-medium'>
                      {payment.providerReference}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className='border-t border-border/60 pt-5'>
              <div className='mb-3 flex items-center gap-2'>
                <CalendarDays className='size-4 text-[#5BA9D6]' />

                <h3 className='text-xs font-semibold uppercase tracking-wide text-foreground'>
                  Payment timing
                </h3>
              </div>

              <div className='grid gap-3 sm:grid-cols-2'>
                <div className='rounded-xl border border-border/60 bg-muted/20 p-3'>
                  <p className='text-[10px] text-muted-foreground'>Created</p>

                  <p className='mt-1 text-xs font-semibold'>
                    {formatDateTime(payment.createdAt)}
                  </p>
                </div>

                <div className='rounded-xl border border-border/60 bg-muted/20 p-3'>
                  <p className='text-[10px] text-muted-foreground'>Paid at</p>

                  <p className='mt-1 text-xs font-semibold'>
                    {formatDateTime(payment.paidAt)}
                  </p>
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
                    {payment.passengerName
                      ?.split(' ')
                      .filter(Boolean)
                      .slice(0, 2)
                      .map((part) => part.charAt(0))
                      .join('')
                      .toUpperCase() ?? 'AP'}
                  </div>

                  <div className='min-w-0'>
                    <p className='text-sm font-semibold'>
                      {payment.passengerName ?? 'Unknown passenger'}
                    </p>

                    <p className='mt-1 text-[10px] text-muted-foreground'>
                      Customer: {payment.customerName ?? 'Unknown customer'}
                    </p>
                  </div>
                </div>

                {payment.passengerEmail ?
                  <div className='mt-4 flex items-start gap-3'>
                    <Mail className='mt-0.5 size-4 text-muted-foreground' />

                    <div className='min-w-0'>
                      <p className='text-[10px] text-muted-foreground'>Email</p>

                      <p className='mt-0.5 break-all text-xs font-medium'>
                        {payment.passengerEmail}
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
                      {payment.bookingReference ?? '—'}
                    </p>
                  </div>

                  <div>
                    <p className='text-[10px] text-muted-foreground'>
                      Booking status
                    </p>

                    <p className='mt-1 text-xs font-semibold'>
                      {payment.bookingStatus ?? '—'}
                    </p>
                  </div>
                </div>

                <div className='my-4 border-t border-border/60' />

                <div className='flex items-center justify-center gap-3 text-center'>
                  <div className='min-w-0'>
                    <p className='text-lg font-semibold'>
                      {payment.originCode ?? '—'}
                    </p>

                    <p className='mt-0.5 truncate text-[10px] text-muted-foreground'>
                      {payment.originCity ?? 'Origin'}
                    </p>
                  </div>

                  <Plane className='size-4 shrink-0 text-[#5BA9D6]' />

                  <div className='min-w-0'>
                    <p className='text-lg font-semibold'>
                      {payment.destinationCode ?? '—'}
                    </p>

                    <p className='mt-0.5 truncate text-[10px] text-muted-foreground'>
                      {payment.destinationCity ?? 'Destination'}
                    </p>
                  </div>
                </div>

                <div className='my-4 border-t border-border/60' />

                <div className='grid gap-3 sm:grid-cols-2'>
                  <div>
                    <p className='text-[10px] text-muted-foreground'>Flight</p>

                    <p className='mt-1 text-xs font-semibold'>
                      {payment.flightNumber ?? '—'}
                    </p>
                  </div>

                  <div>
                    <p className='text-[10px] text-muted-foreground'>
                      Departure
                    </p>

                    <p className='mt-1 text-xs font-medium'>
                      {formatDate(payment.departureDate)}

                      {payment.departureTime ?
                        ` · ${payment.departureTime}`
                      : ''}
                    </p>
                  </div>

                  <div>
                    <p className='text-[10px] text-muted-foreground'>Arrival</p>

                    <p className='mt-1 text-xs font-medium'>
                      {formatDate(payment.arrivalDate)}

                      {payment.arrivalTime ? ` · ${payment.arrivalTime}` : ''}
                    </p>
                  </div>

                  <div>
                    <p className='text-[10px] text-muted-foreground'>
                      Booking total
                    </p>

                    <p className='mt-1 text-xs font-semibold'>
                      {formatCurrency(payment.bookingTotal)}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className='border-t border-border/60 pt-5'>
              <div className='mb-3 flex items-center gap-2'>
                <History className='size-4 text-[#5BA9D6]' />

                <h3 className='text-xs font-semibold uppercase tracking-wide text-foreground'>
                  Payment attempts
                </h3>
              </div>

              {payment.paymentAttempts.length > 0 ?
                <div className='space-y-2'>
                  {payment.paymentAttempts.map((attempt) => (
                    <div
                      key={attempt.id}
                      className='rounded-xl border border-border/60 bg-muted/20 p-3'
                    >
                      <div className='flex items-start justify-between gap-3'>
                        <div className='min-w-0'>
                          <p className='truncate text-xs font-semibold'>
                            {attempt.reference}
                          </p>

                          <p className='mt-1 text-[10px] text-muted-foreground'>
                            {attempt.method} ·{' '}
                            {formatDateTime(attempt.attemptedAt)}
                          </p>
                        </div>

                        <Badge
                          variant='outline'
                          className='shrink-0 text-[9px]'
                        >
                          {attempt.status}
                        </Badge>
                      </div>

                      <p className='mt-2 text-xs font-semibold'>
                        {formatCurrency(attempt.amount)}
                      </p>
                    </div>
                  ))}
                </div>
              : <div className='rounded-xl border border-dashed border-border/70 bg-muted/20 p-4 text-center'>
                  <p className='text-[10px] text-muted-foreground'>
                    No payment attempts recorded.
                  </p>
                </div>
              }
            </section>

            <section className='border-t border-border/60 pt-5'>
              <div className='mb-3 flex items-center gap-2'>
                <RotateCcw className='size-4 text-[#5BA9D6]' />

                <h3 className='text-xs font-semibold uppercase tracking-wide text-foreground'>
                  Refund
                </h3>
              </div>

              {payment.refundId ?
                <div className='rounded-2xl border border-violet-200 bg-violet-50 p-4'>
                  <div className='flex items-start justify-between gap-3'>
                    <div>
                      <p className='text-xs font-semibold text-violet-900'>
                        {payment.refundStatus ?? 'Refund record'}
                      </p>

                      <p className='mt-1 text-[10px] text-violet-800/70'>
                        {payment.refundReason ?? 'No refund reason provided.'}
                      </p>
                    </div>

                    <RotateCcw className='size-4 shrink-0 text-violet-700' />
                  </div>

                  <div className='mt-4'>
                    <p className='text-[10px] text-violet-800/70'>
                      Refund amount
                    </p>

                    <p className='mt-1 text-base font-semibold text-violet-900'>
                      {formatCurrency(payment.refundAmount)}
                    </p>
                  </div>
                </div>
              : <div className='rounded-xl border border-dashed border-border/70 bg-muted/20 p-4 text-center'>
                  <CheckCircle2 className='mx-auto size-5 text-muted-foreground' />

                  <p className='mt-2 text-[10px] text-muted-foreground'>
                    No refund record associated with this payment.
                  </p>
                </div>
              }
            </section>

            <section className='rounded-2xl border border-sky-200 bg-sky-50 p-4'>
              <div className='flex items-start gap-3'>
                <FileText className='mt-0.5 size-4 shrink-0 text-sky-700' />

                <div>
                  <p className='text-xs font-semibold text-sky-900'>
                    Payment record
                  </p>

                  <p className='mt-1 text-[10px] leading-5 text-sky-800/80'>
                    This transaction is linked to its booking, passenger,
                    flight, payment attempts, and refund record where
                    applicable.
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
