import Link from 'next/link';
import { Plane, type LucideIcon } from 'lucide-react';

interface CustomerEmptyStateProps {
  title: string;
  description: string;
  icon?: LucideIcon;
  actionLabel?: string;
  actionHref?: string;
  onAction?: () => void;
}

export function CustomerEmptyState({
  title,
  description,
  icon: Icon = Plane,
  actionLabel,
  actionHref,
  onAction,
}: CustomerEmptyStateProps) {
  const hasAction = Boolean(actionLabel && (actionHref || onAction));

  return (
    <section className="flex min-h-64 flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card/70 px-6 py-10 text-center">
      <span className="flex size-14 items-center justify-center rounded-2xl bg-[#EEF7FB] text-[#2879A8] ring-1 ring-[#D9EAF3]">
        <Icon className="size-6" aria-hidden="true" />
      </span>
      <h2 className="mt-4 text-base font-semibold tracking-tight text-foreground">{title}</h2>
      <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">{description}</p>
      {hasAction && actionLabel && actionHref ? (
        <Link
          href={actionHref}
          className="mt-5 inline-flex min-h-10 items-center justify-center rounded-xl bg-[#102A43] px-4 py-2 text-sm font-semibold text-white outline-none transition-colors hover:bg-[#183F5D] focus-visible:ring-2 focus-visible:ring-[#5BA9D6] focus-visible:ring-offset-2"
        >
          {actionLabel}
        </Link>
      ) : null}
      {hasAction && actionLabel && !actionHref && onAction ? (
        <button
          type="button"
          onClick={onAction}
          className="mt-5 inline-flex min-h-10 items-center justify-center rounded-xl bg-[#102A43] px-4 py-2 text-sm font-semibold text-white outline-none transition-colors hover:bg-[#183F5D] focus-visible:ring-2 focus-visible:ring-[#5BA9D6] focus-visible:ring-offset-2"
        >
          {actionLabel}
        </button>
      ) : null}
    </section>
  );
}
