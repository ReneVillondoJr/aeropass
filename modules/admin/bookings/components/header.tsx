import {
  BadgeCheck,
  CircleDollarSign,
  Plane,
  Ticket,
  Users,
} from 'lucide-react';

import type { BookingStats } from '../types/booking';

import { formatPhp } from '../data/booking';

interface BookingHeaderProps {
  stats: BookingStats;
}

export function BookingHeader({ stats }: BookingHeaderProps) {
  return (
    <section className='overflow-hidden rounded-3xl bg-[#102A43] text-white shadow-sm'>
      <div className='relative p-6 sm:p-7'>
        <div className='absolute -right-20 -top-24 size-64 rounded-full bg-[#5BA9D6]/10 blur-3xl' />

        <div className='relative'>
          <div className='flex flex-col gap-7 xl:flex-row xl:items-end xl:justify-between'>
            <div className='max-w-2xl'>
              <div className='mb-3 flex items-center gap-2'>
                <div className='flex size-9 items-center justify-center rounded-xl bg-white/10'>
                  <Ticket className='size-4 text-[#B9E4F8]' />
                </div>

                <span className='text-xs font-semibold uppercase tracking-[0.14em] text-[#B9E4F8]'>
                  Reservation control
                </span>
              </div>

              <h1 className='text-2xl font-semibold tracking-tight sm:text-3xl'>
                Bookings
              </h1>

              <p className='mt-2 max-w-xl text-sm leading-6 text-white/65'>
                Monitor customer reservations, passenger records, payment state,
                travel value, and booking lifecycle from one operational
                workspace.
              </p>
            </div>

            <div className='grid grid-cols-2 gap-3 sm:grid-cols-4 xl:w-[500px]'>
              <HeaderMetric
                icon={<Ticket className='size-4' />}
                label='Bookings'
                value={stats.totalBookings}
              />

              <HeaderMetric
                icon={<BadgeCheck className='size-4' />}
                label='Travel ready'
                value={stats.confirmedBookings}
              />

              <HeaderMetric
                icon={<Users className='size-4' />}
                label='Passengers'
                value={stats.totalPassengers}
              />

              <HeaderMetric
                icon={<CircleDollarSign className='size-4' />}
                label='Paid value'
                value={formatPhp(stats.paidValue)}
              />
            </div>
          </div>

          <div className='mt-7 border-t border-white/10 pt-4'>
            <div className='grid gap-4 text-xs sm:grid-cols-3'>
              <HeaderFootprint
                label='Booking value'
                value={formatPhp(stats.totalValue)}
              />

              <HeaderFootprint
                label='Pending payment'
                value={stats.pendingPayment}
              />

              <HeaderFootprint
                label='Refund pending'
                value={stats.refundPending}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HeaderMetric({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}) {
  return (
    <div className='min-w-0 rounded-2xl border border-white/10 bg-white/[0.07] p-3'>
      <div className='flex min-w-0 items-center gap-2 text-white/50'>
        {icon}

        <span className='truncate text-[10px] font-medium uppercase tracking-[0.08em]'>
          {label}
        </span>
      </div>

      <p className='mt-2 truncate text-xl font-semibold tabular-nums'>
        {value}
      </p>
    </div>
  );
}

function HeaderFootprint({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className='min-w-0'>
      <p className='text-white/40'>{label}</p>

      <p className='mt-1 truncate font-medium text-white/90'>{value}</p>
    </div>
  );
}
