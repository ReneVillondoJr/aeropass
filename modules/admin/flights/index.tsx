'use client';

import { Plus, Radio } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { CreateFlightForm } from './components/create-flight-form';
import { FlightBoarding } from './components/flight-boarding';
import { FlightList } from './components/flight-list';
import { FlightOverview } from './components/flight-overview';
import { FlightStats } from './components/flight-stats';
import { useFlights } from './hooks/use-flights';

export function AdminFlights() {
  const {
    flights,
    filteredFlights,
    selectedFlight,
    operations,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    selectedFlightId,
    setSelectedFlightId,
    createFlight,
  } = useFlights();

  const activeFlights = flights.filter(
    (flight) => !['ARRIVED', 'CANCELLED'].includes(flight.status),
  ).length;

  const boardingFlights = flights.filter(
    (flight) => flight.status === 'BOARDING',
  ).length;

  const checkedInPassengers = flights.reduce(
    (total, flight) => total + flight.checkedInCount,
    0,
  );

  return (
    <div className='space-y-8'>
      <div className='flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between'>
        <div>
          <div className='flex items-center gap-2 text-xs text-muted-foreground'>
            <Radio className='size-3.5' />
            Operations
          </div>

          <h1 className='mt-2 text-2xl font-semibold tracking-tight sm:text-3xl'>
            Flight operations
          </h1>

          <p className='mt-2 max-w-2xl text-sm leading-6 text-muted-foreground'>
            Monitor flight schedules, passenger movement, check-in activity, and
            gate operations from one workspace.
          </p>
        </div>

        <Button
          type='button'
          onClick={() => {
            document.getElementById('create-flight')?.scrollIntoView({
              behavior: 'smooth',
            });
          }}
        >
          <Plus className='size-4' />
          Create flight
        </Button>
      </div>

      <FlightStats
        total={flights.length}
        active={activeFlights}
        boarding={boardingFlights}
        passengers={checkedInPassengers}
      />

      <div className='grid gap-6 xl:grid-cols-[minmax(320px,0.8fr)_minmax(0,1.2fr)]'>
        <FlightList
          flights={filteredFlights}
          selectedFlightId={selectedFlightId}
          search={search}
          statusFilter={statusFilter}
          onSearchChange={setSearch}
          onStatusChange={setStatusFilter}
          onSelect={setSelectedFlightId}
        />

        <div className='space-y-6'>
          {selectedFlight ?
            <FlightOverview flight={selectedFlight} />
          : <div className='rounded-2xl border border-dashed border-border p-10 text-center'>
              <p className='text-sm font-medium'>Select a flight</p>

              <p className='mt-1 text-xs text-muted-foreground'>
                Choose a flight from the schedule to view operations.
              </p>
            </div>
          }

          <FlightBoarding operations={operations} />
        </div>
      </div>

      <div id='create-flight'>
        <CreateFlightForm onCreate={createFlight} />
      </div>
    </div>
  );
}
