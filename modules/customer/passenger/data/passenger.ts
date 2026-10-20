import type { CustomerPassengerRecord } from '../types/passenger';

export function hasTicket(record: CustomerPassengerRecord) {
  return record.tickets.length > 0;
}

export function hasCheckedIn(record: CustomerPassengerRecord) {
  return record.tickets.some(
    (ticket) => ticket.checkIn?.status === 'COMPLETED',
  );
}

export function hasSpecialAssistance(record: CustomerPassengerRecord) {
  return record.passenger.specialAssistance;
}

export function getPassengerSearchText(
  record: CustomerPassengerRecord,
): string {
  const passenger = record.passenger;
  const flight = record.flight;

  return [
    passenger.id,
    passenger.firstName,
    passenger.middleName ?? '',
    passenger.lastName,
    passenger.email,
    passenger.phone,
    passenger.dateOfBirth,
    passenger.gender,
    passenger.nationality,
    passenger.maskedPassportNumber ?? '',
    passenger.frequentFlyerNumber ?? '',
    record.booking.bookingReference,
    record.booking.status,
    record.booking.paymentStatus,
    flight.flight.flightNumber,
    flight.origin.code,
    flight.origin.city,
    flight.destination.code,
    flight.destination.city,
    record.reservation?.seat?.seatNumber ?? '',
    record.reservation?.fareClass?.name ?? '',
    ...record.tickets.map((ticket) => ticket.ticketNumber),
    ...record.baggage.map((bag) => bag.bagTag),
  ]
    .join(' ')
    .toLowerCase();
}
