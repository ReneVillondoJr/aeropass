import type { ReactNode } from 'react';

import {
  BadgeCheck,
  Banknote,
  CalendarDays,
  CheckCircle2,
  CircleDollarSign,
  CreditCard,
  FileText,
  Luggage,
  MapPin,
  Plane,
  Receipt,
  Ticket,
  Users,
  WalletCards,
} from 'lucide-react';

import type { AircraftSeat } from '@/data/aeropass';
import { getAircraftSeats, getFareClassById } from '@/data/aeropass';

import {
  bookingStatusMeta,
  formatDate,
  formatDateTime,
  formatPhp,
  paymentMethodMeta,
  paymentStatusMeta,
} from '../data/booking';
import type { BookingDetailView } from '../types/booking';

interface BookingDetailProps {
  booking: BookingDetailView | null;
}

export function BookingDetail({ booking: item }: BookingDetailProps) {
  if (!item) {
    return (
      <section className='xl:sticky xl:top-6'>
        <div className='flex min-h-110 flex-col items-center justify-center rounded-2xl border border-dashed border-border/70 bg-background px-6 text-center shadow-sm'>
          <div className='flex size-12 items-center justify-center rounded-2xl bg-[#E5F5FC] text-[#5BA9D6]'>
            <Ticket className='size-5' />
          </div>

          <h2 className='mt-4 text-sm font-semibold text-foreground'>
            No booking selected
          </h2>

          <p className='mt-1 max-w-sm text-xs leading-5 text-muted-foreground'>
            Select a booking from the roster to inspect its reservation details.
          </p>
        </div>
      </section>
    );
  }

  const booking = item.booking;
  const bookingStatus = bookingStatusMeta[booking.status];
  const paymentStatus = paymentStatusMeta[booking.paymentStatus];
  const paymentMethod = paymentMethodMeta[booking.paymentMethod];

  const reservationSeatRecords =
    item.flight ? getAircraftSeats(item.flight.flight.aircraftId) : [];

  return (
    <section className='min-w-0 xl:sticky xl:top-6'>
      <div className='overflow-hidden rounded-2xl border border-border/70 bg-background shadow-sm'>
        {/* Header */}
        <div className='bg-[#102A43] px-5 py-5 text-white sm:px-6'>
          <div className='flex min-w-0 items-start justify-between gap-4'>
            <div className='flex min-w-0 items-start gap-3'>
              <div className='flex size-11 shrink-0 items-center justify-center rounded-2xl bg-white/10'>
                <Ticket className='size-5 text-[#B9E4F8]' />
              </div>

              <div className='min-w-0'>
                <p className='text-[9px] font-medium uppercase tracking-[0.16em] text-white/45'>
                  Booking details
                </p>

                <h2 className='mt-1 truncate text-lg font-semibold'>
                  {booking.bookingReference}
                </h2>

                <p className='mt-1 truncate text-[11px] text-white/60'>
                  {item.customerName}
                </p>
              </div>
            </div>

            <span
              className={[
                'shrink-0 rounded-full px-2.5 py-1 text-[10px] font-semibold',
                bookingStatus.className,
              ].join(' ')}
            >
              {bookingStatus.label}
            </span>
          </div>

          {item.flight ?
            <div className='mt-4 rounded-xl bg-white/[0.05] p-3'>
              <div className='flex items-center gap-2'>
                <Plane className='size-3.5 text-[#B9E4F8]' />

                <span className='text-sm font-semibold tabular-nums'>
                  {item.flight.flightNumber}
                </span>
              </div>

              <div className='mt-2 flex items-center gap-2 text-xs text-white/65'>
                <span className='font-semibold text-white'>
                  {item.flight.originCode}
                </span>

                <span>→</span>

                <span className='font-semibold text-white'>
                  {item.flight.destinationCode}
                </span>

                <span className='text-white/40'>·</span>

                <span>{formatDate(item.flight.flight.departureDate)}</span>
              </div>
            </div>
          : null}

          <div className='mt-4 grid grid-cols-2 gap-2'>
            <DarkMetric label='Passengers' value={booking.passengerCount} />

            <DarkMetric label='Total' value={formatPhp(booking.total)} />

            <DarkMetric label='Payment' value={paymentStatus.label} />

            <DarkMetric label='Method' value={paymentMethod.label} />
          </div>
        </div>

        {/* Scrollable content */}
        <div className='max-h-100 overflow-y-scroll overscroll-contain scrollbar-subtle'>
          <div className='space-y-5 p-5 sm:p-6'>
            {/* Customer */}
            <section>
              <SectionHeading
                icon={<Users className='size-4' />}
                title='Customer'
              />

              <div className='mt-4 grid gap-3 sm:grid-cols-2'>
                <InfoItem
                  icon={<Users className='size-3.5' />}
                  label='Account'
                  value={item.customerName}
                />

                <InfoItem
                  icon={<FileText className='size-3.5' />}
                  label='Email'
                  value={item.customerEmail}
                />

                <InfoItem
                  icon={<CreditCard className='size-3.5' />}
                  label='Phone'
                  value={item.customerPhone}
                />
              </div>
            </section>

            {/* Travel */}
            <section className='border-t border-border/60 pt-5'>
              <SectionHeading
                icon={<Plane className='size-4' />}
                title='Travel details'
              />

              {item.flight ?
                <div className='mt-4 space-y-3'>
                  <div className='rounded-2xl bg-[#EEF7FB] p-4'>
                    <div className='flex items-center justify-between gap-3'>
                      <div>
                        <p className='text-[10px] uppercase tracking-[0.08em] text-muted-foreground'>
                          Flight
                        </p>

                        <p className='mt-1 text-lg font-semibold tabular-nums text-[#102A43]'>
                          {item.flight.flightNumber}
                        </p>
                      </div>

                      <BadgeCheck className='size-5 text-[#102A43]' />
                    </div>

                    <div className='mt-4 grid grid-cols-[1fr_auto_1fr] items-center gap-3'>
                      <div className='min-w-0'>
                        <p className='text-lg font-semibold'>
                          {item.flight.originCode}
                        </p>

                        <p className='mt-1 truncate text-[10px] text-muted-foreground'>
                          {item.flight.originCity}
                        </p>
                      </div>

                      <Plane className='size-4 shrink-0 text-[#5BA9D6]' />

                      <div className='min-w-0 text-right'>
                        <p className='text-lg font-semibold'>
                          {item.flight.destinationCode}
                        </p>

                        <p className='mt-1 truncate text-[10px] text-muted-foreground'>
                          {item.flight.destinationCity}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className='grid gap-3 sm:grid-cols-2'>
                    <InfoItem
                      icon={<CalendarDays className='size-3.5' />}
                      label='Departure date'
                      value={formatDate(item.flight.flight.departureDate)}
                    />

                    <InfoItem
                      icon={<MapPin className='size-3.5' />}
                      label='Gate'
                      value={item.flight.flight.gate}
                    />

                    <InfoItem
                      icon={<CalendarDays className='size-3.5' />}
                      label='Departure'
                      value={item.flight.flight.departureTime}
                    />

                    <InfoItem
                      icon={<MapPin className='size-3.5' />}
                      label='Terminal'
                      value={item.flight.flight.terminal}
                    />
                  </div>
                </div>
              : <p className='mt-4 text-xs text-muted-foreground'>
                  Flight details unavailable.
                </p>
              }
            </section>

            {/* Passengers */}
            <section className='border-t border-border/60 pt-5'>
              <SectionHeading
                icon={<Users className='size-4' />}
                title='Passengers'
              />

              <div className='mt-4 space-y-3'>
                {item.passengers.length > 0 ?
                  item.passengers.map((passenger) => {
                    const name = [
                      passenger.firstName,
                      passenger.middleName,
                      passenger.lastName,
                    ]
                      .filter(Boolean)
                      .join(' ');

                    return (
                      <div
                        key={passenger.id}
                        className='min-w-0 rounded-xl bg-muted/20 p-3.5'
                      >
                        <div className='flex min-w-0 items-start justify-between gap-3'>
                          <div className='min-w-0'>
                            <p className='truncate text-sm font-semibold'>
                              {name}
                            </p>

                            <p className='mt-1 truncate text-xs text-muted-foreground'>
                              {passenger.email}
                            </p>
                          </div>

                          <span className='shrink-0 rounded-full bg-background px-2 py-1 text-[9px] font-semibold'>
                            {passenger.nationality}
                          </span>
                        </div>

                        <div className='mt-3 grid gap-3 sm:grid-cols-2'>
                          <InfoItem
                            icon={<FileText className='size-3.5' />}
                            label='Gender'
                            value={passenger.gender}
                          />

                          <InfoItem
                            icon={<CalendarDays className='size-3.5' />}
                            label='Date of birth'
                            value={formatDate(passenger.dateOfBirth)}
                          />
                        </div>
                      </div>
                    );
                  })
                : <p className='py-4 text-center text-xs text-muted-foreground'>
                    No passengers recorded.
                  </p>
                }
              </div>
            </section>

            {/* Reservations */}
            <section className='border-t border-border/60 pt-5'>
              <SectionHeading
                icon={<Receipt className='size-4' />}
                title='Reservations'
              />

              <div className='mt-4 space-y-3'>
                {item.reservations.length > 0 ?
                  item.reservations.map((reservation) => {
                    const fareClass = getFareClassById(reservation.fareClassId);

                    const seat = reservationSeatRecords.find(
                      (seatRecord) => seatRecord.id === reservation.seatId,
                    );

                    return (
                      <div
                        key={reservation.id}
                        className='min-w-0 rounded-xl bg-muted/20 p-3.5'
                      >
                        <div className='flex min-w-0 items-start justify-between gap-3'>
                          <div className='min-w-0'>
                            <p className='text-sm font-semibold'>
                              {seat?.seatNumber ?? reservation.seatId}
                            </p>

                            <p className='mt-1 truncate text-xs text-muted-foreground'>
                              {fareClass?.name ?? reservation.fareClassId}
                            </p>
                          </div>

                          <span className='shrink-0 rounded-full bg-background px-2 py-1 text-[9px] font-semibold'>
                            {reservation.status}
                          </span>
                        </div>

                        <div className='mt-3 flex items-center justify-between gap-3 border-t border-border/50 pt-3'>
                          <span className='text-xs text-muted-foreground'>
                            Fare
                          </span>

                          <span className='text-sm font-semibold tabular-nums'>
                            {formatPhp(reservation.price)}
                          </span>
                        </div>
                      </div>
                    );
                  })
                : <p className='py-4 text-center text-xs text-muted-foreground'>
                    No reservations recorded.
                  </p>
                }
              </div>
            </section>

            {/* Payment */}
            <section className='border-t border-border/60 pt-5'>
              <SectionHeading
                icon={<WalletCards className='size-4' />}
                title='Payment'
              />

              <div className='mt-4 space-y-4'>
                <div className='rounded-2xl bg-[#EEF7FB] p-4'>
                  <div className='flex items-start justify-between gap-4'>
                    <div>
                      <p className='text-[10px] uppercase tracking-[0.08em] text-muted-foreground'>
                        Booking total
                      </p>

                      <p className='mt-2 text-2xl font-semibold tracking-tight tabular-nums text-[#102A43]'>
                        {formatPhp(booking.total)}
                      </p>
                    </div>

                    <CircleDollarSign className='size-5 text-[#102A43]' />
                  </div>

                  <div className='mt-4 grid gap-3 sm:grid-cols-2'>
                    <InfoItem
                      icon={<CreditCard className='size-3.5' />}
                      label='Payment method'
                      value={paymentMethod.label}
                    />

                    <InfoItem
                      icon={<CheckCircle2 className='size-3.5' />}
                      label='Payment status'
                      value={paymentStatus.label}
                    />
                  </div>
                </div>

                <div className='space-y-2'>
                  <AmountRow label='Subtotal' value={booking.subtotal} />

                  <AmountRow label='Taxes' value={booking.taxes} />

                  <AmountRow label='Fees' value={booking.fees} />

                  <AmountRow
                    icon={<Luggage className='size-3.5' />}
                    label='Baggage'
                    value={booking.baggageFees}
                  />

                  <AmountRow label='Seat fees' value={booking.seatFees} />

                  <AmountRow label='Discount' value={-booking.discount} />

                  <div className='mt-3 flex items-center justify-between gap-3 border-t border-border pt-3'>
                    <span className='text-sm font-semibold'>Total</span>

                    <span className='text-base font-semibold tabular-nums'>
                      {formatPhp(booking.total)}
                    </span>
                  </div>
                </div>
              </div>

              {item.payment ?
                <div className='mt-4 rounded-xl bg-muted/20 p-3.5'>
                  <p className='text-[10px] font-medium uppercase tracking-[0.07em] text-muted-foreground'>
                    Provider reference
                  </p>

                  <p className='mt-1 break-all text-xs font-semibold'>
                    {item.payment.providerReference}
                  </p>

                  {item.payment.paidAt ?
                    <p className='mt-2 text-[10px] text-muted-foreground'>
                      Paid {formatDateTime(item.payment.paidAt)}
                    </p>
                  : null}
                </div>
              : null}
            </section>

            {/* Tickets */}
            <section className='border-t border-border/60 pt-5'>
              <SectionHeading
                icon={<Ticket className='size-4' />}
                title='Tickets'
              />

              <div className='mt-4 space-y-3'>
                {item.tickets.length > 0 ?
                  item.tickets.map((ticket) => (
                    <div
                      key={ticket.id}
                      className='min-w-0 rounded-xl bg-muted/20 p-3.5'
                    >
                      <div className='flex min-w-0 items-start justify-between gap-3'>
                        <div className='min-w-0'>
                          <p className='truncate text-sm font-semibold tabular-nums'>
                            {ticket.ticketNumber}
                          </p>

                          <p className='mt-1 truncate text-xs text-muted-foreground'>
                            Seat{' '}
                            {getSeatNumber(
                              reservationSeatRecords,
                              ticket.seatId,
                            )}
                          </p>
                        </div>

                        <span className='shrink-0 rounded-full bg-emerald-50 px-2 py-1 text-[9px] font-semibold text-emerald-700'>
                          {ticket.status}
                        </span>
                      </div>

                      <p className='mt-3 text-[10px] text-muted-foreground'>
                        Issued {formatDateTime(ticket.issuedAt)}
                      </p>
                    </div>
                  ))
                : <p className='py-4 text-center text-xs text-muted-foreground'>
                    No tickets issued.
                  </p>
                }
              </div>
            </section>

            {/* Refund */}
            {item.refund ?
              <section className='border-t border-border/60 pt-5'>
                <SectionHeading
                  icon={<Banknote className='size-4' />}
                  title='Refund'
                />

                <div className='mt-4 grid gap-3 sm:grid-cols-2'>
                  <InfoItem
                    icon={<CircleDollarSign className='size-3.5' />}
                    label='Amount'
                    value={formatPhp(item.refund.amount)}
                  />

                  <InfoItem
                    icon={<CheckCircle2 className='size-3.5' />}
                    label='Status'
                    value={item.refund.status}
                  />

                  <div className='sm:col-span-2'>
                    <InfoItem
                      icon={<FileText className='size-3.5' />}
                      label='Reason'
                      value={item.refund.reason}
                    />
                  </div>
                </div>
              </section>
            : null}

            {/* Booking record */}
            <section className='border-t border-border/60 pt-5'>
              <SectionHeading
                icon={<CalendarDays className='size-4' />}
                title='Booking record'
              />

              <div className='mt-4 grid gap-3 sm:grid-cols-2'>
                <InfoItem
                  icon={<CalendarDays className='size-3.5' />}
                  label='Created'
                  value={formatDateTime(booking.createdAt)}
                />

                {booking.expiresAt ?
                  <InfoItem
                    icon={<CalendarDays className='size-3.5' />}
                    label='Expires'
                    value={formatDateTime(booking.expiresAt)}
                  />
                : <InfoItem
                    icon={<CheckCircle2 className='size-3.5' />}
                    label='Expiration'
                    value='No expiration'
                  />
                }
              </div>
            </section>
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionHeading({ icon, title }: { icon: ReactNode; title: string }) {
  return (
    <div className='flex items-center gap-2'>
      <div className='flex size-7 items-center justify-center rounded-lg bg-[#EEF7FB] text-[#102A43]'>
        {icon}
      </div>

      <h3 className='text-xs font-semibold uppercase tracking-wide text-foreground'>
        {title}
      </h3>
    </div>
  );
}

function DarkMetric({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className='min-w-0 rounded-xl bg-white/[0.05] p-3'>
      <p className='truncate text-[9px] uppercase tracking-[0.09em] text-white/40'>
        {label}
      </p>

      <p className='mt-1.5 truncate text-sm font-semibold tabular-nums'>
        {value}
      </p>
    </div>
  );
}

function InfoItem({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className='flex min-w-0 items-start gap-3'>
      <div className='mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg bg-[#EEF7FB] text-[#102A43]'>
        {icon}
      </div>

      <div className='min-w-0'>
        <p className='text-[9px] font-medium uppercase tracking-[0.05em] text-muted-foreground'>
          {label}
        </p>

        <p className='mt-1 break-words text-xs font-semibold'>{value}</p>
      </div>
    </div>
  );
}

function AmountRow({
  icon,
  label,
  value,
}: {
  icon?: ReactNode;
  label: string;
  value: number;
}) {
  return (
    <div className='flex items-center justify-between gap-3 rounded-lg bg-muted/20 px-3 py-2.5'>
      <span className='flex min-w-0 items-center gap-1.5 text-xs text-muted-foreground'>
        {icon}
        <span className='truncate'>{label}</span>
      </span>

      <span className='shrink-0 text-xs font-semibold tabular-nums'>
        {formatPhp(value)}
      </span>
    </div>
  );
}

function getSeatNumber(seats: AircraftSeat[], seatId: string) {
  return seats.find((seat) => seat.id === seatId)?.seatNumber ?? seatId;
}
