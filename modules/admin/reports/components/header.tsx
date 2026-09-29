'use client';

import { CalendarRange, Download, FileBarChart } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { reportDateLabel, reportPeriods } from '../data/reports';

import type { ReportPeriod } from '../types/reports';

interface ReportHeaderProps {
  period: ReportPeriod;
  onPeriodChange: (period: ReportPeriod) => void;
}

export function ReportHeader({ period, onPeriodChange }: ReportHeaderProps) {
  return (
    <section className='mb-7'>
      <div className='flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between'>
        <div>
          <div className='mb-2 flex items-center gap-2'>
            <span className='flex size-8 items-center justify-center rounded-lg bg-muted text-muted-foreground'>
              <FileBarChart className='size-4' />
            </span>

            <span className='text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground'>
              Analytics
            </span>
          </div>

          <h1 className='text-2xl font-semibold tracking-tight sm:text-3xl'>
            Reports & analytics
          </h1>

          <p className='mt-1.5 max-w-2xl text-sm leading-6 text-muted-foreground'>
            Review financial performance, booking activity, flight operations,
            and passenger activity.
          </p>
        </div>

        <div className='flex flex-col gap-2 sm:flex-row sm:items-center'>
          <div className='flex items-center gap-2 rounded-xl border border-border/70 bg-card px-3 py-2 shadow-sm'>
            <CalendarRange className='size-4 text-muted-foreground' />

            <div className='min-w-0'>
              <p className='text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground'>
                Report date
              </p>

              <p className='text-xs font-medium'>{reportDateLabel}</p>
            </div>
          </div>

          <div className='flex rounded-xl border border-border/70 bg-card p-1 shadow-sm'>
            {reportPeriods.map((item) => (
              <button
                key={item.value}
                type='button'
                onClick={() => onPeriodChange(item.value)}
                className={[
                  'rounded-lg px-3 py-2 text-xs font-medium transition-colors',
                  period === item.value ?
                    'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                ].join(' ')}
              >
                {item.label}
              </button>
            ))}
          </div>

          <Button
            type='button'
            variant='outline'
            className='h-10 rounded-xl'
            disabled
            title='Available when report exports are connected.'
          >
            <Download className='mr-2 size-4' />
            Export report
          </Button>
        </div>
      </div>
    </section>
  );
}
