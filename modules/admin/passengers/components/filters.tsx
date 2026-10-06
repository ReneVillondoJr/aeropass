'use client';

import { Accessibility, BriefcaseBusiness, UserRound } from 'lucide-react';

import { AdminFilterBar } from '@/components/filter-bar';

import { AdminFilterSelect } from '@/components/filter-select';

import type {
  PassengerAssistanceFilter,
  PassengerBookingStatusFilter,
  PassengerGenderFilter,
} from '../types/passenger';

interface PassengerFiltersProps {
  search: string;
  gender: PassengerGenderFilter;
  bookingStatus: PassengerBookingStatusFilter;
  assistance: PassengerAssistanceFilter;
  resultCount: number;
  hasFilters: boolean;
  onSearchChange: (value: string) => void;
  onGenderChange: (value: PassengerGenderFilter) => void;
  onBookingStatusChange: (value: PassengerBookingStatusFilter) => void;
  onAssistanceChange: (value: PassengerAssistanceFilter) => void;
  onReset: () => void;
}

const genderOptions = [
  { label: 'All genders', value: 'ALL' },
  { label: 'Male', value: 'MALE' },
  { label: 'Female', value: 'FEMALE' },
  { label: 'Other', value: 'OTHER' },
];

const bookingStatusOptions = [
  { label: 'All booking status', value: 'ALL' },
  { label: 'Pending payment', value: 'PENDING_PAYMENT' },
  { label: 'Confirmed', value: 'CONFIRMED' },
  { label: 'Checked in', value: 'CHECKED_IN' },
  { label: 'Completed', value: 'COMPLETED' },
  { label: 'Cancelled', value: 'CANCELLED' },
  { label: 'Refund pending', value: 'REFUND_PENDING' },
  { label: 'Refunded', value: 'REFUNDED' },
];

const assistanceOptions = [
  { label: 'All assistance status', value: 'ALL' },
  { label: 'Assistance required', value: 'YES' },
  { label: 'No assistance', value: 'NO' },
];

export function PassengerFilters({
  search,
  gender,
  bookingStatus,
  assistance,
  resultCount,
  hasFilters,
  onSearchChange,
  onGenderChange,
  onBookingStatusChange,
  onAssistanceChange,
  onReset,
}: PassengerFiltersProps) {
  return (
    <AdminFilterBar
      search={search}
      searchPlaceholder='Search passengers, booking, passport, flight...'
      resultCount={resultCount}
      resultLabel='passenger'
      resultLabelPlural='passengers'
      hasFilters={hasFilters}
      onSearchChange={onSearchChange}
      onReset={onReset}
      helperText='Search by passenger identity, booking reference, flight, or travel document.'
    >
      <AdminFilterSelect
        id='passenger-gender'
        label='Gender'
        value={gender}
        options={genderOptions}
        onChange={(value) => onGenderChange(value as PassengerGenderFilter)}
        className='w-full sm:w-[170px]'
        icon={<UserRound className='size-3.5 shrink-0 text-muted-foreground' />}
      />

      <AdminFilterSelect
        id='passenger-booking-status'
        label='Booking status'
        value={bookingStatus}
        options={bookingStatusOptions}
        onChange={(value) =>
          onBookingStatusChange(value as PassengerBookingStatusFilter)
        }
        className='w-full sm:w-[190px]'
        icon={
          <BriefcaseBusiness className='size-3.5 shrink-0 text-muted-foreground' />
        }
      />

      <AdminFilterSelect
        id='passenger-assistance'
        label='Assistance'
        value={assistance}
        options={assistanceOptions}
        onChange={(value) =>
          onAssistanceChange(value as PassengerAssistanceFilter)
        }
        className='w-full sm:w-[180px]'
        icon={
          <Accessibility className='size-3.5 shrink-0 text-muted-foreground' />
        }
      />
    </AdminFilterBar>
  );
}
