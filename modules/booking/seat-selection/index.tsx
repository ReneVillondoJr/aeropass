'use client';

import Link from 'next/link';

import { ArrowLeft, ArrowRight } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { BookingProgress } from '@/modules/bookings/components/booking-progress';
import { BookingStepShell } from '@/modules/bookings/components/booking-step-shell';

import { SeatMap } from './components/seat-map';
import { useSeatSelection } from './hooks/use-seat-selection';

interface SeatSelectionProps {
  flightId: string;
  fareId: string;
}

export function SeatSelection({ flightId, fareId }: SeatSelectionProps) {
  const { seats, selectedSeat, selectSeat } = useSeatSelection(flightId);

  function handleSeatSelect(seatId: string) {
    selectSeat({
      seatId,
    });
  }

  return (
    <div>
      <BookingProgress currentStep='seats' />

      <BookingStepShell
        title='Choose your seat'
        description='Select the seat you would like to use for this journey.'
      >
        <SeatMap seats={seats} onSelect={(seat) => handleSeatSelect(seat.id)} />

        <div className='mt-5 flex flex-col gap-3 sm:flex-row sm:justify-between'>
          <Link href={`/flights/${flightId}`}>
            <Button
              variant='outline'
              className='h-11 gap-2 rounded-xl border-sky-200'
            >
              <ArrowLeft className='size-4' />
              Back to flight
            </Button>
          </Link>

          <Link
            href={`/book/${flightId}/passengers?fare=${encodeURIComponent(fareId)}`}
            className={selectedSeat ? undefined : 'pointer-events-none'}
            aria-disabled={!selectedSeat}
          >
            <Button
              disabled={!selectedSeat}
              className='h-11 gap-2 rounded-xl bg-[#102a43] px-5 text-white hover:bg-[#183b5b]'
            >
              Continue
              <ArrowRight className='size-4' />
            </Button>
          </Link>
        </div>
      </BookingStepShell>
    </div>
  );
}
