'use client';

import { ListFilter, Plane, ScanLine } from 'lucide-react';

import { AdminFilterBar } from '@/components/filter-bar';
import { AdminFilterSelect } from '@/components/filter-select';

import type {
  BoardingCheckInFilter,
  BoardingStatusFilter,
} from '../types/boarding';

interface BoardingFiltersProps {
  search: string;
  status: BoardingStatusFilter;
  checkIn: BoardingCheckInFilter;
  flightId: string;

  flightOptions: {
    label: string;
    value: string;
  }[];

  resultCount: number;
  hasFilters: boolean;

  onSearchChange: (value: string) => void;

  onStatusChange: (value: BoardingStatusFilter) => void;

  onCheckInChange: (value: BoardingCheckInFilter) => void;

  onFlightChange: (value: string) => void;

  onReset: () => void;
}

const statusOptions = [
  {
    label: 'All boarding status',
    value: 'ALL',
  },
  {
    label: 'Not boarded',
    value: 'NOT_BOARDED',
  },
  {
    label: 'Boarded',
    value: 'BOARDED',
  },
  {
    label: 'Denied',
    value: 'DENIED',
  },
];

const checkInOptions = [
  {
    label: 'All check-in status',
    value: 'ALL',
  },
  {
    label: 'Checked in',
    value: 'CHECKED_IN',
  },
  {
    label: 'Not checked in',
    value: 'NOT_CHECKED_IN',
  },
];

export function BoardingFilters({
  search,
  status,
  checkIn,
  flightId,
  flightOptions,
  resultCount,
  hasFilters,
  onSearchChange,
  onStatusChange,
  onCheckInChange,
  onFlightChange,
  onReset,
}: BoardingFiltersProps) {
  return (
    <AdminFilterBar
      search={search}
      searchPlaceholder='Search passenger, ticket, booking, flight, gate...'
      resultCount={resultCount}
      resultLabel='boarding record'
      resultLabelPlural='boarding records'
      hasFilters={hasFilters}
      onSearchChange={onSearchChange}
      onReset={onReset}
      helperText='Search by passenger, ticket, booking, flight, seat, gate, or boarding staff.'
    >
      <AdminFilterSelect
        id='boarding-status'
        label='Boarding status'
        value={status}
        options={statusOptions}
        onChange={(value) => onStatusChange(value as BoardingStatusFilter)}
        className='w-full sm:w-[180px]'
        icon={
          <ListFilter className='size-3.5 shrink-0 text-muted-foreground' />
        }
      />

      <AdminFilterSelect
        id='boarding-check-in'
        label='Check-in'
        value={checkIn}
        options={checkInOptions}
        onChange={(value) => onCheckInChange(value as BoardingCheckInFilter)}
        className='w-full sm:w-[175px]'
        icon={<ScanLine className='size-3.5 shrink-0 text-muted-foreground' />}
      />

      <AdminFilterSelect
        id='boarding-flight'
        label='Flight'
        value={flightId}
        options={flightOptions}
        onChange={onFlightChange}
        className='w-full sm:w-[170px]'
        icon={<Plane className='size-3.5 shrink-0 text-muted-foreground' />}
      />
    </AdminFilterBar>
  );
}
