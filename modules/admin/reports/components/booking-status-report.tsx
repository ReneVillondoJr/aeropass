import { ClipboardCheck } from 'lucide-react';

import type { StatusSummary } from '../types/reports';

interface BookingStatusReportProps {
  statuses: StatusSummary[];
}

export function BookingStatusReport({ statuses }: BookingStatusReportProps) {
  return (
    <section className='rounded-2xl border border-border/70 bg-card p-5 shadow-sm'>
      <div className='flex items-start justify-between'>
        <div>
          <p className='text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground'>
            Bookings
          </p>

          <h2 className='mt-1 text-lg font-semibold'>Booking status</h2>
        </div>

        <div className='flex size-9 items-center justify-center rounded-xl bg-muted text-muted-foreground'>
          <ClipboardCheck className='size-4' />
        </div>
      </div>

      <div className='mt-6 space-y-5'>
        {statuses.length > 0 ?
          statuses.map((item) => (
            <div key={item.status}>
              <div className='mb-2 flex items-center justify-between gap-3'>
                <div className='flex min-w-0 items-center gap-2'>
                  <span className='truncate text-sm font-medium'>
                    {item.label}
                  </span>

                  <span className='text-xs text-muted-foreground'>
                    {item.count}
                  </span>
                </div>

                <span className='text-xs font-medium text-muted-foreground'>
                  {item.percentage}%
                </span>
              </div>

              <div className='h-2 overflow-hidden rounded-full bg-muted'>
                <div
                  className='h-full rounded-full bg-primary transition-all duration-500'
                  style={{
                    width: `${item.percentage}%`,
                  }}
                />
              </div>
            </div>
          ))
        : <div className='rounded-xl border border-dashed border-border px-4 py-10 text-center'>
            <p className='text-sm font-medium'>No booking activity</p>
          </div>
        }
      </div>
    </section>
  );
}
