'use client';

import { QrCode, ScanLine, TicketCheck } from 'lucide-react';

import { AdminFilterBar } from '@/components/filter-bar';
import { AdminFilterSelect } from '@/components/filter-select';

import type {
  TicketBoardingFilter,
  TicketCheckInFilter,
  TicketStatusFilter,
} from '../types/ticket';

interface TicketFiltersProps {
  search: string;
  status: TicketStatusFilter;
  checkIn: TicketCheckInFilter;
  boarding: TicketBoardingFilter;
  resultCount: number;
  hasFilters: boolean;

  onSearchChange: (value: string) => void;

  onStatusChange: (value: TicketStatusFilter) => void;

  onCheckInChange: (value: TicketCheckInFilter) => void;

  onBoardingChange: (value: TicketBoardingFilter) => void;

  onReset: () => void;
}

const statusOptions = [
  {
    label: 'All ticket status',
    value: 'ALL',
  },
  {
    label: 'Pending',
    value: 'PENDING',
  },
  {
    label: 'Valid',
    value: 'VALID',
  },
  {
    label: 'Used',
    value: 'USED',
  },
  {
    label: 'Cancelled',
    value: 'CANCELLED',
  },
  {
    label: 'Refunded',
    value: 'REFUNDED',
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

const boardingOptions = [
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

export function TicketFilters({
  search,
  status,
  checkIn,
  boarding,
  resultCount,
  hasFilters,
  onSearchChange,
  onStatusChange,
  onCheckInChange,
  onBoardingChange,
  onReset,
}: TicketFiltersProps) {
  return (
    <AdminFilterBar
      search={search}
      searchPlaceholder='Search ticket, passenger, booking, flight...'
      resultCount={resultCount}
      resultLabel='ticket'
      resultLabelPlural='tickets'
      hasFilters={hasFilters}
      onSearchChange={onSearchChange}
      onReset={onReset}
      helperText='Search by ticket number, passenger, booking reference, flight, or seat.'
    >
      <AdminFilterSelect
        id='ticket-status'
        label='Ticket status'
        value={status}
        options={statusOptions}
        onChange={(value) => onStatusChange(value as TicketStatusFilter)}
        className='w-full sm:w-[170px]'
        icon={
          <TicketCheck className='size-3.5 shrink-0 text-muted-foreground' />
        }
      />

      <AdminFilterSelect
        id='ticket-check-in'
        label='Check-in'
        value={checkIn}
        options={checkInOptions}
        onChange={(value) => onCheckInChange(value as TicketCheckInFilter)}
        className='w-full sm:w-[175px]'
        icon={<ScanLine className='size-3.5 shrink-0 text-muted-foreground' />}
      />

      <AdminFilterSelect
        id='ticket-boarding'
        label='Boarding'
        value={boarding}
        options={boardingOptions}
        onChange={(value) => onBoardingChange(value as TicketBoardingFilter)}
        className='w-full sm:w-[170px]'
        icon={<QrCode className='size-3.5 shrink-0 text-muted-foreground' />}
      />
    </AdminFilterBar>
  );
}
