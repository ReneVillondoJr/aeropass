'use client';

import type { FormEvent } from 'react';

import { ArrowRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import type { PassengerDetailsSchema } from '../schema';

interface PassengerFormProps {
  initialValues: PassengerDetailsSchema | null;
  onSubmit: (values: PassengerDetailsSchema) => void;
}

export function PassengerForm({ initialValues, onSubmit }: PassengerFormProps) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    onSubmit({
      firstName: String(data.get('firstName') ?? ''),
      middleName: String(data.get('middleName') ?? ''),
      lastName: String(data.get('lastName') ?? ''),
      email: String(data.get('email') ?? ''),
      phone: String(data.get('phone') ?? ''),
      dateOfBirth: String(data.get('dateOfBirth') ?? ''),
      gender: String(
        data.get('gender') ?? 'MALE',
      ) as PassengerDetailsSchema['gender'],
      nationality: String(data.get('nationality') ?? 'Filipino'),
      passportNumber: String(data.get('passportNumber') ?? ''),
      passportExpiry: String(data.get('passportExpiry') ?? ''),
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='rounded-2xl border border-sky-100 bg-white p-6 sm:p-8'
    >
      <div>
        <p className='text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400'>
          Passenger information
        </p>

        <h2 className='mt-2 text-lg font-semibold text-[#102a43]'>
          Enter passenger details
        </h2>
      </div>

      <div className='mt-6 grid gap-5 sm:grid-cols-2'>
        <div className='space-y-2'>
          <Label htmlFor='firstName'>First name</Label>

          <Input
            id='firstName'
            name='firstName'
            defaultValue={initialValues?.firstName}
            required
          />
        </div>

        <div className='space-y-2'>
          <Label htmlFor='middleName'>Middle name</Label>

          <Input
            id='middleName'
            name='middleName'
            defaultValue={initialValues?.middleName}
          />
        </div>

        <div className='space-y-2'>
          <Label htmlFor='lastName'>Last name</Label>

          <Input
            id='lastName'
            name='lastName'
            defaultValue={initialValues?.lastName}
            required
          />
        </div>

        <div className='space-y-2'>
          <Label htmlFor='dateOfBirth'>Date of birth</Label>

          <Input
            id='dateOfBirth'
            name='dateOfBirth'
            type='date'
            defaultValue={initialValues?.dateOfBirth}
            required
          />
        </div>

        <div className='space-y-2'>
          <Label htmlFor='email'>Email</Label>

          <Input
            id='email'
            name='email'
            type='email'
            defaultValue={initialValues?.email}
            required
          />
        </div>

        <div className='space-y-2'>
          <Label htmlFor='phone'>Phone</Label>

          <Input
            id='phone'
            name='phone'
            defaultValue={initialValues?.phone}
            required
          />
        </div>

        <div className='space-y-2'>
          <Label htmlFor='gender'>Gender</Label>

          <select
            id='gender'
            name='gender'
            defaultValue={initialValues?.gender ?? 'MALE'}
            className='flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm'
          >
            <option value='MALE'>Male</option>

            <option value='FEMALE'>Female</option>

            <option value='OTHER'>Other</option>
          </select>
        </div>

        <div className='space-y-2'>
          <Label htmlFor='nationality'>Nationality</Label>

          <Input
            id='nationality'
            name='nationality'
            defaultValue={initialValues?.nationality ?? 'Filipino'}
            required
          />
        </div>

        <div className='space-y-2'>
          <Label htmlFor='passportNumber'>Passport number</Label>

          <Input
            id='passportNumber'
            name='passportNumber'
            defaultValue={initialValues?.passportNumber}
          />
        </div>

        <div className='space-y-2'>
          <Label htmlFor='passportExpiry'>Passport expiry</Label>

          <Input
            id='passportExpiry'
            name='passportExpiry'
            type='date'
            defaultValue={initialValues?.passportExpiry}
          />
        </div>
      </div>

      <Button
        type='submit'
        className='mt-7 h-11 w-full gap-2 bg-[#102a43] text-white hover:bg-[#183b5b]'
      >
        Continue
        <ArrowRight className='size-4' />
      </Button>
    </form>
  );
}
