import {
  getAircraftSeats,
  getBaggageByPassengerId,
  getBookingById,
  getBookingDetails,
  getCheckInsByFlightId,
  getFareClassById,
  getUserById,
  passengers,
} from '@/data/aeropass';

import type {
  PassengerFilters,
  PassengerStats,
  PassengerViewModel,
} from '../types/passenger';

function formatStatus(value: string | null | undefined) {
  if (!value) {
    return null;
  }

  return value
    .toLowerCase()
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function getFullName(
  firstName: string,
  middleName: string | null | undefined,
  lastName: string,
) {
  return [firstName, middleName, lastName]
    .filter((part): part is string => typeof part === 'string' && part.trim().length > 0)
    .join(' ');
}

export function buildPassengerViewModels(): PassengerViewModel[] {
  return passengers
    .map<PassengerViewModel | null>((passenger) => {
      const booking = getBookingById(passenger.bookingId);

      if (!booking) {
        return null;
      }

      const bookingDetails = getBookingDetails(booking.id);
      const flightDetails = bookingDetails?.flight;

      const customer = getUserById(booking.customerId);

      const reservation = bookingDetails?.reservations?.find(
        (item) => item.passengerId === passenger.id,
      );

      const ticket = bookingDetails?.tickets?.find(
        (item) => item.passengerId === passenger.id,
      );

      const checkInRecord =
        flightDetails?.flight ?
          getCheckInsByFlightId(flightDetails.flight.id).find(
            (item) => item.passengerId === passenger.id,
          )
        : undefined;

      const baggage = getBaggageByPassengerId(passenger.id);

      const aircraftId = flightDetails?.flight.aircraftId;

      const seat =
        aircraftId && reservation ?
          getAircraftSeats(aircraftId).find(
            (item) => item.id === reservation.seatId,
          )
        : undefined;

      const fareClass =
        reservation ? getFareClassById(reservation.fareClassId) : undefined;

      const fullName = getFullName(
        passenger.firstName,
        passenger.middleName,
        passenger.lastName,
      );

      return {
        id: passenger.id,

        fullName,

        firstName: passenger.firstName,
        middleName: passenger.middleName,
        lastName: passenger.lastName,

        email: passenger.email,
        phone: passenger.phone,
        dateOfBirth: passenger.dateOfBirth,
        gender: passenger.gender,
        nationality: passenger.nationality,

        passportNumber: passenger.passportNumber,
        passportExpiry: passenger.passportExpiry,

        specialAssistance: passenger.specialAssistance,

        frequentFlyerNumber: passenger.frequentFlyerNumber,

        bookingId: booking.id,
        bookingReference: booking.bookingReference,

        bookingStatus: booking.status,

        customerName: customer?.name ?? null,

        flightId: flightDetails?.flight.id ?? null,

        flightNumber: flightDetails?.flight.flightNumber ?? null,

        departureDate: flightDetails?.flight.departureDate ?? null,

        departureTime: flightDetails?.flight.departureTime ?? null,

        arrivalDate: flightDetails?.flight.arrivalDate ?? null,

        arrivalTime: flightDetails?.flight.arrivalTime ?? null,

        originCode: flightDetails?.origin?.code ?? null,

        originCity: flightDetails?.origin?.city ?? null,

        destinationCode: flightDetails?.destination?.code ?? null,

        destinationCity: flightDetails?.destination?.city ?? null,

        seatNumber: seat?.seatNumber ?? null,

        fareClassName: fareClass?.name ?? null,

        fareClassCode: fareClass?.code ?? null,

        ticketNumber: ticket?.ticketNumber ?? null,

        ticketStatus: formatStatus(ticket?.status),

        checkInStatus: formatStatus(checkInRecord?.status),

        checkedInAt: checkInRecord?.checkedInAt ?? null,

        checkInMethod: formatStatus(checkInRecord?.checkInMethod),

        baggageCount: baggage.length,

        baggageStatuses: baggage.map(
          (item) => formatStatus(item.status) ?? item.status,
        ),

        totalBookingAmount: booking.total,

        paymentStatus: formatStatus(booking.paymentStatus),

        paymentMethod: formatStatus(booking.paymentMethod),
      };
    })
    .filter((item): item is PassengerViewModel => item !== null)
    .sort((a, b) => a.lastName.localeCompare(b.lastName));
}

export function buildPassengerStats(
  items: PassengerViewModel[],
): PassengerStats {
  return {
    total: items.length,

    male: items.filter((item) => item.gender === 'MALE').length,

    female: items.filter((item) => item.gender === 'FEMALE').length,

    specialAssistance: items.filter((item) => item.specialAssistance).length,

    frequentFlyers: items.filter((item) => Boolean(item.frequentFlyerNumber))
      .length,

    passportComplete: items.filter((item) =>
      Boolean(item.passportNumber && item.passportExpiry),
    ).length,
  };
}

export function filterPassengerViewModels(
  items: PassengerViewModel[],
  filters: PassengerFilters,
) {
  const search = (filters.search ?? '').trim().toLowerCase();
  const gender = filters.gender ?? 'ALL';
  const bookingStatus = filters.bookingStatus ?? 'ALL';
  const assistance = filters.assistance ?? 'ALL';

  return items.filter((item) => {
    if (gender !== 'ALL' && item.gender !== gender) {
      return false;
    }

    if (bookingStatus !== 'ALL' && item.bookingStatus !== bookingStatus) {
      return false;
    }

    if (assistance === 'YES' && !item.specialAssistance) {
      return false;
    }

    if (assistance === 'NO' && item.specialAssistance) {
      return false;
    }

    if (!search) {
      return true;
    }

    const searchable = [
      item.fullName,
      item.firstName,
      item.middleName ?? '',
      item.lastName,
      item.email,
      item.phone,
      item.nationality,
      item.passportNumber,
      item.frequentFlyerNumber,
      item.bookingReference,
      item.customerName,
      item.flightNumber,
      item.originCode,
      item.destinationCode,
      item.originCity,
      item.destinationCity,
      item.seatNumber,
      item.ticketNumber,
      item.fareClassName,
      item.fareClassCode,
      item.paymentStatus,
      item.paymentMethod,
    ]
      .filter((value): value is string => typeof value === 'string' && value.trim().length > 0)
      .join(' ')
      .toLowerCase();

    return searchable.includes(search);
  });
}
