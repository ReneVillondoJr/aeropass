import {
  getAircraftSeats,
  getBaggageByPassengerId,
  getFareClassById,
  getTicketDetails,
  getUserById,
  tickets,
} from '@/data/aeropass';

import type {
  TicketFilters,
  TicketStats,
  TicketViewModel,
} from '../types/ticket';

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

function formatDate(value: string | null | undefined) {
  if (!value) {
    return null;
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat('en-PH', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}

export function buildTicketViewModels(): TicketViewModel[] {
  return tickets
    .map<TicketViewModel | null>((ticket) => {
      const details = getTicketDetails(ticket.id);

      if (!details) {
        return null;
      }

      const passenger = details.passenger;
      const bookingDetails = details.booking;
      const booking = bookingDetails?.booking;
      const flightDetails = details.flight;

      const reservation = bookingDetails?.reservations.find(
        (item) => item.passengerId === ticket.passengerId,
      );

      const aircraftId =
        flightDetails?.aircraft?.id ?? flightDetails?.flight.aircraftId;

      const seat =
        aircraftId ?
          getAircraftSeats(aircraftId).find((item) => item.id === ticket.seatId)
        : undefined;

      const fareClass =
        reservation ? getFareClassById(reservation.fareClassId) : undefined;

      const baggage = passenger ? getBaggageByPassengerId(passenger.id) : [];
      const customer = booking?.customerId ? getUserById(booking.customerId) : null;

      return {
        id: ticket.id,

        ticketNumber: ticket.ticketNumber,
        qrToken: ticket.qrToken,
        status: ticket.status,

        issuedAt: ticket.issuedAt,
        expiresAt: ticket.expiresAt,

        passengerId: passenger?.id ?? null,

        passengerName:
          passenger ?
            [passenger.firstName, passenger.middleName, passenger.lastName]
              .filter(Boolean)
              .join(' ')
          : 'Unknown passenger',

        passengerEmail: passenger?.email ?? null,

        passengerPhone: passenger?.phone ?? null,

        bookingId: booking?.id ?? ticket.bookingId,

        bookingReference: booking?.bookingReference ?? null,

        bookingStatus: formatStatus(booking?.status),

        flightId: flightDetails?.flight.id ?? ticket.flightId,

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

        checkInStatus: formatStatus(details.checkIn?.status),

        checkedInAt: details.checkIn?.checkedInAt ?? null,

        checkInMethod: formatStatus(details.checkIn?.checkInMethod),

        boardingStatus: formatStatus(details.boarding?.status),

        boardedAt: details.boarding?.boardedAt ?? null,

        gate: details.boarding?.gate ?? flightDetails?.flight.gate ?? null,

        customerName: customer?.name ?? 'Unknown customer',

        baggageCount: baggage.length,

        paymentStatus: formatStatus(booking?.paymentStatus),

        paymentMethod: formatStatus(booking?.paymentMethod),

        bookingTotal: booking?.total ?? null,
      };
    })
    .filter((item): item is TicketViewModel => item !== null)
    .sort((a, b) => a.ticketNumber.localeCompare(b.ticketNumber));
}

export function buildTicketStats(items: TicketViewModel[]): TicketStats {
  return {
    total: items.length,

    valid: items.filter((item) => item.status === 'VALID').length,

    used: items.filter((item) => item.status === 'USED').length,

    pending: items.filter((item) => item.status === 'PENDING').length,

    cancelled: items.filter((item) => item.status === 'CANCELLED').length,

    refunded: items.filter((item) => item.status === 'REFUNDED').length,

    checkedIn: items.filter((item) => item.checkInStatus === 'Completed')
      .length,

    boarded: items.filter((item) => item.boardingStatus === 'Boarded').length,
  };
}

export function filterTicketViewModels(
  items: TicketViewModel[],
  filters: TicketFilters,
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
      item.ticketNumber,
      item.qrToken,
      item.passengerName,
      item.passengerEmail,
      item.passengerPhone,
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
      item.paymentMethod,
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();

    return searchable.includes(search);
  });
}
