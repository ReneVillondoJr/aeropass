import type { ReactNode } from 'react';

import {
  ArrowRightLeft,
  Banknote,
  CheckCircle2,
  CircleDollarSign,
  Info,
  Luggage,
  RefreshCcw,
  ShieldCheck,
  Tag,
  WalletCards,
} from 'lucide-react';

import { cabinClassMeta, formatPhp } from '../data/fare-class';
import type { FareClassViewModel } from '../types/fare-class';

import { FarePricingTable } from './pricing-table';

interface FareClassDetailProps {
  fareClass: FareClassViewModel | null;
}

export function FareClassDetail({ fareClass: item }: FareClassDetailProps) {
  if (!item) {
    return (
      <section className='xl:sticky xl:top-6'>
        <div className='flex min-h-110 flex-col items-center justify-center rounded-[1.5rem] border border-dashed border-border/70 bg-background px-6 text-center shadow-sm'>
          <div className='flex size-12 items-center justify-center rounded-2xl bg-[#E5F5FC] text-[#5BA9D6]'>
            <CircleDollarSign className='size-5' />
          </div>

          <h2 className='mt-4 text-sm font-semibold text-foreground'>
            No fare class selected
          </h2>

          <p className='mt-1 max-w-sm text-xs leading-5 text-muted-foreground'>
            Select a fare class from the roster to inspect its rules and
            pricing.
          </p>
        </div>
      </section>
    );
  }

  const fare = item.fareClass;
  const cabin = cabinClassMeta[fare.cabinClass];

  return (
    <section className='min-w-0 xl:sticky xl:top-6'>
      <div className='overflow-hidden rounded-[1.5rem] border border-border/70 bg-background shadow-sm'>
        {/* Hero */}
        <div className='bg-[#102A43] px-5 py-5 text-white sm:px-6'>
          <div className='flex min-w-0 items-start justify-between gap-4'>
            <div className='flex min-w-0 items-start gap-3'>
              <div className='flex size-11 shrink-0 items-center justify-center rounded-2xl bg-white/10'>
                <CircleDollarSign className='size-5 text-[#B9E4F8]' />
              </div>

              <div className='min-w-0'>
                <p className='text-[9px] font-medium uppercase tracking-[0.16em] text-white/40'>
                  Fare class
                </p>

                <h2 className='mt-1 truncate text-lg font-semibold tracking-tight'>
                  {fare.name}
                </h2>

                <p className='mt-1 truncate text-xs text-white/55'>
                  {fare.code} · {cabin.label}
                </p>
              </div>
            </div>

            <span
              className={[
                'shrink-0 rounded-full px-2.5 py-1 text-[10px] font-semibold',
                cabin.badgeClassName,
              ].join(' ')}
            >
              {cabin.shortLabel}
            </span>
          </div>

          <p className='mt-4 text-sm leading-6 text-white/60'>
            {fare.description}
          </p>

          <div className='mt-5 grid grid-cols-2 gap-2'>
            <DarkMetric label='Average' value={formatPhp(item.averagePrice)} />

            <DarkMetric label='Lowest' value={formatPhp(item.minimumPrice)} />

            <DarkMetric label='Highest' value={formatPhp(item.maximumPrice)} />

            <DarkMetric label='Flight fares' value={item.totalFlightFares} />
          </div>
        </div>

        {/* Scrollable content */}
        <div className='max-h-111.5 overflow-y-scroll overscroll-contain scrollbar-subtle'>
          <div className='space-y-7 p-5 sm:p-6'>
            {/* Fare rules */}
            <section>
              <SectionHeading
                icon={<Tag className='size-4' />}
                title='Fare rules'
              />

              <div className='mt-4 grid gap-4 sm:grid-cols-2'>
                <InfoCard
                  icon={<Luggage className='size-3.5' />}
                  label='Baggage allowance'
                  value={`${fare.baggageAllowanceKg} kg`}
                />

                <InfoCard
                  icon={<Banknote className='size-3.5' />}
                  label='Change fee'
                  value={formatPhp(fare.changeFee)}
                />

                <RuleCard
                  icon={<RefreshCcw className='size-3.5' />}
                  label='Refundable'
                  active={fare.refundable}
                />

                <RuleCard
                  icon={<ArrowRightLeft className='size-3.5' />}
                  label='Changeable'
                  active={fare.changeable}
                />
              </div>
            </section>

            {/* Pricing */}
            <section className='pt-1'>
              <SectionHeading
                icon={<CircleDollarSign className='size-4' />}
                title='Flight pricing'
              />

              <div className='mt-4 min-w-0 overflow-x-auto'>
                <FarePricingTable fares={item.flightFares} />
              </div>
            </section>

            {/* Fare inventory */}
            <section className='border-t border-border/60 pt-7'>
              <SectionHeading
                icon={<WalletCards className='size-4' />}
                title='Fare inventory'
              />

              <div className='mt-4 rounded-2xl bg-[#EEF7FB] p-4'>
                <div className='flex items-start justify-between gap-4'>
                  <div>
                    <p className='text-[10px] font-medium uppercase tracking-widest text-muted-foreground'>
                      Seats available
                    </p>

                    <p className='mt-2 text-2xl font-semibold tracking-tight tabular-nums text-[#102A43]'>
                      {item.totalSeatsAvailable.toLocaleString()}
                    </p>

                    <p className='mt-1 text-[11px] text-muted-foreground'>
                      Across published fare records
                    </p>
                  </div>

                  <div className='flex size-9 shrink-0 items-center justify-center rounded-xl bg-white/80 text-[#102A43]'>
                    <WalletCards className='size-4' />
                  </div>
                </div>

                <div className='mt-4 border-t border-[#DCE8EF] pt-3'>
                  <p className='text-[11px] leading-5 text-muted-foreground'>
                    This total represents the seat availability reported by the
                    existing flight-fare records for this fare class.
                  </p>
                </div>
              </div>
            </section>

            {/* Policy summary */}
            <section className='border-t border-border/60 pt-7'>
              <SectionHeading
                icon={<Info className='size-4' />}
                title='Policy summary'
              />

              <div className='mt-4 space-y-4'>
                <PolicyRow
                  icon={<Luggage className='size-3.5' />}
                  label='Cabin class'
                  value={cabin.label}
                />

                <PolicyRow
                  icon={<ShieldCheck className='size-3.5' />}
                  label='Refund policy'
                  value={fare.refundable ? 'Refundable' : 'Non-refundable'}
                />

                <PolicyRow
                  icon={<ArrowRightLeft className='size-3.5' />}
                  label='Change policy'
                  value={
                    fare.changeable ?
                      fare.changeFee === 0 ?
                        'Changeable · No fee'
                      : `Changeable · ${formatPhp(fare.changeFee)}`
                    : 'Changes not permitted'
                  }
                />

                <PolicyRow
                  icon={<CircleDollarSign className='size-3.5' />}
                  label='Taxes included'
                  value='Per flight-fare record'
                />
              </div>
            </section>

            {/* Fare status */}
            <div
              className={[
                'rounded-2xl border p-4',
                fare.refundable && fare.changeable ?
                  'border-emerald-200 bg-emerald-50'
                : 'border-[#5BA9D6]/20 bg-[#E5F5FC]/60',
              ].join(' ')}
            >
              <div className='flex items-start gap-3'>
                <CheckCircle2 className='mt-0.5 size-4 shrink-0' />

                <div>
                  <p className='text-xs font-semibold'>
                    Fare class: {fare.name}
                  </p>

                  <p className='mt-1 text-[11px] leading-5 text-muted-foreground'>
                    {fare.refundable && fare.changeable ?
                      'This fare provides both refund and change flexibility under the configured fare rules.'
                    : fare.refundable ?
                      'This fare allows refunds but does not provide change flexibility.'
                    : fare.changeable ?
                      'This fare allows changes according to the configured change fee.'
                    : 'This fare does not allow refunds or changes under the configured rules.'
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionHeading({ icon, title }: { icon: ReactNode; title: string }) {
  return (
    <div className='flex items-center gap-2'>
      <div className='flex size-7 shrink-0 items-center justify-center text-[#5BA9D6]'>
        {icon}
      </div>

      <h3 className='text-sm font-semibold tracking-tight text-foreground'>
        {title}
      </h3>
    </div>
  );
}

function DarkMetric({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className='min-w-0 rounded-xl bg-white/5 px-3 py-2.5'>
      <p className='text-[9px] font-medium uppercase tracking-[0.09em] text-white/35'>
        {label}
      </p>

      <p className='mt-1.5 whitespace-nowrap text-sm font-semibold tabular-nums text-white/95'>
        {value}
      </p>
    </div>
  );
}

function InfoCard({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className='flex min-w-0 items-start gap-3'>
      <div className='mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg bg-[#EEF7FB] text-[#102A43]'>
        {icon}
      </div>

      <div className='min-w-0'>
        <p className='text-[9px] font-medium uppercase tracking-wider text-muted-foreground'>
          {label}
        </p>

        <p className='mt-1 text-xs font-semibold'>{value}</p>
      </div>
    </div>
  );
}

function RuleCard({
  icon,
  label,
  active,
}: {
  icon: ReactNode;
  label: string;
  active: boolean;
}) {
  return (
    <div className='flex min-w-0 items-start gap-3'>
      <div
        className={[
          'mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg',
          active ?
            'bg-emerald-50 text-emerald-700'
          : 'bg-muted/60 text-muted-foreground',
        ].join(' ')}
      >
        {icon}
      </div>

      <div className='min-w-0'>
        <p className='text-[9px] font-medium uppercase tracking-wider text-muted-foreground'>
          {label}
        </p>

        <p
          className={[
            'mt-1 text-xs font-semibold',
            active ? 'text-emerald-700' : 'text-muted-foreground',
          ].join(' ')}
        >
          {active ? 'Enabled' : 'Not available'}
        </p>
      </div>
    </div>
  );
}

function PolicyRow({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className='flex min-w-0 items-start gap-3'>
      <div className='mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg bg-[#EEF7FB] text-[#102A43]'>
        {icon}
      </div>

      <div className='min-w-0 flex-1'>
        <p className='text-[9px] font-medium uppercase tracking-wider text-muted-foreground'>
          {label}
        </p>

        <p className='mt-1 text-xs font-semibold wrap-break-word'>{value}</p>
      </div>
    </div>
  );
}
