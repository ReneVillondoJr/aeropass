'use client';

import { MonitorSmartphone, ScanLine, ShieldCheck } from 'lucide-react';

import { AdminFilterBar } from '@/components/filter-bar';
import { AdminFilterSelect } from '@/components/filter-select';

import type {
  CheckInBoardingFilter,
  CheckInMethodFilter,
  CheckInStatusFilter,
} from '../types/check-in';

interface CheckInFiltersProps {
  search: string;
  status: CheckInStatusFilter;
  method: CheckInMethodFilter;
  boarding: CheckInBoardingFilter;

  resultCount: number;
  hasFilters: boolean;

  onSearchChange: (value: string) => void;

  onStatusChange: (value: CheckInStatusFilter) => void;

  onMethodChange: (value: CheckInMethodFilter) => void;

  onBoardingChange: (value: CheckInBoardingFilter) => void;

  onReset: () => void;
}

const statusOptions = [
  {
    label: 'All check-in status',
    value: 'ALL',
  },
  {
    label: 'Not checked in',
    value: 'NOT_CHECKED_IN',
  },
  {
    label: 'Completed',
    value: 'COMPLETED',
  },
  {
    label: 'Cancelled',
    value: 'CANCELLED',
  },
];

const methodOptions = [
  {
    label: 'All methods',
    value: 'ALL',
  },
  {
    label: 'Web',
    value: 'WEB',
  },
  {
    label: 'Mobile',
    value: 'MOBILE',
  },
  {
    label: 'Counter',
    value: 'COUNTER',
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

export function CheckInFilters({
  search,
  status,
  method,
  boarding,
  resultCount,
  hasFilters,
  onSearchChange,
  onStatusChange,
  onMethodChange,
  onBoardingChange,
  onReset,
}: CheckInFiltersProps) {
  return (
    <AdminFilterBar
      search={search}
      searchPlaceholder='Search passenger, ticket, booking, flight...'
      resultCount={resultCount}
      resultLabel='check-in'
      resultLabelPlural='check-ins'
      hasFilters={hasFilters}
      onSearchChange={onSearchChange}
      onReset={onReset}
      helperText='Search by passenger, ticket number, booking reference, flight, seat, or staff.'
    >
      <AdminFilterSelect
        id='check-in-status'
        label='Check-in status'
        value={status}
        options={statusOptions}
        onChange={(value) => onStatusChange(value as CheckInStatusFilter)}
        className='w-full sm:w-[180px]'
        icon={
          <ShieldCheck className='size-3.5 shrink-0 text-muted-foreground' />
        }
      />

      <AdminFilterSelect
        id='check-in-method'
        label='Check-in method'
        value={method}
        options={methodOptions}
        onChange={(value) => onMethodChange(value as CheckInMethodFilter)}
        className='w-full sm:w-[175px]'
        icon={
          <MonitorSmartphone className='size-3.5 shrink-0 text-muted-foreground' />
        }
      />

      <AdminFilterSelect
        id='check-in-boarding'
        label='Boarding'
        value={boarding}
        options={boardingOptions}
        onChange={(value) => onBoardingChange(value as CheckInBoardingFilter)}
        className='w-full sm:w-[180px]'
        icon={<ScanLine className='size-3.5 shrink-0 text-muted-foreground' />}
      />
    </AdminFilterBar>
  );
}
