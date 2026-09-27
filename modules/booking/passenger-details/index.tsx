'use client';

import Link from 'next/link';

import { ArrowLeft } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { BookingProgress } from '@/modules/bookings/components/booking-progress';
import { BookingStepShell } from '@/modules/bookings/components/booking-step-shell';

import { PassengerForm } from './components/passenger-form';
import { usePassengerDetails } from './hooks/use-passenger-details';

interface PassengerDetailsProps {
  flightId: string;
  fareId: string;
}

export function PassengerDetails({ flightId, fareId }: PassengerDetailsProps) {
  const { passenger, savePassenger } = usePassengerDetails();

  function handleSubmit(values: Parameters<typeof savePassenger>[0]) {
    const result = savePassenger(values);

    if (!result.success) {
      return;
    }

    window.location.href = `/book/${flightId}/addons?fare=${encodeURIComponent(fareId)}`;
  }

  return (
    <div>
      <BookingProgress currentStep='passengers' />

      <BookingStepShell
        title='Passenger details'
        description="Enter the information exactly as it appears on the passenger's travel documents."
      >
        <PassengerForm
          initialValues={
            passenger ?
              {
                ...passenger,
              }
            : null
          }
          onSubmit={handleSubmit}
        />

        <Link
          href={`/book/${flightId}/seats?fare=${encodeURIComponent(fareId)}`}
          className='mt-4 inline-flex'
        >
          <Button variant='ghost' className='gap-2 text-slate-400'>
            <ArrowLeft className='size-4' />
            Back to seats
          </Button>
        </Link>
      </BookingStepShell>
    </div>
  );
}
