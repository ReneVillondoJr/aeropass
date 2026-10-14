import { Armchair, UserRound, UsersRound } from 'lucide-react';

import { CustomerStatusBadge } from '@/components/customer/shared/customer-status-badge';

import type { BookingPassengerView, BookingReservationView, BookingTicketView } from '@/modules/customer/bookings/types/booking';

interface BookingPassengersProps {
  passengers: BookingPassengerView[];
  reservations: BookingReservationView[];
  tickets: BookingTicketView[];
}

export function BookingPassengers({ passengers, reservations, tickets }: BookingPassengersProps) {
  return (
    <section className="rounded-2xl border border-border/70 bg-card shadow-sm">
      <div className="flex items-center gap-3 border-b border-border/60 px-4 py-4 sm:px-5">
        <span className="flex size-9 items-center justify-center rounded-xl bg-[#EEF7FB] text-[#2879A8]">
          <UsersRound className="size-4.5" aria-hidden="true" />
        </span>
        <div>
          <h2 className="text-sm font-semibold text-foreground">Passengers and seats</h2>
          <p className="mt-0.5 text-xs text-muted-foreground">{passengers.length} {passengers.length === 1 ? 'passenger' : 'passengers'} on this reservation</p>
        </div>
      </div>

      <div className="divide-y divide-border/60">
        {passengers.length > 0 ? passengers.map((passenger, index) => {
          const reservation = reservations.find((item) => item.passengerName === passenger.fullName);
          const ticket = tickets.find((item) => item.passengerName === passenger.fullName);

          return (
            <div key={passenger.id} className="flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-start sm:justify-between sm:px-5">
              <div className="flex min-w-0 items-start gap-3">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-muted text-muted-foreground">
                  <UserRound className="size-4" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-foreground">{passenger.fullName}</p>
                  <p className="mt-1 break-all text-xs text-muted-foreground">{passenger.email}</p>
                  {passenger.phone ? <p className="mt-0.5 text-xs text-muted-foreground">{passenger.phone}</p> : null}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 sm:justify-end">
                <span className="inline-flex items-center gap-1.5 rounded-lg border border-border/70 bg-background px-2.5 py-1.5 text-[11px] font-medium text-foreground">
                  <Armchair className="size-3.5 text-muted-foreground" aria-hidden="true" />
                  {reservation?.seatNumber ?? 'Seat not assigned'}
                </span>
                {ticket ? <CustomerStatusBadge status={ticket.status} /> : (
                  <span className="text-[10px] text-muted-foreground">Ticket pending</span>
                )}
                <span className="sr-only">Passenger {index + 1}</span>
              </div>
            </div>
          );
        }) : (
          <p className="px-5 py-6 text-sm text-muted-foreground">Passenger details are not available for this booking.</p>
        )}
      </div>
    </section>
  );
}
