'use client';

import { CreditCard, Filter, RotateCcw } from 'lucide-react';

import { AdminFilterBar } from '@/components/filter-bar';
import { AdminFilterSelect } from '@/components/filter-select';

import type {
  RefundPaymentMethodFilter,
  RefundStatusFilter,
} from '../types/refund';

interface RefundFiltersProps {
  search: string;
  status: RefundStatusFilter;
  paymentMethod: RefundPaymentMethodFilter;

  resultCount: number;
  hasFilters: boolean;

  onSearchChange: (value: string) => void;

  onStatusChange: (value: RefundStatusFilter) => void;

  onPaymentMethodChange: (value: RefundPaymentMethodFilter) => void;

  onReset: () => void;
}

const statusOptions = [
  {
    label: 'All refund status',
    value: 'ALL',
  },
  {
    label: 'Requested',
    value: 'REQUESTED',
  },
  {
    label: 'Processing',
    value: 'PROCESSING',
  },
  {
    label: 'Completed',
    value: 'COMPLETED',
  },
  {
    label: 'Rejected',
    value: 'REJECTED',
  },
];

const paymentMethodOptions = [
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

export function RefundFilters({
  search,
  status,
  paymentMethod,
  resultCount,
  hasFilters,
  onSearchChange,
  onStatusChange,
  onPaymentMethodChange,
  onReset,
}: RefundFiltersProps) {
  return (
    <AdminFilterBar
      search={search}
      searchPlaceholder='Search refund, booking, passenger, reason...'
      resultCount={resultCount}
      resultLabel='refund'
      resultLabelPlural='refunds'
      hasFilters={hasFilters}
      onSearchChange={onSearchChange}
      onReset={onReset}
      helperText='Search by booking, passenger, payment reference, requester, reason, or status.'
    >
      <AdminFilterSelect
        id='refund-status'
        label='Refund status'
        value={status}
        options={statusOptions}
        onChange={(value) => onStatusChange(value as RefundStatusFilter)}
        className='w-full sm:w-[175px]'
        icon={<RotateCcw className='size-3.5 shrink-0 text-muted-foreground' />}
      />

      <AdminFilterSelect
        id='refund-payment-method'
        label='Payment method'
        value={paymentMethod}
        options={paymentMethodOptions}
        onChange={(value) =>
          onPaymentMethodChange(value as RefundPaymentMethodFilter)
        }
        className='w-full sm:w-[185px]'
        icon={
          <CreditCard className='size-3.5 shrink-0 text-muted-foreground' />
        }
      />
    </AdminFilterBar>
  );
}
