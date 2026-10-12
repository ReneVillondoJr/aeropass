interface CustomerStatusBadgeProps {
  status: string;
  className?: string;
}

const statusStyles: Record<string, string> = {
  CONFIRMED: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  PAID: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  COMPLETED: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  ISSUED: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  ACTIVE: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  CHECKED_IN: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  BOARDED: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  PENDING: 'border-amber-200 bg-amber-50 text-amber-700',
  PENDING_PAYMENT: 'border-amber-200 bg-amber-50 text-amber-700',
  PROCESSING: 'border-amber-200 bg-amber-50 text-amber-700',
  REQUESTED: 'border-amber-200 bg-amber-50 text-amber-700',
  SCHEDULED: 'border-sky-200 bg-sky-50 text-sky-700',
  CHECK_IN_OPEN: 'border-sky-200 bg-sky-50 text-sky-700',
  BOARDING: 'border-sky-200 bg-sky-50 text-sky-700',
  DELAYED: 'border-orange-200 bg-orange-50 text-orange-700',
  FAILED: 'border-red-200 bg-red-50 text-red-700',
  CANCELLED: 'border-red-200 bg-red-50 text-red-700',
  CANCELED: 'border-red-200 bg-red-50 text-red-700',
  REJECTED: 'border-red-200 bg-red-50 text-red-700',
  EXPIRED: 'border-slate-200 bg-slate-100 text-slate-600',
  REFUNDED: 'border-violet-200 bg-violet-50 text-violet-700',
  PARTIALLY_REFUNDED: 'border-violet-200 bg-violet-50 text-violet-700',
  DEPARTED: 'border-slate-200 bg-slate-100 text-slate-700',
  ARRIVED: 'border-slate-200 bg-slate-100 text-slate-700',
};

function formatStatus(status: string): string {
  return status
    .trim()
    .toLowerCase()
    .split(/[_\s-]+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function CustomerStatusBadge({ status, className = '' }: CustomerStatusBadgeProps) {
  const normalizedStatus = status.trim().toUpperCase().replace(/[\s-]+/g, '_');
  const styles = statusStyles[normalizedStatus] ?? 'border-border bg-muted/70 text-muted-foreground';

  return (
    <span
      className={[
        'inline-flex max-w-full items-center rounded-full border px-2.5 py-1 text-[10px] font-semibold leading-4 sm:text-[11px]',
        styles,
        className,
      ].filter(Boolean).join(' ')}
    >
      <span className="mr-1.5 size-1.5 shrink-0 rounded-full bg-current opacity-75" aria-hidden="true" />
      <span className="truncate">{formatStatus(status)}</span>
    </span>
  );
}
