import { CalendarDays, CircleCheck } from 'lucide-react';

interface DashboardHeaderProps {
  operationsDate: string;
}

export function DashboardHeader({ operationsDate }: DashboardHeaderProps) {
  return (
    <section className='mb-7'>
      <div className='flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between'>
        <div>
          <div className='mb-2 flex items-center gap-2'>
            <span className='inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-400'>
              <CircleCheck className='size-3.5' />
              Operations online
            </span>
          </div>

          <h1 className='text-2xl font-semibold tracking-tight sm:text-3xl'>
            Operations overview
          </h1>

          <p className='mt-1.5 max-w-2xl text-sm leading-6 text-muted-foreground'>
            Monitor flight activity, bookings, passenger operations, and revenue
            from one workspace.
          </p>
        </div>

        <div className='flex items-center gap-2 rounded-xl border border-border/70 bg-card px-3 py-2.5 shadow-sm'>
          <CalendarDays className='size-4 text-muted-foreground' />

          <div>
            <p className='text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground'>
              Operations date
            </p>

            <p className='mt-0.5 text-sm font-medium'>{operationsDate}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
