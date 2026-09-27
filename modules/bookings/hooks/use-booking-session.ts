'use client';

import { useContext } from 'react';

import { BookingContext } from '../components/booking-provider';

export function useBookingSession() {
  const context = useContext(BookingContext);

  if (!context) {
    throw new Error('useBookingSession must be used inside BookingProvider.');
  }

  return context;
}
