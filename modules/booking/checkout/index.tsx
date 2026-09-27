'use client';

import Link from 'next/link';

import { ArrowLeft, ArrowRight } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { BookingProgress } from '@/modules/bookings/components/booking-progress';
import { BookingStepShell } from '@/modules/bookings/components/booking-step-shell';

import { CheckoutSummaryCard } from './components/checkout-summary';

import { useCheckout } from './hooks/use-checkout';

interface CheckoutProps {
  flightId: string;
  fareId: string;
}

export function Checkout({ flightId, fareId }: CheckoutProps) {
  const { flight, fareClass, summary, passenger, seatId } = useCheckout(
    flightId,
    fareId,
  );

  if (
    !flight?.flight ||
    !flight.origin ||
    !flight.destination ||
    !passenger ||
    !seatId
  ) {
    return (
      <div className='px-5 py-16 text-center'>
        <p className='text-sm font-semibold text-[#102a43]'>
          Booking information is incomplete.
        </p>

        <Link
          href={`/book/${flightId}/seats?fare=${encodeURIComponent(fareId)}`}
          className='mt-5 inline-flex'
        >
          <Button>Return to booking</Button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <BookingProgress currentStep='checkout' />

      <BookingStepShell
        title='Review your booking'
        description='Check your journey, passenger information, seat, and price before payment.'
      >
        <CheckoutSummaryCard
          flightNumber={flight.flight.flightNumber}
          origin={flight.origin.code}
          destination={flight.destination.code}
          fareName={fareClass?.name ?? 'Selected fare'}
          passengerName={`${passenger.firstName} ${passenger.lastName}`}
          seat={seatId.split('-').pop() ?? seatId}
          summary={summary}
        />

        <div className='mt-6 flex justify-between'>
          <Link
            href={`/book/${flightId}/addons?fare=${encodeURIComponent(fareId)}`}
          >
            <Button
              variant='outline'
              className='gap-2 rounded-xl border-sky-200'
            >
              <ArrowLeft className='size-4' />
              Back
            </Button>
          </Link>

          <Link
            href={`/book/${flightId}/payment?fare=${encodeURIComponent(fareId)}`}
          >
            <Button className='gap-2 rounded-xl bg-[#102a43] text-white hover:bg-[#183b5b]'>
              Continue to payment
              <ArrowRight className='size-4' />
            </Button>
          </Link>
        </div>
      </BookingStepShell>
    </div>
  );
}
