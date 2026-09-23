import { passengers, users } from '@/data/aeropass';

export function getPassengerById(passengerId: string) {
  return passengers.find((passenger) => passenger.id === passengerId);
}

export function getPassengersByBookingId(bookingId: string) {
  return passengers.filter((passenger) => passenger.bookingId === bookingId);
}

export function getPassengerUser(passengerId: string) {
  const passenger = getPassengerById(passengerId);

  if (!passenger) {
    return null;
  }

  return users.find((user) => user.email === passenger.email);
}
