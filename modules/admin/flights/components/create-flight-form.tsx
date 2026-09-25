'use client';

import type { FormEvent } from 'react';

import { CalendarDays, DoorOpen, Plane, Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { schedules } from '@/data/aeropass';

import type { CreateFlightSchema } from '../schema';

interface CreateFlightFormProps {
  onCreate: (values: CreateFlightSchema) => {
    success: boolean;
    message: string;
  };
}

export function CreateFlightForm({ onCreate }: CreateFlightFormProps) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const result = onCreate({
      scheduleId: String(formData.get('scheduleId') ?? ''),

      departureDate: String(formData.get('departureDate') ?? ''),

      gate: String(formData.get('gate') ?? ''),

      status: String(
        formData.get('status') ?? 'SCHEDULED',
      ) as CreateFlightSchema['status'],

      seatsAvailable: Number(formData.get('seatsAvailable') ?? 0),
    });

    if (result.success) {
      event.currentTarget.reset();
    }
  }

  return (
    <div className='rounded-2xl border border-border bg-card p-6'>
      <div className='flex items-start gap-3'>
        <div className='flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground'>
          <Plus className='size-4' />
        </div>

        <div>
          <h2 className='text-sm font-semibold'>Create flight</h2>

          <p className='mt-1 text-xs leading-5 text-muted-foreground'>
            Create a local flight draft from an existing AeroPass schedule.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className='mt-6 space-y-5'>
        <div className='space-y-2'>
          <Label htmlFor='scheduleId'>Schedule</Label>

          <select
            id='scheduleId'
            name='scheduleId'
            required
            className='flex h-9 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus:border-ring'
          >
            <option value=''>Select schedule</option>

            {schedules
              .filter((schedule) => schedule.active)
              .map((schedule) => (
                <option key={schedule.id} value={schedule.id}>
                  {schedule.flightNumber} · {schedule.departureTime} →{' '}
                  {schedule.arrivalTime}
                </option>
              ))}
          </select>
        </div>

        <div className='grid gap-5 sm:grid-cols-2'>
          <div className='space-y-2'>
            <Label htmlFor='departureDate'>Departure date</Label>

            <div className='relative'>
              <CalendarDays className='pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground' />

              <Input
                id='departureDate'
                name='departureDate'
                type='date'
                required
                className='pl-9'
              />
            </div>
          </div>

          <div className='space-y-2'>
            <Label htmlFor='gate'>Gate</Label>

            <div className='relative'>
              <DoorOpen className='pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground' />

              <Input
                id='gate'
                name='gate'
                placeholder='A12'
                required
                className='pl-9'
              />
            </div>
          </div>
        </div>

        <div className='grid gap-5 sm:grid-cols-2'>
          <div className='space-y-2'>
            <Label htmlFor='status'>Status</Label>

            <select
              id='status'
              name='status'
              defaultValue='SCHEDULED'
              className='flex h-9 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus:border-ring'
            >
              <option value='SCHEDULED'>Scheduled</option>

              <option value='CHECK_IN_OPEN'>Check-in Open</option>

              <option value='BOARDING'>Boarding</option>

              <option value='DELAYED'>Delayed</option>
            </select>
          </div>

          <div className='space-y-2'>
            <Label htmlFor='seatsAvailable'>Available seats</Label>

            <Input
              id='seatsAvailable'
              name='seatsAvailable'
              type='number'
              min='0'
              defaultValue='100'
              required
            />
          </div>
        </div>

        <div className='rounded-xl border border-border bg-muted/30 p-4'>
          <div className='flex items-center gap-3'>
            <Plane className='size-4 text-muted-foreground' />

            <p className='text-xs leading-5 text-muted-foreground'>
              Route, aircraft, departure time, and arrival time are derived from
              the selected canonical schedule.
            </p>
          </div>
        </div>

        <Button type='submit' className='w-full'>
          <Plus className='size-4' />
          Create flight draft
        </Button>
      </form>
    </div>
  );
}
