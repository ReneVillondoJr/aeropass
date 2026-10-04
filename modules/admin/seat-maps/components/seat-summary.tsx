import {
  Armchair,
  Grid2X2,
  Maximize2,
  MoveHorizontal,
  MoveVertical,
  ShieldAlert,
} from 'lucide-react';

import type { SeatMapViewModel } from '../types/seat-map';

interface SeatSummaryProps {
  item: SeatMapViewModel;
}

export function SeatSummary({ item }: SeatSummaryProps) {
  const cards = [
    {
      label: 'Total seats',
      value: item.totalSeats,
      icon: Armchair,
    },
    {
      label: 'Available',
      value: item.availableSeats,
      icon: Grid2X2,
    },
    {
      label: 'Blocked',
      value: item.blockedSeats,
      icon: ShieldAlert,
    },
    {
      label: 'Rows',
      value: item.rows.length,
      icon: MoveVertical,
    },
    {
      label: 'Window',
      value: item.windowSeats,
      icon: Maximize2,
    },
    {
      label: 'Aisle',
      value: item.aisleSeats,
      icon: MoveHorizontal,
    },
  ];

  return (
    <div className='grid gap-3 sm:grid-cols-2 xl:grid-cols-3'>
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.label}
            className='rounded-xl border border-border/60 bg-muted/10 p-3'
          >
            <div className='flex items-center gap-2 text-muted-foreground'>
              <Icon className='size-3.5' />

              <span className='text-[10px] font-medium uppercase tracking-[0.06em]'>
                {card.label}
              </span>
            </div>

            <p className='mt-1.5 text-base font-semibold tabular-nums'>
              {card.value}
            </p>
          </div>
        );
      })}
    </div>
  );
}
