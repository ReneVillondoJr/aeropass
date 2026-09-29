import Link from 'next/link';

import {
  AlertCircle,
  ArrowRight,
  CreditCard,
  Luggage,
  RotateCcw,
  Timer,
} from 'lucide-react';

import { exceptionTypeLabels } from '../data/reports';

import type { ReportException } from '../types/reports';

interface ReportExceptionsProps {
  exceptions: ReportException[];
}

function getIcon(type: ReportException['type']) {
  switch (type) {
    case 'DELAY':
      return Timer;

    case 'PAYMENT':
      return CreditCard;

    case 'REFUND':
      return RotateCcw;

    case 'BAGGAGE':
      return Luggage;

    default:
      return AlertCircle;
  }
}

export function ReportExceptions({ exceptions }: ReportExceptionsProps) {
  return (
    <section className='rounded-2xl border border-border/70 bg-card shadow-sm'>
      <div className='flex items-start justify-between gap-4 border-b border-border/70 px-5 py-4'>
        <div>
          <h2 className='text-sm font-semibold'>Operational exceptions</h2>

          <p className='mt-1 text-xs text-muted-foreground'>
            Items that may require staff attention.
          </p>
        </div>

        <AlertCircle className='size-4 text-muted-foreground' />
      </div>

      <div className='divide-y divide-border/70'>
        {exceptions.length > 0 ?
          exceptions.map((item) => {
            const Icon = getIcon(item.type);

            return (
              <Link
                key={item.id}
                href={item.href}
                className='group flex items-center gap-3 px-5 py-4 transition-colors hover:bg-muted/30'
              >
                <div className='flex size-9 shrink-0 items-center justify-center rounded-xl bg-muted text-muted-foreground'>
                  <Icon className='size-4' />
                </div>

                <div className='min-w-0 flex-1'>
                  <div className='flex items-center gap-2'>
                    <p className='truncate text-sm font-medium'>{item.title}</p>

                    <span className='hidden rounded-md bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground sm:inline'>
                      {exceptionTypeLabels[item.type]}
                    </span>
                  </div>

                  <p className='mt-1 text-xs leading-5 text-muted-foreground'>
                    {item.description}
                  </p>
                </div>

                <ArrowRight className='size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-foreground' />
              </Link>
            );
          })
        : <div className='px-5 py-12 text-center'>
            <div className='mx-auto flex size-10 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600'>
              <AlertCircle className='size-4' />
            </div>

            <p className='mt-3 text-sm font-medium'>
              No operational exceptions
            </p>

            <p className='mt-1 text-xs text-muted-foreground'>
              Nothing currently requires attention in this report.
            </p>
          </div>
        }
      </div>
    </section>
  );
}
