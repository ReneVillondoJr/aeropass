import {
  baggage,
  getAircraftById,
  getAircraftSeats,
  getAirportById,
  getBoardingByFlightId,
  getBookingById,
  getCheckInsByFlightId,
  getFlightById,
  getPaymentByBookingId,
  getPassengerById,
  getRouteById,
  getTicketsByBookingId,
  getUserById,
} from '@/data/aeropass';

import type {
  BaggageFlightOption,
  BaggageStats,
  BaggageViewModel,
} from '../types/baggage';

function getPassengerName(
  firstName?: string,
  middleName?: string,
  lastName?: string,
) {
  return [firstName, middleName, lastName].filter(Boolean).join(' ').trim();
}

export function buildBaggageViewModels(): BaggageViewModel[] {
  return baggage.map((bag) => {
    const booking = getBookingById(bag.bookingId);
    const passenger = getPassengerById(bag.passengerId);
    const flight = getFlightById(
      bag.bookingId ?
        bag.destination ?
          bag.id
        : bag.id
      : bag.id,
    );

    const resolvedFlight =
      flight ??
      getFlightById(
        baggage.find((item) => item.id === bag.id)?.bookingId ?? '',
      );

    const actualFlight =
      resolvedFlight ? resolvedFlight
      : booking ? getFlightById(booking.flightId)
      : undefined;

    const route = actualFlight ? getRouteById(actualFlight.routeId) : undefined;

    const originAirport =
      route ? getAirportById(route.originAirportId) : undefined;

    const destinationAirport =
      route ? getAirportById(route.destinationAirportId) : undefined;

    const payment = getPaymentByBookingId(bag.bookingId);

    const tickets = getTicketsByBookingId(bag.bookingId);

    const ticket =
      tickets.find(
        (item) =>
          item.passengerId === bag.passengerId && item.flightId === bag.id,
      ) ??
      tickets.find((item) => item.passengerId === bag.passengerId) ??
      tickets[0];

    const aircraft =
      actualFlight ? getAircraftById(actualFlight.aircraftId) : undefined;

    const seat =
      ticket && aircraft ?
        getAircraftSeats(aircraft.id).find((item) => item.id === ticket.seatId)
      : undefined;

    const flightCheckIns =
      actualFlight ? getCheckInsByFlightId(actualFlight.id) : [];

    const checkIn = flightCheckIns.find(
      (item) =>
        item.passengerId === bag.passengerId &&
        item.bookingId === bag.bookingId,
    );

    const flightBoarding =
      actualFlight ? getBoardingByFlightId(actualFlight.id) : [];

    const boarding = flightBoarding.find(
      (item) => item.passengerId === bag.passengerId,
    );

    const staff = checkIn?.staffId ? getUserById(checkIn.staffId) : undefined;

    return {
      id: bag.id,
      bagTag: bag.bagTag,
      type: bag.type,
      weightKg: bag.weightKg,
      status: bag.status,
      destination: bag.destination,
      checkedAt: bag.checkedAt,
      receivedAt: bag.receivedAt,

      bookingId: bag.bookingId,
      bookingReference: booking?.bookingReference ?? '—',
      bookingStatus: booking?.status ?? '—',
      paymentStatus: booking?.paymentStatus ?? payment?.status ?? 'PENDING',
      paymentMethod:
        booking?.paymentMethod ?? payment?.paymentMethod ?? 'GCASH',
      totalAmount: booking?.total ?? payment?.amount ?? 0,

      passengerId: bag.passengerId,
      passengerName:
        passenger ?
          getPassengerName(
            passenger.firstName,
            passenger.middleName,
            passenger.lastName,
          )
        : 'Unknown Passenger',
      passengerEmail: passenger?.email ?? '—',
      passengerPhone: passenger?.phone ?? '—',
      nationality: passenger?.nationality ?? '—',

      flightId: actualFlight?.id ?? bag.bookingId,
      flightNumber: actualFlight?.flightNumber ?? '—',
      departureDate: actualFlight?.departureDate ?? '',
      departureTime: actualFlight?.departureTime ?? '',
      arrivalDate: actualFlight?.arrivalDate ?? '',
      arrivalTime: actualFlight?.arrivalTime ?? '',
      flightStatus: actualFlight?.status ?? '—',

      originCode: originAirport?.code ?? '—',
      originCity: originAirport?.city ?? '—',
      destinationCode: destinationAirport?.code ?? '—',
      destinationCity: destinationAirport?.city ?? '—',
      gate: actualFlight?.gate ?? '—',
      terminal: actualFlight?.terminal ?? '—',

      ticketNumber: ticket?.ticketNumber ?? null,
      ticketStatus: ticket?.status ?? null,
      seatNumber: seat?.seatNumber ?? null,

      checkInStatus: checkIn?.status ?? null,
      checkInMethod: checkIn?.checkInMethod ?? null,
      checkedInAt: checkIn?.checkedInAt ?? null,

      boardingStatus: boarding?.status ?? null,
      boardedAt: boarding?.boardedAt ?? null,

      staffId: staff?.id ?? null,
      staffName: staff?.name ?? null,

      aircraftModel: aircraft?.model ?? null,
      aircraftRegistration: aircraft?.registrationNumber ?? null,
    };
  });
}

export function buildBaggageStats(items: BaggageViewModel[]): BaggageStats {
  return {
    total: items.length,
    totalWeightKg: items.reduce((sum, item) => sum + item.weightKg, 0),
    pending: items.filter((item) => item.status === 'PENDING').length,
    checked: items.filter((item) => item.status === 'CHECKED').length,
    inTransit: items.filter((item) => item.status === 'IN_TRANSIT').length,
    received: items.filter((item) => item.status === 'RECEIVED').length,
    lost: items.filter((item) => item.status === 'LOST').length,
    cabin: items.filter((item) => item.type === 'CABIN').length,
    checkedType: items.filter((item) => item.type === 'CHECKED').length,
  };
}

export function getBaggageFlightOptions(
  items: BaggageViewModel[],
): BaggageFlightOption[] {
  const seen = new Set<string>();
  const options: BaggageFlightOption[] = [];

  for (const item of items) {
    if (seen.has(item.flightId)) {
      continue;
    }

    seen.add(item.flightId);

    options.push({
      value: item.flightId,
      label: `${item.flightNumber} • ${item.originCode} → ${item.destinationCode}`,
    });
  }

  return options.sort((a, b) => a.label.localeCompare(b.label));
}
