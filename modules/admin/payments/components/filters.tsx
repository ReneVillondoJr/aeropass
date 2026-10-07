'use client';

import { CreditCard, Filter } from 'lucide-react';

import { AdminFilterBar } from '@/components/filter-bar';
import { AdminFilterSelect } from '@/components/filter-select';

import type {
  PaymentMethodFilter,
  PaymentStatusFilter,
} from '../types/payment';

interface PaymentFiltersProps {
  search: string;
  status: PaymentStatusFilter;
  method: PaymentMethodFilter;

  resultCount: number;
  hasFilters: boolean;

  onSearchChange: (value: string) => void;

  onStatusChange: (value: PaymentStatusFilter) => void;

  onMethodChange: (value: PaymentMethodFilter) => void;

  onReset: () => void;
}

const statusOptions = [
  {
    label: 'All payment status',
    value: 'ALL',
  },
  {
    label: 'Pending',
    value: 'PENDING',
  },
  {
    label: 'Processing',
    value: 'PROCESSING',
  },
  {
    label: 'Paid',
    value: 'PAID',
  },
  {
    label: 'Failed',
    value: 'FAILED',
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

const methodOptions = [
  {
    label: 'All payment methods',
    value: 'ALL',
  },
  {
    label: 'GCash',
    value: 'GCASH',
  },
  {
    label: 'Maya',
    value: 'MAYA',
  },
  {
    label: 'QRPh',
    value: 'QRPH',
  },
  {
    label: 'Card',
    value: 'CARD',
  },
  {
    label: 'Bank transfer',
    value: 'BANK_TRANSFER',
  },
];

export function PaymentFilters({
  search,
  status,
  method,
  resultCount,
  hasFilters,
  onSearchChange,
  onStatusChange,
  onMethodChange,
  onReset,
}: PaymentFiltersProps) {
  return (
    <AdminFilterBar
      search={search}
      searchPlaceholder='Search payment, booking, passenger, reference...'
      resultCount={resultCount}
      resultLabel='payment'
      resultLabelPlural='payments'
      hasFilters={hasFilters}
      onSearchChange={onSearchChange}
      onReset={onReset}
      helperText='Search by provider reference, booking, passenger, flight, method, or payment status.'
    >
      <AdminFilterSelect
        id='payment-status'
        label='Payment status'
        value={status}
        options={statusOptions}
        onChange={(value) => onStatusChange(value as PaymentStatusFilter)}
        className='w-full sm:w-[175px]'
        icon={<Filter className='size-3.5 shrink-0 text-muted-foreground' />}
      />

      <AdminFilterSelect
        id='payment-method'
        label='Payment method'
        value={method}
        options={methodOptions}
        onChange={(value) => onMethodChange(value as PaymentMethodFilter)}
        className='w-full sm:w-[185px]'
        icon={
          <CreditCard className='size-3.5 shrink-0 text-muted-foreground' />
        }
      />
    </AdminFilterBar>
  );
}
