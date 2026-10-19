'use client';

import { ListFilter } from 'lucide-react';

import { AdminFilterBar } from '@/components/filter-bar';
import { AdminFilterSelect } from '@/components/filter-select';

import type {
  CustomerRefundCounts,
  CustomerRefundStatusFilter,
} from '../types/refund';

interface RefundFiltersProps {
  search: string;
  setSearch: (value: string) => void;
  status: CustomerRefundStatusFilter;
  setStatus: (value: CustomerRefundStatusFilter) => void;
  counts: CustomerRefundCounts;
  hasFilters: boolean;
  resultCount: number;
  onReset: () => void;
}

const statusLabels: Array<{
  value: CustomerRefundStatusFilter;
  label: string;
}> = [
  { value: 'ALL', label: 'All refunds' },
  { value: 'REQUESTED', label: 'Requested' },
  { value: 'PROCESSING', label: 'Processing' },
  { value: 'COMPLETED', label: 'Completed' },
  { value: 'REJECTED', label: 'Rejected' },
];

export function RefundFilters({
  search,
  setSearch,
  status,
  setStatus,
  counts,
  hasFilters,
  resultCount,
  onReset,
}: RefundFiltersProps) {
  const options = statusLabels.map((option) => ({
    ...option,
    label: `${option.label} (${counts[option.value]})`,
  }));

  return (
    <AdminFilterBar
      search={search}
      searchPlaceholder='Search refund, booking, passenger, flight or route...'
      resultCount={resultCount}
      resultLabel='refund'
      resultLabelPlural='refunds'
      hasFilters={hasFilters}
      onSearchChange={setSearch}
      onReset={onReset}
      helperText='Search by refund reference, reason, booking reference, payment reference, passenger, flight, or route.'
    >
      <AdminFilterSelect
        id='customer-refund-status'
        label='Refund status'
        value={status}
        options={options}
        onChange={(value) => setStatus(value as CustomerRefundStatusFilter)}
        className='w-full sm:w-[190px]'
        icon={
          <ListFilter className='size-3.5 shrink-0 text-muted-foreground' />
        }
      />
    </AdminFilterBar>
  );
}
