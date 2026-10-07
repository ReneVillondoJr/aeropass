import {
  checkIns,
  getAircraftSeats,
  getBaggageByPassengerId,
  getFareClassById,
  getTicketDetails,
  getUserById,
} from '@/data/aeropass';

import type {
  CheckInFilters,
  CheckInStats,
  CheckInViewModel,
} from '../types/check-in';

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
  middleName: string | undefined,
  lastName: string,
) {
  return [firstName, middleName, lastName].filter(Boolean).join(' ');
}

export function buildCheckInViewModels(): CheckInViewModel[] {
  return checkIns
    .map<CheckInViewModel | null>((checkIn) => {
      const ticketDetails = getTicketDetails(checkIn.ticketId);

      if (!ticketDetails) {
        return null;
      }

      const passenger = ticketDetails.passenger;

      const bookingDetails = ticketDetails.booking;

      const booking = bookingDetails?.booking;

      const flight = ticketDetails.flight;

      const boarding = ticketDetails.boarding;

      const staff = checkIn.staffId ? getUserById(checkIn.staffId) : undefined;

      const reservation = bookingDetails?.reservations.find(
        (item) => item.passengerId === checkIn.passengerId,
      );

      const seat =
        flight?.aircraft?.id ?
          getAircraftSeats(flight.aircraft.id).find(
            (item) => item.id === checkIn.seatId,
          )
        : undefined;

      const fareClass =
        reservation ? getFareClassById(reservation.fareClassId) : undefined;

      const baggage = getBaggageByPassengerId(checkIn.passengerId);

      return {
        id: checkIn.id,

        status: checkIn.status,

        checkInMethod: checkIn.checkInMethod,

        checkedInAt: checkIn.checkedInAt,

        staffId: checkIn.staffId,

        staffName: staff?.name ?? null,

        ticketId: checkIn.ticketId,

        ticketNumber: ticketDetails.ticket?.ticketNumber ?? null,

        ticketStatus: formatStatus(ticketDetails.ticket?.status),

        passengerId: checkIn.passengerId,

        passengerName:
          passenger ?
            getFullName(
              passenger.firstName,
              passenger.middleName,
              passenger.lastName,
            )
          : 'Unknown passenger',

        passengerEmail: passenger?.email ?? null,

        passengerPhone: passenger?.phone ?? null,

        passengerNationality: passenger?.nationality ?? null,

        specialAssistance: passenger?.specialAssistance ?? false,

        bookingId: booking?.id ?? null,

        bookingReference: booking?.bookingReference ?? null,

        bookingStatus: formatStatus(booking?.status),

        flightId: checkIn.flightId,

        flightNumber: flight?.flight.flightNumber ?? null,

        departureDate: flight?.flight.departureDate ?? null,

        departureTime: flight?.flight.departureTime ?? null,

        arrivalDate: flight?.flight.arrivalDate ?? null,

        arrivalTime: flight?.flight.arrivalTime ?? null,

        originCode: flight?.origin?.code ?? null,

        originCity: flight?.origin?.city ?? null,

        destinationCode: flight?.destination?.code ?? null,

        destinationCity: flight?.destination?.city ?? null,

        seatNumber: seat?.seatNumber ?? null,

        fareClassName: fareClass?.name ?? null,

        fareClassCode: fareClass?.code ?? null,

        boardingStatus: formatStatus(boarding?.status),

        boardedAt: boarding?.boardedAt ?? null,

        gate: boarding?.gate ?? flight?.flight.gate ?? null,

        baggageCount: baggage.length,

        paymentStatus: formatStatus(booking?.paymentStatus),

        paymentMethod: formatStatus(booking?.paymentMethod),

        bookingTotal: booking?.total ?? null,
      };
    })
    .filter((item): item is CheckInViewModel => item !== null)
    .sort((a, b) => {
      const first = a.checkedInAt ?? '';

      const second = b.checkedInAt ?? '';

      return second.localeCompare(first);
    });
}

export function buildCheckInStats(items: CheckInViewModel[]): CheckInStats {
  return {
    total: items.length,

    completed: items.filter((item) => item.status === 'COMPLETED').length,

    cancelled: items.filter((item) => item.status === 'CANCELLED').length,

    web: items.filter((item) => item.checkInMethod === 'WEB').length,

    mobile: items.filter((item) => item.checkInMethod === 'MOBILE').length,

    counter: items.filter((item) => item.checkInMethod === 'COUNTER').length,

    boarded: items.filter((item) => item.boardingStatus === 'Boarded').length,
  };
}

export function filterCheckInViewModels(
  items: CheckInViewModel[],
  filters: CheckInFilters,
) {
  const search = filters.search.trim().toLowerCase();

  return items.filter((item) => {
    if (filters.status !== 'ALL' && item.status !== filters.status) {
      return false;
    }

    if (filters.method !== 'ALL' && item.checkInMethod !== filters.method) {
      return false;
    }

    if (filters.boarding !== 'ALL') {
      const boardingStatus =
        item.boardingStatus?.toUpperCase().replaceAll(' ', '_') ??
        'NOT_BOARDED';

      if (boardingStatus !== filters.boarding) {
        return false;
      }
    }

    if (!search) {
      return true;
    }

    const searchable = [
      item.passengerName,
      item.passengerEmail,
      item.passengerPhone,
      item.passengerNationality,
      item.ticketNumber,
      item.bookingReference,
      item.flightNumber,
      item.originCode,
      item.originCity,
      item.destinationCode,
      item.destinationCity,
      item.seatNumber,
      item.fareClassName,
      item.fareClassCode,
      item.staffName,
      item.gate,
      item.checkInMethod,
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();

    return searchable.includes(search);
  });
}
