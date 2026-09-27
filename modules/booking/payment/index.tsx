'use client';

import Link from 'next/link';

import { ArrowLeft } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { BookingProgress } from '@/modules/bookings/components/booking-progress';
import { BookingStepShell } from '@/modules/bookings/components/booking-step-shell';

import { PaymentForm } from './components/payment-form';
import { usePayment } from './hooks/use-payment';

interface PaymentProps {
  flightId: string;
  fareId: string;
}

export function Payment({ flightId, fareId }: PaymentProps) {
  const { paymentMethod, selectPayment } = usePayment();

  function handleSubmit(values: Parameters<typeof selectPayment>[0]) {
    const result = selectPayment(values);

    if (!result.success) {
      return;
    }

    window.location.href = '/booking-confirmation';
  }

  return (
    <div>
      <BookingProgress currentStep='payment' />

      <BookingStepShell
        title='Complete payment'
        description='This local demo simulates the final payment selection without connecting to a real gateway.'
      >
        <div className='mx-auto max-w-2xl'>
          <PaymentForm selected={paymentMethod} onSubmit={handleSubmit} />

          <Link
            href={`/book/${flightId}/checkout?fare=${encodeURIComponent(fareId)}`}
            className='mt-4 inline-flex'
          >
            <Button variant='ghost' className='gap-2 text-slate-400'>
              <ArrowLeft className='size-4' />
              Back to review
            </Button>
          </Link>
        </div>
      </BookingStepShell>
    </div>
  );
}
