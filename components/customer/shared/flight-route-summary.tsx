import { ArrowRight, PlaneTakeoff } from 'lucide-react';

export interface FlightRouteSummaryProps {
  originCode: string;
  originCity?: string;
  destinationCode: string;
  destinationCity?: string;
  departureAt?: string | Date | null;
  arrivalAt?: string | Date | null;
  flightNumber?: string;
  duration?: string;
  className?: string;
  compact?: boolean;
}

function parseDate(value?: string | Date | null): Date | null {
  if (!value) return null;
  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

function formatTime(value?: string | Date | null): string | null {
  const date = parseDate(value);
  return date
    ? new Intl.DateTimeFormat('en-PH', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      }).format(date)
    : null;
}

function formatDate(value?: string | Date | null): string | null {
  const date = parseDate(value);
  return date
    ? new Intl.DateTimeFormat('en-PH', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }).format(date)
    : null;
}

export function FlightRouteSummary({
  originCode,
  originCity,
  destinationCode,
  destinationCity,
  departureAt,
  arrivalAt,
  flightNumber,
  duration,
  className = '',
  compact = false,
}: FlightRouteSummaryProps) {
  const departureTime = formatTime(departureAt);
  const arrivalTime = formatTime(arrivalAt);
  const departureDate = formatDate(departureAt);

  return (
    <div className={['min-w-0', className].filter(Boolean).join(' ')}>
      {departureDate || flightNumber || duration ? (
        <div className="mb-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px] font-medium text-muted-foreground sm:text-xs">
          {departureDate ? <span>{departureDate}</span> : null}
          {departureDate && flightNumber ? <span aria-hidden="true">·</span> : null}
          {flightNumber ? <span>{flightNumber}</span> : null}
          {(departureDate || flightNumber) && duration ? <span aria-hidden="true">·</span> : null}
          {duration ? <span>{duration}</span> : null}
        </div>
      ) : null}

      <div className="grid min-w-0 grid-cols-[minmax(0,1fr)_minmax(76px,0.8fr)_minmax(0,1fr)] items-center gap-2 sm:gap-4">
        <div className="min-w-0">
          {departureTime && !compact ? (
            <p className="mb-1 text-sm font-semibold text-foreground sm:text-base">{departureTime}</p>
          ) : null}
          <p className="text-xl font-bold tracking-tight text-[#102A43] sm:text-2xl">{originCode}</p>
          {originCity ? <p className="mt-0.5 truncate text-[10px] text-muted-foreground sm:text-xs">{originCity}</p> : null}
          {departureTime && compact ? <p className="mt-1 text-xs font-semibold text-foreground">{departureTime}</p> : null}
        </div>

        <div className="flex min-w-0 flex-col items-center gap-1.5 px-1">
          <PlaneTakeoff className="size-4 text-[#5BA9D6]" aria-hidden="true" />
          <div className="flex w-full items-center gap-1.5" aria-hidden="true">
            <span className="size-1.5 shrink-0 rounded-full border border-[#5BA9D6] bg-background" />
            <span className="h-px flex-1 bg-[#9BCDE6]" />
            <ArrowRight className="size-3 shrink-0 text-[#5BA9D6]" />
          </div>
          <span className="text-[9px] font-medium text-muted-foreground sm:text-[10px]">{duration ?? 'Flight route'}</span>
        </div>

        <div className="min-w-0 text-right">
          {arrivalTime && !compact ? (
            <p className="mb-1 text-sm font-semibold text-foreground sm:text-base">{arrivalTime}</p>
          ) : null}
          <p className="text-xl font-bold tracking-tight text-[#102A43] sm:text-2xl">{destinationCode}</p>
          {destinationCity ? <p className="mt-0.5 truncate text-[10px] text-muted-foreground sm:text-xs">{destinationCity}</p> : null}
          {arrivalTime && compact ? <p className="mt-1 text-xs font-semibold text-foreground">{arrivalTime}</p> : null}
        </div>
      </div>
    </div>
  );
}
