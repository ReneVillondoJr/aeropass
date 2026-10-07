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

import { cabinClassMeta, flexibilityMeta, formatPhp } from '../data/fare-class';

import type { FareClassViewModel } from '../types/fare-class';

import { FarePricingTable } from './pricing-table';

interface FareClassDetailProps {
  fareClass: FareClassViewModel | null;
}

export function FareClassDetail({ fareClass: item }: FareClassDetailProps) {
  if (!item) {
    return (
      <aside className='rounded-2xl border border-dashed border-border bg-background p-8 text-center'>
        <div className='mx-auto flex size-12 items-center justify-center rounded-full bg-muted'>
          <CircleDollarSign className='size-5 text-muted-foreground' />
        </div>

        <h2 className='mt-4 text-sm font-semibold'>No fare class selected</h2>

        <p className='mt-1 text-xs leading-5 text-muted-foreground'>
          Select a fare class from the roster to inspect its rules and pricing.
        </p>
      </aside>
    );
  }

  const fare = item.fareClass;

  const cabin = cabinClassMeta[fare.cabinClass];

  return (
    <aside className='flex min-w-0 max-h-185 flex-col gap-4'>
      {/* Hero (fixed header) */}
      <section className='shrink-0 overflow-hidden rounded-2xl border border-[#102A43] bg-[#102A43] text-white shadow-sm'>
        <div className='relative p-5'>
          <div className='absolute -right-12 -top-12 size-40 rounded-full bg-[#5BA9D6]/10 blur-2xl' />

          <div className='relative'>
            <div className='flex min-w-0 items-start justify-between gap-4'>
              <div className='flex min-w-0 items-start gap-3'>
                <div className='flex size-11 shrink-0 items-center justify-center rounded-xl bg-white/10'>
                  <CircleDollarSign className='size-5 text-[#B9E4F8]' />
                </div>

                <div className='min-w-0'>
                  <p className='truncate text-lg font-semibold tracking-tight'>
                    {fare.name}
                  </p>

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

            <p className='mt-5 text-sm leading-6 text-white/65'>
              {fare.description}
            </p>

            <div className='mt-5 grid grid-cols-2 gap-2'>
              <DarkMetric
                label='Average'
                value={formatPhp(item.averagePrice)}
              />

              <DarkMetric label='Lowest' value={formatPhp(item.minimumPrice)} />

              <DarkMetric
                label='Highest'
                value={formatPhp(item.maximumPrice)}
              />

              <DarkMetric label='Flight fares' value={item.totalFlightFares} />
            </div>
          </div>
        </div>
      </section>

      {/* Scrollable content */}
      <div className='min-h-0 flex-1 space-y-4 overflow-y-auto overscroll-contain'>
        {/* Rules */}
        <section className='rounded-2xl border border-border/70 bg-background p-5 shadow-sm'>
          <SectionHeading
            icon={<Tag className='size-4' />}
            title='Fare rules'
          />

          <div className='mt-4 grid gap-3 sm:grid-cols-2'>
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
        <FarePricingTable fares={item.flightFares} />

        {/* Fare inventory */}
        <section className='rounded-2xl border border-border/70 bg-background p-5 shadow-sm'>
          <SectionHeading
            icon={<WalletCards className='size-4' />}
            title='Fare inventory'
          />

          <div className='mt-4 rounded-2xl bg-[#EEF7FB] p-4'>
            <div className='flex items-start justify-between gap-4'>
              <div>
                <p className='text-xs font-medium text-muted-foreground'>
                  Seats available across published records
                </p>

                <p className='mt-2 text-2xl font-semibold tracking-tight tabular-nums text-[#102A43]'>
                  {item.totalSeatsAvailable.toLocaleString()}
                </p>
              </div>

              <div className='flex size-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#102A43] shadow-sm'>
                <WalletCards className='size-4' />
              </div>
            </div>

            <div className='mt-4 border-t border-[#DCE8EF] pt-3'>
              <p className='text-xs leading-5 text-muted-foreground'>
                This is the sum of seat availability reported by the existing
                flight-fare records for this fare class.
              </p>
            </div>
          </div>
        </section>

        {/* Policy summary */}
        <section className='rounded-2xl border border-border/70 bg-background p-5 shadow-sm'>
          <SectionHeading
            icon={<Info className='size-4' />}
            title='Policy summary'
          />

          <div className='mt-4 space-y-3'>
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
      </div>
    </aside>
  );
}

function SectionHeading({
  icon,
  title,
}: {
  icon: React.ReactNode;
  title: string;
}) {
  return (
    <div className='flex items-center gap-2'>
      <div className='flex size-7 items-center justify-center rounded-lg bg-[#EEF7FB] text-[#102A43]'>
        {icon}
      </div>

      <h2 className='text-sm font-semibold'>{title}</h2>
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
    <div className='min-w-0 rounded-xl border border-white/10 bg-white/[0.05] p-3'>
      <p className='truncate text-[9px] uppercase tracking-[0.09em] text-white/40'>
        {label}
      </p>

      <p className='mt-1.5 truncate text-sm font-semibold tabular-nums'>
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
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className='min-w-0 rounded-xl border border-border/60 bg-muted/10 p-3'>
      <div className='flex items-center gap-1.5 text-muted-foreground'>
        {icon}

        <span className='truncate text-[9px] font-medium uppercase tracking-[0.05em]'>
          {label}
        </span>
      </div>

      <p className='mt-1.5 truncate text-sm font-semibold'>{value}</p>
    </div>
  );
}

function RuleCard({
  icon,
  label,
  active,
}: {
  icon: React.ReactNode;
  label: string;
  active: boolean;
}) {
  return (
    <div
      className={[
        'min-w-0 rounded-xl border p-3',
        active ?
          'border-emerald-100 bg-emerald-50/70'
        : 'border-border/60 bg-muted/10',
      ].join(' ')}
    >
      <div
        className={[
          'flex items-center gap-1.5',
          active ? 'text-emerald-700' : 'text-muted-foreground',
        ].join(' ')}
      >
        {icon}

        <span className='truncate text-[9px] font-medium uppercase tracking-[0.05em]'>
          {label}
        </span>
      </div>

      <p
        className={[
          'mt-1.5 text-sm font-semibold',
          active ? 'text-emerald-700' : 'text-muted-foreground',
        ].join(' ')}
      >
        {active ? 'Enabled' : 'Not available'}
      </p>
    </div>
  );
}

function PolicyRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className='flex min-w-0 items-start gap-3 rounded-xl border border-border/60 bg-muted/10 p-3'>
      <div className='mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg bg-[#EEF7FB] text-[#102A43]'>
        {icon}
      </div>

      <div className='min-w-0 flex-1'>
        <p className='text-[9px] font-medium uppercase tracking-[0.05em] text-muted-foreground'>
          {label}
        </p>

        <p className='mt-1 break-words text-xs font-semibold'>{value}</p>
      </div>
    </div>
  );
}
