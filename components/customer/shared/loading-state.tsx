interface CustomerLoadingStateProps {
  label?: string;
  rows?: number;
  variant?: 'list' | 'cards' | 'page';
}

export function CustomerLoadingState({
  label = 'Loading your information…',
  rows = 3,
  variant = 'list',
}: CustomerLoadingStateProps) {
  const safeRows = Math.min(6, Math.max(1, Math.floor(rows)));

  return (
    <div className="space-y-5" role="status" aria-live="polite" aria-busy="true">
      <span className="sr-only">{label}</span>

      {variant === 'page' ? (
        <div className="space-y-3">
          <div className="h-3 w-28 animate-pulse rounded bg-muted" />
          <div className="h-8 w-64 max-w-full animate-pulse rounded-lg bg-muted" />
          <div className="h-4 w-96 max-w-full animate-pulse rounded bg-muted" />
        </div>
      ) : null}

      <div className={variant === 'cards' ? 'grid gap-4 md:grid-cols-2 xl:grid-cols-3' : 'space-y-3'}>
        {Array.from({ length: safeRows }, (_, index) => (
          <div
            key={index}
            className="animate-pulse rounded-2xl border border-border/70 bg-card p-5"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 space-y-2">
                <div className="h-3 w-28 rounded bg-muted" />
                <div className="h-5 w-44 max-w-full rounded bg-muted" />
              </div>
              <div className="h-6 w-20 rounded-full bg-muted" />
            </div>
            <div className="mt-6 grid grid-cols-3 gap-3">
              <div className="h-12 rounded-lg bg-muted" />
              <div className="h-8 self-center rounded-lg bg-muted" />
              <div className="h-12 rounded-lg bg-muted" />
            </div>
            <div className="mt-5 h-3 w-2/3 rounded bg-muted" />
          </div>
        ))}
      </div>
    </div>
  );
}
