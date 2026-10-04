'use client';

import { useState } from 'react';

import {
  Armchair,
  CheckCircle2,
  Clock3,
  Grid2X2,
  Info,
  Plane,
  Settings2,
  ShieldAlert,
  Wrench,
} from 'lucide-react';

import {
  aircraftStatusMeta,
  cabinClassMeta,
  seatStatusMeta,
  seatTypeMeta,
} from '../data/seat-map';

import type { SeatMapViewModel } from '../types/seat-map';

import { SeatMap } from './seat-map';
import { SeatSummary } from './seat-summary';

interface SeatMapDetailProps {
  seatMap: SeatMapViewModel | null;
}

export function SeatMapDetail({ seatMap }: SeatMapDetailProps) {
  const [selectedSeatId, setSelectedSeatId] = useState<string | null>(null);

  if (!seatMap) {
    return (
      <aside className='rounded-2xl border border-dashed border-border bg-background p-8 text-center'>
        <div className='mx-auto flex size-12 items-center justify-center rounded-full bg-muted'>
          <Armchair className='size-5 text-muted-foreground' />
        </div>

        <h2 className='mt-4 text-sm font-semibold'>No seat map selected</h2>

        <p className='mt-1 text-xs leading-5 text-muted-foreground'>
          Select an aircraft from the seat map roster to inspect its
          configuration.
        </p>
      </aside>
    );
  }

  const aircraft = seatMap.aircraft;

  const status = aircraftStatusMeta[aircraft.status];

  const selectedSeat =
    seatMap.seats.find((seat) => seat.id === selectedSeatId) ?? null;

  return (
    <aside className='min-w-0 space-y-4'>
      {/* Identity */}
      <section className='overflow-hidden rounded-2xl border border-[#102A43] bg-[#102A43] text-white shadow-sm'>
        <div className='relative p-5'>
          <div className='absolute -right-12 -top-12 size-40 rounded-full bg-[#5BA9D6]/10 blur-2xl' />

          <div className='relative'>
            <div className='flex min-w-0 items-start justify-between gap-4'>
              <div className='flex min-w-0 items-start gap-3'>
                <div className='flex size-11 shrink-0 items-center justify-center rounded-xl bg-white/10'>
                  <Armchair className='size-5 text-[#B9E4F8]' />
                </div>

                <div className='min-w-0'>
                  <p className='truncate text-lg font-semibold tracking-tight'>
                    {aircraft.model}
                  </p>

                  <p className='mt-1 break-words text-xs text-white/55'>
                    {aircraft.manufacturer} · {aircraft.registrationNumber}
                  </p>
                </div>
              </div>

              <span
                className={[
                  'shrink-0 rounded-full px-2.5 py-1 text-[10px] font-semibold',
                  status.className,
                ].join(' ')}
              >
                {status.label}
              </span>
            </div>

            <div className='mt-5 rounded-xl border border-white/10 bg-white/[0.05] p-3'>
              <p className='text-[10px] uppercase tracking-[0.1em] text-white/40'>
                Seat map configuration
              </p>

              <p className='mt-1 text-base font-semibold'>
                {seatMap.totalSeats} seats · {seatMap.rows.length} rows
              </p>
            </div>

            <div className='mt-4 grid grid-cols-2 gap-2'>
              <DarkMetric label='Available' value={seatMap.availableSeats} />

              <DarkMetric label='Blocked' value={seatMap.blockedSeats} />

              <DarkMetric label='Business' value={seatMap.businessSeats} />

              <DarkMetric label='Economy' value={seatMap.economySeats} />
            </div>
          </div>
        </div>
      </section>

      {/* Summary */}
      <section className='rounded-2xl border border-border/70 bg-background p-5 shadow-sm'>
        <SectionHeading
          icon={<Grid2X2 className='size-4' />}
          title='Configuration summary'
        />

        <div className='mt-4'>
          <SeatSummary item={seatMap} />
        </div>
      </section>

      {/* Cabin breakdown */}
      <section className='rounded-2xl border border-border/70 bg-background p-5 shadow-sm'>
        <SectionHeading
          icon={<Armchair className='size-4' />}
          title='Cabin breakdown'
        />

        <div className='mt-4 space-y-3'>
          <CabinBar
            label='Business'
            value={seatMap.businessSeats}
            total={seatMap.totalSeats}
            className='bg-[#102A43]'
          />

          {seatMap.premiumEconomySeats > 0 && (
            <CabinBar
              label='Premium Economy'
              value={seatMap.premiumEconomySeats}
              total={seatMap.totalSeats}
              className='bg-violet-500'
            />
          )}

          <CabinBar
            label='Economy'
            value={seatMap.economySeats}
            total={seatMap.totalSeats}
            className='bg-slate-400'
          />
        </div>
      </section>

      {/* Seat selection */}
      <SeatMap
        seats={seatMap.seats}
        selectedSeatId={selectedSeatId}
        onSelectSeat={(seat) => setSelectedSeatId(seat.id)}
      />

      {/* Selected seat */}
      <section className='rounded-2xl border border-border/70 bg-background p-5 shadow-sm'>
        <SectionHeading
          icon={<Info className='size-4' />}
          title='Selected seat'
        />

        {selectedSeat ?
          <div className='mt-4'>
            <div className='rounded-2xl bg-[#EEF7FB] p-4'>
              <div className='flex items-start justify-between gap-4'>
                <div>
                  <p className='text-2xl font-semibold tracking-tight text-[#102A43]'>
                    {selectedSeat.seatNumber}
                  </p>

                  <p className='mt-1 text-xs text-muted-foreground'>
                    Row {selectedSeat.row} · Column {selectedSeat.column}
                  </p>
                </div>

                <span
                  className={[
                    'shrink-0 rounded-full px-2.5 py-1 text-[10px] font-semibold',
                    seatStatusMeta[selectedSeat.status].className,
                  ].join(' ')}
                >
                  {seatStatusMeta[selectedSeat.status].label}
                </span>
              </div>

              <div className='mt-4 grid gap-2 sm:grid-cols-2'>
                <InfoItem
                  icon={<Armchair className='size-3.5' />}
                  label='Cabin'
                  value={cabinClassMeta[selectedSeat.cabinClass].label}
                />

                <InfoItem
                  icon={<Settings2 className='size-3.5' />}
                  label='Seat type'
                  value={seatTypeMeta[selectedSeat.seatType]}
                />

                <InfoItem
                  icon={<Grid2X2 className='size-3.5' />}
                  label='Column'
                  value={selectedSeat.column}
                />

                <InfoItem
                  icon={<CheckCircle2 className='size-3.5' />}
                  label='Status'
                  value={seatStatusMeta[selectedSeat.status].description}
                />
              </div>
            </div>
          </div>
        : <div className='mt-4 rounded-xl border border-dashed border-border p-6 text-center'>
            <Info className='mx-auto size-5 text-muted-foreground' />

            <p className='mt-2 text-xs font-medium'>Select a seat</p>

            <p className='mt-1 text-[11px] leading-5 text-muted-foreground'>
              Seat configuration details will appear here.
            </p>
          </div>
        }
      </section>

      {/* Seat types */}
      <section className='rounded-2xl border border-border/70 bg-background p-5 shadow-sm'>
        <SectionHeading
          icon={<Settings2 className='size-4' />}
          title='Seat type distribution'
        />

        <div className='mt-4 grid gap-2 sm:grid-cols-2'>
          <Distribution
            label='Standard'
            value={seatMap.standardSeats}
            icon={<Grid2X2 className='size-3.5' />}
          />

          <Distribution
            label='Extra legroom'
            value={seatMap.extraLegroomSeats}
            icon={<Armchair className='size-3.5' />}
          />

          <Distribution
            label='Exit row'
            value={seatMap.exitRowSeats}
            icon={<ShieldAlert className='size-3.5' />}
          />

          <Distribution
            label='Window'
            value={seatMap.windowSeats}
            icon={<Plane className='size-3.5' />}
          />

          <Distribution
            label='Aisle'
            value={seatMap.aisleSeats}
            icon={<Clock3 className='size-3.5' />}
          />

          <Distribution
            label='Maintenance'
            value={seatMap.maintenanceSeats}
            icon={<Wrench className='size-3.5' />}
          />
        </div>
      </section>
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

function DarkMetric({ label, value }: { label: string; value: number }) {
  return (
    <div className='rounded-xl border border-white/10 bg-white/[0.05] p-3'>
      <p className='text-[9px] uppercase tracking-[0.09em] text-white/40'>
        {label}
      </p>

      <p className='mt-1.5 text-sm font-semibold tabular-nums'>{value}</p>
    </div>
  );
}

function CabinBar({
  label,
  value,
  total,
  className,
}: {
  label: string;
  value: number;
  total: number;
  className: string;
}) {
  const percentage = total > 0 ? Math.round((value / total) * 100) : 0;

  return (
    <div>
      <div className='flex items-center justify-between gap-3'>
        <span className='text-xs font-medium'>{label}</span>

        <span className='text-xs tabular-nums text-muted-foreground'>
          {value} <span className='text-[10px]'>({percentage}%)</span>
        </span>
      </div>

      <div className='mt-2 h-2 overflow-hidden rounded-full bg-muted'>
        <div
          className={['h-full rounded-full', className].join(' ')}
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>
    </div>
  );
}

function InfoItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className='min-w-0 rounded-xl border border-border/60 bg-background p-3'>
      <div className='flex items-center gap-1.5 text-muted-foreground'>
        {icon}

        <span className='truncate text-[9px] font-medium uppercase tracking-[0.05em]'>
          {label}
        </span>
      </div>

      <p className='mt-1.5 break-words text-xs font-semibold'>{value}</p>
    </div>
  );
}

function Distribution({
  label,
  value,
  icon,
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
}) {
  return (
    <div className='flex items-center justify-between gap-3 rounded-xl border border-border/60 bg-muted/10 p-3'>
      <div className='flex min-w-0 items-center gap-2'>
        {icon}

        <span className='truncate text-xs text-muted-foreground'>{label}</span>
      </div>

      <span className='shrink-0 text-sm font-semibold tabular-nums'>
        {value}
      </span>
    </div>
  );
}
