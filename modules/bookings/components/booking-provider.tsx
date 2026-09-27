'use client';

import { createContext, type ReactNode, useMemo, useState } from 'react';

import type {
  AddonSelection,
  BookingSession,
  PassengerDraft,
} from '../types/booking-session';

interface BookingContextValue {
  session: BookingSession;

  setSeatId: (seatId: string) => void;

  setPassenger: (passenger: PassengerDraft) => void;

  setAddons: (addons: AddonSelection) => void;

  setPaymentMethod: (paymentMethod: BookingSession['paymentMethod']) => void;

  resetBooking: () => void;
}

const BookingContext = createContext<BookingContextValue | null>(null);

interface BookingProviderProps {
  children: ReactNode;
  flightId: string;
}

export function BookingProvider({ children, flightId }: BookingProviderProps) {
  const [session, setSession] = useState<BookingSession>({
    flightId,
    seatId: null,
    passenger: null,
    addons: {
      checkedBaggageKg: 0,
      travelProtection: false,
      loungeAccess: false,
    },
    paymentMethod: null,
  });

  const value = useMemo<BookingContextValue>(
    () => ({
      session,

      setSeatId: (seatId) => {
        setSession((current) => ({
          ...current,
          seatId,
        }));
      },

      setPassenger: (passenger) => {
        setSession((current) => ({
          ...current,
          passenger,
        }));
      },

      setAddons: (addons) => {
        setSession((current) => ({
          ...current,
          addons,
        }));
      },

      setPaymentMethod: (paymentMethod) => {
        setSession((current) => ({
          ...current,
          paymentMethod,
        }));
      },

      resetBooking: () => {
        setSession({
          flightId,
          seatId: null,
          passenger: null,
          addons: {
            checkedBaggageKg: 0,
            travelProtection: false,
            loungeAccess: false,
          },
          paymentMethod: null,
        });
      },
    }),
    [flightId, session],
  );

  return (
    <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
  );
}

export { BookingContext };
