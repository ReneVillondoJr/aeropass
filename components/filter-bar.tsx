import type { ReactNode } from 'react';

import { RotateCcw, Search } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface AdminFilterBarProps {
  search: string;
  searchPlaceholder: string;

  resultCount: number;
  resultLabel: string;
  resultLabelPlural?: string;

  hasFilters: boolean;

  onSearchChange: (value: string) => void;
  onReset: () => void;

  helperText?: string;

  children?: ReactNode;
}

export function AdminFilterBar({
  search,
  searchPlaceholder,
  resultCount,
  resultLabel,
  resultLabelPlural,
  hasFilters,
  onSearchChange,
  onReset,
  helperText,
  children,
}: AdminFilterBarProps) {
  const resultText =
    resultCount === 1 ? resultLabel : (resultLabelPlural ?? `${resultLabel}s`);

  return (
    <section className='rounded-[1.5rem] border border-border/70 bg-card px-4 py-4 shadow-sm sm:px-5'>
      <div className='flex min-w-0 flex-col gap-4 xl:flex-row xl:items-center xl:justify-between'>
        {/* Search */}
        <div className='relative min-w-0 flex-1 xl:max-w-xl'>
          <Search className='pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground' />

          <Input
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder={searchPlaceholder}
            aria-label={searchPlaceholder}
            className='h-10 border-border/70 bg-background pl-9 text-xs shadow-none focus-visible:ring-[#5BA9D6]/30'
          />
        </div>

        {/* Filters */}
        <div className='flex min-w-0 flex-wrap items-center gap-2'>
          {children}

          {hasFilters ?
            <Button
              type='button'
              variant='outline'
              onClick={onReset}
              className='h-10 shrink-0 gap-2 border-border/70 text-xs'
            >
              <RotateCcw className='size-3.5' />
              Reset
            </Button>
          : null}
        </div>
      </div>

      {/* Result information */}
      <div className='mt-3 flex min-w-0 items-center justify-between gap-4 border-t border-border/60 pt-3'>
        <p className='text-[10px] text-muted-foreground'>
          Showing{' '}
          <span className='font-semibold text-foreground'>{resultCount}</span>{' '}
          {resultText}
        </p>

        {helperText ?
          <p className='hidden truncate text-[10px] text-muted-foreground sm:block'>
            {helperText}
          </p>
        : null}
      </div>
    </section>
  );
}
