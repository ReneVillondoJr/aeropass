import { Bell, Search } from 'lucide-react';

interface NotificationEmptyStateProps {
  hasFilters: boolean;
}

export function NotificationEmptyState({
  hasFilters,
}: NotificationEmptyStateProps) {
  const Icon = hasFilters ? Search : Bell;

  return (
    <div className='flex min-h-[280px] flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card px-6 py-10 text-center'>
      <div className='flex size-14 items-center justify-center rounded-2xl bg-[#EEF7FB] text-[#102A43]'>
        <Icon className='size-6' />
      </div>

      <h3 className='mt-4 text-base font-semibold text-foreground'>
        {hasFilters ? 'No matching notifications' : 'You’re all caught up'}
      </h3>

      <p className='mt-2 max-w-sm text-sm leading-6 text-muted-foreground'>
        {hasFilters ?
          'Try changing your search or filters to find the notification you need.'
        : 'When there are updates about your bookings and flights, they will appear here.'
        }
      </p>
    </div>
  );
}
