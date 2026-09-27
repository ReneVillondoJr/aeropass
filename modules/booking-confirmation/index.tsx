'use client';

import { ConfirmationCard } from './components/confirmation-card';
import { useBookingConfirmation } from './hooks/use-booking-confirmation';

export function BookingConfirmation() {
  const { confirmation } = useBookingConfirmation();

  if (!confirmation) {
    return (
      <div className='bg-[#f4f9fc] px-5 py-20 text-center'>
        <p className='text-sm font-semibold text-[#102a43]'>
          Booking confirmation is unavailable.
        </p>
      </div>
    );
  }

  return (
    <div className='bg-[#f4f9fc] px-5 py-12 sm:px-8 lg:px-10 lg:py-16'>
      <ConfirmationCard data={confirmation} />
    </div>
  );
}
