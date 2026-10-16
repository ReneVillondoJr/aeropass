'use client';

import { ListFilter } from 'lucide-react';

import { AdminFilterBar } from '@/components/filter-bar';
import { AdminFilterSelect } from '@/components/filter-select';

import type { CustomerTicketStatusFilter } from '../types/ticket';

interface TicketFiltersProps {
  search: string;
  setSearch: (value: string) => void;
  status: CustomerTicketStatusFilter;
  setStatus: (value: CustomerTicketStatusFilter) => void;
  counts: Record<CustomerTicketStatusFilter, number>;
  hasFilters: boolean;
  onReset: () => void;
}

export function TicketFilters({
  search,
  setSearch,
  status,
  setStatus,
  counts,
  hasFilters,
  onReset,
}: TicketFiltersProps) {
  const statusOptions: Array<{
    value: CustomerTicketStatusFilter;
    label: string;
  }> = [
    {
      value: 'ALL',
      label: `All tickets (${counts.ALL})`,
    },
    {
      value: 'VALID',
      label: `Valid (${counts.VALID})`,
    },
    {
      value: 'PENDING',
      label: `Pending (${counts.PENDING})`,
    },
    {
      value: 'USED',
      label: `Used (${counts.USED})`,
    },
    {
      value: 'EXPIRED',
      label: `Expired (${counts.EXPIRED})`,
    },
    {
      value: 'CANCELLED',
      label: `Cancelled (${counts.CANCELLED})`,
    },
    {
      value: 'REFUNDED',
      label: `Refunded (${counts.REFUNDED})`,
    },
  ];

  return (
    <AdminFilterBar
      search={search}
      searchPlaceholder='Search ticket, booking, passenger, flight...'
      resultCount={counts[status]}
      resultLabel='ticket'
      resultLabelPlural='tickets'
      hasFilters={hasFilters}
      onSearchChange={setSearch}
      onReset={onReset}
      helperText='Search by ticket number, booking reference, passenger, flight, or route.'
    >
      <AdminFilterSelect
        id='customer-ticket-status'
        label='Ticket status'
        value={status}
        options={statusOptions}
        onChange={(value) => setStatus(value as CustomerTicketStatusFilter)}
        className='w-full sm:w-[190px]'
        icon={
          <ListFilter className='size-3.5 shrink-0 text-muted-foreground' />
        }
      />
    </AdminFilterBar>
  );
}
