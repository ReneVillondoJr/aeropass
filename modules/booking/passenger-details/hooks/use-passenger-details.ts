'use client';

import { passengerDetailsSchema, type PassengerDetailsSchema } from '../schema';

import { useBookingSession } from '@/modules/bookings/hooks/use-booking-session';

export function usePassengerDetails() {
  const { session, setPassenger } = useBookingSession();

  function savePassenger(values: PassengerDetailsSchema) {
    const parsed = passengerDetailsSchema.safeParse(values);

    if (!parsed.success) {
      return {
        success: false,
        message:
          parsed.error.issues[0]?.message ??
          'Please check the passenger details.',
      };
    }

    setPassenger({
      firstName: parsed.data.firstName,
      middleName: parsed.data.middleName,
      lastName: parsed.data.lastName,
      email: parsed.data.email,
      phone: parsed.data.phone,
      dateOfBirth: parsed.data.dateOfBirth,
      gender: parsed.data.gender,
      nationality: parsed.data.nationality,
      passportNumber: parsed.data.passportNumber,
      passportExpiry: parsed.data.passportExpiry,
    });

    return {
      success: true,
      message: '',
    };
  }

  return {
    passenger: session.passenger,
    savePassenger,
  };
}
