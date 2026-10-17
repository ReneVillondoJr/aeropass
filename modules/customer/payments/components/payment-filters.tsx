'use client';

import { ListFilter } from 'lucide-react';

import { AdminFilterBar } from '@/components/filter-bar';
import { AdminFilterSelect } from '@/components/filter-select';

import type {
  CustomerPaymentCounts,
  CustomerPaymentStatusFilter,
} from '../types/payment';

interface PaymentFiltersProps {
  search: string;
  setSearch: (value: string) => void;
  status: CustomerPaymentStatusFilter;
  setStatus: (value: CustomerPaymentStatusFilter) => void;
  counts: CustomerPaymentCounts;
  hasFilters: boolean;
  resultCount: number;
  onReset: () => void;
}

const statusLabels: Array<{
  value: CustomerPaymentStatusFilter;
  label: string;
}> = [
  { value: 'ALL', label: 'All payments' },
  { value: 'PAID', label: 'Paid' },
  { value: 'PENDING', label: 'Pending' },
  { value: 'PROCESSING', label: 'Processing' },
  { value: 'FAILED', label: 'Failed' },
  { value: 'CANCELLED', label: 'Cancelled' },
  { value: 'REFUNDED', label: 'Refunded' },
];

export function PaymentFilters({
  search,
  setSearch,
  status,
  setStatus,
  counts,
  hasFilters,
  resultCount,
  onReset,
}: PaymentFiltersProps) {
  const options = statusLabels.map((option) => ({
    ...option,
    label: `${option.label} (${counts[option.value]})`,
  }));

  return (
    <AdminFilterBar
      search={search}
      searchPlaceholder="Search payment, booking, method, flight or route..."
      resultCount={resultCount}
      resultLabel="payment"
      resultLabelPlural="payments"
      hasFilters={hasFilters}
      onSearchChange={setSearch}
      onReset={onReset}
      helperText="Search by transaction reference, booking reference, payment method, flight number, route, or status."
    >
      <AdminFilterSelect
        id="customer-payment-status"
        label="Payment status"
        value={status}
        options={options}
        onChange={(value) => setStatus(value as CustomerPaymentStatusFilter)}
        className="w-full sm:w-[190px]"
        icon={<ListFilter className="size-3.5 shrink-0 text-muted-foreground" />}
      />
    </AdminFilterBar>
  );
}
