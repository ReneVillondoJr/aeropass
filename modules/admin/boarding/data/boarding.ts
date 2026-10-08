import {
  boarding,
  getAircraftSeats,
  getBaggageByPassengerId,
  getFareClassById,
  getTicketDetails,
  getUserById,
} from '@/data/aeropass';

import type {
  BoardingFilters,
  BoardingStats,
  BoardingViewModel,
} from '../types/boarding';

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

export function buildBoardingViewModels(): BoardingViewModel[] {
  return boarding
    .map((boardingRecord): BoardingViewModel | null => {
      const ticketDetails = getTicketDetails(boardingRecord.ticketId);

      if (!ticketDetails) {
        return null;
      }

      const passenger = ticketDetails.passenger;

      const bookingDetails = ticketDetails.booking;

      const booking = bookingDetails?.booking;

      const flightDetails = ticketDetails.flight;

      const checkIn = ticketDetails.checkIn;

      const customer = booking ? getUserById(booking.customerId) : undefined;

      const scannedBy =
        boardingRecord.scannedBy ?
          getUserById(boardingRecord.scannedBy)
        : undefined;

      const reservation = bookingDetails?.reservations.find(
        (item) => item.passengerId === boardingRecord.passengerId,
      );

      const seat =
        flightDetails?.aircraft?.id ?
          getAircraftSeats(flightDetails.aircraft.id).find(
            (item) => item.id === boardingRecord.ticketId,
          )
        : undefined;

      const ticketSeat = ticketDetails.ticket?.seatId;

      const resolvedSeat =
        flightDetails?.aircraft?.id && ticketSeat ?
          getAircraftSeats(flightDetails.aircraft.id).find(
            (item) => item.id === ticketSeat,
          )
        : seat;

      const fareClass =
        reservation ? getFareClassById(reservation.fareClassId) : undefined;

      const baggage = getBaggageByPassengerId(boardingRecord.passengerId);

      return {
        id: boardingRecord.id,

        status: boardingRecord.status,

        gate: boardingRecord.gate,

        boardedAt: boardingRecord.boardedAt,

        scannedById: boardingRecord.scannedBy,

        scannedByName: scannedBy?.name ?? null,

        scannedByEmail: scannedBy?.email ?? null,

        ticketId: boardingRecord.ticketId,

        ticketNumber: ticketDetails.ticket?.ticketNumber ?? null,

        ticketStatus: formatStatus(ticketDetails.ticket?.status),

        passengerId: boardingRecord.passengerId,

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

        customerName: customer?.name ?? null,

        flightId: boardingRecord.flightId,

        flightNumber: flightDetails?.flight.flightNumber ?? null,

        departureDate: flightDetails?.flight.departureDate ?? null,

        departureTime: flightDetails?.flight.departureTime ?? null,

        arrivalDate: flightDetails?.flight.arrivalDate ?? null,

        arrivalTime: flightDetails?.flight.arrivalTime ?? null,

        originCode: flightDetails?.origin?.code ?? null,

        originCity: flightDetails?.origin?.city ?? null,

        destinationCode: flightDetails?.destination?.code ?? null,

        destinationCity: flightDetails?.destination?.city ?? null,

        seatNumber: resolvedSeat?.seatNumber ?? null,

        fareClassName: fareClass?.name ?? null,

        fareClassCode: fareClass?.code ?? null,

        checkInStatus: formatStatus(checkIn?.status),

        checkedInAt: checkIn?.checkedInAt ?? null,

        checkInMethod: formatStatus(checkIn?.checkInMethod),

        baggageCount: baggage.length,

        paymentStatus: formatStatus(booking?.paymentStatus),

        paymentMethod: formatStatus(booking?.paymentMethod),

        bookingTotal: booking?.total ?? null,
      };
    })
    .filter((item): item is BoardingViewModel => item !== null)
    .sort((a, b) => {
      const first = a.boardedAt ?? '';

      const second = b.boardedAt ?? '';

      return second.localeCompare(first);
    });
}

export function buildBoardingStats(items: BoardingViewModel[]): BoardingStats {
  return {
    total: items.length,

    boarded: items.filter((item) => item.status === 'BOARDED').length,

    notBoarded: items.filter((item) => item.status === 'NOT_BOARDED').length,

    denied: items.filter((item) => item.status === 'DENIED').length,

    checkedIn: items.filter((item) => item.checkInStatus === 'Completed')
      .length,

    flightCount: new Set(items.map((item) => item.flightId)).size,

    gateCount: new Set(items.map((item) => item.gate)).size,
  };
}

export function buildBoardingFlightOptions(items: BoardingViewModel[]) {
  const flights = new Map<string, string>();

  for (const item of items) {
    if (!flights.has(item.flightId)) {
      flights.set(item.flightId, item.flightNumber ?? item.flightId);
    }
  }

  return [
    {
      label: 'All flights',
      value: 'ALL',
    },
    ...Array.from(flights.entries())
      .sort(([, first], [, second]) => first.localeCompare(second))
      .map(([value, label]) => ({
        label,
        value,
      })),
  ];
}

export function filterBoardingViewModels(
  items: BoardingViewModel[],
  filters: BoardingFilters,
) {
  const search = filters.search.trim().toLowerCase();

  return items.filter((item) => {
    if (filters.status !== 'ALL' && item.status !== filters.status) {
      return false;
    }

    if (
      filters.checkIn === 'CHECKED_IN' &&
      item.checkInStatus !== 'Completed'
    ) {
      return false;
    }

    if (
      filters.checkIn === 'NOT_CHECKED_IN' &&
      item.checkInStatus === 'Completed'
    ) {
      return false;
    }

    if (filters.flightId !== 'ALL' && item.flightId !== filters.flightId) {
      return false;
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
      item.gate,
      item.scannedByName,
      item.scannedByEmail,
      item.checkInMethod,
      item.status,
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();

    return searchable.includes(search);
  });
}
