import { CheckCircle2, Luggage, TicketCheck } from 'lucide-react';

import type { ReportOperations } from '../types/reports';

interface ReportOperationsProps {
  operations: ReportOperations;
}

export function ReportOperations({ operations }: ReportOperationsProps) {
  const items = [
    {
      label: 'Check-ins',
      value: operations.totalCheckIns,
      description: `${operations.checkInRate}% of booked passengers`,
      icon: TicketCheck,
    },
    {
      label: 'Boardings',
      value: operations.totalBoardings,
      description: `${operations.boardingRate}% of checked-in passengers`,
      icon: CheckCircle2,
    },
    {
      label: 'Checked baggage',
      value: operations.checkedBaggage,
      description: `${operations.baggageInProgress} currently in progress`,
      icon: Luggage,
    },
  ] as const;

  return (
    <section className='rounded-2xl border border-border/70 bg-card p-5 shadow-sm'>
      <div>
        <p className='text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground'>
          Passenger operations
        </p>

        <h2 className='mt-1 text-lg font-semibold'>Check-in & boarding</h2>
      </div>

      <div className='mt-6 space-y-3'>
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.label}
              className='flex items-center gap-3 rounded-xl border border-border/70 bg-muted/20 p-3.5'
            >
              <div className='flex size-9 shrink-0 items-center justify-center rounded-xl bg-background text-muted-foreground'>
                <Icon className='size-4' />
              </div>

              <div className='min-w-0 flex-1'>
                <p className='text-sm font-medium'>{item.label}</p>

                <p className='mt-0.5 text-xs text-muted-foreground'>
                  {item.description}
                </p>
              </div>

              <p className='text-lg font-semibold'>{item.value}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
