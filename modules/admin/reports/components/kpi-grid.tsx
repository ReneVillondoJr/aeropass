import { reportKpiIcons } from '../data/reports';

import type { ReportKpi } from '../types/reports';

interface ReportKpiGridProps {
  items: ReportKpi[];
}

export function ReportKpiGrid({ items }: ReportKpiGridProps) {
  return (
    <section className='grid gap-3 sm:grid-cols-2 xl:grid-cols-6'>
      {items.map((item) => {
        const Icon = reportKpiIcons[item.icon];

        return (
          <article
            key={item.id}
            className='rounded-2xl border border-border/70 bg-card p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md'
          >
            <div className='flex size-9 items-center justify-center rounded-xl bg-muted text-muted-foreground'>
              <Icon className='size-4' />
            </div>

            <p className='mt-4 text-2xl font-semibold tracking-tight'>
              {item.value}
            </p>

            <p className='mt-1 text-sm font-medium'>{item.label}</p>

            <p className='mt-1 text-[11px] leading-5 text-muted-foreground'>
              {item.description}
            </p>
          </article>
        );
      })}
    </section>
  );
}
