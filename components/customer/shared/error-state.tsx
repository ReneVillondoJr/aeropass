import Link from 'next/link';
import { AlertTriangle, ArrowLeft, RefreshCw } from 'lucide-react';

interface CustomerErrorStateProps {
  title?: string;
  description?: string;
  retryLabel?: string;
  onRetry?: () => void;
  backHref?: string;
  backLabel?: string;
}

export function CustomerErrorState({
  title = 'We couldn’t load this information',
  description = 'Something went wrong while loading this page. Please try again.',
  retryLabel = 'Try again',
  onRetry,
  backHref,
  backLabel = 'Go back',
}: CustomerErrorStateProps) {
  return (
    <section className="flex min-h-64 flex-col items-center justify-center rounded-2xl border border-red-200/80 bg-card px-6 py-10 text-center">
      <span className="flex size-14 items-center justify-center rounded-2xl bg-red-50 text-red-600 ring-1 ring-red-100">
        <AlertTriangle className="size-6" aria-hidden="true" />
      </span>
      <h2 className="mt-4 text-base font-semibold text-foreground">{title}</h2>
      <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">{description}</p>
      <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
        {onRetry ? (
          <button
            type="button"
            onClick={onRetry}
            className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl bg-[#102A43] px-4 py-2 text-sm font-semibold text-white outline-none transition-colors hover:bg-[#183F5D] focus-visible:ring-2 focus-visible:ring-[#5BA9D6] focus-visible:ring-offset-2"
          >
            <RefreshCw className="size-4" aria-hidden="true" />
            {retryLabel}
          </button>
        ) : null}
        {backHref ? (
          <Link
            href={backHref}
            className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-border bg-background px-4 py-2 text-sm font-semibold text-foreground outline-none transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-[#5BA9D6] focus-visible:ring-offset-2"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            {backLabel}
          </Link>
        ) : null}
      </div>
    </section>
  );
}
