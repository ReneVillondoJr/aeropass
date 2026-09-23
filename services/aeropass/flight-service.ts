import {
  aircraft,
  airports,
  flightFares,
  flights,
  fareClasses,
  routes,
  schedules,
} from '@/data/aeropass';

export function getFlightById(flightId: string) {
  return flights.find((flight) => flight.id === flightId);
}

export function getAirportById(airportId: string) {
  return airports.find((airport) => airport.id === airportId);
}

export function getRouteById(routeId: string) {
  return routes.find((route) => route.id === routeId);
}

export function getAircraftById(aircraftId: string) {
  return aircraft.find((item) => item.id === aircraftId);
}

export function getScheduleById(scheduleId: string) {
  return schedules.find((schedule) => schedule.id === scheduleId);
}

export function getFlightDetails(flightId: string) {
  const flight = getFlightById(flightId);

  if (!flight) {
    return null;
  }

  const route = getRouteById(flight.routeId);

  const schedule = getScheduleById(flight.scheduleId);

  const aircraftItem = getAircraftById(flight.aircraftId);

  const origin = route ? getAirportById(route.originAirportId) : undefined;

  const destination =
    route ? getAirportById(route.destinationAirportId) : undefined;

  const fares = flightFares
    .filter((fare) => fare.flightId === flight.id)
    .map((fare) => ({
      ...fare,

      fareClass: fareClasses.find(
        (fareClass) => fareClass.id === fare.fareClassId,
      ),
    }));

  return {
    flight,
    route,
    schedule,
    aircraft: aircraftItem,
    origin,
    destination,
    fares,
  };
}

export function searchFlights({
  from,
  to,
  departureDate,
}: {
  from?: string;
  to?: string;
  departureDate?: string;
}) {
  return flights.filter((flight) => {
    if (departureDate && flight.departureDate !== departureDate) {
      return false;
    }

    const route = getRouteById(flight.routeId);

    if (!route) {
      return false;
    }

    const origin = getAirportById(route.originAirportId);

    const destination = getAirportById(route.destinationAirportId);

    if (from && origin?.code !== from) {
      return false;
    }

    if (to && destination?.code !== to) {
      return false;
    }

    return flight.status !== 'CANCELLED';
  });
}
